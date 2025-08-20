import { type NextRequest, NextResponse } from "next/server"

// Mock products data
const mockProducts = [
  {
    id: "prod-1",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-12345",
    title: "Wireless Bluetooth Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    image_url: "/wireless-earbuds.png",
    cost: 12.5,
    shipping_cost: 3.99,
    last_synced: new Date().toISOString(),
    suggested_price: 45.99,
    current_price: 42.99,
    margin_percent: 65.2,
    region: "US",
    metadata: { category: "Electronics", weight: "0.2kg" },
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-2",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-67890",
    title: "Smart Phone Stand Adjustable",
    description: "Foldable phone stand compatible with all devices",
    image_url: "/placeholder-ejzhk.png",
    cost: 5.25,
    shipping_cost: 2.5,
    last_synced: new Date().toISOString(),
    suggested_price: 19.99,
    current_price: 18.99,
    margin_percent: 61.1,
    region: "US",
    metadata: { category: "Accessories", weight: "0.15kg" },
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-3",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-11111",
    title: "LED Strip Lights RGB",
    description: "Color changing LED strip lights with remote control",
    image_url: "/led-strip-lights.png",
    cost: 8.75,
    shipping_cost: 4.25,
    last_synced: new Date().toISOString(),
    suggested_price: 29.99,
    current_price: 27.99,
    margin_percent: 56.7,
    region: "US",
    metadata: { category: "Home & Garden", weight: "0.3kg" },
    created_at: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get("storeId")

    console.log("[v0] Fetching products for store:", storeId)

    // TODO: Get user from auth session
    // TODO: Query Supabase for products filtered by store

    return NextResponse.json({
      success: true,
      products: mockProducts,
      total: mockProducts.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
