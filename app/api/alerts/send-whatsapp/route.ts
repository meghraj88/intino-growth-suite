import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, templateId, payload } = await request.json()

    // Mock WhatsApp API integration - in production, use Twilio/Gupshup
    const mockResponse = {
      message_id: `wa_${Date.now()}`,
      status: "sent",
      to,
      template: templateId,
      sent_at: new Date().toISOString(),
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("WhatsApp message sent:", {
      to,
      template: templateId,
      payload,
    })

    return NextResponse.json({
      success: true,
      data: mockResponse,
    })
  } catch (error) {
    console.error("WhatsApp send error:", error)
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 })
  }
}
