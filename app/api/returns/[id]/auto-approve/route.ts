import { type NextRequest, NextResponse } from "next/server"

// Auto-approval logic based on various factors
const calculateAutoApproval = (returnRequest: any) => {
  const factors = {
    orderValue: returnRequest.order.total_amount,
    customerHistory: Math.random(), // Mock customer history score
    returnReason: returnRequest.reason,
    timeFromOrder: Date.now() - new Date(returnRequest.created_at).getTime(),
    riskScore: returnRequest.refund_risk_score,
  }

  let approvalScore = 0.5 // Base score

  // Lower order value = higher approval chance
  if (factors.orderValue < 50) approvalScore += 0.2
  else if (factors.orderValue > 100) approvalScore -= 0.1

  // Good customer history = higher approval
  if (factors.customerHistory > 0.7) approvalScore += 0.2
  else if (factors.customerHistory < 0.3) approvalScore -= 0.2

  // Certain reasons are more likely to be approved
  const goodReasons = ["defective item", "damaged in shipping", "wrong item sent"]
  const badReasons = ["changed mind", "found cheaper elsewhere"]

  if (goodReasons.some((reason) => factors.returnReason.toLowerCase().includes(reason))) {
    approvalScore += 0.3
  } else if (badReasons.some((reason) => factors.returnReason.toLowerCase().includes(reason))) {
    approvalScore -= 0.2
  }

  // Quick returns are more suspicious
  const hoursFromOrder = factors.timeFromOrder / (1000 * 60 * 60)
  if (hoursFromOrder < 24) approvalScore -= 0.1

  // High risk score = lower approval
  approvalScore -= factors.riskScore * 0.4

  return {
    shouldApprove: approvalScore > 0.6,
    confidence: Math.min(Math.max(approvalScore, 0), 1),
    factors: {
      orderValue: factors.orderValue,
      riskScore: factors.riskScore,
      returnReason: factors.returnReason,
      hoursFromOrder: Math.round(hoursFromOrder),
    },
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    console.log("[v0] Running auto-approval for return:", id)

    // Mock return data - in real app, fetch from Supabase
    const mockReturn = {
      id,
      order: { total_amount: 45.99 },
      reason: "Defective item",
      refund_risk_score: 0.2,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    }

    const approval = calculateAutoApproval(mockReturn)

    // TODO: Update return status in Supabase
    // TODO: Send WhatsApp notification to customer
    // TODO: Process refund if auto-approved

    const updatedReturn = {
      ...mockReturn,
      status: approval.shouldApprove ? "approved" : "rejected",
      auto_approved: approval.shouldApprove,
      resolution: approval.shouldApprove
        ? { type: "full_refund", amount: mockReturn.order.total_amount, processed_at: new Date().toISOString() }
        : {
            type: "rejected",
            reason: "Auto-rejection based on risk assessment",
            processed_at: new Date().toISOString(),
          },
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: approval.shouldApprove ? "Return auto-approved" : "Return auto-rejected",
      return: updatedReturn,
      approval_details: approval,
    })
  } catch (error) {
    console.error("[v0] Error in auto-approval:", error)
    return NextResponse.json({ success: false, error: "Failed to process auto-approval" }, { status: 500 })
  }
}
