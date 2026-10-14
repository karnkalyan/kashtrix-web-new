import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Cable, Network, Activity, ShieldCheck, CircleDollarSign,
  MapPinned, UsersRound, Bot, ServerCog, PlugZap, Router,
  ArrowRight, CheckCircle2, Sparkles, Database
} from "lucide-react";
import { getPageMetadata } from "@/lib/meta";
import { getBreadcrumbSchema } from "@/lib/seo";
import { InlineCTA } from "@/components/InlineCTA";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/solutions");
}

const solutionsList = [
  {
    slug: "olt-provisioning",
    title: "OLT Provisioning Software",
    category: "Access & FTTH",
    icon: Cable,
    desc: "Automate Huawei MA5800, Nokia ISAM, and ZTE GPON/XGS-PON OLT provisioning, ONT auto-discovery, and optical budget checks.",
    bullets: ["Huawei MA5800, Nokia ISAM, ZTE C300", "Zero-touch ONT auto-discovery", "VLAN & DBA profile automation"],
  },
  {
    slug: "multi-vendor-device-management-nms",
    title: "Multi-Vendor ISP NMS & Device Management",
    category: "Network & NOC",
    icon: ServerCog,
    desc: "Unified single-dashboard device management with SNMP v2c/v3, SSH, Telnet, and TR-069 for MikroTik, Cisco, Nokia, and Huawei.",
    bullets: ["Single-pane-of-glass hardware control", "Automated configuration backup & diff", "Optical power degradation alerts"],
  },
  {
    slug: "ai-driven-syslog-fault-analyzer",
    title: "AI-Driven Syslog Fault Analyzer",
    category: "NOC & AI",
    icon: Activity,
    desc: "Correlate millions of raw syslog lines with AI pattern recognition to isolate fiber cuts and BGP session flaps before outages occur.",
    bullets: ["Telecom-trained AI root cause isolation", "Sub-second syslog stream parsing", "Automated NOC ticket remediation"],
  },
  {
    slug: "freeradius-mikrotik-billing",
    title: "FreeRADIUS & MikroTik Billing Integration",
    category: "Billing & AAA",
    icon: CircleDollarSign,
    desc: "Production-grade FreeRADIUS 3.2 AAA integrated with MikroTik RouterOS for automated PPPoE provisioning and CoA speed boosts.",
    bullets: ["50K+ auth requests per second", "FreeRADIUS Change of Authorization (CoA)", "Dynamic IPv4/IPv6 address pool control"],
  },
  {
    slug: "fiber-gis-olt-ont-splitter",
    title: "Fiber GIS & Optical Splitter Mapping",
    category: "Access & FTTH",
    icon: MapPinned,
    desc: "Geospatial fiber cable routing with optical splitter attenuation calculations and direct binding between fiber strands and subscriber ONTs.",
    bullets: ["Strand-level geospatial fiber topology", "Optical splitter loss modeling", "CPE & ONT address geocoding"],
  },
  {
    slug: "ai-agent-isp-noc-automation",
    title: "Autonomous AI Agents for ISP NOC",
    category: "NOC & AI",
    icon: Bot,
    desc: "Policy-governed autonomous AI agents that triage incoming alarms, execute deterministic network diagnostics, and isolate faults.",
    bullets: ["Deterministic policy guardrails", "Automated alarm correlation", "Assisted support resolution drafts"],
  },
  {
    slug: "isp-field-staff-gps",
    title: "ISP Field Staff GPS & Mobile Dispatch",
    category: "Field & Ops",
    icon: MapPinned,
    desc: "Turn service demand into accountable mobile tasks with real-time technician GPS tracking, route sequencing, and ONT barcode verification.",
    bullets: ["Real-time technician location tracking", "Mobile ONT barcode scanning & sign-off", "Field optical power verification"],
  },
  {
    slug: "isp-branch-reseller-management",
    title: "Branch & Reseller Prepaid Wallet Software",
    category: "Billing & AAA",
    icon: UsersRound,
    desc: "Manage hierarchical sub-dealers, local cable operators (LCOs), and regional branches with prepaid credit wallets and automated commissions.",
    bullets: ["Prepaid credit wallet architecture", "Automated margin & commission split", "Multi-tenant role permissions"],
  },
  {
    slug: "cgnat-syslog-compliance",
    title: "CGNAT Syslog Law Enforcement Compliance",
    category: "Compliance & Security",
    icon: ShieldCheck,
    desc: "Tamper-evident, encrypted CGNAT syslog logging with 1-year data retention and sub-second compliance search for legal subpoenas.",
    bullets: ["100K+ EPS carrier-grade ingestion", "Public IP + port to subscriber ID", "Sub-second law enforcement queries"],
  },
  {
    slug: "convergent-billing-dunning",
    title: "Convergent Billing & Automated Dunning",
    category: "Billing & AAA",
    icon: CircleDollarSign,
    desc: "Automate invoice cycles, online payments, multi-channel payment reminders (SMS/WhatsApp/Email), and RADIUS bandwidth throttling.",
    bullets: ["Prepaid & postpaid convergent rating", "Automated multi-stage dunning reminders", "Instant FreeRADIUS speed throttling"],
  },
  {
    slug: "wisp-billing-ai",
    title: "WISP Billing & Fixed-Wireless Automation",
    category: "Billing & AAA",
    icon: Router,
    desc: "Tailored for wireless ISPs: tower backhaul capacity tracking, FUP bandwidth quotas, automated seasonal billing, and CPE monitoring.",
    bullets: ["Tower site revenue & profitability", "FUP data caps & fair usage policy", "MikroTik API queue rate-limiting"],
  },
  {
    slug: "isp-mcp-server-ai",
    title: "Model Context Protocol (MCP) Server for Telecom",
    category: "NOC & AI",
    icon: PlugZap,
    desc: "Expose network telemetry, subscriber billing, and hardware state safely to Claude, Gemini, and LLM models via standard MCP endpoints.",
    bullets: ["Open MCP standard for LLM integration", "Role-governed network tool execution", "Real-time topology & subscriber context"],
  },
  {
    slug: "pppoe-radius-billing",
    title: "PPPoE Server & FreeRADIUS Architecture",
    category: "Billing & AAA",
    icon: Network,
    desc: "Scalable PPPoE/IPoE subscriber session architecture with clustered FreeRADIUS, dual-stack IPv4/IPv6 address pools, and CoA updates.",
    bullets: ["High-concurrency PPPoE sessions", "Dual-stack IPv4/IPv6 prefix delegation", "Zero-downtime cluster failover"],
  },
  {
    slug: "closed-loop-fault-ticketing",
    title: "Closed-Loop Fault Ticketing & SLA Escalation",
    category: "Network & NOC",
    icon: Activity,
    desc: "Correlate optical line attenuation and router port down alarms directly into auto-generated service tickets with SLA tracking.",
    bullets: ["Automated alarm-to-ticket conversion", "SLA breach countdown & escalation", "Root-cause evidence tracking"],
  },
  {
    slug: "zero-touch-provisioning",
    title: "Zero-Touch ONT Provisioning & Auto-Config",
    category: "Access & FTTH",
    icon: Sparkles,
    desc: "Plug-and-play FTTH subscriber onboarding: auto-detect new ONTs on OLT PON cards, apply service templates, and push Wi-Fi via TR-069.",
    bullets: ["Instant ONT auto-discovery on PON port", "Zero-touch service profile push", "TR-069 remote Wi-Fi setup"],
  },
];

