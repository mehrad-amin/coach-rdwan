import { cookies } from "next/headers";
import {
  Cairo,
  IBM_Plex_Sans_Arabic,
  Outfit,
  Oxanium,
} from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import {
  LOCALE_COOKIE,
  getDirection,
  normalizeLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";
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

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const viewport = {
  themeColor: "#1a1a1a",
  colorScheme: "dark",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.metadata.titleDefault,
      template: dict.metadata.titleTemplate,
    },
    description: dict.metadata.description,
    keywords: [
      "RDWAN",
      "رضوان",
      "تدريب أونلاين",
      "باورليفتينق",
      "كمال أجسام",
      "مدرب شخصي السعودية",
      "powerlifting coach",
      "bodybuilding coach",
      "online fitness coaching",
      "strength training",
      "Saudi Arabia fitness coach",
    ],
    authors: [{ name: dict.navbar.brandName }],
    creator: dict.navbar.brandName,
    openGraph: {
      type: "website",
      locale: dict.metadata.ogLocale,
      url: siteUrl,
      title: dict.metadata.titleDefault,
      description: dict.metadata.description,
      siteName: dict.metadata.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.titleDefault,
      description: dict.metadata.description,
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
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${outfit.variable} ${oxanium.variable} ${cairo.variable} ${ibmPlexSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground overflow-x-clip">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
