
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Store, DollarSign, Globe, Truck, TrendingUp, Check } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    storeProvider: "",
    storeDomain: "",
    accessToken: "",
    currency: "",
    country: "",
    defaultShippingCost: "",
    shippingTime: "",
    targetMargin: "",
    minimumMargin: ""
  })

  const steps = [
    {
      id: 1,
      title: "Connect Store",
      description: "Link your ecommerce store",
      icon: Store
    },
    {
      id: 2,
      title: "Set Currency",
      description: "Configure your pricing settings",
      icon: DollarSign
    },
    {
      id: 3,
      title: "Shipping Defaults",
      description: "Set up shipping preferences",
      icon: Truck
    },
    {
      id: 4,
      title: "Margin Rules",
      description: "Define profit margins",
      icon: TrendingUp
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleFinish = async () => {
    console.log("Onboarding finished:", formData)
    
    // Mark onboarding as completed
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true')

      // Create a mock user session
      const mockUser = {
        id: 'mock-user-1',
        email: 'user@example.com',
        user_metadata: {
          full_name: 'Demo User'
        }
      }
      localStorage.setItem('mock_user', JSON.stringify(mockUser))
    }

    // Redirect to dashboard
    router.push('/dashboard/products')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Connect Your Store</h2>
              <p className="text-gray-600">Connect your Shopify or WooCommerce store to start syncing products.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="storeProvider">Store Platform</Label>
                <Select value={formData.storeProvider} onValueChange={(value) => handleInputChange("storeProvider", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="storeDomain">Store Domain</Label>
                <Input
                  id="storeDomain"
                  placeholder="yourstore.myshopify.com"
                  value={formData.storeDomain}
                  onChange={(e) => handleInputChange("storeDomain", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="accessToken">Access Token</Label>
                <Input
                  id="accessToken"
                  type="password"
                  placeholder="Your API access token"
                  value={formData.accessToken}
                  onChange={(e) => handleInputChange("accessToken", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Set Currency</h2>
              <p className="text-gray-600">Configure your default currency and location settings.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country">Target Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Shipping Defaults</h2>
              <p className="text-gray-600">Set your default shipping costs and delivery times.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="defaultShippingCost">Default Shipping Cost</Label>
                <Input
                  id="defaultShippingCost"
                  placeholder="9.99"
                  value={formData.defaultShippingCost}
                  onChange={(e) => handleInputChange("defaultShippingCost", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="shippingTime">Default Shipping Time</Label>
                <Select value={formData.shippingTime} onValueChange={(value) => handleInputChange("shippingTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-14">7-14 days</SelectItem>
                    <SelectItem value="10-20">10-20 days</SelectItem>
                    <SelectItem value="15-30">15-30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Margin Rules</h2>
              <p className="text-gray-600">Define your profit margin preferences for automated pricing.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="targetMargin">Target Margin (%)</Label>
                <Input
                  id="targetMargin"
                  placeholder="40"
                  value={formData.targetMargin}
                  onChange={(e) => handleInputChange("targetMargin", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="minimumMargin">Minimum Margin (%)</Label>
                <Input
                  id="minimumMargin"
                  placeholder="20"
                  value={formData.minimumMargin}
                  onChange={(e) => handleInputChange("minimumMargin", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Intino</span>
            <span className="text-xs text-gray-500">Growth Suite</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-4">
                {(() => {
                  const StepIcon = steps[currentStep - 1]?.icon || Store
                  return <StepIcon className="w-8 h-8 text-blue-600" />
                })()}
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  {currentStep === steps.length ? "Complete Setup" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
