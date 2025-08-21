
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  Bot,
  Users,
  TrendingUp,
  Clock,
  Star,
  Settings,
  Plus,
  Play,
  Pause,
  Edit
} from "lucide-react"

const emailCampaigns = [
  {
    id: 1,
    name: "Abandoned Cart Recovery",
    type: "automated",
    status: "active",
    trigger: "Cart abandoned for 1 hour",
    sent: 1247,
    opened: 312,
    clicked: 87,
    recovered: 23
  },
  {
    id: 2,
    name: "Review Request Follow-up",
    type: "automated",
    status: "active",
    trigger: "7 days after delivery",
    sent: 892,
    opened: 445,
    clicked: 156,
    reviews: 34
  },
  {
    id: 3,
    name: "New Customer Welcome",
    type: "automated",
    status: "active",
    trigger: "First purchase",
    sent: 156,
    opened: 89,
    clicked: 23,
    engagement: "High"
  }
]

const chatBotResponses = [
  {
    id: 1,
    trigger: "shipping time",
    response: "Our standard shipping time is 7-14 business days. We'll send you tracking information once your order ships!"
  },
  {
    id: 2,
    trigger: "return policy",
    response: "We offer 30-day returns on all items. Please contact us through this chat to start a return request."
  },
  {
    id: 3,
    trigger: "order status",
    response: "I can help you check your order status! Please provide your order number and I'll get the latest update."
  }
]

export default function CommunicationPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [newResponse, setNewResponse] = useState({ trigger: "", response: "" })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="w-8 h-8 mr-3 text-blue-600" />
            Customer Communication
          </h1>
          <p className="text-gray-600">Automate customer engagement and support</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="email-automation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email-automation">Email Automation</TabsTrigger>
          <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          <TabsTrigger value="analytics">Communication Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="email-automation" className="space-y-6">
          {/* Email Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Emails Sent</p>
                    <p className="text-2xl font-bold">2,295</p>
                  </div>
                  <Send className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Rate</p>
                    <p className="text-2xl font-bold">36.8%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Generated</p>
                    <p className="text-2xl font-bold">$4,521</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Automated email sequences for customer engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{campaign.trigger}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Sent: {campaign.sent}</span>
                          <span>Opened: {campaign.opened}</span>
                          <span>Clicked: {campaign.clicked}</span>
                          {campaign.recovered && <span>Recovered: {campaign.recovered}</span>}
                          {campaign.reviews && <span>Reviews: {campaign.reviews}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        {campaign.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Campaign */}
          <Card>
            <CardHeader>
              <CardTitle>Create Email Campaign</CardTitle>
              <CardDescription>Set up automated email sequences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g., Post-Purchase Follow-up" />
                </div>
                <div>
                  <Label>Trigger Event</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cart-abandoned">Cart Abandoned</SelectItem>
                      <SelectItem value="purchase-made">Purchase Made</SelectItem>
                      <SelectItem value="delivery-confirmed">Delivery Confirmed</SelectItem>
                      <SelectItem value="review-request">Review Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Email Subject</Label>
                <Input placeholder="Your subject line here" />
              </div>
              <div>
                <Label>Email Content</Label>
                <Textarea 
                  placeholder="Write your email content here..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Enable campaign immediately</Label>
              </div>
              <Button>Create Campaign</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-6">
          {/* Chatbot Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversations</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold">2.3s</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                    <p className="text-2xl font-bold">4.6/5</p>
                  </div>
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chatbot Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Automated Responses</CardTitle>
              <CardDescription>Configure AI chatbot responses for common queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chatBotResponses.map((response) => (
                  <div key={response.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">Trigger: "{response.trigger}"</p>
                        <p className="text-sm text-gray-600 mt-2">{response.response}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add New Response */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Response</CardTitle>
              <CardDescription>Train your chatbot with new automated responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Trigger Keywords</Label>
                <Input 
                  placeholder="e.g., refund, exchange, size"
                  value={newResponse.trigger}
                  onChange={(e) => setNewResponse({...newResponse, trigger: e.target.value})}
                />
              </div>
              <div>
                <Label>Bot Response</Label>
                <Textarea 
                  placeholder="Enter the automated response..."
                  value={newResponse.response}
                  onChange={(e) => setNewResponse({...newResponse, response: e.target.value})}
                />
              </div>
              <Button>Add Response</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Communication Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Open Rate</span>
                    <span className="font-medium">36.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '36.8%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Click Rate</span>
                    <span className="font-medium">12.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '12.4%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="font-medium">3.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '3.7%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Support Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Tickets Resolved</span>
                    <span className="font-medium">892/1024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Resolution Time</span>
                    <span className="font-medium">4.2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Escalation Rate</span>
                    <span className="font-medium">8.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Communication Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Abandoned Cart email sent to 45 customers</p>
                    <p className="text-xs text-gray-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Bot className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chatbot resolved 23 customer queries</p>
                    <p className="text-xs text-gray-600">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Review request emails achieved 34% response rate</p>
                    <p className="text-xs text-gray-600">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
