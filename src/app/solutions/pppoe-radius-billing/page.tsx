import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { KeyRound, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "PPPoE Authentication & Billing Platform for ISPs | Kashtrix",
  description: "Unified PPPoE authentication, RADIUS AAA and subscriber billing platform for ISPs. Manage session lifecycle, bandwidth enforcement, IP pool allocation and automated payment integration.",
  keywords: ["PPPoE authentication", "PPPoE billing", "RADIUS PPPoE", "PPPoE ISP management", "PPPoE subscriber management", "ISP AAA platform"],
  canonical: "https://kashtrix.com/solutions/pppoe-radius-billing",
});

const FAQS = [
  { question: "How does Kashtrix handle PPPoE session management?", answer: "Kashtrix manages the complete PPPoE session lifecycle: subscriber authentication via FreeRADIUS, dynamic IP address assignment from managed pools, bandwidth policy enforcement, session accounting, Change of Authorization (CoA) for real-time plan changes, and Packet of Disconnect (PoD) for automated suspensions." },
  { question: "Can Kashtrix handle concurrent PPPoE sessions for a single subscriber?", answer: "Yes. Kashtrix supports configurable session limits per subscriber account, including detection and management of simultaneous connections, MAC-based authentication, and multi-device household plans." },
];

export default function PPPoEBillingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "PPPoE RADIUS Billing", href: "/solutions/pppoe-radius-billing" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6"><Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span><Link href="/network-automation" className="hover:text-[var(--text-primary)]">Network Automation</Link><span>/</span><span className="text-[var(--text-primary)] font-semibold">PPPoE &amp; RADIUS</span></nav>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><KeyRound className="w-3.5 h-3.5" /> PPPoE &amp; RADIUS AAA</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">PPPoE Authentication &amp; Billing Platform</h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">Manage the complete PPPoE subscriber lifecycle — from authentication and IP assignment through bandwidth enforcement and billing — in one unified platform. Kashtrix integrates RADIUS AAA with billing workflows to eliminate manual handoffs between network and business operations.</p>
          <div className="mt-8 flex gap-3"><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link></div>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">PPPoE Session Lifecycle</h2>
          <ol className="space-y-3 text-sm sm:text-base text-[var(--text-secondary)]">
            <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)]">1.</span> Subscriber CPE initiates PPPoE discovery (PADI/PADO/PADR/PADS)</li>
            <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)]">2.</span> BNG/NAS sends Access-Request to FreeRADIUS cluster</li>
            <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)]">3.</span> Kashtrix validates credentials and billing status, returns Access-Accept with bandwidth attributes</li>
            <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)]">4.</span> Dynamic IP assigned from managed pool; session monitored via RADIUS Accounting</li>
            <li className="flex gap-3"><span className="font-bold text-[var(--text-primary)]">5.</span> Plan changes trigger CoA; payment failures trigger PoD disconnect</li>
          </ol>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
          {FAQS.map((faq) => (<div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0"><h3 className="text-sm font-bold">{faq.question}</h3><p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p></div>))}
        </div></section>
        <section className="py-20 text-center"><div className="max-w-2xl mx-auto px-4 space-y-4"><h2 className="text-2xl font-bold font-sora">Unify PPPoE &amp; Billing</h2><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link></div></section>
      </main>
    </SiteShell>
  );
}
