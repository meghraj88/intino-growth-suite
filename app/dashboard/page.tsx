
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, AlertTriangle, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [stores, setStores] = useState([])

  // Fetch stores data on component mount
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/stores')
        if (response.ok) {
          const data = await response.json()
          setStores(data.stores || [])
        }
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }
    
    fetchStores()
  }, [])

  const handleSyncProducts = async () => {
    setLoading(true)
    
    try {
      // Find the storeId of the first store from the stores state
      const storeId = stores.length > 0 ? stores[0].id : null
      
      if (!storeId) {
        toast({
          title: "No Store Found",
          description: "Please connect a store first before syncing products.",
          variant: "destructive",
        })
        return
      }

      // Make POST request to /api/products/sync with storeId in JSON body
      const response = await fetch('/api/products/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show success alert
        toast({
          title: "Sync Successful",
          description: data.message || `Successfully synced ${data.syncedCount} products.`,
        })
      } else {
        // Show error alert
        toast({
          title: "Sync Failed",
          description: data.error || "An error occurred during syncing.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error syncing products:', error)
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing products.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your stores.</p>
          <div className="flex items-center space-x-6 mt-2">
            <div className="text-sm">
              <span className="text-gray-500">Last sync:</span>
              <span className="text-green-600 ml-1">2 minutes ago</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Active alerts:</span>
              <span className="text-orange-600 ml-1">3</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleSyncProducts} disabled={loading}>
            <Package className="w-4 h-4 mr-2" />
            {loading ? 'Syncing...' : 'Sync Products'}
          </Button>
          <Link href="/dashboard/onboarding">
            <Button>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Quick Setup
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card shadow-premium card-hover" style={{ animationDelay: '0ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg floating">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$142,580</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-premium card-hover" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg floating">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Products Synced</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">847</p>
                <div className="flex items-center mt-1">
                  <Package className="w-3 h-3 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-600">+23 today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-premium card-hover" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg floating">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders This Month</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">256</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+8.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-premium card-hover" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg floating">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Profit Margin</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">32.4%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Price Recommendations</CardTitle>
            <CardDescription>AI-suggested price changes to optimize your margins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-md" />
                <div>
                  <p className="font-medium text-sm">Wireless Earbuds Pro</p>
                  <p className="text-xs text-gray-600">Current: $45.99</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">+$3.00</Badge>
                <p className="text-xs text-gray-600 mt-1">+6.5% margin</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-md" />
                <div>
                  <p className="font-medium text-sm">Smart Watch Band</p>
                  <p className="text-xs text-gray-600">Current: $19.99</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">+$2.50</Badge>
                <p className="text-xs text-gray-600 mt-1">+12.5% margin</p>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View All Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your connected stores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-2024-001</p>
                <p className="text-xs text-gray-600">2 items • $89.98</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-2024-002</p>
                <p className="text-xs text-gray-600">1 item • $45.99</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Shipped</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">#ORD-2024-003</p>
                <p className="text-xs text-gray-600">3 items • $127.97</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Delivered</Badge>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Trending Products */}
      <Card>
        <CardHeader>
          <CardTitle>Trending in Your Region</CardTitle>
          <CardDescription>Products gaining popularity in your target markets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-md" />
              <div className="flex-1">
                <p className="font-medium text-sm">Portable Phone Stand</p>
                <p className="text-xs text-gray-600">Electronics • US</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Score: 8.5</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-md" />
              <div className="flex-1">
                <p className="font-medium text-sm">LED Strip Lights</p>
                <p className="text-xs text-gray-600">Home & Garden • US</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Score: 7.8</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-md" />
              <div className="flex-1">
                <p className="font-medium text-sm">Car Phone Mount</p>
                <p className="text-xs text-gray-600">Automotive • US</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Score: 7.2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full bg-transparent" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Explore All Trends
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
