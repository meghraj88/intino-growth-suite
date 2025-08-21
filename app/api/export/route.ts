
import { NextRequest, NextResponse } from 'next/server'

// Mock data for different export types
const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE001",
    supplier_price: 12.50,
    selling_price: 29.99,
    margin: 58.3,
    stock: 150,
    orders: 45,
    revenue: 1349.55,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Fitness Tracker Watch",
    sku: "SFT002", 
    supplier_price: 18.75,
    selling_price: 49.99,
    margin: 62.5,
    stock: 89,
    orders: 32,
    revenue: 1599.68,
    category: "Wearables"
  },
  {
    id: 3,
    name: "LED Strip Lights RGB",
    sku: "LED003",
    supplier_price: 8.99,
    selling_price: 24.99,
    margin: 64.0,
    stock: 200,
    orders: 78,
    revenue: 1949.22,
    category: "Home & Garden"
  }
]

const mockOrders = [
  {
    id: "ORD-2024-001",
    customer_email: "john@example.com",
    product: "Wireless Earbuds",
    quantity: 2,
    total: 59.98,
    profit: 34.98,
    status: "Delivered",
    order_date: "2024-01-15",
    shipping_address: "123 Main St, New York, NY"
  },
  {
    id: "ORD-2024-002", 
    customer_email: "sarah@example.com",
    product: "Fitness Tracker",
    quantity: 1,
    total: 49.99,
    profit: 31.24,
    status: "Shipped",
    order_date: "2024-01-16",
    shipping_address: "456 Oak Ave, Los Angeles, CA"
  },
  {
    id: "ORD-2024-003",
    customer_email: "mike@example.com", 
    product: "LED Strip Lights",
    quantity: 3,
    total: 74.97,
    profit: 47.97,
    status: "Processing",
    order_date: "2024-01-17",
    shipping_address: "789 Pine St, Chicago, IL"
  }
]

const mockReturns = [
  {
    id: "RET-2024-001",
    order_id: "ORD-2024-001",
    product: "Wireless Earbuds",
    reason: "Defective item",
    status: "Approved",
    refund_amount: 29.99,
    return_date: "2024-01-20",
    risk_score: 0.2
  },
  {
    id: "RET-2024-002",
    order_id: "ORD-2024-002", 
    product: "Fitness Tracker",
    reason: "Changed mind",
    status: "Under Review", 
    refund_amount: 49.99,
    return_date: "2024-01-21",
    risk_score: 0.7
  }
]

const mockAnalytics = [
  {
    date: "2024-01-01",
    revenue: 1250.00,
    orders: 45,
    profit: 625.00,
    margin: 50.0,
    refunds: 25.00,
    new_customers: 12
  },
  {
    date: "2024-01-02",
    revenue: 1350.00,
    orders: 52,
    profit: 675.00,
    margin: 50.0,
    refunds: 75.00,
    new_customers: 15
  },
  {
    date: "2024-01-03",
    revenue: 1180.00,
    orders: 38,
    profit: 590.00,
    margin: 50.0,
    refunds: 50.00,
    new_customers: 8
  }
]

function arrayToCSV(array: any[], headers: string[]): string {
  const csvHeaders = headers.join(',')
  const csvRows = array.map(row => 
    headers.map(header => {
      const value = row[header]
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )
  return [csvHeaders, ...csvRows].join('\n')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // products, orders, returns, analytics
    const format = searchParams.get('format') || 'csv' // csv, json
    const dateRange = searchParams.get('dateRange') || '30' // days

    let data: any[] = []
    let headers: string[] = []
    let filename = ''

    switch (type) {
      case 'products':
        data = mockProducts
        headers = ['id', 'name', 'sku', 'supplier_price', 'selling_price', 'margin', 'stock', 'orders', 'revenue', 'category']
        filename = `products_export_${new Date().toISOString().split('T')[0]}`
        break
        
      case 'orders':
        data = mockOrders
        headers = ['id', 'customer_email', 'product', 'quantity', 'total', 'profit', 'status', 'order_date', 'shipping_address']
        filename = `orders_export_${new Date().toISOString().split('T')[0]}`
        break
        
      case 'returns':
        data = mockReturns
        headers = ['id', 'order_id', 'product', 'reason', 'status', 'refund_amount', 'return_date', 'risk_score']
        filename = `returns_export_${new Date().toISOString().split('T')[0]}`
        break
        
      case 'analytics':
        data = mockAnalytics
        headers = ['date', 'revenue', 'orders', 'profit', 'margin', 'refunds', 'new_customers']
        filename = `analytics_export_${new Date().toISOString().split('T')[0]}`
        break
        
      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 })
    }

    if (format === 'csv') {
      const csvContent = arrayToCSV(data, headers)
      
      return new Response(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      })
    } else if (format === 'json') {
      return new Response(JSON.stringify({ data, exported_at: new Date().toISOString() }, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}.json"`,
        },
      })
    }

    return NextResponse.json({ error: 'Invalid format' }, { status: 400 })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, format, filters, customFields } = body

    // In production, this would use the filters to query the database
    console.log('Custom export request:', { type, format, filters, customFields })

    // For now, return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'Custom export queued successfully',
      export_id: `exp_${Date.now()}`
    })

  } catch (error) {
    console.error('Custom export error:', error)
    return NextResponse.json({ error: 'Custom export failed' }, { status: 500 })
  }
}
