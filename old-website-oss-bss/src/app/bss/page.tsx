import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getOSSBSSProductSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix BSS | Telecom BSS Software for Billing, CRM & Revenue",
  description:
    "Unify subscriber billing, CRM, product catalog, order management, payments and revenue assurance with Kashtrix telecom BSS software for ISPs and broadband operators.",
  keywords: [
    "Kashtrix BSS",
    "Kashtrix OSS BSS",
    "telecom BSS software",
    "telecom BSS",
    "ISP BSS",
    "business support system",
    "subscriber lifecycle management",
    "telecom revenue management",
    "ISP billing software",
    "telecom product catalog",
    "subscriber CRM",
    "prepaid postpaid billing",
  ],
  canonical: "https://kashtrix.com/bss",
});

export default function BSSPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOSSBSSProductSchema()) }}
      />
      <MarketingDetailPage config={DETAIL_CONFIGS.bss} />
    </SiteShell>
  );
}