export default function SolutionsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kashtrix Telecom & ISP Solutions",
    description: "Explore tailored telecom solutions for OLT provisioning, multi-vendor device NMS, syslog compliance, FreeRADIUS billing, fiber GIS, and AI NOC automation.",
    url: "https://kashtrix.com/solutions",
    hasPart: solutionsList.map((s) => ({
      "@type": "SoftwareApplication",
      name: s.title,
      url: `https://kashtrix.com/solutions/${s.slug}`,
      description: s.desc,
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
      <section className="relative overflow-hidden border-b border-[var(--border-default)] bg-gradient-to-b from-[#fbf8fe] to-white dark:from-[#170724] dark:to-[#12051c] pt-20 pb-16">
        <div className="container-shell max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-brand)]/40 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d63474]" />
            Enterprise ISP &amp; Telecom Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Tailored Engineering Solutions for <span className="text-[#4b1b63] dark:text-[#c084fc]">Modern Telecoms</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            From optical fiber distribution and OLT provisioning to FreeRADIUS billing, carrier-grade CGNAT syslog compliance, and autonomous AI NOC operations.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionsList.map((sol) => {
              const Icon = sol.icon;
              return (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="p-6 rounded-[5px] border border-[var(--border-default)] bg-[var(--surface-2)] hover:border-[#6f2b8f] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--surface-purple)] text-[#4b1b63] dark:text-[#c084fc] border border-[var(--border-brand)]/30 group-hover:bg-[#4b1b63] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)]">
                        {sol.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#4b1b63] dark:group-hover:text-[#c084fc] transition-colors">
                      {sol.title}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {sol.desc}
                    </p>

                    <div className="pt-2 border-t border-[var(--border-default)] space-y-1.5">
                      {sol.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                          <CheckCircle2 className="h-3 w-3 text-[#10b981] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs font-semibold text-[var(--text-link)]">
                    <span>Explore Solution</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        eyebrow="Architectural Consultation"
        title="Looking for a tailored deployment architecture for your network?"
        text="Speak with our principal telecom network architects to evaluate hardware compatibility, AAA throughput, database sizing, and migration timelines."
        accent="#4b1b63"
      />
    </main>
  );
}
