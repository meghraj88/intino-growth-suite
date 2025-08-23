"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ShoppingCart,
  Search,
  RefreshCw,
  MoreHorizontal,
  Package,
  Truck,
  RotateCcw,
  ExternalLink,
  User,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

// Interface for the Order object
interface Order {
  id: string
  store_order_id: string
  customer: { name: string; email: string }
  items: Array<{ title: string; quantity: number; price: number }>
  total_amount: number
  supplier_order_status: string
  refund_status: string
  refund_risk_score: number
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from('orders').select('*')

      if (error) {
        console.error("Error fetching orders:", error)
        setError("Failed to load orders. Please try again.")
      } else {
        setOrders(data as Order[])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.store_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.supplier_order_status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  
  // Helper functions for badges (getStatusBadge, getRefundStatusBadge, getRiskBadge) remain the same
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRefundStatusBadge = (status: string) => {
    switch (status) {
      case "none":
        return null
      case "requested":
        return <Badge className="bg-orange-100 text-orange-800">Return Requested</Badge>
      // ... other refund statuses
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (score: number) => {
    if (score > 0.7) return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
    if (score > 0.4) return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
    return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
  }

  const stats = orders.length > 0 ? {
    total: orders.length,
    pending: orders.filter((o) => o.supplier_order_status === "pending").length,
    shipped: orders.filter((o) => o.supplier_order_status === "shipped").length,
    returnRequests: orders.filter((o) => o.refund_status !== "none").length,
    avgOrderValue: orders.reduce((sum, o) => sum + o.total_amount, 0) / orders.length,
  } : { total: 0, pending: 0, shipped: 0, returnRequests: 0, avgOrderValue: 0 }

  if (loading) {
    // Return a skeleton loading state
    return <div>Loading...</div>
  }

  if (error) {
    // Return an error state
    return <div className="text-red-500 text-center p-8">{error}</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Track orders and manage fulfillment</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          {/* Other stat cards */}
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            {/* Search and Filter UI */}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Refund Risk</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium text-sm">{order.store_order_id}</p>
                    {getRefundStatusBadge(order.refund_status)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.customer.name}</p>
                      <p className="text-xs text-gray-500">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{order.items[0]?.title || 'N/A'}</p>
                    {order.items.length > 1 && <p className="text-xs text-gray-500">+{order.items.length - 1} more</p>}
                  </TableCell>
                  <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>{getStatusBadge(order.supplier_order_status)}</TableCell>
                  <TableCell>{getRiskBadge(order.refund_risk_score)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Create Return</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}