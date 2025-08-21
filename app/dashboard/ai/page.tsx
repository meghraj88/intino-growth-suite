
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  FileText, 
  Search, 
  Sparkles,
  BarChart3,
  Target,
  Lightbulb,
  RefreshCw,
  Copy,
  Download
} from "lucide-react"

interface AIInsight {
  id: string
  type: 'price_optimization' | 'demand_forecast' | 'seo_recommendation'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  suggested_action: string
  created_at: string
}

const mockInsights: AIInsight[] = [
  {
    id: "insight-1",
    type: "price_optimization",
    title: "Increase price for Wireless Earbuds by 15%",
    description: "Market analysis shows competitors pricing 20% higher with similar features. Your current margin allows for price increase.",
    confidence: 92,
    impact: "high",
    suggested_action: "Update price from $42.99 to $49.99",
    created_at: new Date().toISOString()
  },
  {
    id: "insight-2", 
    type: "demand_forecast",
    title: "High demand expected for LED lights in next 2 weeks",
    description: "Search trends and seasonal patterns indicate 40% increase in demand. Consider stocking up.",
    confidence: 87,
    impact: "medium",
    suggested_action: "Increase inventory by 30 units",
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "insight-3",
    type: "seo_recommendation", 
    title: "Optimize product titles for better search visibility",
    description: "Adding trending keywords can improve search ranking by 25%.",
    confidence: 78,
    impact: "medium",
    suggested_action: "Update 12 product titles with suggested keywords",
    created_at: new Date(Date.now() - 7200000).toISOString()
  }
]

export default function AIPage() {
  const [insights, setInsights] = useState<AIInsight[]>(mockInsights)
  const [productDescription, setProductDescription] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("")

  const generateDescription = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`🚀 **Revolutionary Wireless Bluetooth Earbuds Pro** 🎵

✅ **Crystal Clear Sound Quality** - Advanced noise cancellation technology delivers studio-quality audio
✅ **25+ Hour Battery Life** - Never worry about running out of power during your day
✅ **Comfortable All-Day Wear** - Ergonomically designed for maximum comfort
✅ **Water Resistant IPX6** - Perfect for workouts and outdoor activities
✅ **Quick Charge Technology** - 15 minutes charging = 3 hours playtime

**Perfect for:**
• Music lovers who demand quality 🎶
• Athletes and fitness enthusiasts 💪  
• Busy professionals on-the-go 💼
• Anyone seeking premium audio experience 🎧

**What makes these special:**
Our earbuds use cutting-edge Bluetooth 5.3 technology for seamless connectivity. The premium drivers deliver deep bass and crisp highs that will transform your listening experience.

⚡ **Limited Time Offer** - Get yours before stock runs out!
🚀 **Free shipping worldwide** 
💯 **30-day money-back guarantee**

**Order now and join thousands of satisfied customers!** ⭐⭐⭐⭐⭐`)
      setIsGenerating(false)
    }, 3000)
  }

  const generateSEOKeywords = () => {
    return [
      "wireless bluetooth earbuds",
      "noise cancelling headphones", 
      "sports earbuds waterproof",
      "long battery life earphones",
      "premium audio quality",
      "wireless charging case",
      "fitness earbuds"
    ]
  }

  const getImpactBadge = (impact: string) => {
    const variants = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    }
    return variants[impact as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getInsightIcon = (type: string) => {
    const icons = {
      'price_optimization': TrendingUp,
      'demand_forecast': BarChart3,
      'seo_recommendation': Search
    }
    const Icon = icons[type as keyof typeof icons] || Brain
    return <Icon className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI Assistant
          </h1>
          <p className="text-gray-600">Leverage artificial intelligence to optimize your dropshipping business</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Insights
          </Button>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate New Insights
          </Button>
        </div>
      </div>

      {/* AI Features Tabs */}
      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="content">Content Generator</TabsTrigger>
          <TabsTrigger value="seo">SEO Optimizer</TabsTrigger>
          <TabsTrigger value="forecasting">Demand Forecasting</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Insights</CardTitle>
                <Brain className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insights.length}</div>
                <p className="text-xs text-muted-foreground">AI recommendations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Impact</CardTitle>
                <Target className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {insights.filter(i => i.impact === 'high').length}
                </div>
                <p className="text-xs text-muted-foreground">Priority actions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                <Zap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
                </div>
                <p className="text-xs text-muted-foreground">AI accuracy</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactBadge(insight.impact)}>
                        {insight.impact.toUpperCase()} IMPACT
                      </Badge>
                      <Badge variant="outline">
                        {insight.confidence}% confident
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{insight.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Suggested Action:</span>
                      <span>{insight.suggested_action}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Content Generator Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                AI Product Description Generator
              </CardTitle>
              <CardDescription>
                Generate compelling product descriptions that convert visitors into customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input 
                  placeholder="Enter product name (e.g., Wireless Bluetooth Earbuds)"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Features (optional)</label>
                <Textarea 
                  placeholder="Enter key features, benefits, or selling points..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={generateDescription} 
                disabled={isGenerating || !selectedProduct}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Description
                  </>
                )}
              </Button>
              
              {generatedContent && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Description</label>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Optimizer Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                SEO Optimization Recommendations
              </CardTitle>
              <CardDescription>
                Improve your product visibility with AI-powered SEO suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trending Keywords</label>
                  <div className="flex flex-wrap gap-2">
                    {generateSEOKeywords().map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SEO Score</label>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-green-600">85/100</div>
                    <Badge className="bg-green-100 text-green-800">Good</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Optimization Suggestions:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Add trending keywords to product titles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Optimize image alt text for better accessibility</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>Improve meta descriptions for higher click-through rates</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demand Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                AI Demand Forecasting
              </CardTitle>
              <CardDescription>
                Predict future demand and optimize your inventory planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Advanced Forecasting Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI is learning your sales patterns to provide accurate demand predictions
                  </p>
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Join Beta Program
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
