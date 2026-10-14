import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Cable, RadioTower, Video, Zap, FileText, Download,
  Calculator, BookOpen, Layers, CheckCircle2, Sparkles, ExternalLink
} from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { getPageMetadata } from "@/lib/meta";
import { getBreadcrumbSchema } from "@/lib/seo";
import { InlineCTA } from "@/components/InlineCTA";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/resources");
}

const productArchitectures = [
  {
    icon: RadioTower,
    title: "Broadcast Playout Architecture",
    text: "Understand the comprehensive broadcast playout suite from PGM/PVW playout and CG through ingest, newsroom, QC, and HA.",
    href: "/broadcast-playout",
    accent: "#6f2b8f",
  },
  {
    icon: Video,
    title: "Kashtrix Studio Production Suite",
    text: "Explore the dedicated live production workspace for program/preview switching, source monitoring, and audio control.",
    href: "/studio",
    accent: "#b72963",
  },
  {
    icon: Zap,
    title: "StreamOps Media Path & Transcoding",
    text: "See how SDI/IP sources move through GPU processing, DVB MPTS multiplexing, recording, and multi-platform egress.",
    href: "/streamops",
    accent: "#5d48b9",
  },
  {
    icon: Cable,
    title: "Telecom OSS/BSS Platform Operating System",
    text: "See how AAA, network operations, billing, CRM, inventory, and field workflows connect around subscriber context.",
    href: "/platform",
    accent: "#16778b",
  },
];

const technicalGuides = [
  {
    slug: "huawei-ma5800-nokia-olt-provisioning",
    title: "Huawei MA5800 & Nokia ISAM OLT Provisioning Guide",
    tag: "Access & GPON",
    readTime: "12 min read",
    desc: "Step-by-step engineering tutorial: configuring service boards, DBA profiles, line profiles, ONT auto-discovery, and VLAN cross-connects.",
  },
  {
    slug: "cgnat-logging-compliance-guide",
    title: "ISP CGNAT Logging & Law Enforcement Compliance Guide",
    tag: "Syslog & Legal",
    readTime: "10 min read",
    desc: "Carrier-Grade NAT (CGNAT) syslog mandates, deterministic port block allocation, AES-256 encrypted log storage, and legal subpoena response workflows.",
  },
  {
    slug: "mikrotik-freeradius-billing-guide",
    title: "MikroTik RouterOS & FreeRADIUS 3.2 Configuration Guide",
    tag: "Billing & AAA",
    readTime: "14 min read",
    desc: "Production guide for deploying FreeRADIUS 3.2 with MikroTik CCR routers: PPPoE NAS configuration, CoA disconnect-requests, and dynamic rate-limiting.",
  },
  {
    slug: "gpon-optical-loss-troubleshooting",
    title: "GPON Optical Power Loss & Attenuation Troubleshooting Guide",
    tag: "FTTH & Fiber",
    readTime: "8 min read",
    desc: "Diagnose FTTH optical issues: calculating link budgets, interpreting ONT RX dBm readings, identifying dirty fiber ferrules, and resolving micro-bends.",
  },
  {
    slug: "freeradius-bng-rebalancing-ai",
    title: "AI-Driven FreeRADIUS BNG Load Rebalancing Guide",
    tag: "AI & NOC",
    readTime: "11 min read",
    desc: "How autonomous AI agents monitor BNG CPU and subscriber session concurrency, executing automated dynamic PPPoE handoffs without dropping active sessions.",
  },
  {
    slug: "isp-oss-bss-migration-guide",
    title: "ISP OSS/BSS Legacy System Migration Guide",
    tag: "Migration & Data",
    readTime: "15 min read",
    desc: "A battle-tested 48-hour checklist for migrating subscriber databases, active recurring billing plans, and network credentials from legacy platforms.",
  },
];

export default function ResourcesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
  ]);

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="site-hero pt-20 pb-14 bg-[#fbfaf8] dark:bg-[#12051c] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-brand)]/40 mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#d63474]" /> Engineering Documentation &amp; Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171219] dark:text-white">
              Technical Resources &amp; <span className="text-[#4b1b63] dark:text-[#c084fc]">Deployment Guides</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#706a73] dark:text-[#bdaec4]">
              In-depth architecture diagrams, hardware configuration manuals, carrier compliance whitepapers, and precision calculators for television broadcasters and broadband operators.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="/documentation.pdf"
              download
              className="button-primary !bg-[#4b1b63] !border-[#4b1b63] hover:!bg-[#6f2b8f] inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Complete Documentation PDF (36MB)
            </a>
            <Link href="/tools" className="button-secondary inline-flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Free ISP Engineering Tools (17)
            </Link>
          </div>
        </div>
      </section>

      {/* Product Architecture Guides */}
      <section className="section-pad bg-white dark:bg-[#170724] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-6xl mx-auto px-4 space-y-8">
          <div>
            <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Core Product Families</p>
            <h2 className="heading mt-2">Product Architectures &amp; Workflows</h2>
          </div>

          <div className="grid gap-px border border-[#e5e0e6] dark:border-white/10 bg-[#e5e0e6] dark:bg-white/10">
            {productArchitectures.map((r, i) => (
              <MotionReveal key={r.href} delay={i * 0.04}>
                <Link
                  href={r.href}
                  className="group grid gap-5 bg-white dark:bg-[#14061e] p-6 transition hover:bg-[#f6f2f7] dark:hover:bg-[#230d35] md:grid-cols-[56px_1fr_auto] md:items-center"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-[#e3dee5] bg-white dark:border-white/10 dark:bg-[#1b082d]"
                    style={{ color: r.accent }}
                  >
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-.025em] text-[#171219] dark:text-white group-hover:text-[#4b1b63] dark:group-hover:text-[#c084fc] transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-[#706a73] dark:text-[#bdaec4]">
                      {r.text}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#8d8590] dark:text-[#a090ab] transition group-hover:translate-x-1" />
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Engineering Whitepapers & Guides */}
      <section className="section-pad bg-[#faf9fa] dark:bg-[#12051c] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-6xl mx-auto px-4 space-y-10">
          <div>
            <p className="kicker !text-[#b30f5f]">Engineering Publications</p>
            <h2 className="heading mt-2">Technical Whitepapers &amp; Configuration Guides</h2>
            <p className="subheading mt-3">
              Step-by-step production manuals written by senior network architects and broadcast engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/resources/${g.slug}`}
                className="p-6 rounded-[5px] border border-[var(--border-default)] bg-white dark:bg-[#170724] hover:border-[#6f2b8f] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)] bg-[var(--surface-purple)] px-2.5 py-1 rounded-full border border-[var(--border-brand)]/30">
                      {g.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                      {g.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[#4b1b63] dark:group-hover:text-[#c084fc] transition-colors leading-snug">
                    {g.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {g.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs font-semibold text-[var(--text-link)]">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InlineCTA
        eyebrow="Hands-On Proof of Concept"
        title="Ready to test Kashtrix with your hardware and network topology?"
        text="Request a technical demo environment configured with your OLT models, BNG router configurations, or broadcast SDI/NDI workflows."
        accent="#4b1b63"
      />
    </main>
  );
}
