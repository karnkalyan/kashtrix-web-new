import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthorBioCard } from "@/components/eeat/AuthorBioCard";
import { CaseStudyCard } from "@/components/eeat/CaseStudyCard";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Cpu, Server, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Huawei MA5800 & Nokia OLT Multi-Vendor Provisioning Guide | Kashtrix",
  description: "Technical guide on automated GPON/XGS-PON ONT provisioning for Huawei SmartAX MA5800 and Nokia ISAM FX OLTs via CLI macros, SNMP traps, and gNMI telemetry.",
  keywords: [
    "Huawei MA5800 OLT provisioning",
    "Nokia OLT auto provisioning",
    "GPON ONT CLI script",
    "multi-vendor OLT software",
    "XGS-PON provisioning",
    "Kashtrix OLT guide",
  ],
  canonical: "https://kashtrix.com/resources/huawei-ma5800-nokia-olt-provisioning",
});

const FAQS = [
  {
    question: "How does Kashtrix handle unconfigured ONT discovery on Huawei MA5800 OLTs?",
    answer: "Kashtrix listens for SNMP traps (`hwGponDeviceOntAutofindNotify`) emitted by the OLT when a new serial number is detected on a PON port, triggering automated VLAN and DBA profile binding."
  },
  {
    question: "What OMCI configurations are required to bind Internet and VoIP VLANs on Nokia ONTs?",
    answer: "OMCI ME scripts configure virtual Ethernet port termination (VEIP), set IEEE 802.1p priority tagging, and apply VLAN ID rules directly over the optical link without manual ONT GUI access."
  },
  {
    question: "Can Huawei and Nokia OLTs be managed side-by-side in one interface?",
    answer: "Yes. Kashtrix abstracts hardware CLI differences behind unified REST APIs and Model Context Protocol (MCP) server endpoints."
  }
];

export default function HuaweiNokiaOLTGuidePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Resources", href: "/resources" },
    { name: "Huawei MA5800 & Nokia OLT Provisioning", href: "/resources/huawei-ma5800-nokia-olt-provisioning" },
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
              <span className="text-[var(--text-primary)] font-semibold font-inter">Multi-Vendor OLT Provisioning</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <Cpu className="w-3.5 h-3.5 text-[#E11D72]" /> Engineering Blueprint · GPON/XGS-PON Hardware
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Huawei MA5800 &amp; Nokia OLT Provisioning Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              Learn how to automate GPON and XGS-PON subscriber ONT activations across Huawei SmartAX MA5800 chassis and Nokia ISAM FX series OLTs using unified CLI macros and OMCI profiles.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-inter text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-sora text-[var(--text-primary)]">
                1. Automated ONT Autofind &amp; Serial Number Discovery
              </h2>
              <p>
                In traditional FTTH operations, field technicians manually report ONT serial numbers to NOC dispatchers who enter SSH CLI commands line-by-line. This manual workflow delays customer activation and risks CLI syntax typos.
              </p>
              <p>
                Kashtrix listens for OLT SNMP traps and gNMI telemetry streams. When a field installer plugs in a new ONT (e.g., Huawei EG8145V5 or Nokia G-140W-MD), the OLT emits an autofind notification:
              </p>
              <div className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--text-primary)] space-y-1">
                <div>[Huawei MA5800] ont add 0 2 sn-auth 485754438912A304 omci ont-lineprofile-id 10 ont-srvprofile-id 20</div>
                <div>[Nokia ISAM] configure equipment ont interface 1/1/1/2/4 sernum ALCL:B912A304 sw-ver-check disabled</div>
              </div>
            </div>

            {/* Reusable Author Bio Component */}
            <AuthorBioCard
              role="Principal Fiber & OLT Hardware Specialist"
              experience="Specializes in GPON/XGS-PON multi-vendor chassis provisioning, OMCI tree scripts, and optical power budget telemetry."
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
              <Link href="/solutions/olt-provisioning" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora">
                Explore OLT Solution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
