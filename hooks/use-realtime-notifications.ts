
import { useEffect, useState } from 'react'
import { toast } from './use-toast'

interface NotificationData {
  type: 'price_change' | 'new_order' | 'return_request' | 'stock_alert' | 'trend_alert'
  title: string
  message: string
  data?: any
}

export function useRealtimeNotifications() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate real-time connection (in production, this would be WebSocket/SSE)
    setIsConnected(true)

    // Mock real-time events for demo
    const interval = setInterval(() => {
      const notifications: NotificationData[] = [
        {
          type: 'price_change',
          title: 'Price Alert',
          message: 'Wireless Earbuds Pro price increased by $2.50',
          data: { product_id: '123', old_price: 45.99, new_price: 48.49 }
        },
        {
          type: 'new_order',
          title: 'New Order',
          message: 'Order #ORD-2024-004 received - $89.99',
          data: { order_id: 'ORD-2024-004', amount: 89.99 }
        },
        {
          type: 'return_request',
          title: 'Return Request',
          message: 'Customer requested return for Smart Watch Band',
          data: { order_id: 'ORD-2024-001', product: 'Smart Watch Band' }
        },
        {
          type: 'stock_alert',
          title: 'Low Stock Alert',
          message: 'LED Strip Lights - Only 5 units left',
          data: { product: 'LED Strip Lights', stock: 5 }
        },
        {
          type: 'trend_alert',
          title: 'Trending Product',
          message: 'Portable Phone Stand trending in US market',
          data: { product: 'Portable Phone Stand', score: 8.7, country: 'US' }
        }
      ]

      // Randomly show notifications (simulate real events)
      if (Math.random() > 0.7) {
        const notification = notifications[Math.floor(Math.random() * notifications.length)]
        
        switch (notification.type) {
          case 'price_change':
            toast.warning({
              title: notification.title,
              description: notification.message,
              duration: 5000
            })
            break
          case 'new_order':
            toast.success({
              title: notification.title,
              description: notification.message,
              duration: 4000
            })
            break
          case 'return_request':
            toast.error({
              title: notification.title,
              description: notification.message,
              duration: 6000
            })
            break
          case 'stock_alert':
            toast.warning({
              title: notification.title,
              description: notification.message,
              duration: 8000
            })
            break
          case 'trend_alert':
            toast.success({
              title: notification.title,
              description: notification.message,
              duration: 5000
            })
            break
        }
      }
    }, 15000) // Show notification every 15 seconds for demo

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [])

  return { isConnected }
}
