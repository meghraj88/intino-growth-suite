import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "US"
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Mock trend data - in production, this would query the database
    const mockTrends = [
      {
        id: "1",
        sku: "wireless-earbuds-pro",
        source: "aliexpress",
        country,
        score: 0.92,
        data: {
          title: "Wireless Bluetooth Earbuds Pro",
          price_range: "$15-25",
          orders_24h: 1250,
          growth_rate: 0.45,
          competition_level: "medium",
          search_volume: 12500,
          image_url: "/wireless-earbuds.png",
        },
        detected_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        sku: "smart-fitness-tracker",
        source: "amazon",
        country,
        score: 0.87,
        data: {
          title: "Smart Fitness Tracker Watch",
          price_range: "$25-40",
          orders_24h: 890,
          growth_rate: 0.38,
          competition_level: "high",
          search_volume: 8900,
          image_url: "/fitness-tracker-watch.png",
        },
        detected_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        sku: "led-strip-lights",
        source: "etsy",
        country,
        score: 0.75,
        data: {
          title: "RGB LED Strip Lights",
          price_range: "$10-20",
          orders_24h: 650,
          growth_rate: 0.25,
          competition_level: "low",
          search_volume: 5600,
          image_url: "/led-strip-lights.png",
        },
        detected_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ]

    return NextResponse.json({
      trends: mockTrends.slice(0, limit),
      total: mockTrends.length,
      country,
    })
  } catch (error) {
    console.error("Get trends error:", error)
    return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 })
  }
}
