import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity, ArrowRight, BarChart3, Bot, Boxes, Cable, CheckCircle2,
  CircleDollarSign, ContactRound, Cpu, CreditCard, Database, Gauge, Headphones,
  KeyRound, Network, Radio, Router, ServerCog, ShieldCheck, Sparkles,
  TicketCheck, UsersRound, Workflow, Wrench,
} from "lucide-react";
import Image from "next/image";
import { AnimatedBrandShapes } from "@/components/AnimatedBrandShapes";
import { ProductHardwareMockup } from "@/components/ProductHardwareMockup";
import { OssBssShowcase } from "@/components/OssBssShowcase";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { MotionReveal } from "@/components/MotionReveal";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Telecom OSS/BSS & ISP Management Platform — Kashtrix",
  description: "Unified AI-powered telecom OSS/BSS and ISP management platform connecting FreeRADIUS AAA, GPON/XGS-PON OLTs, SNMP v1/v2/v3 device automation, TR-069 ACS, convergent billing, CRM, field operations and 100K+ EPS CGNAT syslog compliance.",
  keywords: [
    "telecom OSS BSS",
    "ISP management software",
    "AI agents for telecom",
    "FreeRADIUS AAA server",
    "GPON OLT provisioning",
    "SNMP device management",
    "TR-069 ACS software",
    "convergent telecom billing",
    "broadband CRM",
    "carrier grade syslog",
    "CGNAT compliance logging",
    "autonomous NOC operations",
  ],
  alternates: { canonical: "/platform" },
};

const platformFaqs: FaqItem[] = [
  {
    question: "What is Kashtrix ISP management and telecom OSS/BSS software?",
    answer: "Kashtrix is an AI-powered telecom OSS/BSS and unified ISP operating system. It brings subscriber billing, CRM, FreeRADIUS AAA authentication, GPON/XGS-PON OLT provisioning, SNMP telemetry, multi-vendor BNG orchestration, serialized inventory, carrier-grade CGNAT compliance syslog, and autonomous AI agents into a single operational interface.",
  },
  {
    question: "How does Kashtrix handle FreeRADIUS AAA and subscriber session authentication?",
    answer: "Kashtrix integrates natively with clustered FreeRADIUS AAA engines capable of handling over 50,000 auth requests per second. It supports PPPoE, IPoE, DHCP Option 82, dynamic IPv4/IPv6 pool allocation, Change of Authorization (CoA) for dynamic speed boosts or throttling, and instant automated disconnection upon subscription expiry.",
  },
  {
    question: "Which router and OLT hardware vendors are supported by Kashtrix?",
    answer: "Kashtrix features multi-vendor device automation out of the box for MikroTik RouterOS (v6 & v7 API/REST), Nokia ISAM OLTs (CLI/TL1/NETCONF), Cisco ASR 9000 BNGs, Huawei SmartAX MA5800, ZTE C300/C600, and Juniper MX routers via NETCONF, gNMI, RESTCONF, and SSH.",
  },
  {
    question: "How does SNMP integration work across network devices?",
    answer: "Kashtrix features a built-in SNMP v1/v2c/v3 engine with MIB compilation, bulk OID polling, and asynchronous SNMP trap reception. It continuously samples optical TX/RX power (dBm), CPU utilization, chassis temperature, memory, and interface octets to detect fiber degradation before outages occur.",
  },
  {
    question: "How do Autonomous AI Agents assist NOC and Customer Care teams?",
    answer: "Kashtrix AI Agents analyze live telemetry, syslog streams, and optical levels to perform automated root-cause alarm correlation. When a fiber cut occurs, the AI NOC Copilot suppresses hundreds of cascading downstream ONT loss alerts and isolates the cut location. Strict policy guardrails ensure destructive network changes require human engineer sign-off.",
  },
  {
    question: "How does Kashtrix ensure CGNAT law enforcement compliance?",
    answer: "Kashtrix Syslog processes over 100,000 messages per second via UDP/TCP 514 and TLS. It indexes public IP and source port translations directly to verified private subscriber identities with encrypted 1-year columnar storage and sub-second compliance search tools.",
  },
];

