
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, RefreshCw } from "lucide-react"

export default function DebugPage() {
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [showTokens, setShowTokens] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShowDebugInfo = async () => {
    setLoading(true)
    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      setShowDebugInfo(true)
    } catch (error) {
      console.error('Error showing debug info:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEnvStatus = (value: string | undefined) => {
    return value ? "✅ Set" : "❌ Not set"
  }

  const getEnvValue = (value: string | undefined, mockValue: string) => {
    return value || mockValue
  }

  // Client-side environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Mock data for missing env vars
  const mockSupabaseUrl = "https://your-project.supabase.co"
  const mockSupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Debug Information</h1>
          <p className="text-gray-600 mt-2">
            Debug environment variables and application status
          </p>
        </div>

        {/* Show Debug Info Button */}
        <div className="mb-8">
          <Button 
            onClick={handleShowDebugInfo}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span>{loading ? "Loading..." : "Show Debug Info"}</span>
          </Button>
        </div>

        {/* Debug Information Display */}
        {showDebugInfo && (
          <div className="space-y-6">
            {/* Environment Variables Status */}
            <Card>
              <CardHeader>
                <CardTitle>Environment Variables Status</CardTitle>
                <CardDescription>
                  Client-side accessible environment variables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
                    <Badge variant={supabaseUrl ? "default" : "destructive"}>
                      {getEnvStatus(supabaseUrl)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                    <Badge variant={supabaseKey ? "default" : "destructive"}>
                      {getEnvStatus(supabaseKey)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environment Variables Values */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Environment Variables Values</CardTitle>
                    <CardDescription>
                      Actual values (or mock data if missing)
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTokens(!showTokens)}
                  >
                    {showTokens ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Values
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Values
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NEXT_PUBLIC_SUPABASE_URL
                    </label>
                    <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm break-all">
                      {showTokens 
                        ? getEnvValue(supabaseUrl, mockSupabaseUrl)
                        : "••••••••••••••••••••••••••••••••••••••••"
                      }
                    </div>
                    {!supabaseUrl && (
                      <p className="text-amber-600 text-sm mt-1">
                        ⚠️ Using mock data - actual environment variable not set
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NEXT_PUBLIC_SUPABASE_ANON_KEY
                    </label>
                    <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm break-all">
                      {showTokens 
                        ? getEnvValue(supabaseKey, mockSupabaseKey)
                        : "••••••••••••••••••••••••••••••••••••••••"
                      }
                    </div>
                    {!supabaseKey && (
                      <p className="text-amber-600 text-sm mt-1">
                        ⚠️ Using mock data - actual environment variable not set
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Debug Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Debug Information</CardTitle>
                <CardDescription>
                  Runtime and build information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900">Environment</h4>
                    <p className="text-blue-700 text-sm">
                      {process.env.NODE_ENV || 'development'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-900">Build Time</h4>
                    <p className="text-green-700 text-sm">
                      {new Date().toISOString()}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900">Client Side</h4>
                    <p className="text-purple-700 text-sm">
                      {typeof window !== 'undefined' ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
