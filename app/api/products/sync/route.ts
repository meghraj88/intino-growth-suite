
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ShopifyIntegration } from "@/lib/integrations/shopify"

export async function POST(request: NextRequest) {
  try {
    // 1. Receive storeId from request body
    const body = await request.json()
    const { storeId } = body

    if (!storeId) {
      return NextResponse.json(
        { success: false, error: "Store ID is required" },
        { status: 400 }
      )
    }

    console.log("[v0] Product sync request for storeId:", storeId)

    // 2. Connect to server-side Supabase client
    const supabase = createClient()

    // 3. Get the currently authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      )
    }

    // 4. Query stores table to find the correct store
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id, access_token, store_domain, provider, currency, country')
      .eq('id', storeId)
      .eq('owner', user.id)
      .single()

    if (storeError || !store) {
      console.error("[v0] Store not found:", storeError)
      return NextResponse.json(
        { success: false, error: "Store not found or access denied" },
        { status: 404 }
      )
    }

    if (!store.access_token || !store.store_domain) {
      return NextResponse.json(
        { success: false, error: "Store credentials are incomplete" },
        { status: 400 }
      )
    }

    // 5. Initialize Shopify API client with store credentials
    const shopifyConfig = {
      apiKey: process.env.SHOPIFY_API_KEY || '',
      apiSecret: process.env.SHOPIFY_API_SECRET || '',
      accessToken: store.access_token,
      shopDomain: store.store_domain
    }

    const shopify = new ShopifyIntegration(shopifyConfig)

    // 6. Fetch all products from Shopify store
    console.log("[v0] Fetching products from Shopify store:", store.store_domain)
    const shopifyProducts = await shopify.getProducts(250)

    if (!shopifyProducts || shopifyProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No products found in store",
        syncedCount: 0,
        storeId: storeId,
        timestamp: new Date().toISOString(),
      })
    }

    // Clear existing products for this store to avoid duplicates
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('store_id', storeId)

    if (deleteError) {
      console.error("[v0] Error deleting existing products:", deleteError)
    }

    let syncedCount = 0

    // 7. Loop through each product from Shopify
    for (const product of shopifyProducts) {
      // 8. Format data to match Supabase products table
      const variant = product.variants?.[0] || {}
      const image = product.images?.[0] || {}
      
      const formattedProduct = {
        store_id: storeId,
        supplier_id: null,
        supplier_sku: variant.sku || product.id.toString(),
        title: product.title,
        description: product.body_html || product.summary || '',
        image_url: image.src || '/placeholder.png',
        cost: variant.price ? parseFloat(variant.price) : 0,
        shipping_cost: 0,
        last_synced: new Date().toISOString(),
        suggested_price: variant.price ? parseFloat(variant.price) * 1.5 : 0,
        margin_percent: 33.33,
        region: store.country || 'US',
        metadata: {
          shopify_product_id: product.id,
          shopify_variant_id: variant.id,
          vendor: product.vendor,
          product_type: product.product_type,
          tags: product.tags,
          handle: product.handle,
          created_at_shopify: product.created_at,
          updated_at_shopify: product.updated_at
        }
      }

      // 9. Insert formatted product into products table
      const { error: insertError } = await supabase
        .from('products')
        .insert([formattedProduct])

      if (insertError) {
        console.error("[v0] Error inserting product:", product.title, insertError)
      } else {
        syncedCount++
      }
    }

    console.log(`[v0] Successfully synced ${syncedCount} products for store ${storeId}`)

    // 10. Return success response with sync count
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products`,
      syncedCount: syncedCount,
      storeId: storeId,
      storeDomain: store.store_domain,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error("[v0] Error syncing products:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync products",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
