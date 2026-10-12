import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { CreditCard, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "WISP Billing Software with AI Automation | Kashtrix",
  description: "Billing software designed for wireless ISPs (WISPs). Manage prepaid/postpaid plans, tower-based coverage, bandwidth caps, automated collections and AI-powered revenue optimization for fixed wireless broadband operators.",
  keywords: ["WISP billing software", "wireless ISP billing", "WISP management software", "WISP billing automation", "wireless broadband billing", "fixed wireless billing"],
  canonical: "https://kashtrix.com/solutions/wisp-billing-ai",
});

const FAQS = [
  { question: "How does Kashtrix handle WISP-specific billing needs?", answer: "Kashtrix supports tower-based subscriber grouping, sector capacity tracking, distance-based signal quality tiers, bandwidth cap enforcement via RADIUS accounting, fair usage policies (FUP), and automated plan downgrades when data limits are reached." },
  { question: "Does Kashtrix integrate with Cambium and Ubiquiti equipment?", answer: "Kashtrix supports multi-vendor wireless equipment through SNMP, API and SSH interfaces, enabling integration with access point and subscriber module telemetry for bandwidth monitoring and service management." },
];

export default function WISPBillingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "WISP Billing AI", href: "/solutions/wisp-billing-ai" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6"><Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span><Link href="/billing" className="hover:text-[var(--text-primary)]">Billing</Link><span>/</span><span className="text-[var(--text-primary)] font-semibold">WISP Billing</span></nav>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><CreditCard className="w-3.5 h-3.5" /> Wireless ISP Billing</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">WISP Billing Software with AI Automation</h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">Purpose-built billing for wireless ISPs. Manage tower-based subscriber groups, bandwidth caps, FUP enforcement, prepaid vouchers, postpaid invoicing and AI-powered collections across your fixed wireless broadband network.</p>
          <div className="mt-8 flex gap-3"><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request WISP Demo <ArrowRight className="w-4 h-4" /></Link></div>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">Challenges for Wireless ISP Billing</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">WISPs face unique billing challenges: subscribers on different towers have different signal quality and capacity constraints. Plans must account for distance-based speed tiers, sector congestion, weather-related performance impacts and fair usage policies. Many WISPs outgrow generic billing tools that lack these wireless-specific capabilities.</p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Kashtrix addresses these with tower-aware subscriber grouping, RADIUS-based bandwidth enforcement, automated fair usage throttling, and AI-powered collection workflows that optimize payment recovery timing.</p>
        </div></section>
        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">WISP-Specific Capabilities</h2>
          <ul className="space-y-3 text-sm sm:text-base text-[var(--text-secondary)]">
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Tower-based subscriber grouping and sector capacity monitoring</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Distance-based signal quality tier pricing</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Bandwidth cap enforcement via RADIUS accounting Interim-Updates</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Fair usage policy (FUP) automatic speed reduction</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Prepaid scratch cards and online wallet top-ups</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> AI-powered payment collection timing optimization</li>
            <li className="flex gap-2"><span className="text-[#E11D72] font-bold">→</span> Multi-gateway payment processing (local and global)</li>
          </ul>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
          {FAQS.map((faq) => (<div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0"><h3 className="text-sm font-bold">{faq.question}</h3><p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p></div>))}
        </div></section>
        <section className="py-20 text-center"><div className="max-w-2xl mx-auto px-4 space-y-4"><h2 className="text-2xl font-bold font-sora">Billing Built for WISPs</h2><p className="text-sm text-[var(--text-secondary)]">See how Kashtrix handles wireless ISP billing with AI automation.</p><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link></div></section>
      </main>
    </SiteShell>
  );
}
