import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Bot, Network, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "AI Agent for ISP NOC Automation | Kashtrix",
  description:
    "Deploy AI agents purpose-built for ISP NOC automation. Correlate alarms, detect fiber faults, automate root-cause analysis and accelerate mean time to repair across multi-vendor broadband networks.",
  keywords: [
    "AI agent ISP NOC automation",
    "AI NOC automation",
    "ISP AI fault detection",
    "telecom AI operations",
    "autonomous NOC agent",
    "AI alarm correlation",
    "network self-healing AI",
  ],
  canonical: "https://kashtrix.com/solutions/ai-agent-isp-noc-automation",
});

const FAQS = [
  {
    question: "How do Kashtrix AI NOC agents differ from traditional monitoring tools?",
    answer:
      "Traditional NOC monitoring tools generate alerts and rely on human operators to investigate each one. Kashtrix AI NOC agents use topology-aware alarm correlation and telecom-domain training to automatically identify root causes, suppress cascading alerts, and recommend or execute remediation actions within policy boundaries.",
  },
  {
    question: "Can AI agents make network changes autonomously?",
    answer:
      "Kashtrix AI agents operate within configurable policy guardrails. Low-risk diagnostic actions (like checking RADIUS sessions or optical power levels) can run fully autonomously. High-impact actions (like firmware rollouts or core route modifications) require explicit human approval before execution.",
  },
  {
    question: "What protocols and vendors do AI NOC agents support?",
    answer:
      "Kashtrix AI agents ingest telemetry from SNMP v1/v2c/v3, Syslog, IPFIX/NetFlow, gNMI, NETCONF, RESTCONF and TR-069 across multi-vendor equipment including MikroTik, Cisco, Nokia, Huawei, ZTE and Juniper.",
  },
];

export default function AIAgentNOCPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    { name: "AI Agent ISP NOC Automation", href: "/solutions/ai-agent-isp-noc-automation" },
  ]);
  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        {/* Hero */}
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <Link href="/ai-agents" className="hover:text-[var(--text-primary)]">AI Agents</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">NOC Automation</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Bot className="w-3.5 h-3.5" /> AI-Powered NOC Operations
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              AI Agent for ISP NOC Automation
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Kashtrix AI NOC agents are purpose-built for telecom network operations centers. They ingest multi-vendor
              telemetry, correlate thousands of alarms against topology maps, identify root causes, and either
              recommend or execute remediation — all within operator-defined policy guardrails.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">
                Request NOC AI Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ai-agents" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all">
                Explore All AI Agents <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">The NOC Alert Fatigue Problem</h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Modern ISP networks generate thousands of SNMP traps, syslog events and optical power alerts every hour.
              When a single fiber cut occurs, downstream GPON OLTs, ONTs and BNG sessions flood the NOC dashboard
              with hundreds of cascading loss-of-signal alerts. Engineers waste critical minutes — sometimes hours —
              sifting through noise to find the single root cause.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Legacy monitoring tools present raw events without context. They cannot distinguish a power supply
              failure from a fiber break from a scheduled maintenance window. The result: high Mean Time to Repair (MTTR),
              engineer burnout, and degraded subscriber experience.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">How Kashtrix AI NOC Agents Work</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Network, title: "Topology-Aware Correlation", desc: "AI agents build a dynamic topology map connecting physical fiber links, GPON splitters, OLT ports and core routers. When a fiber break occurs, hundreds of cascading downstream alerts are automatically suppressed into a single root-cause event." },
                { icon: Zap, title: "Real-Time Telemetry Ingestion", desc: "Ingest multi-vendor telemetry via SNMP v1/v2c/v3, Syslog (UDP/TCP/TLS), IPFIX/NetFlow, gNMI streaming telemetry, NETCONF and RESTCONF from MikroTik, Cisco, Nokia, Huawei and ZTE equipment." },
                { icon: Bot, title: "Autonomous Diagnostics", desc: "Before dispatching a human engineer, AI agents execute diagnostic runbooks: checking RADIUS session state, optical RX/TX power levels, BGP peer status, and subscriber service health — presenting findings as structured summaries." },
                { icon: ShieldCheck, title: "Policy-Governed Execution", desc: "Every AI action is bounded by configurable permission policies. Low-risk diagnostics run autonomously; high-impact changes (firmware updates, route modifications) require explicit human approval with full audit trail." },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3">
                  <item.icon className="w-6 h-6 text-[var(--text-link)]" />
                  <h3 className="text-base font-bold font-sora">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Architecture &amp; Workflow</h2>
            <ol className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)]">
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">1.</span> Multi-protocol telemetry streams are ingested from across your broadband access, aggregation and core network layers.</li>
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">2.</span> Events are normalized and enriched with subscriber, topology and service context from the Kashtrix OSS/BSS data model.</li>
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">3.</span> AI correlation engines analyze patterns against known fault signatures and topology dependency graphs.</li>
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">4.</span> Root cause is identified; cascading secondary alerts are suppressed and grouped under the primary incident.</li>
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">5.</span> Remediation is either executed autonomously (within policy) or presented as a recommendation for human approval.</li>
              <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)] shrink-0">6.</span> If field dispatch is required, a work order is automatically created with GPS coordinates, equipment details and fault context.</li>
            </ol>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Use Cases</h2>
            <ul className="space-y-3 text-sm sm:text-base text-[var(--text-secondary)]">
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Fiber cut detection with automatic downstream ONT impact analysis</li>
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> OLT power supply failure correlation across multiple PON ports</li>
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> BGP peer flap root-cause identification with route convergence analysis</li>
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> RADIUS authentication storm detection and automatic session cleanup</li>
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Proactive optical power degradation alerts before subscriber impact</li>
              <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Scheduled maintenance window awareness to suppress known-good alerts</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
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

        {/* Internal Links */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Related Kashtrix Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "All AI Agents", href: "/ai-agents", desc: "Explore the complete AI agent portfolio" },
                { label: "ISP Network Management", href: "/network-management", desc: "Real-time NOC monitoring & topology" },
                { label: "ISP Syslog Server", href: "/syslog", desc: "CGNAT compliance logging platform" },
                { label: "Network Automation", href: "/network-automation", desc: "RADIUS, BNG & OLT automation" },
                { label: "Hardware Automation", href: "/hardware-automation", desc: "Multi-vendor device management" },
                { label: "Field Operations", href: "/field-operations", desc: "Dispatch & GPS field tracking" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all">
                  <span className="text-sm font-bold text-[var(--text-primary)] block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl font-bold font-sora">Ready to Automate Your NOC?</h2>
            <p className="text-sm text-[var(--text-secondary)]">See how Kashtrix AI agents reduce alert noise and accelerate fault resolution for ISP networks.</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
