
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Store,
  DollarSign,
  Truck,
  Target,
  ArrowRight,
  ArrowLeft,
  StoreIcon as Shopify,
  Globe,
  Zap,
} from "lucide-react"

const steps = [
  { id: 1, name: "Connect Store", icon: Store },
  { id: 2, name: "Set Currency", icon: DollarSign },
  { id: 3, name: "Shipping Defaults", icon: Truck },
  { id: 4, name: "Margin Rules", icon: Target },
]

export default function OnboardingPage() {
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
    minimumMargin: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinishOnboarding = () => {
    // Logic to save onboarding data and redirect
    console.log("Onboarding finished:", formData)
    
    // Set onboarding completion in localStorage
    localStorage.setItem('onboarding_completed', 'true')

    // Redirect to the dashboard
    window.location.href = '/dashboard'
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 page-transition px-4 md:px-0">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 floating shadow-premium">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Welcome to Intino!</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Let's get your dropshipping automation set up in just a few steps.</p>
        <div className="glass-card border border-blue-200/50 dark:border-blue-700/50 rounded-xl p-6 mt-6 max-w-md mx-auto shadow-premium">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            🚀 <strong>Quick Setup:</strong> Most users complete this in under 5 minutes and see their first automated price recommendations immediately!
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-6">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    currentStep > step.id
                      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-green-500/25"
                      : currentStep === step.id
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-blue-500/25 animate-pulse"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  currentStep >= step.id 
                    ? "text-gray-900 dark:text-gray-100" 
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 transition-colors duration-500 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="relative">
          <Progress value={progress} className="w-full h-2" />
          <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 shadow-lg" 
               style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Content */}
      <Card className="glass-card border-white/20 dark:border-gray-700/50 shadow-premium card-hover">
        <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-white/20 dark:border-gray-700/50">
          <CardTitle className="flex items-center space-x-3">
            {currentStepData.icon && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <currentStepData.icon className="w-5 h-5 text-white" />
              </div>
            )}
            <span className="text-xl font-semibold">{currentStepData.name}</span>
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Connect your Shopify or WooCommerce store to start syncing products"}
            {currentStep === 2 && "Set your store's currency and target country for localized pricing"}
            {currentStep === 3 && "Configure default shipping costs and delivery times"}
            {currentStep === 4 && "Define your profit margin rules and pricing strategy"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Connect Store */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Store Platform</Label>
                <Select
                  value={formData.storeProvider}
                  onValueChange={(value) => handleInputChange("storeProvider", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">
                      <div className="flex items-center space-x-2">
                        <Shopify className="w-4 h-4" />
                        <span>Shopify</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="woocommerce">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>WooCommerce</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Store Domain</Label>
                <Input
                  id="domain"
                  placeholder="your-store.myshopify.com"
                  value={formData.storeDomain}
                  onChange={(e) => handleInputChange("storeDomain", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Access Token</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Your store's API access token"
                  value={formData.accessToken}
                  onChange={(e) => handleInputChange("accessToken", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Need help? Check our{" "}
                  <a href="/docs/store-setup" className="text-blue-600 hover:underline">
                    setup guide
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Set Currency */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Store Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your store currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Target Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Shipping Defaults */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shippingCost">Default Shipping Cost</Label>
                <Input
                  id="shippingCost"
                  type="number"
                  placeholder="5.99"
                  value={formData.defaultShippingCost}
                  onChange={(e) => handleInputChange("defaultShippingCost", e.target.value)}
                />
                <p className="text-xs text-gray-500">Average shipping cost from your suppliers</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingTime">Delivery Time (days)</Label>
                <Select
                  value={formData.shippingTime}
                  onValueChange={(value) => handleInputChange("shippingTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select typical delivery time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-14">7-14 days</SelectItem>
                    <SelectItem value="14-21">14-21 days</SelectItem>
                    <SelectItem value="21-30">21-30 days</SelectItem>
                    <SelectItem value="30+">30+ days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Margin Rules */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetMargin">Target Profit Margin (%)</Label>
                <Input
                  id="targetMargin"
                  type="number"
                  placeholder="30"
                  value={formData.targetMargin}
                  onChange={(e) => handleInputChange("targetMargin", e.target.value)}
                />
                <p className="text-xs text-gray-500">Your ideal profit margin percentage</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumMargin">Minimum Margin (%)</Label>
                <Input
                  id="minimumMargin"
                  type="number"
                  placeholder="15"
                  value={formData.minimumMargin}
                  onChange={(e) => handleInputChange("minimumMargin", e.target.value)}
                />
                <p className="text-xs text-gray-500">Never price below this margin</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Pricing Strategy Preview</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Products will be priced for {formData.targetMargin || "30"}% margin when possible</p>
                  <p>• Minimum margin protection at {formData.minimumMargin || "15"}%</p>
                  <p>• AI will suggest price adjustments based on market conditions</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button variant="ghost" onClick={handleFinishOnboarding} className="text-gray-500">
            Skip for now
          </Button>
        </div>
        <div className="flex space-x-3">
          {currentStep === steps.length ? (
            <Button onClick={handleFinishOnboarding} className="flex-1">
              Complete Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
