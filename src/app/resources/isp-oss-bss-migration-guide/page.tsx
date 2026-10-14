import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Layers, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Legacy ISP Billing to Cloud OSS/BSS Migration Guide | Kashtrix",
  description: "Comprehensive migration blueprint for transitioning ISP billing ledgers, subscriber accounts, RADIUS credentials, and CPE provisioning from legacy platforms (Splynx, Sonar) to Kashtrix.",
  keywords: [
    "ISP OSS BSS migration guide",
    "legacy billing migration ISP",
    "Splynx to Kashtrix migration",
    "Sonar software migration",
    "subscriber database import ISP",
    "Kashtrix migration guide",
  ],
  canonical: "https://kashtrix.com/resources/isp-oss-bss-migration-guide",
});

const FAQS = [
  {
    question: "How are subscriber active RADIUS sessions maintained during database migration?",
    answer: "Kashtrix runs parallel accounting sync scripts. Active PPPoE sessions remain connected to existing BNG routers while authentication requests switch seamlessly via IP Anycast cutover."
  },
  {
    question: "How are historical subscriber invoices and payment ledgers preserved?",
    answer: "Automated ETL pipelines extract historical PDF invoices, transaction ledgers, and credit notes into Kashtrix immutable accounting storage."
  },
  {
    question: "What downtime should subscribers expect during software cutover?",
    answer: "Subscriber internet traffic experiences zero downtime. Control plane cutover takes under 15 minutes during scheduled off-peak maintenance windows."
  }
];

export default function ISPOSSBSSMigrationGuidePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "ISP OSS/BSS Migration Guide", href: "/resources/isp-oss-bss-migration-guide" },
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
              <span className="text-[var(--text-primary)] font-semibold font-inter">OSS/BSS Migration Guide</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <Layers className="w-3.5 h-3.5 text-[#E11D72]" /> Engineering Blueprint · Platform Migration
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Legacy ISP Billing to Cloud OSS/BSS Migration Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              A step-by-step technical blueprint for ISP CTOs and migration leads on exporting subscriber data, preserving RADIUS passwords, and transitioning core operations without service disruption.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. 4-Phase Zero-Downtime Migration Framework
              </h2>
              <p>
                Migrating an operational ISP from legacy billing platforms (such as Splynx, Sonar, or custom MySQL databases) requires careful coordination between subscriber database extraction, RADIUS credential hash mapping, payment gateway tokenization, and BNG router cutover.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-primary)] space-y-1">
                <div>Phase 1: Database Schema Analysis &amp; ETL Mapping</div>
                <div>Phase 2: Parallel Dual-Write RADIUS Accounting Synchronization</div>
                <div>Phase 3: Customer Portal &amp; Payment Tokenization Cutover</div>
                <div>Phase 4: BNG Router AAA Pointer Update &amp; Verification</div>
              </div>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Director of Enterprise Telecom Migrations"
              experience="Over 50 successful ISP database migrations completed across North America, Middle East, and Asia-Pacific."
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
              <Link href="/compare/kashtrix-vs-splynx" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora">
                View Kashtrix vs Splynx Comparison <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
