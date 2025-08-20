import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_ids, rule_type, rule_value, update_store = false } = body

    console.log("[v0] Bulk price update:", { product_ids, rule_type, rule_value, update_store })

    // Mock processing multiple products
    const results = []

    for (const productId of product_ids) {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Mock price calculation based on rule
      let newPrice = 0
      switch (rule_type) {
        case "margin_percent":
          // Set price to achieve target margin
          const supplierCost = 16.49 // mock cost + shipping
          newPrice = supplierCost / (1 - rule_value / 100)
          break
        case "markup_percent":
          // Add percentage markup to cost
          newPrice = 16.49 * (1 + rule_value / 100)
          break
        case "fixed_amount":
          // Add fixed amount to cost
          newPrice = 16.49 + rule_value
          break
        default:
          newPrice = 42.99 // fallback
      }

      results.push({
        product_id: productId,
        old_price: 42.99,
        new_price: Math.round(newPrice * 100) / 100,
        success: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${results.length} products`,
      results,
      store_updated: update_store,
    })
  } catch (error) {
    console.error("[v0] Error in bulk price update:", error)
    return NextResponse.json({ success: false, error: "Failed to update prices" }, { status: 500 })
  }
}
