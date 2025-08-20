// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Intino</h1>
        <p className="mt-4 text-gray-600">
          Intino is a comprehensive SaaS platform for dropshipping automation. Our mission is to streamline your dropshipping experience and help you grow your e-commerce business with innovative solutions.
        </p>
        <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}