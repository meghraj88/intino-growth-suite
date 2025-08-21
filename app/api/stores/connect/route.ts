
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, domain, token, currency, country } = body

    console.log("[v0] Connecting store:", { provider, domain, currency, country })

    // Get authenticated user
    const supabase = createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 })
    }

    // TODO: Validate the store connection
    // TODO: Test API access with the provided token

    // Insert store into Supabase
    const { data: newStore, error: storeError } = await supabase
      .from('stores')
      .insert({
        owner: user.id,
        provider,
        store_name: domain.split(".")[0],
        store_domain: domain,
        access_token: token,
        currency,
        country,
      })
      .select()
      .single()

    if (storeError) {
      console.error("[v0] Error saving store to database:", storeError)
      return NextResponse.json({ success: false, error: "Failed to save store to database" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Store connected successfully",
      store: newStore,
    })
  } catch (error) {
    console.error("[v0] Error connecting store:", error)
    return NextResponse.json({ success: false, error: "Failed to connect store" }, { status: 500 })
  }
}
