"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Brain,
  ExternalLink,
} from "lucide-react"

interface PriceSuggestion {
  suggested_price: number
  current_price: number
  price_change: number
  margin_improvement: number
  reasoning: string[]
  risk_level: string
  confidence: number
  factors_analyzed: string[]
}

interface PriceSuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productTitle: string
  currentPrice: number
  onPriceApplied?: () => void
}

export function PriceSuggestionModal({
  isOpen,
  onClose,
  productId,
  productTitle,
  currentPrice,
  onPriceApplied,
}: PriceSuggestionModalProps) {
  const [suggestion, setSuggestion] = useState<PriceSuggestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [applying, setApplying] = useState(false)
  const [updateStore, setUpdateStore] = useState(true)

  const generateSuggestion = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/price/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      })

      const data = await response.json()
      if (data.success) {
        setSuggestion(data.suggestion)
      }
    } catch (error) {
      console.error("[v0] Error generating suggestion:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyPrice = async () => {
    if (!suggestion) return

    setApplying(true)
    try {
      const response = await fetch("/api/price/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          price: suggestion.suggested_price,
          update_store: updateStore,
        }),
      })

      const data = await response.json()
      if (data.success) {
        onPriceApplied?.()
        onClose()
      }
    } catch (error) {
      console.error("[v0] Error applying price:", error)
    } finally {
      setApplying(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  // Generate suggestion when modal opens
  useState(() => {
    if (isOpen && !suggestion && !loading) {
      generateSuggestion()
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span>AI Price Suggestion</span>
          </DialogTitle>
          <DialogDescription>AI-powered pricing recommendation for {productTitle}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Analyzing market data and generating suggestion...</p>
            </div>
          </div>
        ) : suggestion ? (
          <div className="space-y-6">
            {/* Price Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(suggestion.current_price)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Suggested Price</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(suggestion.suggested_price)}</p>
                <div className="flex items-center justify-center mt-2">
                  {suggestion.price_change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${suggestion.price_change > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {suggestion.price_change > 0 ? "+" : ""}
                    {formatCurrency(suggestion.price_change)}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <Target className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Margin Improvement</p>
                <p className="font-bold text-blue-900">+{suggestion.margin_improvement}%</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Confidence</p>
                <p className="font-bold text-green-900">{suggestion.confidence}%</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Risk Level</p>
                <Badge className={getRiskColor(suggestion.risk_level)}>{suggestion.risk_level}</Badge>
              </div>
            </div>

            <Separator />

            {/* AI Reasoning */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-blue-600" />
                AI Analysis & Reasoning
              </h4>
              <div className="space-y-2">
                {suggestion.reasoning.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Factors Analyzed */}
            <div>
              <h4 className="font-medium mb-3">Factors Analyzed</h4>
              <div className="flex flex-wrap gap-2">
                {suggestion.factors_analyzed.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Store Update Option */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="update-store" className="font-medium">
                    Update Store Price
                  </Label>
                  <p className="text-xs text-gray-600">Also update the price in your connected store</p>
                </div>
              </div>
              <Switch id="update-store" checked={updateStore} onCheckedChange={setUpdateStore} />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to generate price suggestion</p>
            <Button variant="outline" onClick={generateSuggestion} className="mt-4 bg-transparent">
              Try Again
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {suggestion && (
            <Button onClick={applyPrice} disabled={applying}>
              {applying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Apply Price
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
