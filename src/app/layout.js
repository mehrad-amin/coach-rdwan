import { Outfit, Oxanium } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap",
});

export const viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "dark",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coach-john-fitness.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Personal Trainer | John DOE",
    template: "%s | John DOE Personal Trainer",
  },
  description:
    "As a passionate personal trainer, I believe in empowering individuals to achieve their fitness goals through personalized coaching, evidence-based nutrition, and progressive strength training.",
  keywords: [
    "personal trainer",
    "fitness coach",
    "strength training",
    "nutrition coaching",
    "body recomposition",
    "workout program",
    "fitness calculator",
    "TDEE calculator",
  ],
  authors: [{ name: "Coach John" }],
  creator: "Coach John",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Personal Trainer | John DOE",
    description:
      "Transform challenges into triumphs with personalized coaching, evidence-based nutrition, and progressive strength training.",
    siteName: "Personal Trainer John DOE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Trainer | John DOE",
    description:
      "Transform challenges into triumphs with personalized coaching, evidence-based nutrition, and progressive strength training.",
  },
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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${oxanium.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
