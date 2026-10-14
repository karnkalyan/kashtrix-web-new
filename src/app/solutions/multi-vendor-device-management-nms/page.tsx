import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  constructMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getMultiVendorNMSSchema,
} from "@/lib/seo";
import {
  Server,
  Terminal,
  Shield,
  Activity,
  ArrowRight,
  Cpu,
  Layers,
  Network,
  RefreshCw,
  Sliders,
  Database,
  Lock,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Multi-Vendor ISP NMS & Device Management Software | Kashtrix",
  description:
    "Control all your network hardware from a single dashboard. Enterprise ISP NMS with SNMP v2c/v3, SSH, Telnet, and TR-069 support for MikroTik, Nokia, Cisco, Juniper, Huawei, BDCOM, and ZTE.",
  keywords: [
    "All device management system single dashboard to control",
    "ISP NMS software",
    "SNMP v2c v3 monitoring software",
    "SSH Telnet automated device configuration",
    "MikroTik RouterOS central management",
    "Nokia ISAM OLT NMS",
    "Cisco ASR Juniper MX router management",
    "Huawei MA5800 ZTE C300 OLT dashboard",
    "BDCOM VSOL GPON switch management",
    "Automated network configuration backup and diff",
  ],
  canonical: "https://kashtrix.com/solutions/multi-vendor-device-management-nms",
});

const FAQS = [
  {
    question: "How does Kashtrix unify multiple hardware vendors under a single dashboard?",
    answer:
      "Kashtrix provides a protocol-agnostic device management layer that interfaces with hardware via SNMP v2c/v3, SSH, Telnet, NETCONF, RESTCONF, and TR-069 ACS. Whether your network runs MikroTik CCRs, Nokia ISAM OLTs, Cisco ASR 9000 BNGs, or BDCOM switches, all interfaces, optical metrics, traffic graphs, and configurations appear in one standardized dashboard.",
  },
  {
    question: "Can Kashtrix automatically back up router and OLT configurations?",
    answer:
      "Yes. Kashtrix schedules automated nightly configuration backups via SSH/SFTP or API for all registered devices. It maintains encrypted version histories and provides side-by-side visual diffs to instantly pinpoint unauthorized config changes or human errors causing network outages.",
  },
  {
    question: "What protocols are supported for legacy and modern hardware?",
    answer:
      "Kashtrix supports modern telemetry (gNMI, gRPC, NETCONF, IPFIX, sFlow) as well as traditional carrier protocols (SNMP v1/v2c/v3, SSHv2, Telnet fallback, TL1, and TR-069/TR-369 USP for customer-premises equipment).",
  },
  {
    question: "How does the credential vault and role-based access control (RBAC) work?",
    answer:
      "Engineers never need direct root credentials to edge routers or OLTs. Kashtrix securely stores device SSH keys and passwords in an AES-256 encrypted vault. When an operator issues a command, Kashtrix executes it through RBAC permission gates with full audit trails of who executed what command and when.",
  },
];

