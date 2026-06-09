import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Brand font
import "./globals.css";
import { organizationSchema } from "@/lib/seo";
import Script from "next/script";
import StickyCTA from "@/components/StickyCTA";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Foremost.ai | Board-Level AI Advisory',
    template: '%s | Foremost.ai'
  },
  description: 'Applied Intelligence for Leadership. We help boards and executive teams navigate AI with clarity, confidence, and measurable outcomes. Strategic AI advisory for UK and EU organisations.',
  keywords: ['AI advisory', 'board AI strategy', 'executive AI consulting', 'AI governance', 'EU AI Act', 'strategic AI positioning'],
  authors: [{ name: 'Foremost.ai' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://foremost.ai',
    title: 'Foremost.ai | Board-Level AI Advisory',
    description: 'Applied Intelligence for Leadership. Strategic AI advisory that brings clarity, confidence, and measurable outcomes.',
    siteName: 'Foremost.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foremost.ai | Board-Level AI Advisory',
    description: 'Applied Intelligence for Leadership.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://foremost.ai'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="main-content">
          {children}
        </div>
        <StickyCTA />
      </body>
    </html>
  );
}
