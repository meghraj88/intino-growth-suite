
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Database,
  Shield,
  Zap,
  Download,
  Upload,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Network,
  Gauge
} from "lucide-react"

export default function TechnicalPage() {
  const [exportType, setExportType] = useState('products')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: string, format: string) => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/export?type=${type}&format=${format}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}_export.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Server className="w-8 h-8 mr-3 text-blue-600" />
            Technical Dashboard
          </h1>
          <p className="text-gray-600">System performance, data export, and technical monitoring</p>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook Reliability</TabsTrigger>
          <TabsTrigger value="export">Data Export</TabsTrigger>
          <TabsTrigger value="security">Security & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* System Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CPU Usage</p>
                    <p className="text-2xl font-bold">23%</p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-600" />
                </div>
                <Progress value={23} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Memory Usage</p>
                    <p className="text-2xl font-bold">67%</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-green-600" />
                </div>
                <Progress value={67} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">API Response</p>
                    <p className="text-2xl font-bold">245ms</p>
                  </div>
                  <Gauge className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold">99.8%</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Real-time system monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Database Connection</p>
                    <p className="text-xs text-gray-600">All connections healthy</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">API Endpoints</p>
                    <p className="text-xs text-gray-600">All endpoints responding</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">Background Jobs</p>
                    <p className="text-xs text-gray-600">Some jobs running slower</p>
                  </div>
                </div>
                <Badge variant="secondary">Warning</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          {/* Webhook Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold">96.1%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Received</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <Network className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Failed</p>
                    <p className="text-2xl font-bold">49</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response</p>
                    <p className="text-2xl font-bold">245ms</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Webhook Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Webhook Activity</CardTitle>
              <CardDescription>Latest webhook processing results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Shopify Order Created</p>
                      <p className="text-xs text-gray-600">Processed in 234ms</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Product Price Updated</p>
                      <p className="text-xs text-gray-600">Processed in 189ms</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-sm">WooCommerce Sync Failed</p>
                      <p className="text-xs text-gray-600">Connection timeout after 5000ms</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Failed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          {/* Data Export Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>Export your business data in CSV or JSON format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Quick Export Options</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleExport('products', 'csv')}
                      disabled={isExporting}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Products (CSV)
                    </Button>
                    <Button 
                      onClick={() => handleExport('orders', 'csv')}
                      disabled={isExporting}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Orders (CSV)
                    </Button>
                    <Button 
                      onClick={() => handleExport('returns', 'csv')}
                      disabled={isExporting}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Returns (CSV)
                    </Button>
                    <Button 
                      onClick={() => handleExport('analytics', 'json')}
                      disabled={isExporting}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Analytics (JSON)
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Export Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Products exported this month:</span>
                      <span className="font-medium">2,456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Orders exported this month:</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last export:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Export success rate:</span>
                      <span className="font-medium text-green-600">99.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              {isExporting && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Preparing export...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security & API Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSL Certificate</span>
                  <Badge variant="default" className="bg-green-600">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Authentication</span>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rate Limiting</span>
                  <Badge variant="default" className="bg-green-600">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Encryption</span>
                  <Badge variant="default" className="bg-green-600">AES-256</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  API Rate Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>API Requests (hourly)</span>
                    <span>847/1000</span>
                  </div>
                  <Progress value={84.7} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Webhook Processing</span>
                    <span>23/100</span>
                  </div>
                  <Progress value={23} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Data Export (daily)</span>
                    <span>5/10</span>
                  </div>
                  <Progress value={50} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Background Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Background Job Processing</CardTitle>
              <CardDescription>Automated tasks and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Price Sync Job</p>
                    <p className="text-xs text-gray-600">Syncing 1,247 product prices</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={67} className="w-20" />
                    <Badge variant="default">Running</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Trend Scanner</p>
                    <p className="text-xs text-gray-600">Next scan in 2 hours</p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Email Campaign</p>
                    <p className="text-xs text-gray-600">Sent 156 abandoned cart emails</p>
                  </div>
                  <Badge variant="default" className="bg-green-600">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
