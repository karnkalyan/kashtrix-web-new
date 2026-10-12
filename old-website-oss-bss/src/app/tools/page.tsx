import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TellUsWhatYouNeed } from "@/components/sections/TellUsWhatYouNeed";
import { TOOLS_DETAIL_MAP } from "@/lib/toolsData";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight, Calculator } from "lucide-react";

export const metadata = constructMetadata({
  title: "Free ISP Engineering Tools & Calculators Hub | Kashtrix",
  description:
    "17 Precision engineering tools for WISPs and fiber operators — FSPL Link Budget, GPON Splitter Loss, UPS Runtime, IPv4/IPv6 Subnetting, CGNAT, and dBm Converters.",
  keywords: [
    "Free ISP Tools",
    "WISP calculators",
    "GPON splitter calculator",
    "Link budget calculator",
    "UPS runtime calculator",
    "IPv4 subnet calculator",
    "CGNAT calculator",
    "Tower revenue calculator",
    "SLA uptime calculator",
    "MAC lookup",
    "Kashtrix Tools",
  ],
  canonical: "https://kashtrix.com/tools",
});

export default function ToolsPage() {
  const tools = Object.values(TOOLS_DETAIL_MAP);

  return (
    <SiteShell>
      <h1 className="sr-only">Free ISP Engineering Tools &amp; Calculators Hub</h1>
      <ISPToolsHub />

      {/* Crawlable Landing Pages Index */}
      <section className="py-16 bg-[var(--surface-1)] border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
              <Calculator className="w-3.5 h-3.5 text-[#E11D72]" /> Individual Landing Pages
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Dedicated Calculator Specifications &amp; Worked Examples
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl font-inter">
              Explore individual technical landing pages for worked engineering examples, formula explanations, and dedicated FAQ documentation for each calculator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)] hover:border-[#E11D72] hover:-translate-y-0.5 transition-all space-y-3 group block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)]">
                    {t.category}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                    {t.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold font-sora text-[var(--text-primary)] group-hover:text-[#E11D72] transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 font-inter">
                  {t.description}
                </p>
                <div className="pt-1 text-xs font-bold text-[var(--text-link)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Dedicated Guide &amp; Tool <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TellUsWhatYouNeed />
    </SiteShell>
  );
}
