"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Activity, Clock, AlertTriangle, CheckCircle, XCircle, Play } from "lucide-react"

interface WebhookLog {
  id: string
  type: string
  payload: any
  status: string
  response: any
  created_at: string
  shop_domain?: string
  source?: string
}

interface JobResult {
  success: boolean
  message: string
  results?: any
  error?: string
  timestamp: string
}

export default function AdminPage() {
  const [logs, setLogs] = useState<WebhookLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [runningJobs, setRunningJobs] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchLogs()
  }, [filter])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const url = filter === "all" ? "/api/webhooks/logs" : `/api/webhooks/logs?type=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const runCronJob = async (jobType: string) => {
    try {
      setRunningJobs((prev) => new Set(prev).add(jobType))
      const response = await fetch(`/api/cron/${jobType}`)
      const result: JobResult = await response.json()

      console.log(`${jobType} job result:`, result)

      // Refresh logs after job completion
      setTimeout(fetchLogs, 1000)
    } catch (error) {
      console.error(`Failed to run ${jobType} job:`, error)
    } finally {
      setRunningJobs((prev) => {
        const newSet = new Set(prev)
        newSet.delete(jobType)
        return newSet
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "received":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "received":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const cronJobs = [
    {
      id: "sync-prices",
      name: "Sync Prices",
      description: "Update product prices from suppliers",
      schedule: "Daily at 2:00 AM",
    },
    {
      id: "scan-trends",
      name: "Scan Trends",
      description: "Analyze marketplace trends",
      schedule: "Every 6 hours",
    },
    {
      id: "process-returns",
      name: "Process Returns",
      description: "Auto-approve eligible returns",
      schedule: "Every 2 hours",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Admin</h1>
          <p className="text-muted-foreground">Monitor webhooks, logs, and background jobs</p>
        </div>
      </div>

      {/* Background Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Background Jobs
          </CardTitle>
          <CardDescription>Manage and monitor scheduled tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {cronJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium">{job.name}</h4>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{job.schedule}</p>
                </div>
                <Button
                  onClick={() => runCronJob(job.id)}
                  disabled={runningJobs.has(job.id)}
                  size="sm"
                  className="w-full"
                >
                  {runningJobs.has(job.id) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Now
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Webhook Logs
              </CardTitle>
              <CardDescription>Recent webhook events and system activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="woocommerce">WooCommerce</SelectItem>
                  <SelectItem value="cron">Cron Jobs</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchLogs} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <h4 className="font-medium">{log.type}</h4>
                        <p className="text-sm text-muted-foreground">{log.shop_domain || log.source || "System"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Payload</h5>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Response</h5>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}

              {logs.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No logs found</h3>
                  <p className="text-muted-foreground">
                    {filter === "all" ? "No webhook events recorded yet" : `No ${filter} events found`}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
