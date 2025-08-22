
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Package,
  Zap,
  Globe,
  Shield,
  Clock,
  BarChart3,
  RefreshCw,
  Target,
  Users,
  Award,
  Sparkles
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Intino</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-gray-600 hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="btn-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Dropshipping Suite
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto leading-tight">
              Automate Your 
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {" "}Dropshipping Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your dropshipping business with AI-powered optimization. 
              Dynamic pricing, intelligent returns management, and real-time trend scanning 
              to maximize your profits and minimize your workload.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 group">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything you need to scale your dropshipping business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools handles the complex parts of dropshipping 
              so you can focus on growth and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: DollarSign,
                title: "Dynamic Pricing",
                description: "AI-powered price optimization that automatically adjusts based on market conditions, competition, and profit targets.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: TrendingUp,
                title: "Trend Scanning",
                description: "Real-time market analysis to identify winning products before your competition discovers them.",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: RefreshCw,
                title: "Smart Returns",
                description: "Automated returns processing with intelligent decision-making to minimize losses and maintain customer satisfaction.",
                gradient: "from-purple-500 to-violet-600"
              },
              {
                icon: Package,
                title: "Product Sync",
                description: "Seamless synchronization across all your stores with real-time inventory and pricing updates.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Comprehensive insights into your business performance with actionable recommendations for growth.",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Proactive monitoring and alerts to protect your business from potential losses and policy violations.",
                gradient: "from-rose-500 to-pink-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="premium-card group cursor-pointer h-full">
                <CardContent className="p-8">
                  <div className={`metric-icon bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-children">
            {[
              { value: "10,000+", label: "Active Users", icon: Users },
              { value: "99.9%", label: "Uptime", icon: Clock },
              { value: "$50M+", label: "Revenue Generated", icon: Target },
              { value: "4.9/5", label: "Customer Rating", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center slide-up">
                <div className="metric-icon bg-gradient-to-br from-primary to-purple-600 mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="slide-up">
            <h2 className="text-4xl font-bold mb-6">
              Ready to transform your dropshipping business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful entrepreneurs who are already using Intino to scale their businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Intino</span>
              </div>
              <p className="text-gray-400">
                The unified dropshipping growth suite that powers successful e-commerce businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intino. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
