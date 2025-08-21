"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
  Package,
  Search,
  RefreshCw,
  TrendingUp,
  MoreHorizontal,
  Edit,
  ExternalLink,
  DollarSign,
  Clock,
  Calculator,
  Brain,
} from "lucide-react"
import Image from "next/image"
import { PriceSuggestionModal } from "@/components/price-suggestion-modal"
import { BulkPriceUpdateModal } from "@/components/bulk-price-update-modal"

interface Product {
  id: string
  title: string
  image_url: string
  cost: number
  shipping_cost: number
  suggested_price: number
  current_price: number
  margin_percent: number
  last_synced: string
  supplier_sku: string
  metadata: { category: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  // Modal states
  const [priceSuggestionModal, setPriceSuggestionModal] = useState({
    isOpen: false,
    productId: "",
    productTitle: "",
    currentPrice: 0,
  })
  const [bulkUpdateModal, setBulkUpdateModal] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?storeId=store-1")
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      } else {
        throw new Error(data.error || 'Failed to fetch products')
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      // Show user-friendly error message
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const syncProducts = async () => {
    setSyncing(true)
    try {
      const response = await fetch("/api/sync/products/store-1", {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        await fetchProducts()
      }
    } catch (error) {
      console.error("[v0] Error syncing products:", error)
    } finally {
      setSyncing(false)
    }
  }

  const openPriceSuggestion = (product: Product) => {
    setPriceSuggestionModal({
      isOpen: true,
      productId: product.id,
      productTitle: product.title,
      currentPrice: product.current_price,
    })
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier_sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-3">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog and pricing</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedProducts.length > 0 && (
            <Button variant="outline" onClick={() => setBulkUpdateModal(true)}>
              <Calculator className="w-4 h-4 mr-2" />
              Bulk Update ({selectedProducts.length})
            </Button>
          )}
          <Button variant="outline" onClick={syncProducts} disabled={syncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "Sync Products"}
          </Button>
          <Button>
            <Package className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.length > 0
                ? (products.reduce((sum, p) => sum + p.margin_percent, 0) / products.length).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Updates</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => p.suggested_price !== p.current_price).length}
            </div>
            <p className="text-xs text-muted-foreground">Pending recommendations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <p className="text-xs text-muted-foreground">All stores synced</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>View and manage your synced products</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[200px]">Product</TableHead>
                  <TableHead className="min-w-[100px]">SKU</TableHead>
                  <TableHead className="min-w-[100px]">Cost</TableHead>
                  <TableHead className="min-w-[120px]">Current Price</TableHead>
                  <TableHead className="min-w-[120px]">Suggested</TableHead>
                  <TableHead className="min-w-[100px]">Margin</TableHead>
                  <TableHead className="min-w-[120px]">Last Sync</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openPriceSuggestion(product)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="rounded-md object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{product.title}</p>
                          <p className="text-xs text-gray-500 truncate">{product.metadata.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{product.supplier_sku}</code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatCurrency(product.cost)}</div>
                        <div className="text-xs text-gray-500">+{formatCurrency(product.shipping_cost)} ship</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(product.current_price)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{formatCurrency(product.suggested_price)}</span>
                        {product.suggested_price !== product.current_price && (
                          <Badge variant="secondary" className="text-xs">
                            {product.suggested_price > product.current_price ? "↑" : "↓"}
                            {formatCurrency(Math.abs(product.suggested_price - product.current_price))}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          product.margin_percent > 50
                            ? "bg-green-100 text-green-800"
                            : product.margin_percent > 30
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.margin_percent.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-500">{formatDate(product.last_synced)}</span>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openPriceSuggestion(product)}>
                            <Brain className="mr-2 h-4 w-4" />
                            AI Price Suggestion
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Apply Suggested Price
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View in Store
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "No products match your search" : "You haven't synced any products yet"}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search terms or clearing filters to see more results."
                  : "Connect your store and sync products to start managing your catalog with AI-powered pricing suggestions."}
              </p>
              {!searchTerm && (
                <div className="space-y-3">
                  <Button onClick={syncProducts} disabled={syncing} size="lg">
                    <RefreshCw className={`w-5 h-5 mr-2 ${syncing ? "animate-spin" : ""}`} />
                    {syncing ? "Syncing Products..." : "Sync Products Now"}
                  </Button>
                  <p className="text-sm text-gray-400">
                    Or{" "}
                    <Button variant="link" className="p-0 h-auto">
                      connect a new store
                    </Button>{" "}
                    to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <PriceSuggestionModal
        isOpen={priceSuggestionModal.isOpen}
        onClose={() => setPriceSuggestionModal({ ...priceSuggestionModal, isOpen: false })}
        productId={priceSuggestionModal.productId}
        productTitle={priceSuggestionModal.productTitle}
        currentPrice={priceSuggestionModal.currentPrice}
        onPriceApplied={fetchProducts}
      />

      <BulkPriceUpdateModal
        isOpen={bulkUpdateModal}
        onClose={() => setBulkUpdateModal(false)}
        selectedProducts={selectedProducts}
        onUpdateComplete={() => {
          fetchProducts()
          setSelectedProducts([])
        }}
      />
    </div>
  )
}
