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
