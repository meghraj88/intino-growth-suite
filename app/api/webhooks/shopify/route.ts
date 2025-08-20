import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify Shopify webhook signature
function verifyShopifyWebhook(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(body, "utf8")
  const hash = hmac.digest("base64")
  return hash === signature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")
    const topic = request.headers.get("x-shopify-topic")
    const shopDomain = request.headers.get("x-shopify-shop-domain")

    // Verify webhook signature (in production, use actual secret)
    const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET || "test-secret"
    if (signature && !verifyShopifyWebhook(body, signature, webhookSecret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)

    // Log webhook
    const logEntry = {
      id: Date.now().toString(),
      type: `shopify.${topic}`,
      payload: data,
      status: "received",
      response: null,
      created_at: new Date().toISOString(),
      shop_domain: shopDomain,
    }

    console.log("Shopify webhook received:", logEntry)

    // Handle different webhook topics
    switch (topic) {
      case "orders/create":
        await handleOrderCreate(data, shopDomain)
        break
      case "orders/updated":
        await handleOrderUpdate(data, shopDomain)
        break
      case "orders/cancelled":
        await handleOrderCancel(data, shopDomain)
        break
      case "products/create":
      case "products/update":
        await handleProductUpdate(data, shopDomain)
        break
      case "app/uninstalled":
        await handleAppUninstall(shopDomain)
        break
      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return NextResponse.json({ success: true, topic })
  } catch (error) {
    console.error("Shopify webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleOrderCreate(order: any, shopDomain: string | null) {
  // Save order to database and trigger supplier order placement
  console.log("Processing new order:", order.id, "from", shopDomain)

  // Mock order processing
  const orderData = {
    store_order_id: order.id.toString(),
    customer: {
      name: order.customer?.first_name + " " + order.customer?.last_name,
      email: order.customer?.email,
      phone: order.customer?.phone,
    },
    items: order.line_items.map((item: any) => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    total_amount: Number.parseFloat(order.total_price),
    supplier_order_status: "pending",
    refund_status: "none",
    refund_risk_score: calculateRefundRisk(order),
  }

  // In production: save to database and trigger background job
  console.log("Order saved:", orderData)
}

async function handleOrderUpdate(order: any, shopDomain: string | null) {
  console.log("Processing order update:", order.id, "from", shopDomain)
  // Update order status and handle fulfillment changes
}

async function handleOrderCancel(order: any, shopDomain: string | null) {
  console.log("Processing order cancellation:", order.id, "from", shopDomain)
  // Handle order cancellation and refund processing
}

async function handleProductUpdate(product: any, shopDomain: string | null) {
  console.log("Processing product update:", product.id, "from", shopDomain)
  // Sync product changes and recalculate pricing
}

async function handleAppUninstall(shopDomain: string | null) {
  console.log("App uninstalled from:", shopDomain)
  // Clean up store data and disable integrations
}

function calculateRefundRisk(order: any): number {
  let risk = 0.1 // Base risk

  // High-value orders have higher risk
  if (Number.parseFloat(order.total_price) > 100) risk += 0.2

  // Multiple items increase risk
  if (order.line_items.length > 3) risk += 0.1

  // International shipping increases risk
  if (order.shipping_address?.country_code !== order.billing_address?.country_code) {
    risk += 0.15
  }

  return Math.min(risk, 1.0)
}
