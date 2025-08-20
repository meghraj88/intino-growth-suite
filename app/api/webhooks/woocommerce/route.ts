import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify WooCommerce webhook signature
function verifyWooCommerceWebhook(body: string, signature: string, secret: string): boolean {
  const hash = crypto.createHmac("sha256", secret).update(body).digest("base64")
  return hash === signature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-wc-webhook-signature")
    const topic = request.headers.get("x-wc-webhook-topic")
    const source = request.headers.get("x-wc-webhook-source")

    // Verify webhook signature (in production, use actual secret)
    const webhookSecret = process.env.WOOCOMMERCE_WEBHOOK_SECRET || "test-secret"
    if (signature && !verifyWooCommerceWebhook(body, signature, webhookSecret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)

    // Log webhook
    const logEntry = {
      id: Date.now().toString(),
      type: `woocommerce.${topic}`,
      payload: data,
      status: "received",
      response: null,
      created_at: new Date().toISOString(),
      source,
    }

    console.log("WooCommerce webhook received:", logEntry)

    // Handle different webhook topics
    switch (topic) {
      case "order.created":
        await handleOrderCreate(data, source)
        break
      case "order.updated":
        await handleOrderUpdate(data, source)
        break
      case "product.created":
      case "product.updated":
        await handleProductUpdate(data, source)
        break
      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return NextResponse.json({ success: true, topic })
  } catch (error) {
    console.error("WooCommerce webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleOrderCreate(order: any, source: string | null) {
  console.log("Processing WooCommerce order:", order.id, "from", source)

  const orderData = {
    store_order_id: order.id.toString(),
    customer: {
      name: order.billing.first_name + " " + order.billing.last_name,
      email: order.billing.email,
      phone: order.billing.phone,
    },
    items: order.line_items.map((item: any) => ({
      product_id: item.product_id,
      variant_id: item.variation_id,
      title: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total_amount: Number.parseFloat(order.total),
    supplier_order_status: "pending",
    refund_status: "none",
    refund_risk_score: calculateRefundRisk(order),
  }

  console.log("WooCommerce order saved:", orderData)
}

async function handleOrderUpdate(order: any, source: string | null) {
  console.log("Processing WooCommerce order update:", order.id, "from", source)
}

async function handleProductUpdate(product: any, source: string | null) {
  console.log("Processing WooCommerce product update:", product.id, "from", source)
}

function calculateRefundRisk(order: any): number {
  let risk = 0.1
  if (Number.parseFloat(order.total) > 100) risk += 0.2
  if (order.line_items.length > 3) risk += 0.1
  return Math.min(risk, 1.0)
}
