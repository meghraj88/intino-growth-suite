
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Smartphone,
  Download,
  Bell,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Home,
  Package,
  TrendingUp,
  Settings,
  Sync,
  AlertCircle,
  CheckCircle
} from "lucide-react"

export default function MobilePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [notifications, setNotifications] = useState(true)

  // PWA Installation handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false)
    }

    // Network status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const handleInstallPWA = async () => {
    if (!installPrompt) return

    const result = await installPrompt.prompt()
    console.log('PWA install result:', result)
    setInstallPrompt(null)
    setIsInstallable(false)
  }

  const handleSync = () => {
    setSyncProgress(0)
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Intino</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600" />
                )}
                <Signal className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* PWA Install Banner */}
        {isInstallable && (
          <div className="bg-blue-600 text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium">Install Intino App</p>
                  <p className="text-xs opacity-90">Add to home screen for faster access</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleInstallPWA}
              >
                Install
              </Button>
            </div>
          </div>
        )}

        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-orange-600 text-white px-4 py-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">You're offline. Some features may be limited.</span>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$1,247</p>
                <p className="text-xs text-gray-600">Today's Profit</p>
              </div>
            </Card>
            <Card className="p-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">23</p>
                <p className="text-xs text-gray-600">Pending Orders</p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <Package className="w-5 h-5" />
                  <span className="text-xs">Products</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs">Trends</span>
                </Button>
              </div>
              <Button 
                className="w-full h-12 flex items-center justify-center space-x-2"
                onClick={handleSync}
                disabled={syncProgress > 0 && syncProgress < 100}
              >
                <Sync className={`w-4 h-4 ${syncProgress > 0 && syncProgress < 100 ? 'animate-spin' : ''}`} />
                <span>
                  {syncProgress > 0 && syncProgress < 100 ? 'Syncing...' : 'Sync All Data'}
                </span>
              </Button>
              {syncProgress > 0 && syncProgress < 100 && (
                <Progress value={syncProgress} className="w-full" />
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Order #1234 shipped</p>
                  <p className="text-xs text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">New trending product found</p>
                  <p className="text-xs text-gray-600">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Price alert: Supplier increase</p>
                  <p className="text-xs text-gray-600">1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Mobile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-gray-600">Get alerts for orders and trends</p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Offline Mode</p>
                  <p className="text-xs text-gray-600">Cache data for offline access</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-sync</p>
                  <p className="text-xs text-gray-600">Sync data in background</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* PWA Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Mobile Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Offline Access</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Badge variant={notifications ? "default" : "secondary"}>
                    {notifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Sync</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Home Screen Install</span>
                  <Badge variant={isInstallable ? "secondary" : "default"}>
                    {isInstallable ? "Available" : "Installed"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Navigation */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
          <div className="flex items-center justify-around">
            <Button variant="ghost" className="flex-col space-y-1 h-12">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 h-12">
              <Package className="w-5 h-5" />
              <span className="text-xs">Products</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 h-12">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Trends</span>
            </Button>
            <Button variant="ghost" className="flex-col space-y-1 h-12">
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
