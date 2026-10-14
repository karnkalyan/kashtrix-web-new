import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  constructMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getConvergentBillingSchema,
} from "@/lib/seo";
import {
  CreditCard,
  Gauge,
  Wallet,
  Building2,
  RefreshCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  Receipt,
  Bell,
  Coins,
  FileCheck2,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Digital Wallet ISP Billing & Automated Dunning Software | Kashtrix",
  description:
    "Convergent ISP billing platform with automated dunning, digital wallet integrations, automated bandwidth throttling (CoA/PoD), and multi-branch ledger reconciliation for broadband operators.",
  keywords: [
    "Digital wallet integrated ISP billing with automated dunning",
    "Automated bandwidth throttling software for unpaid invoices",
    "Convergent billing ledger for multi branch broadband networks",
    "Prepaid and postpaid automatic invoice reconciliation software",
    "MikroTik CoA PoD bandwidth throttling",
    "ISP automated dunning workflow",
    "eSewa Khalti bKash JazzCash ISP wallet billing",
    "Broadband multi branch accounting ledger",
    "Automated late fee and disconnect engine",
  ],
  canonical: "https://kashtrix.com/solutions/convergent-billing-dunning",
});

const FAQS = [
  {
    question: "How does automated bandwidth throttling work for overdue invoices?",
    answer:
      "When a subscriber's payment is overdue beyond the configured grace period, Kashtrix triggers an automated RADIUS Change of Authorization (CoA) or Packet of Disconnect (PoD) to your BNG or MikroTik router. Instead of cutting off internet completely, Kashtrix dynamically throttles their speed (e.g., down to 128 kbps or redirects all HTTP/HTTPS traffic to a self-service payment portal).",
  },
  {
    question: "Which regional digital wallets and payment gateways are supported out-of-the-box?",
    answer:
      "Kashtrix supports global and regional payment rails including Stripe, PayPal, Razorpay, PayU, eSewa, Khalti, bKash, Nagad, JazzCash, Easypaisa, M-Pesa, Flutterwave, and Paystack, with automatic instant webhook reconciliation and immediate service unthrottling.",
  },
  {
    question: "How does multi-branch and franchise ledger reconciliation work?",
    answer:
      "Kashtrix maintains double-entry accounting ledgers across all corporate branches, regional hubs, and local sub-dealers (LCOs). Cash collections made at branch offices or franchise counters are tracked against digital wallet payouts, allowing automated daily closing and settlement reports.",
  },
  {
    question: "Can we automate multi-channel dunning reminders before throttling service?",
    answer:
      "Yes. You can design automated dunning schedules: sending SMS and WhatsApp reminders 3 days before invoice due date, automated email invoice links on due date, an interactive outbound Voice IVR call on day +1, soft throttling on day +3, and final suspension on day +7.",
  },
];

export default function ConvergentBillingDunningPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "Convergent Billing & Automated Dunning",
      href: "/solutions/convergent-billing-dunning",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);
  const productSchema = getConvergentBillingSchema();

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
                Convergent Billing & Dunning
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <CreditCard className="w-3.5 h-3.5" /> Convergent Revenue & Collections Engine
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Digital Wallet ISP Billing, Automated Dunning & Dynamic Throttling
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Maximize cash flow and eliminate revenue leakage. Automate invoice generation, integrate
              regional digital wallets, orchestrate multi-channel dunning campaigns, and execute dynamic
              RADIUS bandwidth throttling (CoA/PoD) across multi-branch broadband networks.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Schedule Billing Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/billing"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                Explore Billing Platform <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Stage Automated Dunning Flow */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Automated Multi-Stage Dunning & Recovery Workflow
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Intelligent dunning triggers that recover up to 38% more revenue without alienating subscribers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "Day -3",
                  title: "Pre-Due Reminders",
                  desc: "Automated SMS, WhatsApp & email notifications with 1-click digital wallet payment link.",
                  icon: Bell,
                },
                {
                  step: "Day 0",
                  title: "Due Date Reconciliation",
                  desc: "Auto-reconciles incoming wallet and card payments in real-time, sending instant receipts.",
                  icon: Receipt,
                },
                {
                  step: "Day +3",
                  title: "Grace Throttling (CoA)",
                  desc: "RADIUS CoA throttles speeds to 128 kbps and redirects browser sessions to payment captive portal.",
                  icon: Gauge,
                },
                {
                  step: "Instant",
                  title: "Immediate Service Restore",
                  desc: "Upon wallet payment confirmation, CoA packet restores full gigabit speed in under 2 seconds.",
                  icon: Zap,
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

        {/* Core Capabilities */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Enterprise Revenue Operations for Modern ISPs
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Everything required to manage high-volume prepaid and postpaid billing with zero manual bookkeeping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wallet,
                  title: "Regional Digital Wallet Integrations",
                  desc: "Native connectors for eSewa, Khalti, bKash, Nagad, JazzCash, Easypaisa, M-Pesa, PayU, and Stripe with instant automated clearing.",
                },
                {
                  icon: Gauge,
                  title: "Dynamic RADIUS CoA / PoD Throttling",
                  desc: "Sends RFC 3576 Change-of-Authorization packets to MikroTik, Cisco, and Huawei BNGs to adjust rate limits without tearing down PPPoE sessions.",
                },
                {
                  icon: Building2,
                  title: "Multi-Branch Ledger & Franchise Settlement",
                  desc: "Double-entry general ledger with sub-accounts for each branch, master distributor, and franchise partner for automated commission payouts.",
                },
                {
                  icon: FileCheck2,
                  title: "Prepaid & Postpaid Invoicing",
                  desc: "Supports recurring subscription plans, usage-based burstable 95th-percentile billing, static IP add-ons, and OTT bundle invoicing.",
                },
                {
                  icon: Coins,
                  title: "Subscriber Self-Service Wallet",
                  desc: "Allows subscribers to deposit balance into their prepaid wallet for auto-renewals, bandwidth boosts, and on-demand TV add-ons.",
                },
                {
                  icon: ShieldCheck,
                  title: "Tax, VAT & Fiscal Printer Compliance",
                  desc: "Automatically calculates municipal taxes, VAT, and telecom levies with direct integration to government e-invoicing portals.",
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
            <h2 className="text-2xl font-bold font-sora">Explore Related Billing Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Reseller & Franchise Billing",
                  href: "/solutions/isp-branch-reseller-management",
                  desc: "Multi-tier distributor wallet ledgers",
                },
                {
                  label: "PPPoE RADIUS Billing",
                  href: "/solutions/pppoe-radius-billing",
                  desc: "FreeRADIUS AAA & session management",
                },
                {
                  label: "Telecom BSS Platform",
                  href: "/bss",
                  desc: "Customer 360 & product catalog",
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
              Automate Collections & Maximize Telecom Revenue
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover how Kashtrix Convergent Billing and Automated Dunning improves cash flow from day one.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request Billing Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
