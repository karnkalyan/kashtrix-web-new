import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { ShieldCheck, Database, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Carrier-Grade Syslog & CGNAT Subpoena Compliance Guide | Kashtrix",
  description: "Technical guide on managing high-throughput 100,000+ EPS CGNAT syslog streams, deterministic NAT444 port allocation, SHA-256 HMAC tamper verification, and subsecond subpoena log lookup.",
  keywords: [
    "CGNAT syslog compliance",
    "carrier grade syslog server",
    "NAT444 log archiving",
    "DoT TRAI subpoena audit",
    "HMAC SHA-256 syslog",
    "Kashtrix Syslog guide",
  ],
  canonical: "https://kashtrix.com/resources/cgnat-logging-compliance-guide",
});

const FAQS = [
  {
    question: "What storage retention period is mandated for CGNAT NAT444 syslog files?",
    answer: "Telecom regulatory authorities (e.g., DoT India, TRAI, FCC, European Law Enforcement) mandate between 1 and 2 years of immutable log retention."
  },
  {
    question: "How does Kashtrix perform subsecond subscriber lookups from a target IP, port, and timestamp?",
    answer: "Logs are indexed into columnar Parquet/ClickHouse storage partitions by public IP octets and hour timestamps, reducing full-table scan overhead from minutes to under 200 milliseconds."
  },
  {
    question: "How does SHA-256 HMAC log signing prevent evidence tampering?",
    answer: "Every 15-minute log chunk is cryptographically signed with an internal private HMAC key. If any byte in the historical archive is altered, signature verification fails."
  }
];

export default function CGNATComplianceGuidePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "CGNAT Syslog Compliance Guide", href: "/resources/cgnat-logging-compliance-guide" },
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
              <span className="text-[var(--text-primary)] font-semibold font-inter">CGNAT Syslog Compliance</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E11D72]" /> Engineering Blueprint · Regulatory Compliance
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Carrier-Grade Syslog &amp; CGNAT Subpoena Compliance Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              An architectural guide for telecom NOC leads on collecting 100,000+ EPS CGNAT log streams, enforcing SHA-256 HMAC tamper integrity, and automating subsecond subpoena compliance searches.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. Managing High-Throughput UDP Log Ingestion (100k+ EPS)
              </h2>
              <p>
                When running CGNAT across 50,000 active broadband subscribers, routers generate high-frequency NAT session logs (creation, deletion, and port block allocation). Ingesting 100,000 events per second (EPS) over UDP can exhaust traditional syslog daemons, causing lost log packets.
              </p>
              <p>
                Kashtrix Syslog Server uses eBPF socket kernel buffers and Vector pipeline ingestion to stream raw CGNAT logs directly into NVMe hot storage before archiving to MinIO/S3 object stores.
              </p>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Lead Security & Compliance Systems Engineer"
              experience="Specializes in carrier-grade syslog ingestion, cryptographic audit ledgers, and telecom regulatory compliance (DoT, TRAI, FCC)."
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
              <Link href="/solutions/cgnat-syslog-compliance" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora">
                Explore Syslog Solution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