const modules = [
  { icon: UsersRound, title: "Subscriber Management", description: "Maintain subscriber identity, contacts, plans, service mappings, lifecycle state and customer history from acquisition through churn.", bullets: ["Multi-play subscriber accounts", "Plans, add-ons and service mapping", "Lifecycle state and entitlement context", "White-label self-care portal"] },
  { icon: CircleDollarSign, title: "Convergent Billing & Rating", description: "Coordinate real-time prepaid rating, monthly recurring invoices, automated payment retries, dunning, and FreeRADIUS CoA rate throttling.", bullets: ["Prepaid & postpaid convergent billing", "Multi-currency and automated tax (VAT/GST)", "Configurable dunning with grace periods", "Reconciliation and audit evidence"] },
  { icon: ContactRound, title: "Customer Care & 360° CRM", description: "Give care teams a 360-degree view of the customer with embedded live optical levels, active PPPoE sessions, ticket logs, and payment history.", bullets: ["Single-pane-of-glass customer 360", "Optical power diagnostics in ticket", "Lead tracking and feasibility mapping", "Two-way SMS, WhatsApp & Email"] },
  { icon: Workflow, title: "Service Provisioning & AAA", description: "Turn commercial service intent into repeatable activation workflows across FreeRADIUS, BNG gateways, OLTs and TR-069 CPEs.", bullets: ["50K+ AAA auth requests / sec", "FreeRADIUS CoA speed boosts", "OLT PON port provisioning", "TR-069 zero-touch CPE config"] },
  { icon: Radio, title: "SNMP & Device Management", description: "Manage hardware lifecycles, configuration templates, firmware rollouts, and SNMP v1/v2c/v3 telemetry across multi-vendor networks.", bullets: ["SNMP v1/v2c/v3 polling & traps", "MikroTik, Nokia, Huawei, ZTE & Cisco", "Optical RX/TX power tracking (dBm)", "Automated configuration backups"] },
  { icon: Boxes, title: "Serialized Asset Registry", description: "Track physical and logical resources, serialized equipment, sites, CPEs, ONTs and deployed service relationships.", bullets: ["Individual MAC & serial QR tracking", "Warehouse to technician van stock", "ONT-to-splitter mapping", "RMA & warranty management"] },
  { icon: TicketCheck, title: "Fault & Ticketing Engine", description: "Convert alarms, subscriber impact and operational incidents into owned work with SLA, escalation and resolution evidence.", bullets: ["Multi-channel ticketing", "Topology-aware alarm suppression", "Optical degradation alerts", "Knowledge and resolution history"] },
  { icon: Bot, title: "Autonomous AI Agents", description: "Deploy domain-specific AI agents for root-cause fault isolation, NOC telemetry synthesis, care troubleshooting, and field dispatch.", bullets: ["AI NOC Copilot & alarm correlation", "AI customer care assistant", "Deterministic policy guardrails", "Predictive churn mitigation"] },
  { icon: Activity, title: "Carrier-Grade Syslog", description: "Ingest over 100,000 syslog messages per second with encrypted 1-year CGNAT audit archives for regulatory compliance.", bullets: ["100K+ EPS via UDP/TCP 514 & TLS", "CGNAT public IP & port indexing", "Sub-second law enforcement queries", "Multi-vendor regex parsers"] },
  { icon: ShieldCheck, title: "Security & Governance", description: "Protect operational actions with scoped roles, audit trails, integration boundaries and dual-operator change evidence.", bullets: ["Granular RBAC permissions", "Append-only immutable audit trail", "Encrypted credential vault", "Dual-operator approval gates"] },
];

const workflow = [
  ["01", "Acquire", "Capture lead, check fiber feasibility, and create subscriber commercial profile."],
  ["02", "Provision", "Auto-discover ONT, assign PON profile, and push TR-069 Wi-Fi credentials."],
  ["03", "Authenticate", "Authenticate PPPoE/IPoE sessions via FreeRADIUS with dynamic IP allocation."],
  ["04", "Bill", "Rate bandwidth throughput, generate cycle invoices, and collect multi-gateway payments."],
  ["05", "Assure", "Monitor SNMP optical levels, correlate alarms with AI NOC Copilot, and dispatch field techs."],
  ["06", "Retain", "Use AI churn prediction and automated speed boosts to protect customer lifetime value."],
];

