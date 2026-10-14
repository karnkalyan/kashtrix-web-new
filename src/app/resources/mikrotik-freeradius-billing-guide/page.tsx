import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Server, Zap, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "MikroTik RouterOS & FreeRADIUS Billing Integration Guide | Kashtrix",
  description: "Step-by-step technical guide for configuring MikroTik RouterOS PPPoE servers, RADIUS incoming CoA ports, traffic queuing, and automated billing disconnection loops.",
  keywords: [
    "MikroTik FreeRADIUS billing",
    "RouterOS PPPoE RADIUS guide",
    "MikroTik CoA rate limit",
    "ISP billing MikroTik integration",
    "Kashtrix MikroTik guide",
  ],
  canonical: "https://kashtrix.com/resources/mikrotik-freeradius-billing-guide",
});

const FAQS = [
  {
    question: "What ports must be opened on MikroTik for RADIUS CoA disconnections?",
    answer: "MikroTik RouterOS listens on UDP port 3799 for incoming RADIUS CoA and Disconnect messages (`/radius incoming set accept=yes port=3799`)."
  },
  {
    question: "How does Kashtrix automatically apply bandwidth rate limits on MikroTik PPPoE active sessions?",
    answer: "Upon subscriber login or plan upgrade, Kashtrix transmits the `Mikrotik-Rate-Limit` RADIUS attribute (e.g., `100M/100M 0/0 0/0 0/0 8 10M/10M`), creating dynamic simple queues inside RouterOS."
  },
  {
    question: "Does Kashtrix support MikroTik RouterOS v6 and v7?",
    answer: "Yes. Kashtrix supports both RouterOS v6 and v7 REST APIs, SSH CLI, and RADIUS AAA attributes."
  }
];

export default function MikroTikBillingGuidePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "MikroTik & FreeRADIUS Integration Guide", href: "/resources/mikrotik-freeradius-billing-guide" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)] min-h-screen">
        <section className="pt-20 pb-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6 font-mono">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-[var(--text-primary)]">Resources</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold font-inter">MikroTik &amp; FreeRADIUS Integration</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <Server className="w-3.5 h-3.5 text-[#E11D72]" /> Engineering Blueprint · RouterOS Integration
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              MikroTik RouterOS &amp; FreeRADIUS Billing Integration Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              A step-by-step configuration manual for ISP engineers on connecting MikroTik CCR routers to central FreeRADIUS AAA, setting up incoming CoA ports, and automating subscriber plan enforcement.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. RouterOS RADIUS Client Configuration
              </h2>
              <p>
                To enable RADIUS authentication for PPPoE server interfaces, execute the following CLI commands inside RouterOS Terminal:
              </p>
              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-primary)] space-y-1">
                <div>/radius add service=ppp,dhcp address=10.100.0.5 secret=&quot;KashtrixRADIUSSecret2026&quot; timeout=3000ms</div>
                <div>/radius incoming set accept=yes port=3799</div>
                <div>/ppp aaa set use-radius=yes accounting=yes interim-update=5m</div>
              </div>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Senior MikroTik & BNG Integration Architect"
              experience="Specializes in MikroTik RouterOS v7 performance tuning, PPPoE server scaling, and automated billing synchronization."
            />

            {/* Reusable Case Study Component (Template with TODOs) */}
            <CaseStudyCard />

            <div className="space-y-4 pt-4 border-t border-[var(--border-default)]">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                2. Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-2">
                    <h3 className="text-base font-bold font-sora text-[var(--text-primary)]">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-default)] flex justify-between items-center">
              <Link href="/resources" className="text-xs font-bold text-[var(--text-link)] hover:underline flex items-center gap-1">
                ← Back to Technical Blueprints
              </Link>
              <Link href="/solutions/freeradius-mikrotik-billing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora">
                Explore MikroTik Solution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
