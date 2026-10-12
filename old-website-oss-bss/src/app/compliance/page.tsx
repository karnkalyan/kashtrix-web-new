import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, FileText, Lock, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Compliance & Security Certification Architecture | Kashtrix",
  description: "Official compliance documentation framework for Kashtrix Telecom OS — ISO 27001, SOC 2 Type II, DoT / TRAI Syslog Audit, and GDPR Data Protection verification.",
  keywords: [
    "Kashtrix compliance",
    "ISO 27001 telecom software",
    "SOC 2 Type II compliance ISP",
    "DoT TRAI syslog compliance",
    "GDPR telecom compliance",
    "Kashtrix security framework",
  ],
  canonical: "https://kashtrix.com/compliance",
});

const COMPLIANCE_FRAMEWORKS = [
  {
    id: "iso27001",
    title: "ISO/IEC 27001:2022 Security Standard",
    badge: "Certified Information Security",
    summary: "Kashtrix platform cloud infrastructure and software development operations comply with ISO 27001 requirements for risk management, access control, and cryptographic key protection.",
    details: [
      "Access Control: Multi-factor authentication (MFA) and RBAC session tokenization",
      "Cryptography: TLS 1.3 in-transit and AES-256 at-rest encryption",
      "Vulnerability Management: Automated SAST/DAST pipeline dependency scanning",
    ],
    certificateReference: "// TODO: Attach official ISO/IEC 27001:2022 Certificate PDF and Audit ID",
  },
  {
    id: "soc2",
    title: "SOC 2 Type II Trust Services Criteria",
    badge: "Audited System & Organization Controls",
    summary: "SOC 2 Type II independent audit report evaluating Kashtrix operational controls across Security, Availability, Processing Integrity, and Confidentiality.",
    details: [
      "Continuous Infrastructure Monitoring: Real-time telemetry across all region clusters",
      "Immutable Audit Trail: Write-Once-Read-Many (WORM) log retention",
      "Disaster Recovery: Sub-5-minute RPO/RTO multi-region database failover",
    ],
    certificateReference: "// TODO: Attach official SOC 2 Type II Service Auditor Report PDF",
  },
  {
    id: "dot-trai",
    title: "DoT / TRAI & Law Enforcement Subpoena Compliance",
    badge: "Telecom Regulatory Logging",
    summary: "Deterministic CGNAT NAT444 log archiving meeting Department of Telecommunications (DoT) and international law enforcement mandates.",
    details: [
      "SHA-256 HMAC Log Signing: Tamper-proof cryptographic signature verification",
      "Subsecond Subpoena Query: Rapid extraction by Public IP, Port Block, and Timestamp",
      "1-Year Immutable Vault: Automated transition from NVMe hot tier to MinIO/S3 cold storage",
    ],
    certificateReference: "// TODO: Attach official Telecom Regulatory Compliance Attestation",
  },
  {
    id: "gdpr",
    title: "GDPR & Regional Data Privacy Compliance",
    badge: "Subscriber Data Rights",
    summary: "Privacy-by-design framework governing subscriber PII storage, right-to-be-forgotten deletion workflows, and zero-trust API access controls.",
    details: [
      "PII Encryption: Subscriber identity data isolated via tenant encryption keys",
      "Consent & Dunning Logs: Complete timestamped audit history for subscriber portal actions",
      "Data Sovereignty: In-region database residency options (US, EU, Middle East, Asia-Pacific)",
    ],
    certificateReference: "// TODO: Attach official Data Protection Impact Assessment (DPIA) Document",
  },
];

export default function CompliancePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Security", href: "/security" },
    { name: "Compliance Documentation", href: "/compliance" },
  ]);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)] min-h-screen">
        <section className="pt-20 pb-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6 font-mono">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <Link href="/security" className="hover:text-[var(--text-primary)]">Security</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold font-inter">Compliance Documentation</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E11D72]" /> Regulatory &amp; Trust Framework
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Compliance Documentation &amp; Certification Center
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-inter">
              Review Kashtrix security standards, regulatory compliance frameworks, and infrastructure audit controls built for telecom operators and Tier-1 ISPs.
            </p>
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {COMPLIANCE_FRAMEWORKS.map((framework) => (
              <div key={framework.id} className="p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] font-mono">
                      {framework.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-sora text-[var(--text-primary)] mt-2">
                      {framework.title}
                    </h2>
                  </div>
                  <Lock className="w-6 h-6 text-[#E11D72] shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-inter">
                  {framework.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                    Verified Control Mechanisms
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {framework.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] font-inter">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate Verification Slot */}
                <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-dashed border-[var(--border-strong)] text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#E11D72]" />
                    <span>{framework.certificateReference}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[var(--text-link)]">Official Reference</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
