import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "ISP Network Automation for RADIUS, BNG, OLT & PPPoE | Kashtrix",
  description:
    "Automate ISP subscriber provisioning, FreeRADIUS CoA, PPPoE sessions, BNG policies and OLT configuration with Kashtrix multi-vendor network automation software.",
  keywords: [
    "ISP network automation software",
    "telecom network automation",
    "PPPoE automation",
    "RADIUS automation",
    "BNG automation",
    "OLT automation",
    "network orchestration",
    "subscriber provisioning",
    "RADIUS CoA",
    "MikroTik network automation",
    "Kashtrix Network Automation",
  ],
  canonical: "https://kashtrix.com/network-automation",
});

export default function NetworkAutomationPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.networkAutomation} />
    </SiteShell>
  );
}
