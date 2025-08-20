

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Intino</h1>
          <p className="text-xl text-gray-600">
            Unified Dropship Growth Suite - आपके dropshipping business को automate करने का complete solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">हमारा Mission</h2>
            <p className="text-gray-700">
              Intino एक comprehensive SaaS platform है जो dropshipping automation के लिए बनाया गया है। 
              हमारा लक्ष्य आपके e-commerce business को streamline करना और innovative solutions के साथ grow करना है।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Key Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Dynamic Price & Profit Optimizer</li>
              <li>• Smart Returns & Refund Manager</li>
              <li>• Localized Trend Scanner & Alerts</li>
              <li>• AI-powered pricing suggestions</li>
              <li>• WhatsApp integration</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/dashboard" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            Dashboard पर जाएं
          </Link>
          <Link 
            href="/" 
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Home पर वापस जाएं
          </Link>
        </div>
      </div>
    </div>
  );
}
