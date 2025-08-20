"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Mail, Bell, Send, History, Settings } from "lucide-react"

interface AlertTemplate {
  id: string
  name: string
  type: "whatsapp" | "email"
  subject?: string
  message: string
  variables: string[]
}

interface AlertHistory {
  id: string
  type: "whatsapp" | "email"
  recipient: string
  template: string
  status: "sent" | "delivered" | "failed"
  sent_at: string
}

export default function AlertsPage() {
  const [templates, setTemplates] = useState<AlertTemplate[]>([
    {
      id: "1",
      name: "Price Change Alert",
      type: "whatsapp",
      message:
        "Hi {customer_name}! We've updated the price for {product_name} to {new_price}. Check it out: {product_url}",
      variables: ["customer_name", "product_name", "new_price", "product_url"],
    },
    {
      id: "2",
      name: "Trending Product Alert",
      type: "email",
      subject: "New Trending Product: {product_name}",
      message:
        "We've detected a trending product in {country}: {product_name} with a trend score of {score}%. Consider adding it to your store!",
      variables: ["product_name", "country", "score"],
    },
    {
      id: "3",
      name: "Return Request",
      type: "whatsapp",
      message: "Your return request for order {order_id} has been {status}. Refund amount: {refund_amount}",
      variables: ["order_id", "status", "refund_amount"],
    },
  ])

  const [history, setHistory] = useState<AlertHistory[]>([
    {
      id: "1",
      type: "whatsapp",
      recipient: "+1234567890",
      template: "Price Change Alert",
      status: "delivered",
      sent_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      type: "email",
      recipient: "merchant@example.com",
      template: "Trending Product Alert",
      status: "sent",
      sent_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "whatsapp" as "whatsapp" | "email",
    subject: "",
    message: "",
    variables: [] as string[],
  })

  const [testAlert, setTestAlert] = useState({
    type: "whatsapp" as "whatsapp" | "email",
    recipient: "",
    template: "",
    payload: {},
  })

  const [settings, setSettings] = useState({
    whatsapp_enabled: true,
    email_enabled: true,
    default_whatsapp: "+1234567890",
    default_email: "merchant@example.com",
  })

  const extractVariables = (message: string) => {
    const matches = message.match(/\{([^}]+)\}/g)
    return matches ? matches.map((match) => match.slice(1, -1)) : []
  }

  const handleTemplateChange = (field: string, value: string) => {
    const updated = { ...newTemplate, [field]: value }
    if (field === "message") {
      updated.variables = extractVariables(value)
    }
    setNewTemplate(updated)
  }

  const saveTemplate = () => {
    if (!newTemplate.name || !newTemplate.message) return

    const template: AlertTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
    }

    setTemplates([...templates, template])
    setNewTemplate({
      name: "",
      type: "whatsapp",
      subject: "",
      message: "",
      variables: [],
    })
  }

  const sendTestAlert = async () => {
    if (!testAlert.recipient || !testAlert.template) return

    try {
      const endpoint = testAlert.type === "whatsapp" ? "/api/alerts/send-whatsapp" : "/api/alerts/send-email"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testAlert.recipient,
          templateId: testAlert.template,
          payload: testAlert.payload,
        }),
      })

      if (response.ok) {
        const newHistoryItem: AlertHistory = {
          id: Date.now().toString(),
          type: testAlert.type,
          recipient: testAlert.recipient,
          template: testAlert.template,
          status: "sent",
          sent_at: new Date().toISOString(),
        }
        setHistory([newHistoryItem, ...history])
        setTestAlert({ type: "whatsapp", recipient: "", template: "", payload: {} })
      }
    } catch (error) {
      console.error("Failed to send test alert:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Center</h1>
          <p className="text-muted-foreground">Manage WhatsApp and email notifications</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={settings.whatsapp_enabled ? "default" : "secondary"}>
            <MessageSquare className="mr-1 h-3 w-3" />
            WhatsApp {settings.whatsapp_enabled ? "On" : "Off"}
          </Badge>
          <Badge variant={settings.email_enabled ? "default" : "secondary"}>
            <Mail className="mr-1 h-3 w-3" />
            Email {settings.email_enabled ? "On" : "Off"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alert Templates
            </CardTitle>
            <CardDescription>Create and manage notification templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge variant="outline">
                    {template.type === "whatsapp" ? (
                      <MessageSquare className="mr-1 h-3 w-3" />
                    ) : (
                      <Mail className="mr-1 h-3 w-3" />
                    )}
                    {template.type}
                  </Badge>
                </div>
                {template.subject && <p className="text-sm text-muted-foreground">Subject: {template.subject}</p>}
                <p className="text-sm">{template.message}</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable) => (
                    <Badge key={variable} variant="secondary" className="text-xs">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Create New Template</h4>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => handleTemplateChange("name", e.target.value)}
                      placeholder="e.g., Order Confirmation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-type">Type</Label>
                    <Select value={newTemplate.type} onValueChange={(value) => handleTemplateChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newTemplate.type === "email" && (
                  <div>
                    <Label htmlFor="template-subject">Subject</Label>
                    <Input
                      id="template-subject"
                      value={newTemplate.subject}
                      onChange={(e) => handleTemplateChange("subject", e.target.value)}
                      placeholder="Email subject with {variables}"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="template-message">Message</Label>
                  <Textarea
                    id="template-message"
                    value={newTemplate.message}
                    onChange={(e) => handleTemplateChange("message", e.target.value)}
                    placeholder="Your message with {variables} in curly braces"
                    rows={3}
                  />
                </div>

                {newTemplate.variables.length > 0 && (
                  <div>
                    <Label>Detected Variables</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {newTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="secondary" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={saveTemplate} disabled={!newTemplate.name || !newTemplate.message}>
                  Save Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test & History */}
        <div className="space-y-6">
          {/* Test Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test Alert
              </CardTitle>
              <CardDescription>Send a test notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test-type">Type</Label>
                  <Select
                    value={testAlert.type}
                    onValueChange={(value) => setTestAlert({ ...testAlert, type: value as "whatsapp" | "email" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="test-template">Template</Label>
                  <Select
                    value={testAlert.template}
                    onValueChange={(value) => setTestAlert({ ...testAlert, template: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates
                        .filter((t) => t.type === testAlert.type)
                        .map((template) => (
                          <SelectItem key={template.id} value={template.name}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="test-recipient">
                  {testAlert.type === "whatsapp" ? "Phone Number" : "Email Address"}
                </Label>
                <Input
                  id="test-recipient"
                  value={testAlert.recipient}
                  onChange={(e) => setTestAlert({ ...testAlert, recipient: e.target.value })}
                  placeholder={testAlert.type === "whatsapp" ? "+1234567890" : "test@example.com"}
                />
              </div>

              <Button onClick={sendTestAlert} disabled={!testAlert.recipient || !testAlert.template} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Test Alert
              </Button>
            </CardContent>
          </Card>

          {/* Alert History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
              <CardDescription>History of sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {alert.type === "whatsapp" ? (
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{alert.template}</p>
                        <p className="text-xs text-muted-foreground">{alert.recipient}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(alert.sent_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="whatsapp-enabled">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable WhatsApp alerts</p>
                </div>
                <Switch
                  id="whatsapp-enabled"
                  checked={settings.whatsapp_enabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, whatsapp_enabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-enabled">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable email alerts</p>
                </div>
                <Switch
                  id="email-enabled"
                  checked={settings.email_enabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, email_enabled: checked })}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="default-whatsapp">Default WhatsApp Number</Label>
                <Input
                  id="default-whatsapp"
                  value={settings.default_whatsapp}
                  onChange={(e) => setSettings({ ...settings, default_whatsapp: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <Label htmlFor="default-email">Default Email Address</Label>
                <Input
                  id="default-email"
                  value={settings.default_email}
                  onChange={(e) => setSettings({ ...settings, default_email: e.target.value })}
                  placeholder="alerts@yourstore.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