export default function MultiVendorNMSPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "Multi-Vendor Device Management & NMS",
      href: "/solutions/multi-vendor-device-management-nms",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);
  const productSchema = getMultiVendorNMSSchema();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        {/* Hero Section */}
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">
                Home
              </Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-[var(--text-primary)]">
                Solutions
              </Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">
                Multi-Vendor Device Management NMS
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Server className="w-3.5 h-3.5" /> Single Pane of Glass NMS
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              All-in-One Multi-Vendor ISP Device Management & NMS
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Control your entire ISP infrastructure — MikroTik, Nokia, Cisco, Juniper, Huawei, BDCOM,
              ZTE, VSOL, and FiberHome — from one unified operations dashboard. Monitor live SNMP v2/v3
              telemetry, push automated SSH/Telnet batch scripts, manage TR-069 CPEs, and track
              versioned configuration backups in real-time.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Schedule NMS Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/network-management"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                NOC Monitoring Platform <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Protocol & Vendor Compatibility Bar */}
        <section className="py-12 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xs uppercase tracking-widest text-center text-[var(--text-secondary)] font-mono mb-6">
              Supported Network Protocols & Hardware Ecosystem
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center">
              {[
                { name: "MikroTik RouterOS", sub: "v6 & v7 Winbox/API/SSH" },
                { name: "Nokia ISAM", sub: "7360 FX TL1 / CLI" },
                { name: "Huawei OLT & NE", sub: "MA5800 / NE40 / Netconf" },
                { name: "Cisco ASR / IOS", sub: "IOS-XR / XE / BNG" },
                { name: "Juniper Junos", sub: "MX BNG / RESTCONF" },
                { name: "ZTE & BDCOM", sub: "C300 / GP3600 / SNMP" },
              ].map((v) => (
                <div
                  key={v.name}
                  className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--page-bg)]"
                >
                  <p className="text-xs font-bold font-sora text-[var(--text-primary)]">{v.name}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{v.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Enterprise Device Management Built for Carrier NOCs
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Eliminate vendor-specific siloes and manage your multi-gigabit access, aggregation,
                and core network with unified operational precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Activity,
                  title: "High-Frequency SNMP Telemetry",
                  desc: "Poll interface traffic, SFP laser optical power, CPU load, memory utilization, and BGP peer states at 10-second intervals with zero network overhead.",
                },
                {
                  icon: Terminal,
                  title: "Automated CLI Script Engine",
                  desc: "Push templated configuration commands across 100+ routers and OLTs simultaneously via SSH or Telnet with dry-run validation and syntax checks.",
                },
                {
                  icon: RefreshCw,
                  title: "Configuration Backups & Visual Diff",
                  desc: "Automated scheduled backups for RouterOS RSC, Cisco running-config, and Huawei/ZTE saves. Compare revisions side-by-side with color-coded diffs.",
                },
                {
                  icon: Network,
                  title: "Dynamic Topology & Port Graphing",
                  desc: "Auto-discover LLDP and CDP neighbor links to generate interactive physical and logical network maps. Zoom from core routers down to individual PON ports.",
                },
                {
                  icon: Lock,
                  title: "Encrypted Credential Vault",
                  desc: "Store device passwords, SNMP community strings, and SSH private keys in an AES-256 HSM vault. Enforce MFA and granular role-based command permissions.",
                },
                {
                  icon: Sliders,
                  title: "TR-069 CPE Remote Control",
                  desc: "Manage thousands of customer Wi-Fi routers and ONTs. Diagnose Wi-Fi channel interference, reboot devices remotely, and run live ping tests.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3"
                >
                  <c.icon className="w-6 h-6 text-[#E11D72]" />
                  <h3 className="text-base font-bold font-sora">{c.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive CLI & Architecture Preview */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">Unified Multi-Vendor CLI Execution</h2>
            <div className="rounded-2xl border border-[var(--border-default)] bg-black/90 p-5 font-mono text-xs text-green-400 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-neutral-400 text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  kashtrix-nms-engine (mikrotik | huawei | nokia | cisco)
                </span>
                <span>STATUS: OPERATIONAL [10,482 DEVICES CONNECTED]</span>
              </div>
              <p className="text-neutral-300">
                # Executing Multi-Vendor Optical Power Diagnostic Across 4 OLT Clusters...
              </p>
              <p className="text-cyan-400">
                [HUAWEI-MA5800-CORE-01] display ont optical-info 0/1/0 12 =&gt; Rx: -19.4 dBm | Tx: +2.1 dBm [OPTIMAL]
              </p>
              <p className="text-cyan-400">
                [NOKIA-7360-ISAM-EAST] show equipment ont optical-status 1/1/2/4:8 =&gt; Rx: -20.1 dBm | Tx: +1.9 dBm [OPTIMAL]
              </p>
              <p className="text-cyan-400">
                [MIKROTIK-CCR2216-BNG] /interface/ethernet/monitor sfp-sfpplus1 =&gt; rx-power: -18.8dBm | sfp-temperature: 38C
              </p>
              <p className="text-yellow-400">
                [BDCOM-GP3600-AGG-02] show pon power attenuation epon0/3:14 =&gt; WARNING: -27.8 dBm [ATTENUATION HIGH - TICKET DISPATCHED]
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-2"
                >
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Solutions */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Explore Related Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Zero-Touch Provisioning",
                  href: "/solutions/zero-touch-provisioning",
                  desc: "Automated ONT file upload & activation",
                },
                {
                  label: "Carrier-Grade Syslog",
                  href: "/syslog",
                  desc: "CGNAT compliance & 100k+ msg/s ingestion",
                },
                {
                  label: "AI Fault Analyzer",
                  href: "/solutions/ai-driven-syslog-fault-analyzer",
                  desc: "MCP agents for telecom NOC automation",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--page-bg)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-sm font-bold block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">
                    {link.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-sora">
              Unify Your Entire Network Under One Single Pane of Glass
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Experience the speed and simplicity of Kashtrix Multi-Vendor NMS.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
