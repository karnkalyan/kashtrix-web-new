import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomeClient } from "./HomeClient";
import { constructMetadata, getFAQSchema } from "@/lib/seo";
import { HOMEPAGE_FAQS } from "@/lib/faqs";

export const metadata = constructMetadata({
  title: "Kashtrix | AI-Native Telecom OSS/BSS & ISP Software",
  description:
    "Kashtrix is the AI-native OSS/BSS platform for ISPs, WISPs, and FTTH operators, unifying billing, CRM, FreeRADIUS AAA, network automation, and AI agents.",
  keywords: [
    "Kashtrix",
    "Kashtrix OSS BSS",
    "Kashtrix telecom OSS BSS",
    "Kashtrix ISP management software",
    "Kashtrix platform",
    "Kashtrix AI-native OSS/BSS",
    "ISP management platform",
    "AI-powered ISP management",
    "telecom OSS BSS",
    "ISP OSS BSS",
    "broadband billing software",
    "FreeRADIUS AAA",
    "WISP management software",
    "FTTH management software",
    "syslog server CGNAT logging",
    "OLT management software",
    "Fiber GIS mapping",
  ],
  canonical: "https://kashtrix.com/",
});

export default async function HomePage() {
  const faqSchema = getFAQSchema(HOMEPAGE_FAQS);

  return (
    <SiteShell>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <HomeClient />
    </SiteShell>
  );
}
