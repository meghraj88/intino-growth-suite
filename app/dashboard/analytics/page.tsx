
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Target, Calendar, Download } from "lucide-react"

// Mock data
const profitMarginData = [
  { month: "Jan", electronics: 25, clothing: 35, home: 20, sports: 30 },
  { month: "Feb", electronics: 28, clothing: 32, home: 22, sports: 28 },
  { month: "Mar", electronics: 30, clothing: 38, home: 25, sports: 35 },
  { month: "Apr", electronics: 27, clothing: 36, home: 23, sports: 32 },
  { month: "May", electronics: 32, clothing: 40, home: 28, sports: 38 },
  { month: "Jun", electronics: 35, clothing: 42, home: 30, sports: 40 }
]

const revenueData = [
  { month: "Jan", revenue: 12500, profit: 3125, orders: 145 },
  { month: "Feb", revenue: 15200, profit: 4104, orders: 178 },
  { month: "Mar", revenue: 18700, profit: 5049, orders: 203 },
  { month: "Apr", revenue: 16800, profit: 4536, orders: 189 },
  { month: "May", revenue: 22100, profit: 6188, orders: 245 },
  { month: "Jun", revenue: 25400, profit: 7366, orders: 278 }
]

const topProducts = [
  { name: "Wireless Earbuds Pro", orders: 87, revenue: 3999, margin: 32 },
  { name: "Smart Fitness Tracker", orders: 64, revenue: 2560, margin: 28 },
  { name: "LED Strip Lights", orders: 52, revenue: 1560, margin: 35 },
  { name: "Portable Phone Stand", orders: 45, revenue: 675, margin: 40 },
  { name: "Car Phone Mount", orders: 38, revenue: 912, margin: 25 }
]

const categoryDistribution = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Home & Garden", value: 25, color: "#10b981" },
  { name: "Sports & Fitness", value: 20, color: "#f59e0b" },
  { name: "Automotive", value: 10, color: "#ef4444" }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">Deep insights into your dropshipping performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$110,700</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +15.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.8%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +2.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,338</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +8.7% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12 new this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="margins">Profit Margins</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="categories">Category Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit Trends</CardTitle>
              <CardDescription>Monthly revenue and profit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: "#3b82f6" },
                  profit: { label: "Profit", color: "#10b981" }
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margins" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit Margins by Category</CardTitle>
              <CardDescription>Compare profit margins across different product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  electronics: { label: "Electronics", color: "#3b82f6" },
                  clothing: { label: "Clothing", color: "#10b981" },
                  home: { label: "Home & Garden", color: "#f59e0b" },
                  sports: { label: "Sports & Fitness", color: "#ef4444" }
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitMarginData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="electronics" fill="#3b82f6" />
                    <Bar dataKey="clothing" fill="#10b981" />
                    <Bar dataKey="home" fill="#f59e0b" />
                    <Bar dataKey="sports" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best products by orders, revenue, and margin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${product.revenue}</p>
                      <Badge variant={product.margin > 30 ? "default" : "secondary"}>
                        {product.margin}% margin
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue breakdown by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Revenue", color: "#3b82f6" }
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Detailed metrics by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryDistribution.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{category.value}%</div>
                        <div className="text-sm text-gray-600">of total revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
