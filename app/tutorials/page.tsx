
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Zap, Globe, RefreshCw, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started: Connect Your First Store",
      description: "Learn how to connect your Shopify or WooCommerce store in under 2 minutes",
      duration: "1:30",
      category: "Setup",
      level: "Beginner",
      icon: Globe,
      videoUrl: "#",
      steps: ["Create account", "Get API credentials", "Connect store", "Verify connection"]
    },
    {
      id: 2,
      title: "Setting Up Automated Pricing Rules",
      description: "Configure profit margins and pricing strategies for maximum profitability",
      duration: "2:15",
      category: "Pricing",
      level: "Beginner",
      icon: TrendingUp,
      videoUrl: "#",
      steps: ["Set target margins", "Configure minimum thresholds", "Enable auto-updates", "Test pricing rules"]
    },
    {
      id: 3,
      title: "Managing Returns with WhatsApp Automation",
      description: "Automate customer return requests and reduce manual work by 80%",
      duration: "1:45",
      category: "Returns",
      level: "Intermediate",
      icon: RefreshCw,
      videoUrl: "#",
      steps: ["Connect WhatsApp Business", "Set up automated flows", "Configure approval rules", "Test customer journey"]
    },
    {
      id: 4,
      title: "Finding Winning Products with Trend Scanner",
      description: "Discover viral products before your competitors using AI-powered trend analysis",
      duration: "3:20",
      category: "Trends",
      level: "Advanced",
      icon: TrendingUp,
      videoUrl: "#",
      steps: ["Configure target markets", "Set trend alerts", "Analyze opportunity scores", "Add winning products"]
    },
    {
      id: 5,
      title: "Advanced Profit Dashboard Analytics",
      description: "Understand your real profit margins and identify optimization opportunities",
      duration: "2:45",
      category: "Analytics",
      level: "Intermediate",
      icon: TrendingUp,
      videoUrl: "#",
      steps: ["Navigate profit dashboard", "Analyze cost breakdowns", "Identify top performers", "Optimize margins"]
    },
    {
      id: 6,
      title: "Bulk Price Updates and Optimization",
      description: "Update hundreds of products at once with intelligent pricing suggestions",
      duration: "1:55",
      category: "Pricing",
      level: "Intermediate",
      icon: Settings,
      videoUrl: "#",
      steps: ["Select products", "Review AI suggestions", "Apply bulk updates", "Monitor results"]
    }
  ]

  const categories = ["All", "Setup", "Pricing", "Returns", "Trends", "Analytics"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Intino</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Tutorials</h1>
            <p className="text-xl text-gray-600">
              Master Intino's features with our step-by-step video guides
            </p>
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                2,500+ students
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                15 minutes total
              </div>
              <div className="flex items-center">
                <Play className="w-4 h-4 mr-2" />
                6 video guides
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tutorials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <tutorial.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {tutorial.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {tutorial.duration}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription>{tutorial.description}</CardDescription>
                  <Badge 
                    variant={tutorial.level === "Beginner" ? "default" : tutorial.level === "Intermediate" ? "secondary" : "destructive"}
                    className="w-fit"
                  >
                    {tutorial.level}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">What you'll learn:</h4>
                    <ul className="space-y-1">
                      {tutorial.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-2">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 group-hover:bg-blue-600 transition-colors">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <div className="text-center bg-white rounded-lg p-8 mt-16">
            <h3 className="text-2xl font-semibold mb-4">Need Personal Help?</h3>
            <p className="text-gray-600 mb-6">
              Schedule a free 1-on-1 onboarding call with our experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Schedule Free Call
              </Button>
              <Button variant="outline">
                Join Community
              </Button>
              <Link href="/faq">
                <Button variant="outline">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
