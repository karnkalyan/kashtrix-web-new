import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Zap, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "GPON Optical Loss & Splitter Attenuation Troubleshooting Guide | Kashtrix",
  description: "Field engineering guide on diagnosing FTTH optical power attenuation, macrobends, dirty fiber connectors, splitter insertion loss, and ONT rx signal degradation.",
  keywords: [
    "GPON optical loss troubleshooting",
    "FTTH fiber attenuation guide",
    "ONT rx signal degradation",
    "optical power meter testing",
    "fiber macrobend fix",
    "Kashtrix GPON guide",
  ],
  canonical: "https://kashtrix.com/resources/gpon-optical-loss-troubleshooting",
});

const FAQS = [
  {
    question: "What optical power level indicates a dirty SC/APC fiber connector?",
    answer: "A dirty or contaminated SC/APC connector typically introduces 1.5 dB to 4.0 dB of localized attenuation and causes high optical reflectance."
  },
  {
    question: "How do field technicians isolate macrobends from physical fiber cuts?",
    answer: "Using an OTDR (Optical Time-Domain Reflectometer) at dual wavelengths (1310nm and 1550nm). Macrobends exhibit significantly higher loss at 1550nm/1490nm than at 1310nm."
  },
  {
    question: "What is the acceptable optical loss budget for a Class C+ GPON link?",
    answer: "Class C+ optics support a maximum optical loss budget of 32.0 dB between the OLT SFP transmitter (+5 to +7 dBm) and the farthest subscriber ONT (-27 dBm sensitivity)."
  }
];

export default function GPONOpticalTroubleshootingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "GPON Optical Loss Troubleshooting", href: "/resources/gpon-optical-loss-troubleshooting" },
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
              <span className="text-[var(--text-primary)] font-semibold font-inter">Optical Loss Troubleshooting</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <Zap className="w-3.5 h-3.5 text-[#E11D72]" /> Field Engineering Blueprint · FTTH Diagnostics
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              GPON Optical Loss &amp; Splitter Troubleshooting Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              A practical diagnostic reference for FTTH field technicians and NOC engineers on identifying optical attenuation anomalies, OTDR trace analysis, and fixing low ONT receive signals.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. Standard GPON Attenuation Tolerances
              </h2>
              <p>
                Optical power levels at subscriber premises dictate connection quality. When ONT receive power drops below -27 dBm, subscribers experience packet drops, latency spikes, and LOS alarms.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-primary)] space-y-1">
                <div>+5.0 dBm (OLT Class C+ TX) -&gt; 8km Fiber (-2.8dB) -&gt; 1:32 Splitter (-17.5dB) -&gt; Connectors (-1.4dB) = -16.7 dBm (HEALTHY)</div>
              </div>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Field Operations & Fiber Diagnostics Lead"
              experience="Specializes in FTTH fiber loss budgeting, OTDR trace interpretation, and optical splitter network troubleshooting."
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
              <Link href="/tools/gpon-splitter-calculator" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora">
                Open GPON Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
