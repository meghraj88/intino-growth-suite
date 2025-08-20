"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, CheckCircle, ExternalLink, SettingsIcon } from "lucide-react"

interface Supplier {
  id: string
  name: string
  type: string
  created_at: string
}

export default function SettingsPage() {
  const [stores, setStores] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  // Store connection form
  const [storeForm, setStoreForm] = useState({
    provider: "",
    domain: "",
    token: "",
    currency: "",
    country: "",
    webhookSecret: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [storesRes, suppliersRes] = await Promise.all([fetch("/api/stores"), fetch("/api/suppliers")])
      const storesData = await storesRes.json()
      const suppliersData = await suppliersRes.json()
      if (storesData.success) setStores(storesData.stores)
      if (suppliersData.success) setSuppliers(suppliersData.suppliers)
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const connectStore = async () => {
    // Log all form data
    console.log("Connecting Store with data:", storeForm);
    
    setConnecting(true)
    try {
      const response = await fetch("/api/stores/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storeForm),
      })

      const data = await response.json()
      if (data.success) {
        await fetchData()
        setStoreForm({ provider: "", domain: "", token: "", currency: "", country: "", webhookSecret: "" })
      }
    } catch (error) {
      console.error("[v0] Error connecting store:", error)
    } finally {
      setConnecting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <SettingsIcon className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your stores, suppliers, and integrations</p>
      </div>

      {/* Connected Stores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>Connected Stores</span>
          </CardTitle>
          <CardDescription>Manage your Shopify and WooCommerce store connections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stores.map((store) => (
            <div key={store.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{store.store_name}</p>
                  <p className="text-sm text-gray-500">{store.store_domain}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="capitalize">{store.provider}</Badge>
                <Badge variant="outline">{store.currency}</Badge>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}

          <Separator />

          {/* Add New Store */}
          <div className="space-y-4">
            <h4 className="font-medium">Connect New Store</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={storeForm.provider}
                  onValueChange={(value) => setStoreForm({ ...storeForm, provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Store Domain</Label>
                <Input
                  placeholder="your-store.myshopify.com"
                  value={storeForm.domain}
                  onChange={(e) => setStoreForm({ ...storeForm, domain: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Access Token</Label>
                <Input
                  type="password"
                  placeholder="Your API access token"
                  value={storeForm.token}
                  onChange={(e) => setStoreForm({ ...storeForm, token: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <Input
                  type="password"
                  placeholder="Your webhook secret key"
                  value={storeForm.webhookSecret || ""}
                  onChange={(e) => setStoreForm({ ...storeForm, webhookSecret: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={storeForm.currency}
                  onValueChange={(value) => setStoreForm({ ...storeForm, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={connectStore} disabled={connecting} className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              {connecting ? "Connecting..." : "Connect Store"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers */}
      {/* ... Suppliers Code ... */}

      {/* Integration Status */}
      {/* ... Integration Status Code ... */}
    </div>
  )
}