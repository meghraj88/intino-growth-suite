import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, templateId, payload } = await request.json()

    // Mock email API integration - in production, use SendGrid/Postmark
    const mockResponse = {
      message_id: `email_${Date.now()}`,
      status: "sent",
      to,
      template: templateId,
      sent_at: new Date().toISOString(),
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("Email sent:", {
      to,
      template: templateId,
      payload,
    })

    return NextResponse.json({
      success: true,
      data: mockResponse,
    })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
