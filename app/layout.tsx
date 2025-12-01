import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const suisseIntl = Inter({
  subsets: ["latin"],
  variable: "--font-suisse",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swiss Poll Int. - Precision Opinion Research & Consumer Insight",
  description:
    "The Signal in the Noise. Swiss Poll International delivers precision opinion research and consumer insight to guide your most critical decisions with methodological rigor and uncompromising integrity.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-sans ${suisseIntl.variable} antialiased`}>
        <ClientLayoutWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </ClientLayoutWrapper>

        <Toaster />
      </body>
    </html>
  );
}

