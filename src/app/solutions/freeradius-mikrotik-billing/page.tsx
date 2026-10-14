import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { CreditCard, KeyRound, Router, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "FreeRADIUS Billing with MikroTik Integration | Kashtrix",
  description:
    "Integrate FreeRADIUS AAA authentication with ISP billing, MikroTik RouterOS, PPPoE session management and automated subscriber provisioning in one unified platform.",
  keywords: ["FreeRADIUS billing", "MikroTik ISP billing", "FreeRADIUS MikroTik integration", "RADIUS billing software", "PPPoE billing", "ISP AAA billing"],
  canonical: "https://kashtrix.com/solutions/freeradius-mikrotik-billing",
});

const FAQS = [
  { question: "How does Kashtrix integrate with FreeRADIUS?", answer: "Kashtrix communicates directly with clustered FreeRADIUS AAA engines via RADIUS protocol sockets and database sync. It handles PPPoE authentication, IP pool allocation, Change of Authorization (CoA) for speed changes, and Disconnect Messages (PoD) for automated suspensions." },
  { question: "Which MikroTik features does Kashtrix automate?", answer: "Kashtrix automates MikroTik PPPoE server profiles, simple queues, address lists, firewall rules, hotspot configurations, and subscriber bandwidth management through the MikroTik API and SSH interfaces." },
  { question: "Can Kashtrix handle both prepaid and postpaid billing with FreeRADIUS?", answer: "Yes. Kashtrix processes RADIUS accounting Interim-Update packets in real time for prepaid data caps and quota enforcement, while also supporting recurring postpaid subscription invoicing with automated dunning workflows." },
];

export default function FreeRADIUSBillingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "FreeRADIUS MikroTik Billing", href: "/solutions/freeradius-mikrotik-billing" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span>
              <Link href="/billing" className="hover:text-[var(--text-primary)]">Billing</Link><span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">FreeRADIUS &amp; MikroTik</span>
            </nav>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><KeyRound className="w-3.5 h-3.5" /> RADIUS AAA + Billing</span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">FreeRADIUS Billing with MikroTik Integration</h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">Kashtrix unifies FreeRADIUS AAA authentication with ISP billing and MikroTik RouterOS automation. Provision subscribers, enforce bandwidth policies, collect payments, and manage PPPoE sessions from one operational interface.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Billing Demo <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/billing" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all">ISP Billing Overview <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">The Disconnected Billing Problem</h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Most ISPs run FreeRADIUS for subscriber authentication but manage billing in a separate system. This creates data silos where payment status, bandwidth policies, and subscriber sessions are disconnected. When a subscriber is suspended for non-payment, someone must manually update RADIUS profiles. When a plan change is purchased, another manual step configures MikroTik queues.</p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">These manual handoffs create billing leakage, authentication errors, and subscriber frustration. Kashtrix eliminates this gap by connecting billing events directly to RADIUS and MikroTik actions.</p>
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">Integrated Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: KeyRound, title: "FreeRADIUS AAA Integration", desc: "Native integration with clustered FreeRADIUS engines supporting PPPoE, IPoE, dynamic IP pools, CoA for speed changes, and PoD for automated disconnection. Handles over 50,000 auth requests per second." },
                { icon: Router, title: "MikroTik Automation", desc: "Automate MikroTik RouterOS subscriber profiles, simple queues, address lists, hotspot users and bandwidth management via MikroTik API. Changes propagate in seconds when billing events occur." },
                { icon: CreditCard, title: "Convergent Rating Engine", desc: "Support prepaid scratch cards, online wallet top-ups, daily/weekly/monthly passes, recurring postpaid invoicing, pro-rating, multi-currency tax calculation, and automated PDF invoice generation." },
                { icon: CreditCard, title: "Automated Dunning & Collections", desc: "Configurable dunning workflows: SMS/Email reminders, late fees, bandwidth throttling via RADIUS CoA, and final disconnection via PoD. Payment gateway retry with Stripe, Razorpay, eSewa and more." },
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

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Related Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "ISP Billing Software", href: "/billing", desc: "Full billing & revenue management" },
                { label: "Telecom OSS", href: "/oss", desc: "Network operations & AAA" },
                { label: "PPPoE RADIUS Billing", href: "/solutions/pppoe-radius-billing", desc: "PPPoE authentication platform" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all">
                  <span className="text-sm font-bold block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl font-bold font-sora">Unify RADIUS, Billing &amp; MikroTik</h2>
            <p className="text-sm text-[var(--text-secondary)]">See how Kashtrix connects FreeRADIUS authentication with billing workflows and MikroTik automation.</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
