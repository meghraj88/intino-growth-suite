
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Bell, 
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload
} from "lucide-react"

interface InventoryItem {
  id: string
  title: string
  sku: string
  current_stock: number
  reserved_stock: number
  available_stock: number
  reorder_point: number
  supplier_stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'critical'
  last_updated: string
  supplier_name: string
}

const mockInventory: InventoryItem[] = [
  {
    id: "inv-1",
    title: "Wireless Bluetooth Earbuds",
    sku: "AE-12345",
    current_stock: 25,
    reserved_stock: 5,
    available_stock: 20,
    reorder_point: 10,
    supplier_stock: 150,
    status: 'in_stock',
    last_updated: new Date().toISOString(),
    supplier_name: "AliExpress Supplier A"
  },
  {
    id: "inv-2", 
    title: "Smart Phone Stand",
    sku: "AE-67890",
    current_stock: 8,
    reserved_stock: 2,
    available_stock: 6,
    reorder_point: 15,
    supplier_stock: 45,
    status: 'low_stock',
    last_updated: new Date(Date.now() - 3600000).toISOString(),
    supplier_name: "AliExpress Supplier A"
  },
  {
    id: "inv-3",
    title: "LED Strip Lights RGB",
    sku: "AE-11111",
    current_stock: 0,
    reserved_stock: 0,
    available_stock: 0,
    reorder_point: 20,
    supplier_stock: 0,
    status: 'out_of_stock',
    last_updated: new Date(Date.now() - 86400000).toISOString(),
    supplier_name: "AliExpress Supplier B"
  },
  {
    id: "inv-4",
    title: "Portable Blender USB",
    sku: "AE-22222",
    current_stock: 3,
    reserved_stock: 1,
    available_stock: 2,
    reorder_point: 12,
    supplier_stock: 8,
    status: 'critical',
    last_updated: new Date(Date.now() - 1800000).toISOString(),
    supplier_name: "Manual Supplier"
  }
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      'in_stock': 'bg-green-100 text-green-800',
      'low_stock': 'bg-yellow-100 text-yellow-800', 
      'out_of_stock': 'bg-red-100 text-red-800',
      'critical': 'bg-orange-100 text-orange-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts = {
      'in_stock': 'In Stock',
      'low_stock': 'Low Stock',
      'out_of_stock': 'Out of Stock', 
      'critical': 'Critical'
    }
    return texts[status as keyof typeof texts] || status
  }

  const syncInventory = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const stats = {
    total: inventory.length,
    in_stock: inventory.filter(i => i.status === 'in_stock').length,
    low_stock: inventory.filter(i => i.status === 'low_stock').length,
    out_of_stock: inventory.filter(i => i.status === 'out_of_stock').length,
    critical: inventory.filter(i => i.status === 'critical').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Monitor stock levels and manage inventory alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={syncInventory} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Syncing..." : "Sync Stock"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Tracked items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.in_stock}</div>
            <p className="text-xs text-muted-foreground">Available items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.low_stock}</div>
            <p className="text-xs text-muted-foreground">Need reorder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">Urgent action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Bell className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.out_of_stock}</div>
            <p className="text-xs text-muted-foreground">No stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stock Levels</CardTitle>
              <CardDescription>Monitor and manage your inventory status</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Supplier Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.supplier_name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.current_stock}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-green-600 font-medium">{item.available_stock}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-orange-600">{item.reserved_stock}</div>
                    </TableCell>
                    <TableCell>
                      <div>{item.reorder_point}</div>
                    </TableCell>
                    <TableCell>
                      <div className={item.supplier_stock > 0 ? "text-green-600" : "text-red-600"}>
                        {item.supplier_stock}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-500">
                        {new Date(item.last_updated).toLocaleString()}
                      </span>
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
