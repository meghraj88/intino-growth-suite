
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Intino - Unified Dropship Growth Suite",
  description:
    "Automate your dropshipping success with AI-powered optimization. Dynamic pricing, smart returns, and localized trend scanning.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="font-sans antialiased">
      <body className="min-h-screen bg-background text-foreground font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
