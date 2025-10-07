import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const suisseIntl = Inter({
  subsets: ["latin"],
  variable: "--font-suisse",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SWISS POLL INTERNATIONAL - Precision Opinion Research & Consumer Insight",
  description:
    "The Signal in the Noise. SWISS POLL INTERNATIONAL delivers precision opinion research and consumer insight to guide your most critical decisions with methodological rigor and uncompromising integrity.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${suisseIntl.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
