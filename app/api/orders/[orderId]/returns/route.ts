import { type NextRequest, NextResponse } from "next/server"

// Refund risk prediction logic
const calculateRefundRisk = (order: any, reason: string) => {
  let riskScore = 0.3 // Base risk

  // Higher order values have lower risk
  if (order.total_amount > 100) riskScore -= 0.1
  else if (order.total_amount < 20) riskScore += 0.2

  // Certain reasons are riskier
  const highRiskReasons = ["changed mind", "found cheaper", "don't need anymore"]
  const lowRiskReasons = ["defective", "damaged", "wrong item", "not as described"]

  if (highRiskReasons.some((r) => reason.toLowerCase().includes(r))) {
    riskScore += 0.3
  } else if (lowRiskReasons.some((r) => reason.toLowerCase().includes(r))) {
    riskScore -= 0.2
  }

  // Mock additional factors
  const customerRisk = Math.random() * 0.3 // Customer history risk
  const productRisk = Math.random() * 0.2 // Product category risk

  riskScore += customerRisk + productRisk

  return Math.min(Math.max(riskScore, 0), 1)
}

export async function POST(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params
    const body = await request.json()
    const { reason } = body

    console.log("[v0] Creating return request for order:", orderId, "Reason:", reason)

    // Mock order data - in real app, fetch from Supabase
    const mockOrder = {
      id: orderId,
      store_order_id: "#ORD-2024-004",
      customer: { name: "New Customer", email: "customer@example.com" },
      total_amount: 67.99,
      items: [{ title: "Bluetooth Speaker", quantity: 1, price: 67.99 }],
    }

    const riskScore = calculateRefundRisk(mockOrder, reason)

    // TODO: Save return request to Supabase
    // TODO: Send WhatsApp notification to merchant
    // TODO: Trigger auto-approval if risk is low

    const newReturn = {
      id: `return-${Date.now()}`,
      order_id: orderId,
      order: mockOrder,
      reason,
      status: "pending",
      auto_approved: false,
      refund_risk_score: riskScore,
      resolution: null,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Return request created successfully",
      return: newReturn,
      risk_assessment: {
        score: riskScore,
        level: riskScore > 0.7 ? "high" : riskScore > 0.4 ? "medium" : "low",
        auto_approve_eligible: riskScore < 0.3,
      },
    })
  } catch (error) {
    console.error("[v0] Error creating return request:", error)
    return NextResponse.json({ success: false, error: "Failed to create return request" }, { status: 500 })
  }
}
