import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Industries } from "@/components/sections/Industries";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "ISP Software for WISPs, FTTH Operators & Broadband Providers | Kashtrix",
  description:
    "Kashtrix ISP management software for Wireless ISPs (WISPs), Fiber-to-the-Home (FTTH) operators, enterprise ISPs and broadband providers with tailored OSS/BSS, billing and network automation.",
  keywords: [
    "WISP management software",
    "FTTH OSS BSS",
    "enterprise ISP business software",
    "mobile network operator OSS BSS",
    "broadband provider software",
    "Kashtrix Industries",
  ],
  canonical: "https://kashtrix.com/industries",
});

export default function IndustriesPage() {
  return (
    <SiteShell>
      <div className="pt-12 pb-8 bg-gradient-to-b from-[#F4EEFF]/60 to-[#FFFFFF] border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
            Provider Segments
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
            Tailored for Every Telecom Provider Type
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 leading-relaxed">
            Whether managing wireless sectors in rural areas or 500,000+ GPON optical ports across dense urban rings, Kashtrix scales instantly to your deployment topology.
          </p>
        </div>
      </div>
      <Industries />
    </SiteShell>
  );
}
