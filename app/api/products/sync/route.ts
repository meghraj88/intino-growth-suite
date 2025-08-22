import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ShopifyIntegration } from "@/lib/integrations/shopify";

export async function POST(request: NextRequest) {
  try {
    console.log("[SYNC] Starting product sync request");
    
    // Log environment variables (without exposing secrets)
    console.log("[SYNC] Supabase URL configured:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("[SYNC] Supabase Key configured:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log("[SYNC] Shopify API Key configured:", !!process.env.SHOPIFY_API_KEY);
    console.log("[SYNC] Shopify API Secret configured:", !!process.env.SHOPIFY_API_SECRET);

    const body = await request.json();
    const { storeId } = body;

    if (!storeId) {
      console.log("[SYNC] Error: Store ID is required");
      return NextResponse.json(
        { success: false, error: "Store ID is required" },
        { status: 400 }
      );
    }

    console.log("[SYNC] Product sync request for storeId:", storeId);

    console.log("[SYNC] Creating Supabase client");
    const supabase = createClient();
    
    console.log("[SYNC] Getting authenticated user");
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("[SYNC] User authentication error:", userError);
      return NextResponse.json(
        { success: false, error: "User authentication failed", details: userError.message },
        { status: 401 }
      );
    }
    
    if (!user) {
      console.log("[SYNC] No authenticated user found");
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }
    
    console.log("[SYNC] User authenticated:", user.id);

    console.log("[SYNC] Looking up store with ID:", storeId, "for user:", user.id);
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id, access_token, store_domain')
      .eq('id', storeId)
      .eq('owner', user.id)
      .single();

    if (storeError) {
      console.error("[SYNC] Store lookup error:", storeError);
      return NextResponse.json(
        { success: false, error: "Store lookup failed", details: storeError.message },
        { status: 500 }
      );
    }
    
    if (!store) {
      console.log("[SYNC] Store not found for user");
      return NextResponse.json(
        { success: false, error: "Store not found or access denied" },
        { status: 404 }
      );
    }
    
    console.log("[SYNC] Store found:", store.store_domain);

    if (!store.access_token || !store.store_domain) {
      return NextResponse.json(
        { success: false, error: "Store credentials are incomplete" },
        { status: 400 }
      );
    }

    const shopifyConfig = {
      apiKey: process.env.SHOPIFY_API_KEY || '',
      apiSecret: process.env.SHOPIFY_API_SECRET || '',
      accessToken: store.access_token,
      shopDomain: store.store_domain
    };

    const shopify = new ShopifyIntegration(shopifyConfig);

    console.log("[v0] Fetching products from Shopify store:", store.store_domain);
    const shopifyProducts = await shopify.getProducts(250);

    if (!shopifyProducts || shopifyProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No products found in store",
        syncedCount: 0,
        storeId: storeId,
        timestamp: new Date().toISOString(),
      });
    }

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('store_id', storeId);

    if (deleteError) {
      console.error("[v0] Error deleting existing products:", deleteError);
    }

    let syncedCount = 0;

    for (const product of shopifyProducts) {
      const formattedProduct = {
        store_id: storeId,
        title: product.title,
        price: product.variants[0].price,
      };

      const { error: insertError } = await supabase
        .from('products')
        .insert([formattedProduct]);

      if (insertError) {
        console.error("[v0] Error inserting product:", insertError);
        continue;
      }
      syncedCount++;
    }

    console.log(`[v0] Successfully synced ${syncedCount} products for store ${storeId}`);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products`,
      syncedCount: syncedCount,
      storeId: storeId,
      storeDomain: store.store_domain,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[v0] Error syncing products:", error);
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