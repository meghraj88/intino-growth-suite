import { type NextRequest, NextResponse } from "next/server"

// Mock returns data
const mockReturns = [
  {
    id: "return-1",
    order_id: "order-1",
    order: {
      store_order_id: "#ORD-2024-001",
      customer: { name: "John Doe", email: "john@example.com" },
      total_amount: 89.98,
      items: [{ title: "Wireless Earbuds", quantity: 2, price: 44.99 }],
    },
    reason: "Product not as described",
    status: "pending",
    auto_approved: false,
    refund_risk_score: 0.3,
    resolution: null,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "return-2",
    order_id: "order-2",
    order: {
      store_order_id: "#ORD-2024-002",
      customer: { name: "Jane Smith", email: "jane@example.com" },
      total_amount: 45.99,
      items: [{ title: "Phone Stand", quantity: 1, price: 45.99 }],
    },
    reason: "Defective item",
    status: "approved",
    auto_approved: true,
    refund_risk_score: 0.1,
    resolution: { type: "full_refund", amount: 45.99, processed_at: new Date().toISOString() },
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "return-3",
    order_id: "order-3",
    order: {
      store_order_id: "#ORD-2024-003",
      customer: { name: "Mike Johnson", email: "mike@example.com" },
      total_amount: 127.97,
      items: [{ title: "LED Strip Lights", quantity: 3, price: 42.66 }],
    },
    reason: "Changed mind",
    status: "rejected",
    auto_approved: false,
    refund_risk_score: 0.8,
    resolution: { type: "rejected", reason: "Outside return window", processed_at: new Date().toISOString() },
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    console.log("[v0] Fetching returns with status:", status)

    let filteredReturns = mockReturns
    if (status && status !== "all") {
      filteredReturns = mockReturns.filter((r) => r.status === status)
    }

    return NextResponse.json({
      success: true,
      returns: filteredReturns,
      total: filteredReturns.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching returns:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch returns" }, { status: 500 })
  }
}
