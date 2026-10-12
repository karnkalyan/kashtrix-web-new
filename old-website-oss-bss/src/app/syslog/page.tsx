import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata, getSyslogProductSchema } from "@/lib/seo";
import { ISPSyslogSection } from "@/components/sections/ISPSyslogSection";
import { SyslogDeepDiveSection } from "@/components/sections/SyslogDeepDiveSection";

export const metadata = constructMetadata({
  title: "ISP Syslog Server & CGNAT Compliance Logging Platform | Kashtrix",
  description:
    "Ingest high-throughput syslog streams from MikroTik, Cisco and GPON OLTs with CGNAT audit archiving, subscriber IP mapping and law enforcement compliance search.",
  keywords: [
    "ISP syslog server",
    "syslog server",
    "CGNAT logging",
    "CGNAT syslog server",
    "CGNAT compliance",
    "ISP compliance logging",
    "MikroTik syslog",
    "telecom syslog server",
    "carrier-grade syslog collector",
    "ISP syslog software",
    "Kashtrix Syslog",
  ],
  canonical: "https://kashtrix.com/syslog",
});

export default function SyslogPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSyslogProductSchema()) }}
      />
      <MarketingDetailPage config={DETAIL_CONFIGS.syslog}>
        <ISPSyslogSection />
        <SyslogDeepDiveSection />
      </MarketingDetailPage>
    </SiteShell>
  );
}
