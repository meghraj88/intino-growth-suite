
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Store, 
  Plus, 
  MoreHorizontal, 
  ExternalLink, 
  Settings, 
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Eye,
  RefreshCw
} from "lucide-react"

interface StoreData {
  id: string
  name: string
  platform: 'shopify' | 'woocommerce'
  domain: string
  currency: string
  country: string
  status: 'active' | 'inactive' | 'syncing'
  products_count: number
  orders_count: number
  revenue_30d: number
  last_sync: string
  created_at: string
}

const mockStores: StoreData[] = [
  {
    id: "store-1",
    name: "My Dropship Store",
    platform: "shopify",
    domain: "my-store.myshopify.com",
    currency: "USD",
    country: "US",
    status: "active",
    products_count: 45,
    orders_count: 123,
    revenue_30d: 5420.50,
    last_sync: new Date(Date.now() - 3600000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: "store-2", 
    name: "EU Electronics Hub",
    platform: "shopify",
    domain: "eu-electronics.myshopify.com",
    currency: "EUR",
    country: "DE",
    status: "active",
    products_count: 78,
    orders_count: 89,
    revenue_30d: 3245.75,
    last_sync: new Date(Date.now() - 1800000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: "store-3",
    name: "UK Fashion Store",
    platform: "woocommerce", 
    domain: "ukfashion.com",
    currency: "GBP",
    country: "GB",
    status: "syncing",
    products_count: 23,
    orders_count: 34,
    revenue_30d: 1890.25,
    last_sync: new Date(Date.now() - 900000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 15).toISOString()
  }
]

export default function StoresPage() {
  const [stores, setStores] = useState<StoreData[]>(mockStores)
  const [loading, setLoading] = useState(false)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'syncing': 'bg-blue-100 text-blue-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getPlatformIcon = (platform: string) => {
    if (platform === 'shopify') return '🛍️'
    if (platform === 'woocommerce') return '🌐'
    return '🏪'
  }

  const totalStats = {
    total_stores: stores.length,
    active_stores: stores.filter(s => s.status === 'active').length,
    total_products: stores.reduce((sum, s) => sum + s.products_count, 0),
    total_revenue: stores.reduce((sum, s) => sum + s.revenue_30d, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
          <p className="text-gray-600">Manage multiple stores from a centralized dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All Stores
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Connect New Store
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.total_stores}</div>
            <p className="text-xs text-muted-foreground">
              {totalStats.active_stores} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.total_products}</div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Combined Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalStats.total_revenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Orders/Store</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stores.reduce((sum, s) => sum + s.orders_count, 0) / stores.length)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Stores</CardTitle>
          <CardDescription>Manage and monitor all your connected stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue (30d)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getPlatformIcon(store.platform)}</div>
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-gray-500">ID: {store.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {store.platform}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`https://${store.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {store.domain}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{store.country}</span>
                        <Badge variant="secondary" className="text-xs">
                          {store.currency}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{store.products_count}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{store.orders_count}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(store.revenue_30d, store.currency)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(store.status)}>
                        {store.status === 'syncing' && (
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                        )}
                        {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-500">
                        {new Date(store.last_sync).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Dashboard
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Store Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Store
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
