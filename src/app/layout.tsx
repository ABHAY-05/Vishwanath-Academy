import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Lora, Playfair_Display, Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-san",
  weight: ["400", "500", "700"],
  display: "swap",
});

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  metadataBase: new URL(seoData.default.url),
  title: {
    default: seoData.default.title,
    template: `%s | ${seoData.default.title.split(" | ")[0]}`,
  },
  description: seoData.default.description,
  keywords: seoData.default.keywords,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: seoData.default.url,
    title: seoData.default.title,
    description: seoData.default.description,
    siteName: "Vishwanath Academy",
    images: [
      {
        url: seoData.default.ogImage,
        width: 1200,
        height: 630,
        alt: "Vishwanath Academy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.default.title,
    description: seoData.default.description,
    images: [seoData.default.ogImage],
  },
};

import { Toaster } from "sonner";

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${playfair.variable} ${lora.variable} ${quicksand.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
