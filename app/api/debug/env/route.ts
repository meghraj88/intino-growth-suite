
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Server-side environment variables check
    const envVars = {
      SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY ? 'Set ✅' : 'Not set ❌',
      SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET ? 'Set ✅' : 'Not set ❌',
      SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET ? 'Set ✅' : 'Not set ❌',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set ✅' : 'Not set ❌',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set ✅' : 'Not set ❌',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set ✅' : 'Not set ❌',
    }

    // Log values (only in development)
    console.log('=== SERVER-SIDE ENVIRONMENT VARIABLES ===')
    console.log('SHOPIFY_API_KEY:', process.env.SHOPIFY_API_KEY || 'NOT SET')
    console.log('SHOPIFY_API_SECRET:', process.env.SHOPIFY_API_SECRET ? 'SET' : 'NOT SET')
    console.log('SHOPIFY_WEBHOOK_SECRET:', process.env.SHOPIFY_WEBHOOK_SECRET ? 'SET' : 'NOT SET')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET')
    console.log('============================================')

    return NextResponse.json({
      success: true,
      environment: envVars,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Environment check error:', error)
    return NextResponse.json({ error: 'Failed to check environment variables' }, { status: 500 })
  }
}
