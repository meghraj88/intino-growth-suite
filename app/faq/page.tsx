
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Shield, Globe, CreditCard, Zap, MessageCircle, Users } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
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
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Intino's dropshipping automation platform
            </p>
          </div>

          {/* Security & Trust */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Security & Trust
              </CardTitle>
              <CardDescription>Your data and store security</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="data-safety">
                  <AccordionTrigger>Is my store data safe with Intino?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! We use bank-level encryption (AES-256) and store all data on secure, SOC 2 compliant servers. We never store your store passwords - only secure API tokens that you can revoke anytime. Your customer data stays in your store; we only access product and order information needed for automation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="access-permissions">
                  <AccordionTrigger>What permissions does Intino need from my store?</AccordionTrigger>
                  <AccordionContent>
                    We only request minimal permissions: read access to products, orders, and inventory, plus write access to update product prices. We never access customer personal data, payment information, or your store's admin settings. You maintain full control of your store at all times.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="disconnect-store">
                  <AccordionTrigger>Can I disconnect my store anytime?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can disconnect your store instantly from your dashboard settings. Once disconnected, we immediately stop all automated actions and delete your store data within 30 days. There are no contracts or lock-in periods.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Features & Support */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Features & Support
              </CardTitle>
              <CardDescription>Platform capabilities and coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="supported-countries">
                  <AccordionTrigger>Which countries do you support?</AccordionTrigger>
                  <AccordionContent>
                    Intino supports dropshippers worldwide! Our platform works with stores in 50+ countries including USA, Canada, UK, Australia, Germany, France, India, UAE, and more. We support multiple currencies (USD, EUR, GBP, CAD, AUD, INR) and can track trends across different geographical markets.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="store-platforms">
                  <AccordionTrigger>Which store platforms do you integrate with?</AccordionTrigger>
                  <AccordionContent>
                    Currently, we support Shopify and WooCommerce stores. Shopify integration is fully automated with our one-click setup. WooCommerce requires a simple plugin installation. We're planning to add BigCommerce, Magento, and other platforms based on user demand.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="supplier-sources">
                  <AccordionTrigger>Which suppliers and marketplaces do you monitor?</AccordionTrigger>
                  <AccordionContent>
                    We monitor prices from AliExpress, DHgate, 1688, Oberlo, Spocket, and 20+ other major dropshipping suppliers. Our AI also scans trending products on Amazon, eBay, and social commerce platforms to identify new opportunities before your competitors.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="whatsapp-integration">
                  <AccordionTrigger>How does WhatsApp integration work?</AccordionTrigger>
                  <AccordionContent>
                    Our WhatsApp Business API integration sends automated alerts for price changes, new trends, and return requests directly to your phone. You can also set up automated customer support flows for common return and refund requests, saving hours of manual work.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Billing & Plans */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                Billing & Plans
              </CardTitle>
              <CardDescription>Pricing and subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="free-trial">
                  <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We offer a 14-day free trial with full access to all features. No credit card required to start. You can connect your store, sync products, and test all automation features risk-free. The trial includes up to 100 products and 50 orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pricing-plans">
                  <AccordionTrigger>What are your pricing plans?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div><strong>Starter:</strong> $29/month - Up to 500 products, 200 orders/month, basic automation</div>
                      <div><strong>Growth:</strong> $79/month - Up to 2,000 products, 1,000 orders/month, advanced AI features</div>
                      <div><strong>Pro:</strong> $149/month - Unlimited products & orders, priority support, custom integrations</div>
                      <p className="text-sm text-gray-600 mt-3">All plans include WhatsApp alerts, trend scanning, and returns management. Annual plans get 20% discount.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel-subscription">
                  <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! You can cancel your subscription anytime with just one click from your dashboard. There are no cancellation fees, contracts, or hidden charges. Your account remains active until the end of your current billing period, and you can export all your data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="refund-policy">
                  <AccordionTrigger>What's your refund policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with Intino for any reason within the first 30 days, contact our support team for a full refund. After 30 days, we prorate refunds based on unused days in your billing cycle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-600" />
                Getting Started
              </CardTitle>
              <CardDescription>Setup and onboarding help</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="setup-time">
                  <AccordionTrigger>How long does setup take?</AccordionTrigger>
                  <AccordionContent>
                    Most users complete setup in under 10 minutes! Our guided onboarding wizard walks you through: (1) connecting your store (2 minutes), (2) syncing products (3 minutes), (3) setting pricing rules (3 minutes), and (4) configuring alerts (2 minutes). You'll start seeing automated recommendations immediately.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="migration-help">
                  <AccordionTrigger>Do you help migrate from other tools?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Our support team provides free migration assistance from other dropshipping tools like Oberlo, AutoDS, or Zik Analytics. We'll help import your product data, supplier connections, and pricing rules. Migration typically takes 1-2 business days with zero downtime for your store.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="training-support">
                  <AccordionTrigger>Do you provide training and support?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! We offer: free onboarding calls for new users, comprehensive video tutorials, live chat support (9 AM - 9 PM IST), email support with 4-hour response time, and a private Facebook community with 2,000+ successful dropshippers sharing tips and strategies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Still have questions? */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you succeed with dropshipping automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Live Chat
              </Button>
              <Button variant="outline">
                Schedule Demo Call
              </Button>
              <Link href="/auth/signup">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
