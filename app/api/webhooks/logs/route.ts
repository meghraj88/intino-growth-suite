import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const type = searchParams.get("type")

    // Mock webhook logs - in production, this would query the database
    const mockLogs = [
      {
        id: "1",
        type: "shopify.orders/create",
        payload: { id: 12345, total_price: "99.99" },
        status: "processed",
        response: { success: true },
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        shop_domain: "test-store.myshopify.com",
      },
      {
        id: "2",
        type: "woocommerce.order.created",
        payload: { id: 67890, total: "149.99" },
        status: "processed",
        response: { success: true },
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: "mystore.com",
      },
      {
        id: "3",
        type: "shopify.products/update",
        payload: { id: 11111, title: "Updated Product" },
        status: "failed",
        response: { error: "Product not found" },
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        shop_domain: "test-store.myshopify.com",
      },
      {
        id: "4",
        type: "cron.sync-prices",
        payload: { job_id: "sync_123" },
        status: "processed",
        response: { products_updated: 23 },
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        type: "cron.scan-trends",
        payload: { countries: ["US", "GB"] },
        status: "processed",
        response: { trends_found: 47 },
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ]

    let filteredLogs = mockLogs
    if (type) {
      filteredLogs = mockLogs.filter((log) => log.type.includes(type))
    }

    return NextResponse.json({
      logs: filteredLogs.slice(0, limit),
      total: filteredLogs.length,
    })
  } catch (error) {
    console.error("Get webhook logs error:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
