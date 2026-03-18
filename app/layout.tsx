import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
    default: "ToolStack — Free Business Tools for Freelancers & SMEs",
    template: "%s | ToolStack",
  },
  description:
    "Free online business tools: invoice generator, VAT calculator, currency converter, tax rates, meeting planner and more. AI-powered legal documents for Pro users.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://toolstack.io"),
  openGraph: {
    siteName: "ToolStack",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
