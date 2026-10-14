import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  constructMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getClosedLoopTicketingSchema,
} from "@/lib/seo";
import {
  TicketCheck,
  Clock,
  Navigation,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Send,
  Zap,
  Users,
  Timer,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Closed-Loop Fault Ticketing & SLA Escalation for ISPs | Kashtrix",
  description:
    "Automated SLA tracking, real-time subscriber ping/optical diagnosis, mobile field technician dispatch, and closed-loop fault ticketing software for broadband ISPs and telcos.",
  keywords: [
    "Automated SLA tracking and ticket escalation engine for ISPs",
    "Field technician dispatch task management inside BSS software",
    "Subscriber ticketing panel with automatic network ping diagnosis",
    "Closed loop fault ticketing system for broadband operators",
    "ISP helpdesk ticket automation",
    "Mobile technician GPS dispatch app",
    "Optical power diagnosis on ticket creation",
    "Broadband customer care ticketing",
    "Customer OTP ticket closure verification",
  ],
  canonical: "https://kashtrix.com/solutions/closed-loop-fault-ticketing",
});

const FAQS = [
  {
    question: "What is a closed-loop fault ticketing system in broadband operations?",
    answer:
      "A closed-loop system ensures that a ticket cannot be marked resolved until both automated network verification passes (live ONT optical power in range, PPPoE session active, 0% packet loss) and the subscriber confirms resolution via SMS OTP or mobile app confirmation.",
  },
  {
    question: "How does the automatic network ping and optical diagnosis work during ticket creation?",
    answer:
      "When a customer or call center agent opens a ticket, Kashtrix immediately runs background diagnostics: polling the subscriber's assigned OLT for ONT optical Rx/Tx levels, querying the BNG for active PPPoE/IPoE sessions, and running an ICMP ping from the gateway. If an upstream outage is detected, the customer is notified instantly, preventing redundant technician dispatches.",
  },
  {
    question: "How are field technicians dispatched with GPS routing?",
    answer:
      "Kashtrix matches ticket location coordinates with field technician GPS locations, skill sets (fiber fusion splicing vs CPE replacement), and parts in van inventory. Technicians receive work orders on the Kashtrix Mobile App with turn-by-turn navigation, drop cable schematics, and optical power testing tools.",
  },
  {
    question: "Can we configure tiered SLA escalation timers and breach alerts?",
    answer:
      "Yes. You can define granular SLAs based on subscriber tier (Enterprise Dedicated vs Residential Broadband) and ticket severity (Critical Fiber Cut vs Wi-Fi Password Reset). SLA countdown timers escalate unacknowledged tickets to NOC managers via SMS, WhatsApp, and email before a breach occurs.",
  },
];

export default function ClosedLoopTicketingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "Closed-Loop Fault Ticketing & SLA Escalation",
      href: "/solutions/closed-loop-fault-ticketing",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);
  const productSchema = getClosedLoopTicketingSchema();

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
                Closed-Loop Ticketing
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <TicketCheck className="w-3.5 h-3.5" /> SLA-Driven Operational Workflow
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Closed-Loop Fault Ticketing & Automated SLA Escalation Engine
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Turn subscriber complaints into fast, auditable resolutions. Automatically diagnose ONT
              optical power and ping latency upon ticket creation, dispatch field technicians via GPS,
              and enforce strict SLA resolution timers across your broadband operations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Request Ticketing Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/field-operations"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                Field Operations Mobile App <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Stage Lifecycle */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                The Closed-Loop Resolution Workflow
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Complete traceability from first diagnostic ping to subscriber satisfaction sign-off.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Instant Auto-Diagnosis",
                  desc: "System pings ONT, reads optical Rx dBm from OLT, and verifies RADIUS session state.",
                  icon: Activity,
                },
                {
                  step: "02",
                  title: "Dynamic SLA Clock",
                  desc: "Target MTTR countdown begins with multi-tier alerts sent to NOC managers before breach.",
                  icon: Clock,
                },
                {
                  step: "03",
                  title: "GPS Field Dispatch",
                  desc: "Nearest qualified technician receives work order with fiber splice diagrams and materials checklist.",
                  icon: Navigation,
                },
                {
                  step: "04",
                  title: "OTP Closed-Loop Signoff",
                  desc: "Subscriber receives secure OTP verification code to confirm internet restoration before ticket closes.",
                  icon: CheckCircle2,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E11D72]">{s.step}</span>
                    <s.icon className="w-5 h-5 text-[var(--text-link)]" />
                  </div>
                  <h3 className="text-sm font-bold font-sora">{s.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Engineered for High-Scale Broadband Helpdesks
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Empower your customer care agents and field teams with unified telemetry and automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "One-Click Diagnostic Panel",
                  desc: "Support agents view live latency, packet loss, ONT temperature, Wi-Fi channel load, and router reboot buttons directly inside the ticket.",
                },
                {
                  icon: Timer,
                  title: "Enterprise SLA Matrix",
                  desc: "Configure 99.9% uptime SLAs for leased lines and standard 4-hour response SLAs for FTTH subscribers with automatic penalty calculations.",
                },
                {
                  icon: Smartphone,
                  title: "Native Mobile Technician App",
                  desc: "Offline-capable iOS and Android app for field technicians. Scan ONT barcodes, capture optical power readings, and upload installation photos.",
                },
                {
                  icon: ShieldAlert,
                  title: "Bulk Outage Ticket Merging",
                  desc: "When an OLT PON port drops, Kashtrix detects the cluster and automatically links individual subscriber tickets into a single master incident.",
                },
                {
                  icon: Users,
                  title: "Multi-Department Escalations",
                  desc: "Seamless handoffs between Level 1 Helpdesk, Level 2 Network NOC, Level 3 Fiber Splicing, and Billing Administration with immutable audit logs.",
                },
                {
                  icon: Send,
                  title: "Omnichannel Notifications",
                  desc: "Keep subscribers updated at every step via SMS, WhatsApp, mobile push notifications, and automated phone calls.",
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
            <h2 className="text-2xl font-bold font-sora">Explore Related Operations Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Field Staff GPS Dispatch",
                  href: "/solutions/isp-field-staff-gps",
                  desc: "Real-time technician tracking & dispatch",
                },
                {
                  label: "AI NOC Automation",
                  href: "/solutions/ai-agent-isp-noc-automation",
                  desc: "Autonomous root-cause analysis",
                },
                {
                  label: "CRM & Customer 360",
                  href: "/crm",
                  desc: "Subscriber lifecycle & communication",
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
              Accelerate Fault Resolution Across Your Network
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              See how Kashtrix Closed-Loop Ticketing reduces subscriber churn and speeds up field
              resolutions.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request Ticketing Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
