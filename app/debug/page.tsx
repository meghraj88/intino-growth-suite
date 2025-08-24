"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function DebugPage() {
  const [loading, setLoading] = useState(false)
  const [stores, setStores] = useState<any[]>([])
  const [debugData, setDebugData] = useState<any>(null)
  const [showTokens, setShowTokens] = useState(false)
  const [envStatus, setEnvStatus] = useState({
    supabaseUrl: false,
    supabaseKey: false,
    shopifyKey: false,
    shopifySecret: false
  })

  // 🔹 FIX: Moved fetchDebugInfo out of useEffect
  const fetchDebugInfo = async () => {
    setLoading(true)
    try {
      // Log environment variables for debugging
      console.log('=== ENVIRONMENT VARIABLES DEBUG ===')
      console.log('SHOPIFY_API_KEY:', process.env.SHOPIFY_API_KEY)
      console.log('SHOPIFY_API_SECRET:', process.env.SHOPIFY_API_SECRET ? 'Set' : 'Not set')
      console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('===================================')

      // Fetch stores
      const storesResponse = await fetch('/api/stores')
      const storesData = await storesResponse.json()
      setStores(storesData.stores || [])

      setDebugData({ stores: storesData })
    } catch (error) {
      console.error('Debug fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check client-side accessible environment variables
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      shopifyKey: false, // Server-side only
      shopifySecret: false // Server-side only
    })

    // Initial load
    fetchDebugInfo()
  }, [])

  // ... ✅ rest of tumhara code same rahega (testShopifyAPI, testProductSync, checkServerEnvVars etc.)
}

