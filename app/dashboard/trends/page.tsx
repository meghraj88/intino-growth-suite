"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, TrendingUp, Globe, Search, ExternalLink } from "lucide-react"

interface TrendData {
  id: string
  sku: string
  source: string
  country: string
  score: number
  data: {
    title: string
    price_range: string
    orders_24h: number
    growth_rate: number
    competition_level: string
    search_volume: number
    image_url?: string
  }
  detected_at: string
}

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
]

export default function TrendsPage() {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("US")
  const [keywords, setKeywords] = useState("")

  useEffect(() => {
    fetchTrends()
  }, [selectedCountry])

  const fetchTrends = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trends?country=${selectedCountry}`)
      const data = await response.json()
      setTrends(data.trends || [])
    } catch (error) {
      console.error("Failed to fetch trends:", error)
    } finally {
      setLoading(false)
    }
  }

  const scanTrends = async () => {
    try {
      setScanning(true)
      const response = await fetch("/api/trends/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      })
      const data = await response.json()
      if (data.success) {
        setTrends(data.trends)
      }
    } catch (error) {
      console.error("Failed to scan trends:", error)
    } finally {
      setScanning(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-green-500"
    if (score >= 0.6) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trend Scanner</h1>
          <p className="text-muted-foreground">Discover trending products in different markets</p>
        </div>
        <Button onClick={scanTrends} disabled={scanning}>
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Scan Now
            </>
          )}
        </Button>
      </div>

      <div className="flex gap-4">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  {country.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trends.map((trend) => (
            <Card key={trend.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{trend.data.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Globe className="h-4 w-4" />
                      {trend.source} • {trend.country}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getScoreColor(trend.score)}`} />
                    <span className="text-sm font-medium">{Math.round(trend.score * 100)}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {trend.data.image_url && (
                  <img
                    src={trend.data.image_url || "/placeholder.svg"}
                    alt={trend.data.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price Range</span>
                    <p className="font-medium">{trend.data.price_range}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">24h Orders</span>
                    <p className="font-medium">{trend.data.orders_24h.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Growth Rate</span>
                    <p className="font-medium text-green-600">+{Math.round(trend.data.growth_rate * 100)}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Search Volume</span>
                    <p className="font-medium">{trend.data.search_volume.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getCompetitionColor(trend.data.competition_level)}>
                    {trend.data.competition_level} competition
                  </Badge>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Detected {new Date(trend.detected_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && trends.length === 0 && (
        <div className="text-center py-12">
          <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No trends found</h3>
          <p className="text-muted-foreground mb-4">
            Try scanning for trends in {countries.find((c) => c.code === selectedCountry)?.name}
          </p>
          <Button onClick={scanTrends}>
            <Search className="mr-2 h-4 w-4" />
            Start Scanning
          </Button>
        </div>
      )}
    </div>
  )
}
