import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getDeviceAutomationProductSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Multi-Vendor OLT & BNG Device Automation for ISPs | Kashtrix",
  description:
    "Automate MikroTik RouterOS, Nokia OLTs, Cisco ASR BNGs, Huawei MA5800 and ZTE GPON devices with Kashtrix multi-vendor ISP device automation platform.",
  keywords: [
    "OLT management software",
    "BNG automation",
    "MikroTik device automation",
    "Nokia OLT automation",
    "Cisco BNG automation",
    "Huawei OLT automation",
    "GPON OLT provisioning",
    "TR-069 ACS server",
    "multi-vendor network automation",
    "ISP device management",
    "Kashtrix Hardware Automation",
  ],
  canonical: "https://kashtrix.com/hardware-automation",
});

export default function HardwareAutomationPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getDeviceAutomationProductSchema()) }}
      />
      <MarketingDetailPage config={DETAIL_CONFIGS.hardwareAutomation} />
    </SiteShell>
  );
}
