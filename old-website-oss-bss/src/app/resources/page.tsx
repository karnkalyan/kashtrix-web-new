import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { BookOpen, Terminal, FileText, Video, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { AllPlatformAssetsShowcase } from "@/components/sections/AllPlatformAssetsShowcase";

export const metadata = constructMetadata({
  title: "Kashtrix Resources | 6 Technical Engineering Blueprints & 48 Showcase Assets",
  description:
    "Explore Kashtrix technical resources, 48 high-definition live application screenshots, ISP case studies, CGNAT syslog compliance guides, FreeRADIUS AAA blueprints, and AI NOC whitepapers.",
  keywords: [
    "telecom resources",
    "ISP technical guides",
    "syslog compliance guide ISP",
    "FreeRADIUS configuration guide",
    "AI NOC whitepapers",
    "Kashtrix resources",
  ],
  canonical: "https://kashtrix.com/resources",
});

const RESOURCE_ITEMS = [
  {
    category: "Technical Whitepaper",
    title: "FreeRADIUS AAA & BNG Dynamic Session Rebalancing Guide",
    desc: "How Tier-1 ISPs eliminated prime-time streaming latency spikes by correlating optical alarms with dynamic PPPoE pool re-allocation.",
    date: "March 2026",
    href: "/resources/freeradius-bng-rebalancing-ai",
    icon: FileText,
  },
  {
    category: "Automation Template",
    title: "Zero-Touch GPON OLT Provisioning for Huawei MA5800 & Nokia ISAM",
    desc: "Ready-to-run NETCONF/YANG and CLI script templates verified across 15,000 active optical terminal deployments.",
    date: "February 2026",
    href: "/resources/huawei-ma5800-nokia-olt-provisioning",
    icon: Terminal,
  },
  {
    category: "Regulatory Compliance",
    title: "Carrier-Grade Syslog & CGNAT Subpoena Compliance Guide",
    desc: "Managing high-throughput 100k+ EPS CGNAT log streams, SHA-256 HMAC tamper verification, and subsecond subpoena log lookup.",
    date: "February 2026",
    href: "/resources/cgnat-logging-compliance-guide",
    icon: FileText,
  },
  {
    category: "RouterOS Integration",
    title: "MikroTik RouterOS & FreeRADIUS Billing Integration Guide",
    desc: "Step-by-step configuration manual for connecting MikroTik CCR routers to central FreeRADIUS AAA and incoming CoA ports.",
    date: "January 2026",
    href: "/resources/mikrotik-freeradius-billing-guide",
    icon: Terminal,
  },
  {
    category: "FTTH Diagnostics",
    title: "GPON Optical Loss & Splitter Attenuation Troubleshooting",
    desc: "Field diagnostic reference for FTTH engineers on identifying optical attenuation anomalies, OTDR traces, and low ONT signals.",
    date: "January 2026",
    href: "/resources/gpon-optical-loss-troubleshooting",
    icon: Sparkles,
  },
  {
    category: "Platform Migration",
    title: "Legacy ISP Billing to Cloud OSS/BSS Migration Guide",
    desc: "Technical migration blueprint for exporting subscriber data, preserving RADIUS passwords, and transitioning operations.",
    date: "December 2025",
    href: "/resources/isp-oss-bss-migration-guide",
    icon: Video,
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <div className="pt-12 pb-16 bg-gradient-to-b from-[#F4EEFF]/60 to-[#FFFFFF] border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              Knowledge &amp; Blueprint Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Resources, Technical Guides &amp; Blueprints
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 leading-relaxed">
              Explore production-verified multi-vendor automation scripts, AI reasoning architectures, and technical blueprints written by veteran NOC engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {RESOURCE_ITEMS.map((res) => {
              const Icon = res.icon;
              return (
                <Link
                  key={res.title}
                  href={res.href}
                  className="p-6 md:p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] hover:border-[var(--border-brand)] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)] group-hover:bg-[#2B0D3A] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-secondary)] font-mono">{res.date}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-link)] block font-mono">
                      {res.category}
                    </span>
                    <h3 className="text-lg font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
                      {res.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--border-default)] flex items-center gap-2 text-xs font-bold text-[var(--text-link)] group-hover:text-[#E11D72]">
                    <span>Read Technical Blueprint</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E11D72]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <AllPlatformAssetsShowcase />
    </SiteShell>
  );
}
