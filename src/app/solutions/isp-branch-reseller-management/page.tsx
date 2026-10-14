import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import {
  Building2,
  Users,
  CreditCard,
  ShieldCheck,
  Layers,
  ArrowRight,
  Wallet,
  Coins,
  ReceiptText,
  Network,
  Split,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Reseller Prepaid Wallet & Multi-Tenant ISP Branch Software | Kashtrix",
  description:
    "Multi-tenant branch and local sub-dealer ISP billing software with reseller prepaid wallet architecture, hierarchical member management, multi-tier distributor margin ledgers, and franchise settlement.",
  keywords: [
    "Reseller prepaid wallet architecture for cable operators",
    "Multi tenant branch and local sub dealer ISP billing software",
    "Hierarchical member management system for local loop operators",
    "Multi tier distributor margin wallet ledger for telecom",
    "ISP branch level permission and franchise settlement software",
    "LCO local cable operator billing system",
    "Telecom reseller commission split",
    "Franchisee ISP management platform",
  ],
  canonical: "https://kashtrix.com/solutions/isp-branch-reseller-management",
});

const FAQS = [
  {
    question: "How does the reseller prepaid wallet architecture work for local loop operators?",
    answer:
      "Resellers and Local Cable Operators (LCOs) maintain a prepaid balance wallet. When an LCO activates or renews a subscriber plan, the wholesale margin is immediately deducted from the LCO wallet, while the customer invoice is generated at retail price. If the wallet drops below the minimum balance threshold, automatic top-up reminders or service creation pauses are triggered.",
  },
  {
    question: "How does hierarchical member and distributor margin management operate?",
    answer:
      "Kashtrix supports unlimited hierarchical tiers (e.g. Master Telco -> State Distributor -> City Branch -> Local Sub-Dealer/LCO). Each tier can have custom wholesale pricing, margin percentages, and automated commission splitting recorded directly into an auditable double-entry ledger.",
  },
  {
    question: "Can branch managers view only their assigned territory and subscribers?",
    answer:
      "Yes. Kashtrix provides strict multi-tenant role-based access control (RBAC). Branch managers and regional franchisees see only their assigned territory, customer profiles, payment receipts, and NAS routers with zero visibility into neighbor branch data.",
  },
  {
    question: "How are franchise settlements and tax withholdings handled?",
    answer:
      "Kashtrix generates automated daily, weekly, or monthly settlement statements showing gross collections, wholesale network charges, VAT/service tax withholdings, and net profit transfers to bank accounts or digital wallets.",
  },
];

export default function BranchResellerManagementPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "Reseller Wallet & Multi-Tenant Branch Management",
      href: "/solutions/isp-branch-reseller-management",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
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
                Branch & Reseller Management
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Building2 className="w-3.5 h-3.5" /> Multi-Tenant Reseller & Franchise Architecture
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Reseller Prepaid Wallet & Multi-Tenant Branch Billing Software
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Scale your telecom operation through local sub-dealers, cable operators (LCOs), and
              regional branch franchises. Automate wholesale distributor margin ledgers, prepaid wallet
              deductions, territory permissions, and daily commission settlements from one master BSS
              platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Request Reseller Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions/convergent-billing-dunning"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                Convergent Billing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Tier Hierarchy Diagram */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Hierarchical Margin & Settlement Structure
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Automated revenue splitting across every level of your distribution chain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  tier: "Tier 1: Master Telco",
                  role: "Central Infrastructure & Wholesale Bandwidth",
                  desc: "Sets global rate cards, manages core BNGs/OLTs, and controls credit limits.",
                  icon: Network,
                },
                {
                  tier: "Tier 2: Regional Distributor",
                  role: "State/Regional Hub Operations",
                  desc: "Allocates bulk bandwidth quotas and manages master regional wallet balances.",
                  icon: Building2,
                },
                {
                  tier: "Tier 3: Local Branch / Franchise",
                  role: "City & District Administration",
                  desc: "Coordinates local field technicians, resolves local tickets, and audits collections.",
                  icon: Users,
                },
                {
                  tier: "Tier 4: Sub-Dealer / LCO",
                  role: "Last-Mile Subscriber Sales",
                  desc: "Recharges prepaid wallet, creates subscribers, and earns real-time retail margins.",
                  icon: Wallet,
                },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <t.icon className="w-5 h-5 text-[#E11D72]" />
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-secondary)]">
                      Ledger Synced
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-sora">{t.tier}</h3>
                  <p className="text-xs font-semibold text-[var(--text-link)]">{t.role}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t.desc}</p>
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
                Enterprise Multi-Tenant Capabilities
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Built to support 10 to 5,000+ independent reseller networks with zero cross-tenant data leakage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wallet,
                  title: "Prepaid Wholesale Reseller Wallets",
                  desc: "Resellers top-up balances via payment gateway, bank transfer, or corporate vouchers. Service provisioning is automatically gated by wallet credit.",
                },
                {
                  icon: Split,
                  title: "Multi-Tier Margin Ledgers",
                  desc: "Define custom revenue share ratios (e.g., 70% ISP / 30% LCO) with automated real-time transaction postings on every subscription renewal.",
                },
                {
                  icon: ShieldCheck,
                  title: "Strict Branch-Level Permissions (RBAC)",
                  desc: "Isolate customer personal data, phone numbers, and payment records per branch or dealer to ensure strict compliance with telecom privacy regulations.",
                },
                {
                  icon: Coins,
                  title: "Automated Franchise Settlement",
                  desc: "Generate monthly tax invoices, calculate VAT/GST withholdings, and schedule automated bank payouts to franchise partners.",
                },
                {
                  icon: Layers,
                  title: "White-Label Dealer Portals",
                  desc: "Give sub-dealers branded self-service portals to register subscribers, run optical signal checks, issue speed tests, and print receipts.",
                },
                {
                  icon: ReceiptText,
                  title: "Delegated IP Pool & NAS Control",
                  desc: "Assign dedicated public IPv4/IPv6 subnets, MikroTik PPPoE servers, and OLT PON ports directly to specific local franchisees.",
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
            <h2 className="text-2xl font-bold font-sora">Explore Related Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Convergent Billing & Dunning",
                  href: "/solutions/convergent-billing-dunning",
                  desc: "Digital wallets & dynamic CoA throttling",
                },
                {
                  label: "PPPoE RADIUS Billing",
                  href: "/solutions/pppoe-radius-billing",
                  desc: "AAA subscriber authentication",
                },
                {
                  label: "Field Staff GPS Dispatch",
                  href: "/solutions/isp-field-staff-gps",
                  desc: "Mobile technician dispatch & tracking",
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
              Supercharge Your Reseller & Franchise Channel
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Discover how Kashtrix Reseller Wallets and Multi-Tenant Branch Software streamline your
              partner operations.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request Partner Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
