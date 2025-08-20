"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  User,
  Package,
  Clock,
  Brain,
} from "lucide-react"

interface ReturnDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  returnRequest: any
  onStatusUpdate?: () => void
}

export function ReturnDetailsModal({ isOpen, onClose, returnRequest, onStatusUpdate }: ReturnDetailsModalProps) {
  const [processing, setProcessing] = useState(false)
  const [whatsappMessage, setWhatsappMessage] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 0.7) return "bg-red-100 text-red-800"
    if (score > 0.4) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getRiskLevel = (score: number) => {
    if (score > 0.7) return "High Risk"
    if (score > 0.4) return "Medium Risk"
    return "Low Risk"
  }

  const handleApprove = async () => {
    setProcessing(true)
    // TODO: Call API to approve return
    setTimeout(() => {
      setProcessing(false)
      onStatusUpdate?.()
      onClose()
    }, 1500)
  }

  const handleReject = async () => {
    setProcessing(true)
    // TODO: Call API to reject return
    setTimeout(() => {
      setProcessing(false)
      onStatusUpdate?.()
      onClose()
    }, 1500)
  }

  const sendWhatsApp = async () => {
    setProcessing(true)
    // TODO: Call WhatsApp API
    setTimeout(() => {
      setProcessing(false)
      setWhatsappMessage("")
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span>Return Request Details</span>
          </DialogTitle>
          <DialogDescription>
            {returnRequest.order.store_order_id} • {returnRequest.order.customer.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Risk Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <Badge className={getStatusColor(returnRequest.status)}>
                {returnRequest.auto_approved ? "Auto-" : ""}
                {returnRequest.status}
              </Badge>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Risk Level</p>
              <Badge className={getRiskColor(returnRequest.refund_risk_score)}>
                {getRiskLevel(returnRequest.refund_risk_score)}
              </Badge>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Order Value</p>
              <p className="font-bold text-lg">{formatCurrency(returnRequest.order.total_amount)}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Customer Information
            </h4>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{returnRequest.order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{returnRequest.order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-600" />
              Order Details
            </h4>
            <div className="space-y-3">
              {returnRequest.order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(item.price)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg font-medium">
                <span>Total Order Value</span>
                <span>{formatCurrency(returnRequest.order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Return Information */}
          <div>
            <h4 className="font-medium mb-3">Return Information</h4>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Reason for Return</p>
                <p className="font-medium">{returnRequest.reason}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-medium text-sm">{formatDate(returnRequest.created_at)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Risk Score</p>
                  <p className="font-medium">{(returnRequest.refund_risk_score * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Risk Assessment */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-blue-600" />
              AI Risk Assessment
            </h4>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Risk Factors:</p>
                  <ul className="mt-2 space-y-1 text-blue-800">
                    <li>• Order value: {returnRequest.order.total_amount > 50 ? "Low risk" : "Medium risk"}</li>
                    <li>
                      • Return reason:{" "}
                      {returnRequest.reason.toLowerCase().includes("defective") ? "Low risk" : "Medium risk"}
                    </li>
                    <li>• Customer history: Good standing</li>
                  </ul>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Recommendation:</p>
                  <p className="mt-2 text-blue-800">
                    {returnRequest.refund_risk_score < 0.3
                      ? "Auto-approve eligible"
                      : returnRequest.refund_risk_score < 0.6
                        ? "Manual review recommended"
                        : "High risk - investigate further"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution (if processed) */}
          {returnRequest.resolution && (
            <div>
              <h4 className="font-medium mb-3">Resolution</h4>
              <div className="p-4 border rounded-lg">
                {returnRequest.resolution.type === "full_refund" ? (
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Full refund of {formatCurrency(returnRequest.resolution.amount)} processed</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span>Return rejected: {returnRequest.resolution.reason}</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  Processed on {formatDate(returnRequest.resolution.processed_at)}
                </p>
              </div>
            </div>
          )}

          {/* WhatsApp Communication */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
              Customer Communication
            </h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="whatsapp-message">WhatsApp Message</Label>
                <Textarea
                  id="whatsapp-message"
                  placeholder="Type your message to the customer..."
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  rows={3}
                />
              </div>
              <Button variant="outline" onClick={sendWhatsApp} disabled={!whatsappMessage || processing}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send WhatsApp Message
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {returnRequest.status === "pending" && (
            <>
              <Button variant="destructive" onClick={handleReject} disabled={processing}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject Return
              </Button>
              <Button onClick={handleApprove} disabled={processing}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Return
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
