
import { NextRequest, NextResponse } from 'next/server'

// Mock webhook logs and stats
const webhookStats = {
  total_received: 1247,
  successful: 1198,
  failed: 49,
  success_rate: 96.1,
  average_processing_time: 245, // milliseconds
  last_24_hours: {
    received: 156,
    successful: 152,
    failed: 4
  }
}

const recentWebhooks = [
  {
    id: "wh_001",
    source: "shopify",
    event: "order/created",
    status: "success",
    processing_time: 234,
    received_at: "2024-01-20T10:30:00Z",
    retry_count: 0,
    payload_size: 1245
  },
  {
    id: "wh_002", 
    source: "shopify",
    event: "order/updated",
    status: "success",
    processing_time: 189,
    received_at: "2024-01-20T10:25:00Z",
    retry_count: 0,
    payload_size: 987
  },
  {
    id: "wh_003",
    source: "woocommerce",
    event: "product/updated",
    status: "failed",
    processing_time: 5000,
    received_at: "2024-01-20T10:20:00Z",
    retry_count: 3,
    error: "Connection timeout",
    payload_size: 2156
  },
  {
    id: "wh_004",
    source: "shopify", 
    event: "order/paid",
    status: "success",
    processing_time: 156,
    received_at: "2024-01-20T10:15:00Z",
    retry_count: 1,
    payload_size: 1089
  }
]

const failureReasons = [
  { reason: "Connection timeout", count: 15, percentage: 30.6 },
  { reason: "Invalid payload", count: 12, percentage: 24.5 },
  { reason: "Rate limit exceeded", count: 10, percentage: 20.4 },
  { reason: "Authentication failed", count: 8, percentage: 16.3 },
  { reason: "Server error", count: 4, percentage: 8.2 }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'stats':
        return NextResponse.json({
          success: true,
          data: webhookStats
        })

      case 'recent':
        const limit = parseInt(searchParams.get('limit') || '10')
        return NextResponse.json({
          success: true,
          data: recentWebhooks.slice(0, limit)
        })

      case 'failures':
        return NextResponse.json({
          success: true,
          data: failureReasons
        })

      case 'health':
        const healthStatus = {
          status: webhookStats.success_rate > 95 ? 'healthy' : 
                 webhookStats.success_rate > 90 ? 'warning' : 'critical',
          uptime: '99.8%',
          last_failure: '2024-01-20T09:45:00Z',
          endpoints: [
            {
              name: 'Shopify Orders',
              url: '/api/webhooks/shopify',
              status: 'healthy',
              last_received: '2024-01-20T10:30:00Z'
            },
            {
              name: 'WooCommerce Products', 
              url: '/api/webhooks/woocommerce',
              status: 'warning',
              last_received: '2024-01-20T09:15:00Z'
            }
          ]
        }
        return NextResponse.json({
          success: true,
          data: healthStatus
        })

      default:
        return NextResponse.json({
          success: true,
          data: {
            stats: webhookStats,
            recent_webhooks: recentWebhooks.slice(0, 5),
            failure_analysis: failureReasons
          }
        })
    }

  } catch (error) {
    console.error('Webhook reliability API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch webhook data' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, webhook_id } = body

    switch (action) {
      case 'retry':
        // Simulate webhook retry
        const webhook = recentWebhooks.find(wh => wh.id === webhook_id)
        if (!webhook) {
          return NextResponse.json({ 
            success: false, 
            error: 'Webhook not found' 
          }, { status: 404 })
        }

        // Simulate retry logic
        const retryResult = {
          webhook_id,
          retry_attempt: (webhook.retry_count || 0) + 1,
          status: Math.random() > 0.2 ? 'success' : 'failed',
          processing_time: Math.floor(Math.random() * 1000) + 100,
          timestamp: new Date().toISOString()
        }

        return NextResponse.json({
          success: true,
          data: retryResult
        })

      case 'configure_alerts':
        const { threshold, notification_methods } = body
        
        // Simulate alert configuration
        const alertConfig = {
          failure_rate_threshold: threshold || 5, // percentage
          notification_methods: notification_methods || ['email'],
          configured_at: new Date().toISOString(),
          status: 'active'
        }

        return NextResponse.json({
          success: true,
          message: 'Alert configuration updated',
          data: alertConfig
        })

      case 'test_endpoint':
        const { endpoint_url } = body
        
        // Simulate endpoint test
        const testResult = {
          endpoint: endpoint_url,
          status: 'reachable',
          response_time: Math.floor(Math.random() * 500) + 50,
          status_code: 200,
          tested_at: new Date().toISOString()
        }

        return NextResponse.json({
          success: true,
          data: testResult
        })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Webhook reliability POST error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Operation failed' 
    }, { status: 500 })
  }
}
