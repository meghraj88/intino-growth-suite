import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ShopifyIntegration } from "@/lib/integrations/shopify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storeId } = body;

    if (!storeId) {
      return NextResponse.json(
        { success: false, error: "Store ID is required" },
        { status: 400 }
      );
    }

    console.log("[v0] Product sync request for storeId:", storeId);

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id, access_token, store_domain')
      .eq('id', storeId)
      .eq('owner', user.id)
      .single();

    if (storeError || !store) {
      console.error("[v0] Store not found:", storeError);
      return NextResponse.json(
        { success: false, error: "Store not found or access denied" },
        { status: 404 }
      );
    }

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