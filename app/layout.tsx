import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import ChatWidget from "@/components/shared/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolStack — Free Business Tools for Freelancers & Small Businesses",
    template: "%s | ToolStack",
  },
  description:
    "Free online business tools for freelancers and small businesses: invoice generator, VAT calculator, currency converter, tax rates by country, meeting time planner, time converter, and AI-powered legal documents (privacy policy, terms of service, contracts).",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://toolstack.io"),
  keywords: [
    "free invoice generator",
    "VAT calculator",
    "currency converter",
    "tax rates by country",
    "meeting time planner",
    "time converter",
    "privacy policy generator",
    "terms of service generator",
    "contract generator",
    "free business tools",
    "freelancer tools",
    "small business tools",
    "online business tools",
    "AI legal documents",
    "free online tools for freelancers",
  ],
  authors: [{ name: "ToolStack" }],
  creator: "ToolStack",
  publisher: "ToolStack",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "ToolStack",
    type: "website",
    title: "ToolStack — Free Business Tools for Freelancers & Small Businesses",
    description:
      "Free invoice generator, VAT calculator, currency converter, tax rates, meeting planner & AI-powered legal documents. No sign-up needed.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStack — Free Business Tools",
    description:
      "Free invoice generator, VAT calculator, currency converter and more. AI legal docs for Pro users.",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9168891141498952"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
        <ChatWidget />
      </body>
    </html>
  );
}
