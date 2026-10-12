import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Poppins, Roboto } from "next/font/google";
import { constructMetadata } from "@/lib/seo";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = constructMetadata({ canonical: "https://kashtrix.com" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${roboto.variable} antialiased`}
    >
      <body className="bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-[var(--brand-pink)] selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema()) }} />
      </body>
    </html>
  );
}
