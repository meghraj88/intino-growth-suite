
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  Clock, 
  Star, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from "lucide-react"

// Mock supplier data
const suppliers = [
  {
    id: 1,
    name: "AliExpress - TechGear Store",
    products: 45,
    avgDeliveryTime: 12,
    qualityScore: 4.7,
    costScore: 4.2,
    overallRating: 4.5,
    orders: 234,
    disputes: 3,
    onTimeDelivery: 92,
    priceChanges: -2,
    url: "https://aliexpress.com/store/techgear"
  },
  {
    id: 2,
    name: "Alibaba - GlobalTech Co.",
    products: 32,
    avgDeliveryTime: 8,
    qualityScore: 4.9,
    costScore: 3.8,
    overallRating: 4.6,
    orders: 187,
    disputes: 1,
    onTimeDelivery: 96,
    priceChanges: 1,
    url: "https://alibaba.com/supplier/globaltech"
  },
  {
    id: 3,
    name: "DHgate - SmartElectronics",
    products: 28,
    avgDeliveryTime: 15,
    qualityScore: 4.3,
    costScore: 4.6,
    overallRating: 4.2,
    orders: 156,
    disputes: 7,
    onTimeDelivery: 87,
    priceChanges: -5,
    url: "https://dhgate.com/store/smartelectronics"
  }
]

const deliveryTimeData = [
  { month: "Jan", aliexpress: 14, alibaba: 9, dhgate: 16 },
  { month: "Feb", aliexpress: 13, alibaba: 8, dhgate: 15 },
  { month: "Mar", aliexpress: 12, alibaba: 7, dhgate: 14 },
  { month: "Apr", aliexpress: 11, alibaba: 8, dhgate: 15 },
  { month: "May", aliexpress: 12, alibaba: 8, dhgate: 15 },
  { month: "Jun", aliexpress: 12, alibaba: 8, dhgate: 15 }
]

export default function SuppliersPage() {
  const [sortBy, setSortBy] = useState("rating")

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.overallRating - a.overallRating
      case "delivery":
        return a.avgDeliveryTime - b.avgDeliveryTime
      case "cost":
        return b.costScore - a.costScore
      case "quality":
        return b.qualityScore - a.qualityScore
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier Performance</h1>
          <p className="text-gray-600">Track and compare your supplier metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Overall Rating</SelectItem>
              <SelectItem value="delivery">Delivery Time</SelectItem>
              <SelectItem value="cost">Cost Score</SelectItem>
              <SelectItem value="quality">Quality Score</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add New Supplier</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {suppliers.reduce((acc, s) => acc + s.products, 0)} products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(suppliers.reduce((acc, s) => acc + s.avgDeliveryTime, 0) / suppliers.length)} days
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
              2 days faster than last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(suppliers.reduce((acc, s) => acc + s.qualityScore, 0) / suppliers.length).toFixed(1)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +0.3 improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(suppliers.reduce((acc, s) => acc + s.onTimeDelivery, 0) / suppliers.length)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +4% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers List */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Comparison</CardTitle>
          <CardDescription>Detailed performance metrics for all suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedSuppliers.map((supplier) => (
              <div key={supplier.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">
                        {supplier.products} products • {supplier.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={supplier.overallRating >= 4.5 ? "default" : supplier.overallRating >= 4.0 ? "secondary" : "destructive"}
                    >
                      {supplier.overallRating} ⭐
                    </Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Store
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Delivery Time</span>
                      <span className="text-sm">{supplier.avgDeliveryTime} days</span>
                    </div>
                    <Progress value={(20 - supplier.avgDeliveryTime) * 5} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className="text-sm">{supplier.qualityScore}/5.0</span>
                    </div>
                    <Progress value={supplier.qualityScore * 20} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cost Score</span>
                      <span className="text-sm">{supplier.costScore}/5.0</span>
                    </div>
                    <Progress value={supplier.costScore * 20} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">On-Time Rate</span>
                      <span className="text-sm">{supplier.onTimeDelivery}%</span>
                    </div>
                    <Progress value={supplier.onTimeDelivery} className="h-2" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Disputes: {supplier.disputes}</span>
                    <span className={supplier.priceChanges >= 0 ? "text-red-600" : "text-green-600"}>
                      Price Changes: {supplier.priceChanges > 0 ? "+" : ""}{supplier.priceChanges}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Contact</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Time Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Time Trends</CardTitle>
          <CardDescription>Average delivery times by supplier over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              aliexpress: { label: "AliExpress", color: "#3b82f6" },
              alibaba: { label: "Alibaba", color: "#10b981" },
              dhgate: { label: "DHgate", color: "#f59e0b" }
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="aliexpress" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="alibaba" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="dhgate" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
