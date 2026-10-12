import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  constructMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getAISyslogAnalyzerSchema,
} from "@/lib/seo";
import {
  Bot,
  Sparkles,
  PhoneCall,
  Activity,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageSquareCode,
  Network,
  Headphones,
  Search,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "AI Syslog Log Analyzer & Telecom MCP Agents | Kashtrix",
  description:
    "AI-driven syslog log analyzer for multi-vendor network faults, Model Context Protocol (MCP) AI agents for telecom NOCs, and autonomous voice AI customer care bots for ISPs.",
  keywords: [
    "Model Context Protocol MCP AI agents for telecom NOC",
    "Automated voice AI customer service bot for ISP call centers",
    "AI native OSS BSS software automation platform",
    "Autonomous customer care agentic AI for ISP ticketing",
    "AI driven syslog log analyzer for multi vendor network faults",
    "Telecom NOC AI root cause analysis",
    "Automated BGP flap diagnostic AI",
    "Optical loss anomaly detection AI",
    "Voice AI SIP WebRTC telecom call center",
    "Kashtrix AI Agents",
  ],
  canonical: "https://kashtrix.com/solutions/ai-driven-syslog-fault-analyzer",
});

const FAQS = [
  {
    question: "How do Kashtrix MCP (Model Context Protocol) AI Agents assist NOC engineers?",
    answer:
      "Kashtrix implements the open Model Context Protocol (MCP) to provide AI agents with secure, read/write tools into your telecom infrastructure. An MCP NOC agent can ingest real-time syslog streams, query SNMP MIBs, correlate BGP flap timestamps with fiber attenuation dips on an OLT, and recommend or execute pre-approved mitigation runbooks.",
  },
  {
    question: "How does the AI syslog log analyzer detect multi-vendor network anomalies?",
    answer:
      "Rather than relying solely on static regex alerts, Kashtrix's AI embedding engine clusters millions of raw syslog lines from MikroTik, Cisco, Nokia, and Huawei. It detects subtle anomaly sequences—such as cascading CRC error bursts preceding link failures—giving NOC teams 20-30 minutes of advance warning before a major outage.",
  },
  {
    question: "How does the voice AI customer service bot handle subscriber call spikes during outages?",
    answer:
      "When a fiber cut or upstream power loss occurs, thousands of subscribers call simultaneously. The Kashtrix Voice AI agent connects directly to your SIP/WebRTC PBX, queries the live NOC outage map by subscriber caller-ID/geography, and proactively informs callers of the estimated resolution time without human dispatcher intervention.",
  },
  {
    question: "Can autonomous AI agents perform automated ticket triage and diagnostics?",
    answer:
      "Yes. When a customer submits a ticket via mobile app, WhatsApp, or portal, the autonomous agent executes a live ping, checks RADIUS authentication logs, inspects OLT optical Rx levels, and suggests troubleshooting steps (e.g. Wi-Fi channel conflict vs physical fiber break) before escalating to a field technician.",
  },
];

export default function AISyslogAnalyzerPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "AI Syslog Analyzer & Telecom MCP",
      href: "/solutions/ai-driven-syslog-fault-analyzer",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);
  const productSchema = getAISyslogAnalyzerSchema();

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
                AI Syslog Analyzer & MCP
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Bot className="w-3.5 h-3.5" /> Agentic AI for Telecom Infrastructure
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              AI Syslog Analyzer & Model Context Protocol (MCP) Agents for Telecom
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Supercharge your NOC with autonomous agentic intelligence. Correlate millions of
              multi-vendor syslog messages in milliseconds, execute safe network remediation runbooks
              via MCP tools, and deploy human-sounding voice AI bots for 24/7 ISP subscriber care.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Schedule AI Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-agents"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                Explore AI Agents <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3 AI Pillars */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                The Three Pillars of Kashtrix AI Telecom Automation
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Bridging low-level network packets, carrier syslog events, and real-time subscriber voice
                interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-sora">AI Syslog Root-Cause Engine</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Ingests over 100k messages/sec from MikroTik, Cisco, Nokia, and Huawei. Automatically
                  clusters noise into high-fidelity incident timelines and flags optical attenuation
                  flaps.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-[#E11D72]">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-sora">Model Context Protocol (MCP)</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Securely connects Claude and Gemini models to your production OLTs, BNGs, and billing
                  APIs through strictly governed, read/write MCP tool definitions with human-in-the-loop
                  approval.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-sora">Voice AI Call Center Bot</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Humanlike conversational voice bot handling 1,000+ simultaneous SIP/WebRTC calls.
                  Performs real-time line diagnostics, answers billing inquiries, and logs tickets with
                  zero wait time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Engineered for High-Reliability Telecom Operations
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Autonomous capabilities designed to reduce MTTR (Mean Time to Resolution) by up to 74%.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "Semantic Syslog Search",
                  desc: "Search logs using natural language: 'Show all BGP flaps on Edge-Router-02 when optical power dropped below -25dBm'.",
                },
                {
                  icon: Zap,
                  title: "Automated Runbook Execution",
                  desc: "When a fiber flap occurs, the agent pings neighboring ONTs, verifies OLT power, and rebalances PPPoE sessions across backup BNGs.",
                },
                {
                  icon: PhoneCall,
                  title: "Interactive Outage Voice IVR",
                  desc: "Detects caller geographic cell and alerts them instantly: 'We detect maintenance in your sector with estimated restoration in 35 mins.'",
                },
                {
                  icon: Network,
                  title: "Optical Anomaly Prediction",
                  desc: "Machine learning models analyze laser degradation trends to replace degrading SFP optics before total subscriber link drops.",
                },
                {
                  icon: Terminal,
                  title: "MCP CLI Sandboxing",
                  desc: "Enforce strict dry-run verification before pushing automated network configuration changes through MCP agent tools.",
                },
                {
                  icon: ShieldCheck,
                  title: "Carrier-Grade Audit Logs",
                  desc: "Every reasoning step, token usage, tool invocation, and human approval is immutably archived for compliance and security reviews.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3"
                >
                  <f.icon className="w-6 h-6 text-[#E11D72]" />
                  <h3 className="text-base font-bold font-sora">{f.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
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
            <h2 className="text-2xl font-bold font-sora">Explore Related AI Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "AI NOC Automation",
                  href: "/solutions/ai-agent-isp-noc-automation",
                  desc: "Autonomous telecom incident correlation",
                },
                {
                  label: "MCP Server Integration",
                  href: "/solutions/isp-mcp-server-ai",
                  desc: "Model Context Protocol for network tools",
                },
                {
                  label: "Voice Automation",
                  href: "/voice-automation",
                  desc: "PBX, SIP & AI outbound dialers",
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
              Build an Autonomous AI-Native Telecom Operation
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover how Kashtrix AI Agents and Syslog Analyzers transform your NOC and call center.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request AI Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