const operatorModels = [
  [Router, "Telecom & Broadband", "Fixed, mobile, and convergent operators requiring high-concurrency FreeRADIUS AAA, GPON OLT provisioning, and convergent rating.", ["50K+ AAA sessions", "Multi-vendor OLTs", "Network & service assurance"]],
  [ServerCog, "FTTH & Regional ISPs", "Complete fiber-to-the-home operations connecting GIS cable maps, splitter attenuation, customer billing, and mobile field dispatch.", ["ONT barcode registration", "OTDR test sync", "Automated dunning"]],
  [Network, "WISPs & Wireless Operators", "Fixed-wireless access providers managing MikroTik CCR routers, tower backhauls, CPE signal quality, and bandwidth quotas.", ["MikroTik API integration", "Tower health monitoring", "FUP data caps"]],
  [Database, "Multi-Tenant Wholesale MSPs", "Operate multi-tenant service catalogs, reseller billing partitions, customer care, and REST API integrations with strict RBAC boundaries.", ["Multi-tenant partitioning", "Reseller commission ledger", "Open RESTful APIs"]],
] as const;

export default function PlatformPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Kashtrix OSS/BSS Platform",
        applicationCategory: "BusinessApplication",
        description: "Unified AI-powered telecom OSS/BSS for subscriber management, convergent billing, FreeRADIUS AAA, GPON OLT provisioning, SNMP telemetry, and carrier-grade syslog.",
        url: `${SITE.url}/platform`,
        operatingSystem: "Linux (Ubuntu / RHEL / Debian), Kubernetes, Docker",
        featureList: modules.map((m) => m.title),
      },
      {
        "@type": "FAQPage",
        mainEntity: platformFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="site-hero relative overflow-hidden border-b border-[#e8e2e9] bg-[#fcfbfc]">
        <AnimatedBrandShapes />
        <div className="container-shell relative z-10 grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[.84fr_1.16fr]">
          <MotionReveal>
            <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Unified Telecom OSS/BSS & ISP Management</p>
            <h1 className="mt-5 text-[clamp(2.7rem,4.8vw,4.6rem)] font-semibold leading-[.98] tracking-[-.05em] text-[#171219] dark:text-white">
              The AI-powered telecom operating system for <span className="text-[#4b1b63] dark:text-[#c084fc]">broadband & fiber operators.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[1.03rem] leading-8 text-[#6d6670] dark:text-[#bdaec4]">
              Kashtrix eliminates telecom silos by unifying FreeRADIUS AAA, GPON/XGS-PON OLTs, multi-vendor SNMP telemetry, TR-069 CPE automation, convergent billing, subscriber CRM, and carrier-grade CGNAT compliance syslog into one synchronized timeseries architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-demo" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#6f2b8f]">
                Request OSS/BSS live demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#architecture" className="button-secondary">
                Explore Core Layers
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px border border-[#e6e0e7] bg-[#e6e0e7] dark:border-white/10 dark:bg-white/10 sm:grid-cols-4">
              {[
                ["50K+ Req/s", "FreeRADIUS AAA"],
                ["Multi-Vendor", "SNMP & OLT Driver"],
                ["Autonomous", "Agentic NOC Copilot"],
                ["100K+ EPS", "CGNAT Syslog"],
              ].map(([a, b]) => (
                <div key={a} className="swipe-card bg-white p-4">
                  <p className="text-sm font-semibold">{a}</p>
                  <p className="mt-1 text-[11px] text-[#807883]">{b}</p>
                </div>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.05} className="relative w-full">
            <ProductHardwareMockup
              image="/media/oss-bss/01580174-2bd9-4e23-8664-ca9cb115db84.png"
              alt="Kashtrix unified OSS BSS platform"
              serverLabel="TELECOM OSS/BSS PLATFORM"
              accent="#8b5cf6"
              priority
            />
          </MotionReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4 SYNCHRONIZED ARCHITECTURAL LAYERS
      ───────────────────────────────────────────────────────────── */}
      <section id="architecture" className="section-pad bg-[#faf9fa] border-b border-[#e8e2e9]">
        <div className="container-shell">
          <MotionReveal className="mb-10 text-center max-w-3xl mx-auto">
            <p className="kicker !text-[#b30f5f]">Synchronized Core Architecture</p>
            <h2 className="heading mt-3">Four connected layers — from optical glass to revenue.</h2>
            <p className="subheading mt-4">
              Connect your fiber splitters, BNG gateways, FreeRADIUS AAA, SNMP monitoring, billing meters, and customer care CRM into one unified operational plane.
            </p>
          </MotionReveal>
          <OssBssShowcase />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          AI AGENTIC AUTONOMOUS NOC & OPERATIONS DEEP DIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-white border-b border-[#e8e2e9]">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 rounded-[4px] bg-[#fdf2f8] px-3 py-1 text-xs font-semibold text-[#be185d]">
                <Bot className="h-4 w-4" /> Autonomous Telecom Intelligence
              </div>
              <h2 className="heading mt-4">
                AI Agents that understand telecom topology, telemetry, and business policy.
              </h2>
              <p className="subheading mt-4">
                Unlike generic chatbots that hallucinate text, Kashtrix AI Agents are purpose-built domain engines pre-trained on RFC standards, Broadband Forum TR-069/TR-369 schemas, and real-time OSS/BSS timeseries data.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  [Sparkles, "NOC Root-Cause Correlation", "When a major feeder fiber breaks, hundreds of downstream ONTs send Dying Gasp alerts. The AI NOC Copilot instantly correlates the optical topology, suppresses cascading subscriber alarms, and pinpoints the precise splice enclosure or cable span failure."],
                  [ShieldCheck, "Deterministic Policy Guardrails", "Configurable permission boundaries allow low-risk diagnostic queries and line checks to run autonomously, while destructive or wide-scale changes (e.g. bulk disconnects, BNG route alterations) require explicit human engineer approval."],
                  [Headphones, "Customer Care Diagnostic Copilot", "When a subscriber calls, the AI Care Assistant inspects optical RX power, Wi-Fi interference, and RADIUS session uptime in real time, drafting instant plain-language troubleshooting steps for support staff."],
                  [CircleDollarSign, "Revenue & Churn Mitigation Agent", "Continuously analyzes bandwidth consumption trends, repeated speed test failures, and payment patterns to flag at-risk subscribers before they churn, suggesting proactive bandwidth upgrades."],
                ].map(([Icon, title, desc]) => {
                  const I = Icon as typeof Sparkles;
                  return (
                    <div key={String(title)} className="flex gap-4 rounded-[4px] border border-[#f0ebf2] bg-[#fbf9fb] p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-[#4b1b63] dark:bg-[#6f2b8f] text-white">
                        <I className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#171219]">{String(title)}</h4>
                        <p className="mt-1 text-xs leading-5 text-[#6c6471]">{String(desc)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.06} className="relative w-full">
              <div className="overflow-hidden rounded-[5px] border border-[#e4dee6] dark:border-[#381647] bg-[#12051c] shadow-md transition hover:shadow-lg">
                <Image
                  src="/media/oss-bss/030d7016-5b75-4531-ab1e-2bd488cf5ac0.png"
                  alt="AI Agentic NOC monitoring interface"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="block h-auto w-full object-contain"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#8e8593] dark:text-[#a090ab]">
                <span>Autonomous NOC Copilot · Topology Correlation</span>
                <span className="text-[#10b981] font-bold">Sub-Second Incident Triage</span>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          COMPLETE DEVICE MANAGEMENT & SNMP INTEGRATION DEEP DIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-[#faf9fa] border-b border-[#e8e2e9]">
        <div className="container-shell">
          <MotionReveal className="text-center max-w-3xl mx-auto mb-12">
            <p className="kicker !text-[#b30f5f]">Multi-Vendor Hardware Ecosystem</p>
            <h2 className="heading mt-3">Complete Device Management & Native SNMP Telemetry</h2>
            <p className="subheading mt-4">
              Vendor lock-in is a thing of the past. Manage OLTs, BNGs, and CPEs across all industry-leading manufacturers with unified configuration templates and sub-second polling.
            </p>
          </MotionReveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "MikroTik RouterOS (v6 & v7)",
                desc: "Direct integration via RouterOS API and REST API for CCR core routers, GPEN switches, and wireless links. Automates PPPoE servers, firewall queues, and dynamic address lists.",
                tag: "BNG & Core Routing",
              },
              {
                title: "Nokia ISAM 7360 / FX Series",
                desc: "Full TL1, CLI, and NETCONF automation for GPON and XGS-PON chassis. Automates ONT profile creation, VLAN cross-connects, and optical power budget telemetry.",
                tag: "Optical Access OLT",
              },
              {
                title: "Huawei SmartAX MA5800 / MA5600",
                desc: "Automated provisioning for GPON/EPON service boards via CLI/SNMP. Instant discovery of unconfigured ONTs upon connection to the optical distribution network.",
                tag: "Optical Access OLT",
              },
              {
                title: "ZTE ZXA10 C300 / C320 / C600",
                desc: "Standardized service port configuration, DBA profiles, and traffic shaping policies with automated configuration rollback safeguards.",
                tag: "Optical Access OLT",
              },
              {
                title: "Cisco ASR 9000 & Juniper MX",
                desc: "Carrier-grade BNG session control via NETCONF/YANG and gNMI streaming telemetry. Manages subscriber QoS policies, VRFs, and dual-stack IPv4/IPv6 pools.",
                tag: "Edge BNG & BRAS",
              },
              {
                title: "TR-069 / TR-369 CWMP ACS",
                desc: "Vendor-neutral ACS managing subscriber ONTs and Wi-Fi routers (Huawei, ZTE, TP-Link, Netgear, D-Link). Remote SSID setup, channel optimization, and batch firmware upgrades.",
                tag: "Subscriber CPE & Wi-Fi",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="flex flex-col justify-between rounded-[4px] border border-[#e5dfeb] bg-white p-5 transition hover:border-[#6f2b8f] hover:shadow-sm dark:border-[#381647] dark:bg-[#160822] dark:hover:border-[#c084fc]"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4b1b63] dark:text-[#c084fc]">
                    {d.tag}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#171219] dark:text-white">{d.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#69616e] dark:text-[#bdaec4]">{d.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f2edf4] dark:border-[#381647] flex items-center justify-between text-[11px] font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                  <span>Telemetry & Auto-Config</span>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10 CORE OPERATIONAL MODULES GRID
      ───────────────────────────────────────────────────────────── */}
      <section id="modules" className="section-pad bg-white border-b border-[#e8e2e9] dark:bg-[#12051c] dark:border-white/10">
        <div className="container-shell">
          <MotionReveal className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
            <div>
              <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Complete Module Coverage</p>
              <h2 className="heading mt-4 text-[#171219] dark:text-white">A complete operator lifecycle — not a thin dashboard.</h2>
            </div>
            <p className="subheading max-w-2xl lg:justify-self-end text-[#706a73] dark:text-[#bdaec4]">
              The suite connects commercial, care, finance, and network teams while keeping each operational domain explicit. Use the modules independently or compose them into one operating model.
            </p>
          </MotionReveal>
          <div className="mt-11 grid gap-px border border-[#e4dee6] bg-[#e4dee6] dark:border-white/10 dark:bg-white/10 md:grid-cols-2 lg:grid-cols-5">
            {modules.map((m, i) => {
              const I = m.icon;
              return (
                <MotionReveal delay={(i % 5) * 0.025} key={m.title} className="swipe-card bg-white dark:bg-[#170724] p-5">
                  <I className="h-5 w-5 text-[#6f2b8f] dark:text-[#c084fc]" />
                  <h3 className="mt-4 text-sm font-semibold text-[#171219] dark:text-white">{m.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-[#746d76] dark:text-[#bdaec4]">{m.description}</p>
                  <div className="mt-4 grid gap-2">
                    {m.bullets.map((b) => (
                      <p key={b} className="flex gap-2 text-[11px] leading-5 text-[#625b65] dark:text-[#cfc4d6]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc]" />
                        {b}
                      </p>
                    ))}
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WORKFLOW SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#e8e2e9] bg-[#faf9fa] py-16">
        <AnimatedBrandShapes subtle />
        <div className="container-shell relative z-10">
          <MotionReveal className="grid gap-7 lg:grid-cols-[.62fr_1.38fr] lg:items-end">
            <div>
              <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Operator Workflow</p>
              <h2 className="heading mt-4 text-[#171219] dark:text-white">From acquisition to retention with the same service context.</h2>
            </div>
            <p className="subheading max-w-2xl lg:justify-self-end text-[#706a73] dark:text-[#bdaec4]">
              Subscriber identity, service state, policy, billing and operational history stay connected as work moves between teams.
            </p>
          </MotionReveal>
          <div className="mt-11 grid gap-px border border-[#e2dce4] bg-[#e2dce4] dark:border-white/10 dark:bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map(([n, title, text], i) => (
              <MotionReveal delay={i * 0.03} key={title} className="swipe-card bg-white dark:bg-[#170724] p-5">
                <span className="text-[10px] font-semibold tracking-[.13em] text-[#4b1b63] dark:text-[#c084fc]">{n}</span>
                <h3 className="mt-4 text-sm font-semibold text-[#171219] dark:text-white">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#756e77] dark:text-[#bdaec4]">{text}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          OPERATOR MODELS
      ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e8e2e9] bg-[#171219] py-16 text-white dark:border-white/10 dark:bg-[#0f0418]">
        <div className="container-shell">
          <MotionReveal className="grid gap-8 lg:grid-cols-[.64fr_1.36fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#c084fc]">
                Built For Operator Models
              </p>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[1.03] tracking-[-.04em]">
                Flexible across telecom, broadband and managed services.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#b7afb9] lg:justify-self-end">
              Configure workflows and integrations around your business model while keeping one consistent service and subscriber context.
            </p>
          </MotionReveal>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
            {operatorModels.map(([Icon, title, text, bullets]) => {
              const I = Icon as typeof Router;
              return (
                <div key={String(title)} className="swipe-card bg-[#171219] dark:bg-[#14061e] p-6">
                  <I className="h-5 w-5 text-[#c084fc]" />
                  <h3 className="mt-5 text-base font-semibold">{String(title)}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#aaa2ad]">{String(text)}</p>
                  <div className="mt-4 grid gap-2">
                    {(bullets as readonly string[]).map((b) => (
                      <p key={b} className="flex gap-2 text-[11px] text-[#d0c9d1]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c084fc]" />
                        {b}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FREQUENTLY ASKED QUESTIONS (SEO ACCORDION & FAQPAGE SCHEMA)
      ───────────────────────────────────────────────────────────── */}
      <section className="section-pad bg-white border-b border-[#e8e2e9] dark:bg-[#12051c] dark:border-white/10">
        <div className="container-shell max-w-4xl mx-auto">
          <MotionReveal className="text-center mb-10">
            <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Telecom Architecture & FAQ</p>
            <h2 className="heading mt-3 text-[#171219] dark:text-white">Frequently Asked Questions</h2>
            <p className="subheading mt-3 text-[#706a73] dark:text-[#bdaec4]">
              Answers to common architecture, protocol, and deployment questions for telecom and ISP operators.
            </p>
          </MotionReveal>
          <FaqAccordion items={platformFaqs} accent="#6f2b8f" />
        </div>
      </section>

      <InlineCTA
        eyebrow="OSS / BSS deployment"
        title="Map your existing network, billing and subscriber stack before you replace anything."
        text="Share your subscriber scale, AAA stack, broadband gateways, access vendors, billing model, payment flows and customer-care process. We’ll map an incremental Kashtrix deployment."
        accent="#6f2b8f"
      />
    </main>
  );
}
