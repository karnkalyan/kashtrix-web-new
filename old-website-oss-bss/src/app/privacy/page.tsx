import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Shield, Lock } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Privacy Policy | Kashtrix Telecom Operating System",
  description:
    "Kashtrix Privacy Policy detailing how subscriber data, CGNAT audit logs, RADIUS accounting packets, and customer billing metrics are protected under GDPR, ISO 27001, and SOC 2.",
  keywords: [
    "Kashtrix privacy policy",
    "telecom data privacy",
    "CGNAT log privacy",
    "subscriber data protection GDPR",
  ],
  canonical: "https://kashtrix.com/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <div className="pt-16 pb-20 bg-[var(--surface-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[var(--text-primary)]">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
              <Shield className="w-3.5 h-3.5" /> Data Protection
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-sora text-[var(--text-primary)]">Privacy Policy</h1>
            <p className="text-xs text-[var(--text-secondary)]">Effective Date: March 30, 2026 | Last Updated: March 2026</p>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--surface-2)] border border-[var(--border-default)] space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold font-sora text-[var(--text-primary)]">1. Scope of Subscriber &amp; Telemetry Data</h2>
              <p>
                Kashtrix Technologies Inc. (&quot;Kashtrix&quot;, &quot;we&quot;, or &quot;our&quot;) provides an AI-native multi-tenant telecom OSS/BSS and automation platform. We process two distinct categories of data: (a) Operational Telemetry Data (e.g., optical attenuation readings, BNG session throughput, Radius accounting packets) and (b) Subscriber Administrative Data (e.g., customer billing addresses, KYC verification metrics, and payment transaction logs).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold font-sora text-[var(--text-primary)]">2. Data Isolation &amp; Zero-Trust Processing</h2>
              <p>
                All subscriber records processed through our unified BSS core are encrypted at rest using AES-256 and in transit using TLS 1.3. Each ISP tenant operates within an isolated database schema within PostgreSQL, ensuring zero cross-tenant visibility or data contamination during AI reasoning tasks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold font-sora text-[var(--text-primary)]">3. AI Agent Model Training &amp; Privacy</h2>
              <p>
                Kashtrix AI Agents (such as Support AI, NOC AI, and Billing AI) utilize domain-specific reasoning models. Your proprietary network configurations, customer support transcripts, and financial ledgers are <strong>never</strong> shared with public AI foundation models or utilized to train external models outside your private tenant environment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold font-sora text-[var(--text-primary)]">4. GDPR &amp; Global Compliance Rights</h2>
              <p>
                As a data processor for global telecommunications operators, Kashtrix supports automated GDPR right-to-be-forgotten requests, subscriber data portability export, and continuous compliance auditing under ISO 27001 and SOC 2 Type II controls.
              </p>
            </section>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
