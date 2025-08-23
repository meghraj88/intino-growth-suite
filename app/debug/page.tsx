
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DebugPage() {
  const [envCheck, setEnvCheck] = useState<any>({})
  const [authCheck, setAuthCheck] = useState<any>({})
  const [storeCheck, setStoreCheck] = useState<any>({})

  useEffect(() => {
    // Check environment variables (client-side visible ones)
    setEnvCheck({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    })

    checkAuth()
    checkStores()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/stores')
      const data = await response.json()
      
      setAuthCheck({
        status: response.status,
        authenticated: response.status === 200 ? '✅ Yes' : '❌ No',
        response: data
      })
    } catch (error) {
      setAuthCheck({
        status: 'Error',
        authenticated: '❌ Failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const checkStores = async () => {
    try {
      const response = await fetch('/api/stores')
      if (response.ok) {
        const data = await response.json()
        setStoreCheck({
          count: data.stores?.length || 0,
          stores: data.stores || [],
          hasValidStore: data.stores?.some((s: any) => s.access_token && s.store_domain) ? '✅ Yes' : '❌ No'
        })
      }
    } catch (error) {
      setStoreCheck({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  const testShopifyConnection = async () => {
    if (storeCheck.stores?.length > 0) {
      const store = storeCheck.stores[0]
      try {
        const testUrl = `https://${store.store_domain}/admin/api/2023-10/shop.json`
        
        // This will fail due to CORS, but we can see the attempt
        console.log('Testing Shopify connection to:', testUrl)
        console.log('Using token:', store.access_token.substring(0, 10) + '...')
        
        alert(`Testing connection to: ${store.store_domain}\nCheck console for details.`)
      } catch (error) {
        console.error('Shopify test error:', error)
      }
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🔍 Debug Information</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Supabase URL: {envCheck.supabaseUrl}</div>
          <div>Supabase Anon Key: {envCheck.supabaseKey}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Status Code: <Badge>{authCheck.status}</Badge></div>
          <div>Authenticated: {authCheck.authenticated}</div>
          {authCheck.error && <div className="text-red-500">Error: {authCheck.error}</div>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>Store Count: <Badge>{storeCheck.count}</Badge></div>
          <div>Has Valid Store: {storeCheck.hasValidStore}</div>
          
          {storeCheck.stores?.map((store: any, index: number) => (
            <div key={index} className="border p-3 rounded">
              <div><strong>Store {index + 1}:</strong></div>
              <div>ID: {store.id}</div>
              <div>Domain: {store.store_domain}</div>
              <div>Has Token: {store.access_token ? '✅ Yes' : '❌ No'}</div>
              {store.access_token && (
                <div>Token Preview: {store.access_token.substring(0, 15)}...</div>
              )}
            </div>
          ))}
          
          {storeCheck.stores?.length > 0 && (
            <Button onClick={testShopifyConnection}>
              Test Shopify Connection
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={checkAuth} variant="outline">Refresh Auth Check</Button>
          <Button onClick={checkStores} variant="outline">Refresh Store Check</Button>
        </CardContent>
      </Card>
    </div>
  )
}
