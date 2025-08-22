
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ShopifyIntegration } from "@/lib/integrations/shopify";

export async function POST(request: NextRequest) {
  try {
    console.log("[SYNC] Starting product sync");
    
    const body = await request.json();
    const { storeId } = body;

    if (!storeId) {
      console.log("[SYNC] No store ID provided");
      return NextResponse.json({ success: false, error: "Store ID is required" }, { status: 400 });
    }

    console.log("[SYNC] Store ID:", storeId);

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log("[SYNC] User not authenticated");
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    console.log("[SYNC] User authenticated:", user.id);

    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id, access_token, store_domain')
      .eq('id', storeId)
      .eq('owner', user.id)
      .single();

    if (storeError) {
      console.error("[SYNC] Store query error:", storeError);
      return NextResponse.json({ success: false, error: "Store not found or access denied" }, { status: 404 });
    }
    
    if (!store) {
      console.log("[SYNC] Store not found for user");
      return NextResponse.json({ success: false, error: "Store not found or access denied" }, { status: 404 });
    }
    
    console.log("[SYNC] Store found:", store.store_domain);

    if (!store.access_token || !store.store_domain) {
      console.log("[SYNC] Store credentials incomplete");
      return NextResponse.json({ success: false, error: "Store credentials are incomplete. Please reconnect your store." }, { status: 400 });
    }

    // Shopify Integration
    const shopifyConfig = {
      apiKey: process.env.SHOPIFY_API_KEY || '',
      apiSecret: process.env.SHOPIFY_API_SECRET || '',
      accessToken: store.access_token,
      shopDomain: store.store_domain
    };

    console.log("[SYNC] Creating Shopify integration for:", store.store_domain);
    const shopify = new ShopifyIntegration(shopifyConfig);

    console.log("[SYNC] Fetching products from Shopify store:", store.store_domain);
    const shopifyProducts = await shopify.getProducts(250);

    if (!shopifyProducts || shopifyProducts.length === 0) {
      console.log("[SYNC] No products found in store");
      return NextResponse.json({
        success: true,
        message: "No products found in store",
        syncedCount: 0,
        storeId: storeId,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`[SYNC] Found ${shopifyProducts.length} products`);

    // Delete existing products for this store
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('store_id', storeId);

    if (deleteError) {
      console.error("[SYNC] Error deleting existing products:", deleteError);
    }

    let syncedCount = 0;

    // Insert new products
    for (const product of shopifyProducts) {
      try {
        const formattedProduct = {
          store_id: storeId,
          title: product.title,
          price: parseFloat(product.variants[0]?.price || '0'),
          description: product.body_html || '',
          image_url: product.images[0]?.src || '',
          shopify_product_id: product.id.toString(),
          created_at: new Date().toISOString(),
          last_synced: new Date().toISOString(),
        };

        const { error: insertError } = await supabase
          .from('products')
          .insert([formattedProduct]);

        if (insertError) {
          console.error("[SYNC] Error inserting product:", product.title, insertError);
          continue;
        }
        syncedCount++;
      } catch (productError) {
        console.error("[SYNC] Error processing product:", product.title, productError);
        continue;
      }
    }

    console.log(`[SYNC] Successfully synced ${syncedCount} products for store ${storeId}`);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products`,
      syncedCount: syncedCount,
      storeId: storeId,
      storeDomain: store.store_domain,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[SYNC] Error syncing products:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync products",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
