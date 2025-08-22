
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Search, Filter, Plus, Download, Upload, Trash2, Edit, Eye } from "lucide-react"
import Link from "next/link"

export default function DashboardProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search products..."
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Sample Product Cards */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-2">Wireless Earbuds Pro</h3>
            <p className="text-gray-600 text-sm mb-3">High-quality wireless earbuds with noise cancellation</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">$45.99</span>
              <Badge className="bg-green-100 text-green-800">In Stock</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>SKU: WEB-001</span>
              <span>Stock: 125</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-2">Smart Watch Band</h3>
            <p className="text-gray-600 text-sm mb-3">Comfortable silicone band for smart watches</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">$19.99</span>
              <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>SKU: SWB-002</span>
              <span>Stock: 5</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-2">LED Strip Lights</h3>
            <p className="text-gray-600 text-sm mb-3">RGB LED strip lights for home decoration</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">$29.99</span>
              <Badge className="bg-green-100 text-green-800">In Stock</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>SKU: LED-003</span>
              <span>Stock: 78</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-2">Phone Stand</h3>
            <p className="text-gray-600 text-sm mb-3">Adjustable phone stand for desk use</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">$12.99</span>
              <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>SKU: PS-004</span>
              <span>Stock: 0</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
