"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { Separator } from "@/components/ui/separator"
import { RotateCcw, AlertTriangle, DollarSign, Package, User, Loader2 } from "lucide-react"

interface CreateReturnModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
  onReturnCreated?: () => void
}

const returnReasons = [
  "Defective item",
  "Damaged in shipping",
  "Wrong item sent",
  "Product not as described",
  "Changed mind",
  "Found cheaper elsewhere",
  "Don't need anymore",
  "Quality issues",
  "Size/fit issues",
  "Other",
]

export function CreateReturnModal({ isOpen, onClose, order, onReturnCreated }: CreateReturnModalProps) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [creating, setCreating] = useState(false)
  const [riskAssessment, setRiskAssessment] = useState<any>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const createReturn = async () => {
    setCreating(true)
    try {
      const finalReason = reason === "Other" ? customReason : reason

      const response = await fetch(`/api/orders/${order.id}/returns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: finalReason }),
      })

      const data = await response.json()
      if (data.success) {
        setRiskAssessment(data.risk_assessment)
        setTimeout(() => {
          onReturnCreated?.()
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error("[v0] Error creating return:", error)
    } finally {
      setCreating(false)
    }
  }

  const resetModal = () => {
    setReason("")
    setCustomReason("")
    setRiskAssessment(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <span>Create Return Request</span>
          </DialogTitle>
          <DialogDescription>Create a return request for order {order.store_order_id}</DialogDescription>
        </DialogHeader>

        {!riskAssessment ? (
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                Order Summary
              </h4>
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{order.customer.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{order.store_order_id}</span>
                </div>
                <Separator />
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.price)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total Order Value</span>
                  <span>{formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Return Reason */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="return-reason">Reason for Return</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select return reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {returnReasons.map((reasonOption) => (
                      <SelectItem key={reasonOption} value={reasonOption}>
                        {reasonOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {reason === "Other" && (
                <div>
                  <Label htmlFor="custom-reason">Custom Reason</Label>
                  <Textarea
                    id="custom-reason"
                    placeholder="Please specify the reason for return..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Warning for High-Risk Reasons */}
            {(reason === "Changed mind" || reason === "Found cheaper elsewhere" || reason === "Don't need anymore") && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">High Risk Return</p>
                    <p className="text-sm text-yellow-700">
                      This return reason may be flagged for manual review due to higher refund risk.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <RotateCcw className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Return Request Created!</h3>
              <p className="text-green-700">The return request has been submitted and is being processed.</p>
            </div>

            {/* Risk Assessment */}
            <div>
              <h4 className="font-medium mb-3">Risk Assessment</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                  <p
                    className={`font-bold ${
                      riskAssessment.level === "high"
                        ? "text-red-600"
                        : riskAssessment.level === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {riskAssessment.level.toUpperCase()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Risk Score</p>
                  <p className="font-bold">{(riskAssessment.score * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Package className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Auto-Approve</p>
                  <p
                    className={`font-bold ${riskAssessment.auto_approve_eligible ? "text-green-600" : "text-red-600"}`}
                  >
                    {riskAssessment.auto_approve_eligible ? "ELIGIBLE" : "MANUAL"}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Customer will be notified via WhatsApp</li>
                <li>
                  •{" "}
                  {riskAssessment.auto_approve_eligible
                    ? "Return will be auto-processed if eligible"
                    : "Return requires manual review"}
                </li>
                <li>• You can track progress in the Returns dashboard</li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={resetModal}>
            {riskAssessment ? "Close" : "Cancel"}
          </Button>
          {!riskAssessment && (
            <Button onClick={createReturn} disabled={!reason || (reason === "Other" && !customReason) || creating}>
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Create Return Request
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
