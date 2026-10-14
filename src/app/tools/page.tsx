import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Wrench, Sparkles, Shield, Cpu } from "lucide-react";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TOOLS_DETAIL_MAP } from "@/data/toolsData";
import { getPageMetadata } from "@/lib/meta";
import { getBreadcrumbSchema } from "@/lib/seo";
import { InlineCTA } from "@/components/InlineCTA";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/tools");
}

export default function ToolsPage() {
  const tools = Object.values(TOOLS_DETAIL_MAP);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Free ISP Tools", href: "/tools" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free ISP Engineering Tools & Calculators Hub",
    description:
      "17 precision online engineering calculators for WISPs and fiber operators — GPON optical loss, CGNAT port allocation, link budgets, subnetting, and dBm conversion.",
    url: "https://kashtrix.com/tools",
    hasPart: tools.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: `https://kashtrix.com/tools/${t.slug}`,
      description: t.description,
      applicationCategory: "BusinessApplication",
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-[var(--border-default)] bg-gradient-to-b from-[#fbf8fe] to-white dark:from-[#170724] dark:to-[#12051c] pt-20 pb-14">
        <div className="container-shell max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-brand)]/40 mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#d63474]" />
            Free Engineering Calculators · 100% Client-Side &amp; Private
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Free ISP &amp; Fiber <span className="text-[#4b1b63] dark:text-[#c084fc]">Engineering Tools</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            17 precision calculators designed for network architects, WISP operators, and FTTH fiber engineers.
            Calculate GPON splitter attenuation, CGNAT port blocks, wireless link budgets, IPv4/IPv6 CIDR subnets, and equipment power autonomy.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#interactive-hub" className="button-primary !bg-[#4b1b63] !border-[#4b1b63] hover:!bg-[#6f2b8f]">
              Open Interactive Workspace <Calculator className="w-4 h-4" />
            </a>
            <a href="#landing-pages" className="button-secondary">
              Browse Dedicated Guides ({tools.length})
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Tool Hub Workspace */}
      <section id="interactive-hub" className="py-12 border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4">
          <ISPToolsHub />
        </div>
      </section>

      {/* Crawlable Landing Pages Index for SEO */}
      <section id="landing-pages" className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
              <Sparkles className="w-3.5 h-3.5 text-[#d63474]" /> Dedicated Landing Pages
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight mt-3">
              Technical Specifications &amp; Worked Engineering Examples
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore individual technical landing pages for worked formula walkthroughs, step-by-step calculations, and FAQ documentation for each calculator.
            </p>
          </div>

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
        eyebrow="Telecom OSS/BSS Integration"
        title="Need automated bandwidth metering, OLT provisioning, or CGNAT logging?"
        text="All 17 calculations are built natively into the Kashtrix telecom platform — automating optical monitoring, subscriber bandwidth shaping, and law enforcement logging."
        accent="#4b1b63"
      />
    </main>
  );
}
