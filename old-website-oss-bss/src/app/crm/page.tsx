import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "ISP CRM & Subscriber Management Software | Kashtrix",
  description:
    "Manage broadband subscriber profiles, KYC, support tickets, RADIUS sessions, lead pipelines and customer self-care portals with Kashtrix ISP CRM software.",
  keywords: [
    "ISP CRM software",
    "ISP CRM",
    "subscriber management software",
    "broadband CRM",
    "telecom CRM",
    "customer management for ISP",
    "ISP customer portal",
    "WISP CRM",
    "telecom ticketing system",
    "Kashtrix CRM",
  ],
  canonical: "https://kashtrix.com/crm",
});

export default function CRMPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.crm} />
    </SiteShell>
  );
}
