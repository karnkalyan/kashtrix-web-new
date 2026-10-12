import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getFAQSchema } from "@/lib/seo";
import { FAQSection } from "@/components/sections/FAQSection";
import { NETWORK_MANAGEMENT_FAQS } from "@/lib/faqs";

export const metadata = constructMetadata({
  title: "ISP Network Management Software & AI-Powered NOC | Kashtrix",
  description:
    "Monitor ISP network health, correlate alarms, manage multi-vendor infrastructure and reduce MTTR with Kashtrix ISP network management software and AI-powered NOC.",
  keywords: [
    "ISP network management software",
    "ISP network monitoring",
    "NOC management software",
    "telecom network monitoring",
    "network assurance",
    "fault management",
    "AI NOC",
    "network topology",
    "ISP network management",
    "Kashtrix Network Management",
  ],
  canonical: "https://kashtrix.com/network-management",
});

export default function NetworkManagementPage() {
  const faqSchema = getFAQSchema(NETWORK_MANAGEMENT_FAQS);

  return (
    <SiteShell>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <MarketingDetailPage config={DETAIL_CONFIGS.networkManagement}>
        <FAQSection
          faqs={NETWORK_MANAGEMENT_FAQS}
          heading="Frequently Asked Questions about ISP Network Management"
          subheading="Learn how Kashtrix provides real-time NOC telemetry, topology mapping, and optical fault isolation."
        />
      </MarketingDetailPage>
    </SiteShell>
  );
}
