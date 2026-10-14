import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TOOLS_DETAIL_MAP } from "@/data/toolsData";
import { getPageMetadata } from "@/lib/meta";
import { getBreadcrumbSchema } from "@/lib/seo";
import { InlineCTA } from "@/components/InlineCTA";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/free-isp-tools");
}

export default function FreeIspToolsPage() {
  const tools = Object.values(TOOLS_DETAIL_MAP);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Free ISP Tools", href: "/free-isp-tools" },
  ]);

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-20 pb-12 border-b border-[var(--border-default)] bg-gradient-to-b from-[#fbf8fe] to-white dark:from-[#170724] dark:to-[#12051c]">
        <div className="container-shell max-w-6xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-brand)]/40 mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#d63474]" /> No Sign-Up Required · 100% Free
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            Free WISP &amp; Fiber <span className="text-[#4b1b63] dark:text-[#c084fc]">Engineering Tools</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            17 precision engineering tools for WISPs and fiber operators — RF, optical, power, addressing, and business math.
          </p>
        </div>
      </section>

      <section className="py-12 border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4">
          <ISPToolsHub />
        </div>
      </section>

      <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Explore Dedicated Technical Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="p-6 rounded-[5px] border border-[var(--border-default)] bg-[var(--surface-2)] hover:border-[#6f2b8f] hover:shadow-md transition-all space-y-3 group block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)]">
                    {t.category}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                    {t.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[#4b1b63] dark:group-hover:text-[#c084fc] transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {t.description}
                </p>
                <div className="pt-2 text-xs font-semibold text-[var(--text-link)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Dedicated Guide &amp; Tool <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InlineCTA
        eyebrow="Need Complete Telecom Automation?"
        title="Kashtrix automates network operations from optical fiber to subscriber invoicing."
        text="Discover how Kashtrix unifies FreeRADIUS AAA, GPON OLT provisioning, SNMP monitoring, and carrier syslog compliance."
        accent="#4b1b63"
      />
    </main>
  );
}
