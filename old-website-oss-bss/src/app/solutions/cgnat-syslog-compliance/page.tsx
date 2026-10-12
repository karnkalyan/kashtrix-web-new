import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "CGNAT Syslog Compliance Logging Platform for ISPs | Kashtrix",
  description: "Maintain CGNAT compliance with high-throughput syslog ingestion, encrypted NAT translation logging, subscriber IP-port mapping and law enforcement audit search for ISPs and broadband operators.",
  keywords: ["CGNAT syslog compliance", "ISP CGNAT logging", "NAT444 audit logs", "CGNAT compliance platform", "carrier-grade NAT logging", "ISP syslog compliance"],
  canonical: "https://kashtrix.com/solutions/cgnat-syslog-compliance",
});

const FAQS = [
  { question: "What is CGNAT compliance logging?", answer: "Carrier-Grade NAT (CGNAT) allows ISPs to share public IPv4 addresses across multiple subscribers using port-based allocation. Regulatory requirements in many jurisdictions mandate that ISPs log these NAT translations — mapping public IP addresses and port ranges to specific subscriber accounts — and retain them for audit and law enforcement purposes." },
  { question: "How many syslog messages can Kashtrix process?", answer: "Kashtrix syslog is designed for high-throughput ingestion via UDP, TCP and TLS on port 514. The architecture supports horizontal scaling to handle growing log volumes as your subscriber base expands." },
  { question: "How long are CGNAT logs retained?", answer: "Kashtrix supports configurable retention policies with encrypted hot/cold storage tiers. Hot storage enables sub-second search across recent logs, while cold archival to S3-compatible storage provides long-term compliance retention." },
];

export default function CGNATSyslogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "CGNAT Syslog Compliance", href: "/solutions/cgnat-syslog-compliance" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6"><Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span><Link href="/syslog" className="hover:text-[var(--text-primary)]">Syslog</Link><span>/</span><span className="text-[var(--text-primary)] font-semibold">CGNAT Compliance</span></nav>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><ShieldCheck className="w-3.5 h-3.5" /> CGNAT Audit Logging</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">CGNAT Syslog Compliance Logging Platform</h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">Meet regulatory CGNAT logging requirements with Kashtrix&apos;s carrier-grade syslog platform. Ingest high-frequency NAT translation logs from MikroTik, Cisco, Nokia and Huawei gateways, map public IP-port allocations to subscriber profiles, and maintain encrypted archives with instant subpoena search.</p>
          <div className="mt-8 flex gap-3"><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Syslog Demo <ArrowRight className="w-4 h-4" /></Link><Link href="/syslog" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all">Syslog Overview <ArrowRight className="w-4 h-4" /></Link></div>
        </div></section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">Why CGNAT Compliance Matters</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">As IPv4 address exhaustion continues, ISPs increasingly deploy Carrier-Grade NAT (NAT444/DS-Lite) to share public addresses across subscribers. This creates a legal and operational challenge: when law enforcement or regulatory bodies request identification of a subscriber behind a specific public IP at a specific time, the ISP must produce port-level NAT translation logs that map back to individual accounts.</p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Without proper logging, ISPs risk regulatory penalties, inability to comply with lawful intercept requests, and audit failures. Kashtrix Syslog provides the infrastructure to capture, index, archive and search these critical CGNAT translation events at scale.</p>
        </div></section>

        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "High-Throughput Syslog Ingestion", desc: "Receive syslog streams via UDP, TCP and TLS (port 514). Supports MikroTik, Cisco ASR, Nokia, Huawei and other NAT gateway log formats with vendor-specific parsers." },
              { title: "Subscriber IP-Port Mapping", desc: "Automatically correlate NAT translation events (public IP + port range) with subscriber profiles from the Kashtrix CRM/BSS database. Provides instant subscriber identification for any IP-port-timestamp query." },
              { title: "Encrypted Hot/Cold Archival", desc: "Recent logs are stored in hot searchable indexes for sub-second queries. Older logs tier to encrypted cold storage (S3-compatible) with configurable retention policies." },
              { title: "Audit Search Interface", desc: "Purpose-built search interface for compliance officers and law enforcement queries. Search by public IP, port range, timestamp, subscriber ID or geographic region with export-ready results." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3"><h3 className="text-base font-bold font-sora">{item.title}</h3><p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p></div>
            ))}
          </div>
        </div></section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
          {FAQS.map((faq) => (<div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0"><h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3><p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p></div>))}
        </div></section>

        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">Related Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{ label: "ISP Syslog Server", href: "/syslog", desc: "Complete syslog platform" }, { label: "Network Management", href: "/network-management", desc: "NOC monitoring & alarms" }, { label: "Security", href: "/security", desc: "Platform security architecture" }].map((link) => (<Link key={link.href} href={link.href} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all"><span className="text-sm font-bold block">{link.label}</span><span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.desc}</span></Link>))}
          </div>
        </div></section>

        <section className="py-20 text-center"><div className="max-w-2xl mx-auto px-4 space-y-4"><h2 className="text-2xl font-bold font-sora">Ensure CGNAT Compliance</h2><p className="text-sm text-[var(--text-secondary)]">See how Kashtrix Syslog handles CGNAT audit logging for your ISP.</p><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link></div></section>
      </main>
    </SiteShell>
  );
}
