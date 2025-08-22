import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Shield,
  Globe,
  MapPin,
  CheckCircle,
  Star,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  MessageCircle,
  Smartphone,
  Brain,
  Target,
  Truck,
  AlertTriangle,
  Database,
  Settings,
  Lock,
  Headphones,
  Award,
  Rocket,
  Activity,
  TrendingDown,
  Eye,
  FileText,
  Package,
  Store,
  CreditCard,
  Wifi,
  Download,
  Upload,
  Calendar,
  Mail,
  Phone,
  Video,
  Briefcase,
  PieChart,
  LineChart,
  BarChart,
  Filter,
  Search,
  Bell,
  UserCheck,
  ShoppingCart,
  Layers,
  Code,
  Repeat,
  Gauge,
  Sparkles,
  Lightbulb,
  BookOpen
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Intino</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">
              Reviews
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Docs
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/onboarding">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300">
                Sign in
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg px-4 py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:bg-blue-100 px-4 py-2 text-sm font-medium">
            🚀 #1 Unified Dropship Growth Suite in India
          </Badge>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Scale Your Dropshipping Business with 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Powered Automation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            Transform your dropshipping operations with intelligent pricing optimization, automated returns management, 
            and real-time trend detection. Join 10,000+ successful dropshippers who've increased their profits by 40% on average.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-green-600">₹50Cr+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">40%</div>
              <div className="text-sm text-gray-600">Average Profit Increase</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 shadow-lg">
              <div className="text-2xl font-bold text-orange-600">80%</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start 14-Day Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                <Video className="mr-2 w-5 h-5" />
                Watch Live Demo
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">✅ No credit card required • ✅ Cancel anytime • ✅ Setup in 5 minutes</p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">Trusted by leading dropshipping brands across India and globally</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Store className="w-8 h-8" />
                <span className="font-semibold">Shopify Partners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8" />
                <span className="font-semibold">WooCommerce Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8" />
                <span className="font-semibold">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-8 h-8" />
                <span className="font-semibold">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dropshipping Challenges? We've Got You Covered</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop losing money on manual processes, pricing mistakes, and missed opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-red-700">Pricing Chaos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>• Manual price updates taking hours</li>
                  <li>• Supplier price changes missed</li>
                  <li>• Wrong margins killing profits</li>
                  <li>• Competitor pricing unknown</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-700">Returns Nightmare</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>• Customer complaints flooding in</li>
                  <li>• Manual return processing</li>
                  <li>• Refund fraud detection</li>
                  <li>• Supplier communication delays</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">Missed Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-gray-600">
                  <li>• Trending products discovered late</li>
                  <li>• Market research taking weeks</li>
                  <li>• Regional preferences unknown</li>
                  <li>• Competitor moves untracked</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How Intino Transforms Your Business</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with automated dropshipping in just 3 simple steps and see results within 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg border">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Connect Your Store</h3>
              <p className="text-gray-600 mb-6">
                Securely connect your Shopify or WooCommerce store in under 2 minutes. 
                Our advanced integration syncs your entire catalog automatically.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-sm mb-2">✅ What Gets Connected:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Product catalog (unlimited products)</li>
                  <li>• Order history and customer data</li>
                  <li>• Supplier information and pricing</li>
                  <li>• Inventory levels and stock status</li>
                </ul>
              </div>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg border">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Takes Over</h3>
              <p className="text-gray-600 mb-6">
                Our AI analyzes your products, competitors, and market conditions to create 
                intelligent automation rules tailored to your business goals.
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-sm mb-2">🤖 AI Capabilities:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time price optimization</li>
                  <li>• Demand forecasting and trends</li>
                  <li>• Automated return risk assessment</li>
                  <li>• Market opportunity detection</li>
                </ul>
              </div>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg border">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Watch Profits Grow</h3>
              <p className="text-gray-600 mb-6">
                Sit back as Intino automatically optimizes your prices, processes returns, 
                and alerts you to trending opportunities - 24/7.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-sm mb-2">📈 Expected Results:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 40% increase in profit margins</li>
                  <li>• 80% reduction in manual work</li>
                  <li>• 95% faster trend detection</li>
                  <li>• 60% fewer customer complaints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Three Powerful Tools, One Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to scale your dropshipping business intelligently with cutting-edge automation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Dynamic Price Optimizer */}
            <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Dynamic Price Optimizer</CardTitle>
                <CardDescription className="text-lg">
                  AI-powered pricing that adapts to market conditions in real-time, maximizing your profits automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold text-blue-700 mb-2">🎯 Smart Pricing Features:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time supplier price monitoring</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Competitor price tracking</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Dynamic margin optimization</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Bulk price updates (1000+ products)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Profit protection rules</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />A/B price testing</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Average Result:</strong> 35-45% increase in profit margins within 30 days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Returns Manager */}
            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-green-50 to-green-100/50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Smart Returns Manager</CardTitle>
                <CardDescription className="text-lg">
                  Automated return processing with fraud detection and customer satisfaction optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold text-green-700 mb-2">🔄 Return Automation:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Auto-approve low-risk returns</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />WhatsApp customer flows</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Fraud risk prediction (95% accuracy)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Custom resolution workflows</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Supplier communication automation</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Return analytics and insights</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>Average Result:</strong> 70% reduction in return processing time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localized Trend Scanner */}
            <Card className="border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-purple-50 to-purple-100/50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Localized Trend Scanner</CardTitle>
                <CardDescription className="text-lg">
                  Discover viral products before your competitors with geo-targeted trend detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold text-purple-700 mb-2">📍 Trend Intelligence:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Country-specific trend analysis</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time marketplace scanning</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Social media trend monitoring</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Instant WhatsApp & email alerts</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Opportunity scoring (1-100)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Competitor movement tracking</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm text-purple-800">
                      <strong>Average Result:</strong> Discover trends 7-14 days before competitors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced Features for Power Users</h2>
            <p className="text-xl text-gray-600">
              Go beyond basic automation with enterprise-grade capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Multi-Store Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Manage unlimited stores from one dashboard</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Deep insights with custom reports</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">WhatsApp Integration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Automated customer communication</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Code className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">API Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Integrate with your existing tools</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Smartphone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Mobile App</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Manage on-the-go with iOS/Android</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Bank-level encryption & compliance</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Headphones className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <CardTitle className="text-lg">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Live chat, phone & email support</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Repeat className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Auto-Sync</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Real-time data synchronization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose the plan that fits your business size. All plans include our core features.
            </p>
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 rounded-md bg-white shadow-sm font-medium text-sm">Monthly</button>
              <button className="px-4 py-2 rounded-md font-medium text-sm text-gray-600">Yearly (Save 20%)</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  ₹999<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">Perfect for new dropshippers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Up to 500 products</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />1 store connection</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Basic price optimization</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Email support</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Mobile app access</li>
                </ul>
                <Button className="w-full" variant="outline">Start Free Trial</Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-blue-500 hover:border-blue-600 transition-all duration-300 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mt-4">
                  ₹2,999<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Up to 5,000 products</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />5 store connections</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Advanced AI optimization</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />WhatsApp integration</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Priority support</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Advanced analytics</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Custom<span className="text-lg text-gray-600"> pricing</span>
                </div>
                <CardDescription className="mt-2">For large-scale operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Unlimited products</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Unlimited stores</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Custom AI models</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Dedicated account manager</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />API access</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Custom integrations</li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include 14-day free trial • No setup fees • Cancel anytime</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center"><Shield className="w-4 h-4 mr-1" />99.9% Uptime SLA</div>
              <div className="flex items-center"><Lock className="w-4 h-4 mr-1" />Bank-level Security</div>
              <div className="flex items-center"><Headphones className="w-4 h-4 mr-1" />24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why 10,000+ Dropshippers Choose Intino</h2>
            <p className="text-xl text-gray-600">
              Join the successful entrepreneurs who've transformed their dropshipping businesses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Reduce Risk</h3>
              <p className="text-gray-600 text-lg">
                Predictive analytics help you avoid costly refunds and chargebacks. 
                Our fraud detection saves merchants an average of ₹50,000/month.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Save Time</h3>
              <p className="text-gray-600 text-lg">
                Automate 80% of your daily dropshipping tasks. Focus on scaling 
                while Intino handles pricing, returns, and trend monitoring.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Scale Globally</h3>
              <p className="text-gray-600 text-lg">
                Localized insights for every market you want to enter. 
                Expand to new countries with confidence using our regional data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories from Real Users</h2>
            <p className="text-xl text-gray-600">
              See how Intino has transformed dropshipping businesses across India and globally
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "Intino increased my profit margins by 42% in just 6 weeks! The automated pricing 
                  suggestions are incredibly accurate. I wish I had found this tool earlier."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder-user.jpg"
                    alt="Rahul Sharma"
                    className="w-14 h-14 rounded-full mr-4 border-2 border-blue-200"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Rahul Sharma</h4>
                    <p className="text-sm text-gray-600">Electronics Store Owner, Delhi</p>
                    <p className="text-xs text-blue-600 font-medium">Revenue: ₹12L/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "The returns management feature is a game-changer! Saved me 15+ hours per week. 
                  My customers love the WhatsApp integration - it feels so professional."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder-user.jpg"
                    alt="Sarah Johnson"
                    className="w-14 h-14 rounded-full mr-4 border-2 border-green-200"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Fashion Dropshipper, Mumbai</p>
                    <p className="text-xs text-green-600 font-medium">Revenue: ₹8L/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  "Found 3 viral products before my competitors using the trend scanner. 
                  My sales tripled in 2 months! The ROI on Intino is incredible."
                </p>
                <div className="flex items-center">
                  <img
                    src="/placeholder-user.jpg"
                    alt="Ahmed Hassan"
                    className="w-14 h-14 rounded-full mr-4 border-2 border-purple-200"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Ahmed Hassan</h4>
                    <p className="text-sm text-gray-600">Multi-niche Store, Bangalore</p>
                    <p className="text-xs text-purple-600 font-medium">Revenue: ₹25L/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* More testimonials */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Best investment I made for my dropshipping business. The AI literally runs my store while I sleep!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">MK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Manjeet Kaur</h4>
                    <p className="text-xs text-gray-600">Home & Garden Store, Chandigarh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Scaled from ₹2L to ₹15L monthly revenue in 6 months using Intino's trend insights and pricing automation."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">VP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vikram Patel</h4>
                    <p className="text-xs text-gray-600">Sports & Fitness, Pune</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about getting started with Intino
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How quickly can I see results?</h3>
                <p className="text-gray-600">Most users see improvements within 24-48 hours of setup. Pricing optimization starts immediately, and trend alerts begin within the first week.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is my data secure?</h3>
                <p className="text-gray-600">Yes! We use bank-level encryption and are SOC 2 compliant. Your store data is never shared with third parties and is protected by enterprise-grade security.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I connect multiple stores?</h3>
                <p className="text-gray-600">Absolutely! Our Professional plan supports up to 5 stores, and Enterprise plans support unlimited stores from a single dashboard.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Do you support international markets?</h3>
                <p className="text-gray-600">Yes! We support 50+ countries with localized pricing, currency conversion, and region-specific trend detection for global dropshipping.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">What if I need help with setup?</h3>
                <p className="text-gray-600">Our onboarding team provides free 1-on-1 setup assistance. We also offer live chat support and comprehensive documentation to get you started quickly.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time with no cancellation fees. Your data remains accessible for 30 days after cancellation.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq">
              <Button variant="outline" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to 10X Your Dropshipping Revenue?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 10,000+ successful dropshippers using Intino to maximize their profits. 
            Start your free trial today and see results within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/onboarding">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your Free 14-Day Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Calendar className="mr-2 w-5 h-5" />
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" />14-day free trial</div>
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" />No credit card required</div>
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" />Setup in 5 minutes</div>
            <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-1" />Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Intino</span>
              </div>
              <p className="text-gray-400 mb-4">
                The complete dropshipping automation platform trusted by 10,000+ entrepreneurs worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/mobile" className="hover:text-white transition-colors">Mobile App</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; 2024 Intino Technologies Pvt Ltd. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}