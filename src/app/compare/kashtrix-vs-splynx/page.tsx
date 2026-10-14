import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Check, X, ArrowRight, ShieldCheck, Cpu, Database } from "lucide-react";

export const metadata = constructMetadata({
  title: "Kashtrix vs Splynx | ISP OSS/BSS Platform Comparison Matrix",
  description: "Factual comparison between Kashtrix and Splynx ISP software. Compare native AI agents, high-throughput Syslog CGNAT archiving, FreeRADIUS AAA, GPON OLT management, Fiber GIS and multi-tenant reseller capabilities.",
  keywords: [
    "Kashtrix vs Splynx",
    "Splynx alternative",
    "ISP management software comparison",
    "Splynx ISP billing alternative",
    "Kashtrix comparison",
    "telecom OSS BSS comparison"
  ],
  canonical: "https://kashtrix.com/compare/kashtrix-vs-splynx",
});

const FAQS = [
  {
    question: "How does Kashtrix differ from Splynx in AI automation?",
    answer: "Kashtrix includes native AI agents built directly into the OSS/BSS platform for NOC fault correlation, automated ticket resolution, RADIUS log analysis, and automated subscriber support via Model Context Protocol (MCP)."
  },
  {
    question: "Does Kashtrix include carrier-grade Syslog CGNAT audit logging?",
    answer: "Yes. Kashtrix features an integrated high-performance Syslog server capable of ingesting millions of CGNAT NAT444 mapping logs per second with compressed archiving and law enforcement compliance search."
  },
  {
    question: "Can we migrate data from Splynx to Kashtrix?",
    answer: "Yes. Kashtrix provides automated migration tools and REST API importers for subscriber records, IP assignments, billing histories, and NAS configuration details."
  }
];

const COMPARISON_ROWS = [
  {
    feature: "Native AI Agents & MCP Server Integration",
    kashtrix: true,
    splynx: false,
    note: "Kashtrix features policy-governed AI agents for NOC, customer support, and billing automation."
  },
  {
    feature: "Carrier-Grade Syslog & CGNAT Audit Logging",
    kashtrix: true,
    splynx: false,
    note: "Kashtrix natively ingests high-volume CGNAT syslog streams with encrypted search and compliance archiving."
  },
  {
    feature: "Multi-Vendor OLT & ONT Provisioning",
    kashtrix: true,
    splynx: true,
    note: "Both platforms manage GPON OLTs; Kashtrix adds optical power budget loss calculations and GIS mapping."
  },
  {
    feature: "FreeRADIUS AAA & MikroTik Integration",
    kashtrix: true,
    splynx: true,
    note: "Full PPPoE, IPoE, DHCP, and static IP authentication for MikroTik RouterOS and enterprise BNGs."
  },
  {
    feature: "Geospatial Fiber GIS & ODN Mapping",
    kashtrix: true,
    splynx: false,
    note: "Kashtrix includes interactive strand-level fiber GIS mapping and splitter loss calculations."
  },
  {
    feature: "Field Staff Mobile App with Live GPS Dispatch",
    kashtrix: true,
    splynx: true,
    note: "Mobile work order execution and technician tracking."
  },
  {
    feature: "Multi-Tenant Branch & Reseller Wallet System",
    kashtrix: true,
    splynx: true,
    note: "Hierarchical sub-dealer portals, wholesale margins, and wallet management."
  }
];

export default function KashtrixVsSplynxPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Compare", href: "/compare" },
    { name: "Kashtrix vs Splynx", href: "/compare/kashtrix-vs-splynx" }
  ]);
  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">Kashtrix vs Splynx</span>
            </nav>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Objective Platform Comparison
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Kashtrix vs Splynx: ISP OSS/BSS Platform Comparison
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              An objective, technical comparison of Kashtrix and Splynx for Internet Service Providers, WISPs, and FTTH operators seeking modern OSS/BSS software, AI NOC automation, and high-performance syslog logging.
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-3">
              Information evaluated based on publicly available features as of August 2026.
            </p>
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-sora mb-8">Feature Comparison Matrix</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--surface-2)]">
                    <th className="p-4 text-xs font-bold font-sora uppercase text-[var(--text-primary)]">Platform Capability</th>
                    <th className="p-4 text-xs font-bold font-sora uppercase text-[#E11D72] text-center">Kashtrix</th>
                    <th className="p-4 text-xs font-bold font-sora uppercase text-[var(--text-secondary)] text-center">Splynx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)] text-xs sm:text-sm">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                      <td className="p-4 font-medium text-[var(--text-primary)]">
                        <div>{row.feature}</div>
                        <div className="text-[11px] text-[var(--text-secondary)] font-normal mt-0.5">{row.note}</div>
                      </td>
                      <td className="p-4 text-center">
                        {row.kashtrix ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Yes</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs font-mono">
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>No</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.splynx ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Yes</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs font-mono">
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>No</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Key Kashtrix Differentiators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3">
                <Cpu className="w-6 h-6 text-[#E11D72]" />
                <h3 className="text-base font-bold font-sora">AI-Native Autonomous NOC</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  While traditional platforms require manual ticket routing, Kashtrix deploys autonomous AI agents to analyze RADIUS drops, detect OLT PON alarms, auto-diagnose optical loss, and assist support staff in real time.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3">
                <Database className="w-6 h-6 text-[#E11D72]" />
                <h3 className="text-base font-bold font-sora">High-Throughput CGNAT Syslog</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Kashtrix includes a built-in carrier-grade Syslog engine designed specifically to handle massive NAT444 translation logs from MikroTik and Cisco BNGs without external third-party tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl font-bold font-sora">Ready to Upgrade Your ISP Operations?</h2>
            <p className="text-sm text-[var(--text-secondary)]">Request a live platform demo and explore seamless data migration from Splynx.</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
