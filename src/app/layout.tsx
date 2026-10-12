import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteMotion } from "@/components/SiteMotion";
import { AiFloatingChat } from "@/components/AiFloatingChat";
import { SITE } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff", colorScheme: "light" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Kashtrix — Broadcast, Live Media & Telecom Software", template: "%s | Kashtrix" },
  description: SITE.description,
  keywords: ["Kashtrix", "broadcast playout software", "Kashtrix Studio", "StreamOps", "broadcast ingest", "live transcoding", "DVB MPTS multiplexer", "telecom OSS BSS", "ISP billing software", "network automation"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Kashtrix", title: "Kashtrix — Broadcast, Live Media & Telecom Software", description: SITE.description, url: SITE.url, images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Kashtrix enterprise software" }] },
  twitter: { card: "summary_large_image", title: "Kashtrix — Broadcast, Live Media & Telecom Software", description: SITE.description, images: ["/og.svg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "technology",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kashtrix",
  url: SITE.url,
  logo: `${SITE.url}/logo/wide-logo.png`,
  description: SITE.description,
};

const themeInitScript = `
  try {
    const t = localStorage.getItem('kashtrix-theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={poppins.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning className={`${poppins.className} font-sans`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <Header />
        {children}
        <SiteMotion />
        <Footer />
        <AiFloatingChat />
      </body>
    </html>
  );
}
