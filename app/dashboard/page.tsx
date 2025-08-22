
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  ArrowUpRight,
  RefreshCw,
  Zap,
  Clock,
  CheckCircle2,
  Truck,
  Eye
} from "lucide-react"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back, Alex
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Here's what's happening with your dropshipping business today. 
                Your stores are performing well with strong growth metrics.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Last sync:</span>
                  <span className="text-sm font-semibold text-green-600">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">Active alerts:</span>
                  <span className="text-sm font-semibold text-amber-600">3 pending</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="lg" className="btn-secondary group">
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Sync Products
              </Button>
              <Link href="/dashboard/onboarding">
                <Button size="lg" className="btn-primary group w-full sm:w-auto">
                  <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Quick Setup
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          <Card className="metric-card group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="metric-icon from-blue-500 to-blue-600">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Revenue
                    </p>
                    <p className="metric-value from-blue-600 to-purple-600 mt-1">
                      $142,580
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 status-success">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="metric-icon from-emerald-500 to-green-600">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Products Synced
                    </p>
                    <p className="metric-value from-emerald-600 to-green-600 mt-1">
                      847
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 status-info">
                  <Package className="w-3 h-3" />
                  <span>+23 today</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">across all stores</p>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="metric-icon from-amber-500 to-orange-500">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Orders This Month
                    </p>
                    <p className="metric-value from-amber-600 to-orange-600 mt-1">
                      256
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 status-success">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8.3%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="metric-icon from-purple-500 to-pink-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Avg. Profit Margin
                    </p>
                    <p className="metric-value from-purple-600 to-pink-600 mt-1">
                      32.4%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 status-success">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2.1%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">industry leading</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Price Recommendations */}
          <Card className="premium-card xl:col-span-2 slide-up">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Zap className="w-5 h-5 text-primary mr-2" />
                    AI Price Recommendations
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Smart price optimizations to maximize your profit margins
                  </CardDescription>
                </div>
                <Badge className="status-success">
                  4 suggestions
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Wireless Earbuds Pro",
                  current: "$45.99",
                  suggested: "+$3.00",
                  margin: "+6.5% margin",
                  image: "/wireless-earbuds.png"
                },
                {
                  name: "Smart Watch Band",
                  current: "$19.99", 
                  suggested: "+$2.50",
                  margin: "+12.5% margin",
                  image: "/fitness-tracker-watch.png"
                }
              ].map((item, index) => (
                <div key={index} className="group p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                        <Package className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Current: {item.current}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className="status-success font-semibold">
                        {item.suggested}
                      </Badge>
                      <p className="text-xs text-gray-600">{item.margin}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full btn-secondary group mt-6">
                <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View All Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="premium-card slide-up">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="w-5 h-5 text-primary mr-2" />
                Recent Orders
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Latest orders from your connected stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "#ORD-2024-001", items: "2 items", amount: "$89.98", status: "Processing", icon: Clock },
                { id: "#ORD-2024-002", items: "1 item", amount: "$45.99", status: "Shipped", icon: Truck },
                { id: "#ORD-2024-003", items: "3 items", amount: "$127.97", status: "Delivered", icon: CheckCircle2 }
              ].map((order, index) => {
                const StatusIcon = order.icon
                const statusColors = {
                  Processing: "status-warning",
                  Shipped: "status-info", 
                  Delivered: "status-success"
                }
                
                return (
                  <div key={index} className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.items} • {order.amount}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="w-4 h-4 text-gray-500" />
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
              <Button className="w-full btn-secondary group mt-6">
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trending Products */}
        <Card className="premium-card slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 text-primary mr-2" />
                  Trending in Your Region
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Products gaining popularity in your target markets
                </CardDescription>
              </div>
              <Badge className="status-info">US Market</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Portable Phone Stand", category: "Electronics", region: "US", score: "8.5", trend: "up" },
                { name: "LED Strip Lights", category: "Home & Garden", region: "US", score: "7.8", trend: "up" },
                { name: "Car Phone Mount", category: "Automotive", region: "US", score: "7.2", trend: "up" }
              ].map((product, index) => (
                <div key={index} className="group p-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Package className="w-7 h-7 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {product.category} • {product.region}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">
                            Score: {product.score}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button className="w-full btn-secondary group">
                <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Explore All Market Trends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
