import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getOSSBSSProductSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Kashtrix OSS | Telecom OSS Software for ISP Network Operations",
  description:
    "Manage ISP network operations, FreeRADIUS AAA, GPON OLT provisioning, TR-069 ACS, fault management and multi-vendor device automation with Kashtrix telecom OSS software.",
  keywords: [
    "Kashtrix OSS",
    "Kashtrix OSS BSS",
    "telecom OSS software",
    "telecom OSS",
    "ISP OSS",
    "operations support system",
    "network operations software",
    "service assurance",
    "network orchestration",
    "telecom network automation",
    "GPON OLT management",
    "TR-069 ACS server",
    "FreeRADIUS AAA",
    "NOC software",
  ],
  canonical: "https://kashtrix.com/oss",
});

export default function OSSPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOSSBSSProductSchema()) }}
      />
      <MarketingDetailPage config={DETAIL_CONFIGS.oss} />
    </SiteShell>
  );
}
