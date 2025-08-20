"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calculator, Loader2, DollarSign, Target, Plus, ExternalLink, CheckCircle } from "lucide-react"

interface BulkPriceUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: string[]
  onUpdateComplete?: () => void
}

export function BulkPriceUpdateModal({
  isOpen,
  onClose,
  selectedProducts,
  onUpdateComplete,
}: BulkPriceUpdateModalProps) {
  const [ruleType, setRuleType] = useState("")
  const [ruleValue, setRuleValue] = useState("")
  const [updateStore, setUpdateStore] = useState(true)
  const [applying, setApplying] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  const applyBulkUpdate = async () => {
    setApplying(true)
    try {
      const response = await fetch("/api/price/bulk-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_ids: selectedProducts,
          rule_type: ruleType,
          rule_value: Number.parseFloat(ruleValue),
          update_store: updateStore,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setResults(data.results)
        setShowResults(true)
        onUpdateComplete?.()
      }
    } catch (error) {
      console.error("[v0] Error in bulk update:", error)
    } finally {
      setApplying(false)
    }
  }

  const resetModal = () => {
    setRuleType("")
    setRuleValue("")
    setShowResults(false)
    setResults([])
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getRuleDescription = () => {
    if (!ruleType || !ruleValue) return ""

    switch (ruleType) {
      case "margin_percent":
        return `Set prices to achieve ${ruleValue}% profit margin`
      case "markup_percent":
        return `Add ${ruleValue}% markup to supplier cost`
      case "fixed_amount":
        return `Add $${ruleValue} to supplier cost`
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Bulk Price Update</span>
          </DialogTitle>
          <DialogDescription>Apply pricing rules to {selectedProducts.length} selected products</DialogDescription>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            {/* Rule Configuration */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-type">Pricing Rule</Label>
                <Select value={ruleType} onValueChange={setRuleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="margin_percent">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Target Margin %</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="markup_percent">
                      <div className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Markup %</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed_amount">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Fixed Amount</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rule-value">{ruleType === "fixed_amount" ? "Amount ($)" : "Percentage (%)"}</Label>
                <Input
                  id="rule-value"
                  type="number"
                  placeholder={ruleType === "fixed_amount" ? "5.00" : "30"}
                  value={ruleValue}
                  onChange={(e) => setRuleValue(e.target.value)}
                />
              </div>

              {ruleType && ruleValue && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Rule Preview:</p>
                  <p className="text-sm text-blue-700">{getRuleDescription()}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Store Update Option */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="bulk-update-store" className="font-medium">
                    Update Store Prices
                  </Label>
                  <p className="text-xs text-gray-600">Also update prices in your connected stores</p>
                </div>
              </div>
              <Switch id="bulk-update-store" checked={updateStore} onCheckedChange={setUpdateStore} />
            </div>

            {/* Selected Products Summary */}
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Selected Products</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{selectedProducts.length} products selected</span>
                <Badge variant="outline">Bulk Update Ready</Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Bulk Update Complete!</h3>
              <p className="text-green-700">
                Successfully updated {results.filter((r) => r.success).length} of {results.length} products
              </p>
            </div>

            {/* Results Details */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Product {index + 1}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {formatCurrency(result.old_price)} → {formatCurrency(result.new_price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.new_price > result.old_price ? "+" : ""}
                      {formatCurrency(result.new_price - result.old_price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={resetModal}>
            {showResults ? "Close" : "Cancel"}
          </Button>
          {!showResults && (
            <Button onClick={applyBulkUpdate} disabled={!ruleType || !ruleValue || applying}>
              {applying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Apply to {selectedProducts.length} Products
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
