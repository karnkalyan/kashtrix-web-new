import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Page Not Found | Kashtrix",
  description: "The page you are looking for does not exist. Explore Kashtrix ISP management, OSS/BSS, syslog, and AI agent solutions.",
  robots: { index: false, follow: true },
};

const HELPFUL_LINKS = [
  { label: "ISP Management Platform", href: "/platform", description: "Unified telecom operating system" },
  { label: "Telecom OSS", href: "/oss", description: "Network operations & device automation" },
  { label: "Telecom BSS", href: "/bss", description: "Billing, CRM & revenue management" },
  { label: "ISP Syslog Server", href: "/syslog", description: "CGNAT compliance logging" },
  { label: "AI Agents", href: "/ai-agents", description: "Autonomous telecom AI operations" },
  { label: "ISP Billing", href: "/billing", description: "FreeRADIUS AAA & billing software" },
  { label: "Contact Us", href: "/contact", description: "Talk to our telecom architects" },
  { label: "Request Demo", href: "/request-demo", description: "Get a custom sandbox demo" },
];

export default function NotFound() {
  return (
    <SiteShell>
      <main className="min-h-[70vh] flex items-center justify-center bg-[var(--page-bg)] px-4 py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Status */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[#E11D72]" />
              404 — Page Not Found
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              This route doesn&apos;t exist.
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              The page you&apos;re looking for may have been moved or removed.
              Explore our ISP management platform, syslog server, and AI-powered
              telecom solutions below.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 transition-all hover:-translate-y-0.5 hover:bg-[#F02C82]"
            >
              Back to Homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-purple-500/40"
            >
              Contact Support
            </Link>
          </div>

          {/* Helpful Links Grid */}
          <div className="pt-8 border-t border-[var(--border-default)]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {HELPFUL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] text-left transition-all hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-sm font-bold text-[var(--text-primary)] block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
