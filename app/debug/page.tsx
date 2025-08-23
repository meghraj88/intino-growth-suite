
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
  const [stores, setStores] = useState([])
  const [debugData, setDebugData] = useState(null)
  const [showTokens, setShowTokens] = useState(false)

  useEffect(() => {
    fetchDebugInfo()
  }, [])

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

      // Test environment variables
      const envCheck = {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        shopifyKey: !!process.env.SHOPIFY_API_KEY,
        shopifySecret: !!process.env.SHOPIFY_API_SECRET
      }

      setDebugData({ stores: storesData, envCheck })
    } catch (error) {
      console.error('Debug fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const testShopifyAPI = async (store) => {
    try {
      console.log('=== SHOPIFY API TEST START ===')
      console.log('Testing store:', store.store_domain)
      
      const testUrl = `https://${store.store_domain}/admin/api/2023-10/shop.json`
      console.log('Test URL:', testUrl)
      
      const response = await fetch(testUrl, {
        headers: {
          "X-Shopify-Access-Token": store.access_token,
          "Content-Type": "application/json",
        },
      })
      
      console.log('API Response Status:', response.status)
      console.log('API Response Headers:', Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        const shopData = await response.json()
        console.log('Shop Info:', shopData)
        
        toast({
          title: "✅ Shopify API Test Successful",
          description: `Connected to store: ${shopData.shop?.name || store.store_domain}`,
        })
        
        // Test products endpoint
        const productsUrl = `https://${store.store_domain}/admin/api/2023-10/products.json?limit=5`
        const productsResponse = await fetch(productsUrl, {
          headers: {
            "X-Shopify-Access-Token": store.access_token,
            "Content-Type": "application/json",
          },
        })
        
        if (productsResponse.ok) {
          const productsData = await productsResponse.json()
          console.log('Products found:', productsData.products?.length || 0)
          
          if (productsData.products?.length > 0) {
            console.log('Sample products:', productsData.products.slice(0, 2))
            toast({
              title: "📦 Products Found",
              description: `Found ${productsData.products.length} products in your store`,
            })
          } else {
            toast({
              title: "⚠️ No Products Found",
              description: "Your Shopify store has no products. Add some products first.",
              variant: "destructive"
            })
          }
        } else {
          const errorText = await productsResponse.text()
          console.error('Products API Error:', errorText)
          toast({
            title: "❌ Products API Failed",
            description: "Cannot access products. Check permissions.",
            variant: "destructive"
          })
        }
      } else {
        const errorText = await response.text()
        console.error('Shop API Error:', response.status, errorText)
        
        let errorMessage = "API access failed"
        if (response.status === 401) {
          errorMessage = "Invalid access token"
        } else if (response.status === 403) {
          errorMessage = "Insufficient permissions"
        } else if (response.status === 404) {
          errorMessage = "Store not found"
        }
        
        toast({
          title: "❌ Shopify API Test Failed",
          description: `${errorMessage} (Status: ${response.status})`,
          variant: "destructive"
        })
      }
      
      console.log('=== SHOPIFY API TEST END ===')
    } catch (error) {
      console.error('API Test Error:', error)
      toast({
        title: "🚨 Network Error",
        description: "Failed to connect to Shopify API",
        variant: "destructive"
      })
    }
  }

  const testProductSync = async (storeId) => {
    try {
      console.log('=== PRODUCT SYNC TEST START ===')
      
      const response = await fetch('/api/products/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId }),
      })
      
      const data = await response.json()
      console.log('Sync Test Result:', data)
      
      if (response.ok) {
        toast({
          title: "✅ Sync Test Complete",
          description: `Synced ${data.syncedCount || 0} products`,
        })
      } else {
        toast({
          title: "❌ Sync Test Failed",
          description: data.error || "Sync failed",
          variant: "destructive"
        })
      }
      
      console.log('=== PRODUCT SYNC TEST END ===')
    } catch (error) {
      console.error('Sync Test Error:', error)
      toast({
        title: "🚨 Sync Test Error",
        description: "Failed to test product sync",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">🔍 Debug Dashboard</h1>
          <p className="text-gray-600">System diagnostics और troubleshooting</p>
        </div>
        <Button onClick={fetchDebugInfo} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Debug Info
        </Button>
      </div>

      {/* Environment Status */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Environment Variables</CardTitle>
          <CardDescription>Required configurations की status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <XCircle className="w-5 h-5 text-red-500" />
              }
              <span>Supabase URL</span>
            </div>
            <div className="flex items-center space-x-2">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <XCircle className="w-5 h-5 text-red-500" />
              }
              <span>Supabase Key</span>
            </div>
            <div className="flex items-center space-x-2">
              {process.env.SHOPIFY_API_KEY ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <XCircle className="w-5 h-5 text-red-500" />
              }
              <span>Shopify API Key</span>
            </div>
            <div className="flex items-center space-x-2">
              {process.env.SHOPIFY_API_SECRET ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <XCircle className="w-5 h-5 text-red-500" />
              }
              <span>Shopify Secret</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stores Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>🏪 Connected Stores</CardTitle>
              <CardDescription>आपके connected stores की details</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowTokens(!showTokens)}
            >
              {showTokens ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showTokens ? 'Hide' : 'Show'} Tokens
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {stores.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600">कोई stores connected नहीं हैं</p>
              <p className="text-sm text-gray-500">Settings में जाकर store connect करें</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stores.map((store, index) => (
                <div key={store.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{store.store_domain}</h3>
                      <p className="text-sm text-gray-600">ID: {store.id}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Connected
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Domain: </span>
                      <span>{store.store_domain}</span>
                    </div>
                    <div>
                      <span className="font-medium">Access Token: </span>
                      {showTokens ? (
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {store.access_token}
                        </code>
                      ) : (
                        <span className="text-gray-500">
                          {store.access_token ? store.access_token.substring(0, 10) + '...' : 'Not available'}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Created: </span>
                      <span>{new Date(store.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testShopifyAPI(store)}
                    >
                      Test API Connection
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testProductSync(store.id)}
                    >
                      Test Product Sync
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Quick Actions</CardTitle>
          <CardDescription>Common debugging और testing actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                console.clear()
                console.log('=== CONSOLE CLEARED ===')
                toast({
                  title: "🧹 Console Cleared",
                  description: "Browser console has been cleared"
                })
              }}
            >
              Clear Console
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                const debugInfo = {
                  timestamp: new Date().toISOString(),
                  stores: stores,
                  userAgent: navigator.userAgent,
                  url: window.location.href
                }
                console.log('=== DEBUG INFO ===', debugInfo)
                toast({
                  title: "📋 Debug Info Logged",
                  description: "Check browser console for details"
                })
              }}
            >
              Log Debug Info
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
                toast({
                  title: "🗑️ Storage Cleared",
                  description: "Local and session storage cleared"
                })
              }}
            >
              Clear Storage
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Hard Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Troubleshooting Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-600">✅ अगर Sync Products काम कर रहा है लेकिन 0 products sync हो रहे:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>आपके Shopify store में products add करें</li>
                <li>"Test API Connection" button दबाकर check करें</li>
                <li>Access token की permissions check करें</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-red-600">❌ अगर API connection fail हो रहा:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Store domain सही है या नहीं check करें</li>
                <li>Access token valid है या नहीं verify करें</li>
                <li>Shopify app permissions check करें</li>
                <li>Store को reconnect करने की कोशिश करें</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-600">🔧 Environment issues के लिए:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>.env.local file में सभी required values add करें</li>
                <li>Server restart करें</li>
                <li>Console में कोई errors check करें</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
