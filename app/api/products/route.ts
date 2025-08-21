import { type NextRequest, NextResponse } from "next/server"

// Mock products data
const mockProducts = [
  {
    id: "prod-1",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-12345",
    title: "Wireless Bluetooth Earbuds",
    description: "High-quality wireless earbuds with noise cancellation. Long battery life, comfortable fit.",
    image_url: "/wireless-earbuds.png",
    cost: 12.50,
    shipping_cost: 3.99,
    last_synced: new Date(Date.now() - 86400000).toISOString(), // Synced yesterday
    suggested_price: 45.99,
    current_price: 42.99,
    margin_percent: 65.2,
    region: "US",
    metadata: { category: "Electronics", weight: "0.2kg", color: "Black" },
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // Created 2 days ago
  },
  {
    id: "prod-2",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-67890",
    title: "Smart Phone Stand Adjustable",
    description: "Foldable and adjustable phone stand, compatible with all smartphones and small tablets. Lightweight and portable.",
    image_url: "/placeholder-ejzhk.png",
    cost: 5.25,
    shipping_cost: 2.50,
    last_synced: new Date(Date.now() - 3600000).toISOString(), // Synced 1 hour ago
    suggested_price: 19.99,
    current_price: 18.99,
    margin_percent: 61.1,
    region: "US",
    metadata: { category: "Accessories", weight: "0.15kg", material: "Aluminum" },
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // Created 5 days ago
  },
  {
    id: "prod-3",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-11111",
    title: "LED Strip Lights RGB",
    description: "Color changing LED strip lights with remote control and app support. 5 meters length.",
    image_url: "/led-strip-lights.png",
    cost: 8.75,
    shipping_cost: 4.25,
    last_synced: new Date(Date.now() - 172800000).toISOString(), // Synced 2 days ago
    suggested_price: 29.99,
    current_price: 27.99,
    margin_percent: 56.7,
    region: "US",
    metadata: { category: "Home & Garden", weight: "0.3kg", length_meters: 5 },
    created_at: new Date().toISOString(), // Created today
  },
  {
    id: "prod-4",
    store_id: "store-2", // Different store
    supplier_id: null,
    supplier_sku: "SK-45678",
    title: "Ergonomic Office Chair",
    description: "Comfortable and supportive office chair with adjustable lumbar support.",
    image_url: "/office-chair.png",
    cost: 75.00,
    shipping_cost: 15.00,
    last_synced: new Date(Date.now() - 604800000).toISOString(), // Synced 1 week ago
    suggested_price: 199.99,
    current_price: 179.99,
    margin_percent: 45.0,
    region: "EU",
    metadata: { category: "Furniture", weight: "15kg", color: "Grey" },
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(), // Created 10 days ago
  },
  {
    id: "prod-5",
    store_id: "store-1",
    supplier_id: null,
    supplier_sku: "AE-22222",
    title: "Portable Blender USB Rechargeable",
    description: "Personal blender for smoothies and shakes, easy to clean and carry.",
    image_url: "/portable-blender.png",
    cost: 15.00,
    shipping_cost: 3.50,
    last_synced: new Date(Date.now() - 86400000).toISOString(), // Synced yesterday
    suggested_price: 39.99,
    current_price: 35.99,
    margin_percent: 58.5,
    region: "US",
    metadata: { category: "Kitchenware", weight: "0.5kg", capacity_ml: 400 },
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // Created 3 days ago
  },
]

// Filter products by storeId
function filterProductsByStore(products: typeof mockProducts, storeId: string | null) {
  if (!storeId) {
    return products; // Return all if no storeId provided
  }
  return products.filter(product => product.store_id === storeId);
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get("storeId")

    console.log("[v0] Fetching products for store:", storeId)

    const filteredProducts = filterProductsByStore(mockProducts, storeId);

    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    // Provide a more specific error message if possible
    let errorMessage = "Failed to fetch products";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}