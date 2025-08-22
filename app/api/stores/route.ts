import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    console.log("[STORES] Fetching stores for authenticated user");

    const supabase = createClient();
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.log("[STORES] User not authenticated");
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log("[STORES] User authenticated:", user.id);
    
    // Query the stores where the owner matches the user's ID
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