"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Search, Filter, Plus, Download, Upload, Edit, Eye, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client" // Using client-side Supabase

// Define a type for our product data for better code quality
interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string; // Assuming you have an image_url column
  suggested_price: number;
  stock: number;
  sku: string;
}

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      // Use the client-side Supabase instance for components with "use client"
      const supabase = createClient()
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again later.")
      } else {
        setProducts(data as Product[])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

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
      {loading ? (
        <div className="flex justify-center items-center p-16">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          <p className="ml-4 text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center p-16 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center p-16 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-600 font-medium">No products found.</p>
          <p className="text-gray-500 mt-2">Sync your store to see your products here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.title} className="w-full h-full object-cover rounded-t-lg" />
                ) : (
                  <Package className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2 truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">${product.suggested_price || 'N/A'}</span>
                  <Badge className={
                    (product.stock || 0) > 10 ? "bg-green-100 text-green-800" :
                    (product.stock || 0) > 0 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {(product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>SKU: {product.sku || 'N/A'}</span>
                  <span>Stock: {product.stock || 0}</span>
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
          ))}
        </div>
      )}
    </div>
  )
}