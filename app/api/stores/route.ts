import { type NextRequest, NextResponse } from "next/server"

// Mock data for development - replace with Supabase integration later
const mockStores = [
  {
    id: "store-1",
    owner: "user-1",
    provider: "shopify",
    store_name: "My Dropship Store",
    store_domain: "my-store.myshopify.com",
    currency: "USD",
    country: "US",
    created_at: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from auth session
    // TODO: Query Supabase for user's stores

    return NextResponse.json({
      success: true,
      stores: mockStores,
    })
  } catch (error) {
    console.error("[v0] Error fetching stores:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stores" }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    console.log("[STORES] Getting stores for user");
    
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log("[STORES] User not authenticated");
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log("[STORES] Fetching stores for user:", user.id);
    const { data: stores, error: storesError } = await supabase
      .from('stores')
      .select('id, store_domain, platform, status, created_at')
      .eq('owner', user.id);

    if (storesError) {
      console.error("[STORES] Error fetching stores:", storesError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch stores", details: storesError.message },
        { status: 500 }
      );
    }

    console.log("[STORES] Found", stores?.length || 0, "stores");
    
    return NextResponse.json({
      success: true,
      stores: stores || [],
      count: stores?.length || 0
    });

  } catch (error) {
    console.error("[STORES] Unexpected error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch stores",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
