import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Server, Cpu, ShieldCheck, ArrowRight, BookOpen, Layers } from "lucide-react";

export const metadata = constructMetadata({
  title: "FreeRADIUS AAA & BNG Dynamic Session Rebalancing Guide | Kashtrix",
  description: "Technical engineering guide for high-availability FreeRADIUS AAA clusters, BNG subscriber PPPoE/IPoE load balancing, RADIUS CoA packet management, and AI anomaly detection.",
  keywords: [
    "FreeRADIUS BNG rebalancing",
    "RADIUS AAA load balancing",
    "PPPoE dynamic CoA",
    "telecom RADIUS cluster",
    "BNG subscriber session balancing",
    "Kashtrix RADIUS guide",
  ],
  canonical: "https://kashtrix.com/resources/freeradius-bng-rebalancing-ai",
});

const FAQS = [
  {
    question: "How does RADIUS CoA (Change of Authorization) work during BNG session rebalancing?",
    answer: "RADIUS CoA packets (RFC 3576) are transmitted from the AAA server to the BNG to modify active subscriber bandwidth profiles or disconnect sessions without dropping subscriber physical link status."
  },
  {
    question: "What load-balancing algorithms should be used across active-active FreeRADIUS nodes?",
    answer: "Active-active AAA clusters utilize VRRP or IP Anycast combined with weight-based session hashing (Source-IP + Calling-Station-ID) to ensure accounting packets land on the same node holding active memory state."
  },
  {
    question: "How does AI detect abnormal AAA session flapping?",
    answer: "Kashtrix NOC AI monitors Access-Request retry frequencies and RADIUS Stop accounting logs. If flapping exceeds 5 reconnects per minute per ONT, the AI flags optical degradation or duplicate MAC credentials."
  }
];

export default function FreeRADIUSRebalancingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "FreeRADIUS AAA & BNG Rebalancing", href: "/resources/freeradius-bng-rebalancing-ai" },
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
              <span className="text-[var(--text-primary)] font-semibold">FreeRADIUS &amp; BNG Architecture</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <Server className="w-3.5 h-3.5 text-[#E11D72]" /> Engineering Blueprint · AAA Architecture
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              FreeRADIUS AAA &amp; BNG Dynamic Session Rebalancing
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              An architectural guide for ISP network engineers on scaling FreeRADIUS v3/v4 clusters, balancing PPPoE/IPoE subscriber sessions across redundant BNG routers, and enforcing zero-downtime CoA rate modifications.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. High-Availability FreeRADIUS Clustering Architecture
              </h2>
              <p>
                Operating a carrier-grade ISP requires 99.999% availability for Authentication, Authorization, and Accounting (AAA). When a primary BNG or FreeRADIUS node experiences hardware fault, thousands of PPPoE tunnels attempt simultaneous re-authentication, causing RADIUS storm deadlocks unless distributed state caching is enforced.
              </p>
              <p>
                In a Kashtrix-managed AAA deployment, incoming RADIUS Access-Requests and Accounting-Packets pass through an Anycast load balancer running `rlm_raw` and Redis session state storage. This isolates database writes from real-time authentication evaluation.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--border-default)]">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                2. BNG Session Migration via RADIUS CoA &amp; Disconnect-Messages
              </h2>
              <p>
                When balancing subscriber load between edge BNG routers (e.g., MikroTik CCR2216, Cisco ASR9000, or Juniper MX), the control plane transmits RFC 3576 RADIUS Disconnect (DM) or Change-of-Authorization (CoA) attributes:
              </p>
              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-primary)] space-y-1">
                <div>User-Name = &quot;sub_subscriber_8921@kashtrix.net&quot;</div>
                <div>NAS-IP-Address = 10.200.0.1</div>
                <div>Framed-IP-Address = 100.64.42.105</div>
                <div>Mikrotik-Rate-Limit = &quot;300M/300M 0/0 0/0 0/0 8 30M/30M&quot;</div>
                <div>Filter-Id = &quot;300M_UNLIMITED_GOLD&quot;</div>
              </div>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Lead AAA & Network Infrastructure Specialist"
              experience="Specializes in carrier RADIUS cluster tuning, BNG session optimization, and high-throughput accounting database architecture."
            />

            {/* Reusable Case Study Component (Template with TODOs as requested) */}
            <CaseStudyCard />

            <div className="space-y-4 pt-4 border-t border-[var(--border-default)]">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                3. Frequently Asked Questions
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
                Explore RADIUS Solution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
