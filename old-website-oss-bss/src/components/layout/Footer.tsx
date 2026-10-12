"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Globe, CheckCircle2, CreditCard, WalletCards } from "lucide-react";
import { AnimatedLogo } from "@/components/visual/AnimatedLogo";

const PAYMENT_GATEWAYS = [
  "Apple Pay",
  "Google Pay",
  "Stripe",
  "InstaPay",
  "Razorpay",
  "eSewa",
  "Khalti",
  "Fonepay",
  "Amazon Pay",
  "PayPal",
  "Visa",
  "Mastercard",
  "Bank Transfer",
  "Kashtrix Internal Gateway",
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerColumns = [
    {
      title: "Products",
      links: [
        { label: "ISP Management Platform", href: "/platform" },
        { label: "ISP Syslog Server", href: "/syslog" },
        { label: "Telecom OSS Software", href: "/oss" },
        { label: "Telecom BSS Software", href: "/bss" },
        { label: "AI Agents for Telecom", href: "/ai-agents" },
        { label: "ISP Network Management", href: "/network-management" },
        { label: "ISP Billing Software", href: "/billing" },
        { label: "ISP CRM & Subscriber Mgmt", href: "/crm" },
      ],
    },
    {
      title: "Automation Engines",
      links: [
        { label: "ISP Network Automation", href: "/network-automation" },
        { label: "OLT & BNG Device Automation", href: "/hardware-automation" },
        { label: "AI Voice Automation", href: "/voice-automation" },
        { label: "Field Operations & Dispatch", href: "/field-operations" },
        { label: "ISP Inventory & Asset Mgmt", href: "/inventory" },
        { label: "API Platform & SDKs", href: "/api-platform" },
        { label: "Integrations & Webhooks", href: "/integrations" },
      ],
    },
    {
      title: "Solutions & Intent",
      links: [
        { label: "Zero-Touch ISP Provisioning", href: "/solutions/zero-touch-provisioning" },
        { label: "Multi-Vendor Device NMS", href: "/solutions/multi-vendor-device-management-nms" },
        { label: "AI Syslog & MCP Agents", href: "/solutions/ai-driven-syslog-fault-analyzer" },
        { label: "Closed-Loop Fault Ticketing", href: "/solutions/closed-loop-fault-ticketing" },
        { label: "Convergent Billing & Dunning", href: "/solutions/convergent-billing-dunning" },
        { label: "Fiber GIS & Splitter Mapping", href: "/solutions/fiber-gis-olt-ont-splitter" },
        { label: "Field Staff GPS & Dispatch", href: "/solutions/isp-field-staff-gps" },
        { label: "Branch & Reseller Billing", href: "/solutions/isp-branch-reseller-management" },
        { label: "Kashtrix vs Splynx", href: "/compare/kashtrix-vs-splynx" },
        { label: "FreeRADIUS & MikroTik Billing", href: "/solutions/freeradius-mikrotik-billing" },
      ],
    },
    {
      title: "Resources & Trust",
      links: [
        { label: "Free ISP Tools (17 Calculators)", href: "/tools" },
        { label: "Documentation", href: "/documentation" },
        { label: "API Reference", href: "/api-platform" },
        { label: "Resources Hub & Blog", href: "/resources" },
        { label: "About Kashtrix", href: "/about" },
        { label: "Contact Our Architects", href: "/contact" },
        { label: "Security & Zero Trust", href: "/security" },
        { label: "Request Custom Demo", href: "/request-demo" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[var(--surface-1)] border-t border-[var(--border-default)] text-[var(--text-primary)] relative overflow-hidden">
      {/* Top Banner: Newsletter & Global Readiness */}
      <div className="bg-[var(--surface-2)] border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[var(--surface-purple)] text-[var(--text-link)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D72] animate-pulse" />
              Continuous Telecom Architecture
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-sora text-[var(--text-primary)]">
              Where Networks, Business, and AI Work Together.
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)]">
              Join ISP engineers and operators receiving weekly multi-vendor automation scripts and AI intelligence updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)] text-xs font-bold font-sora">
                <CheckCircle2 className="w-4 h-4 text-[var(--text-accent)]" /> You are subscribed to Kashtrix Engineering Dispatch.
              </div>
            ) : (
              <>
                <div className="relative flex-1 sm:w-72">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email address..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-xs focus:outline-none focus:border-[var(--focus-border)] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="pink-glow-button px-5 py-2.5 rounded-xl bg-[#E11D72] text-white font-sora font-bold text-xs hover:bg-[#FF2E93] transition-all shadow-sm shrink-0"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Global Offices */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <AnimatedLogo size="lg" variant="stacked" className="!h-24 !w-52" />
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Kashtrix unifies OSS, BSS, CRM, billing, payments, network operations, subscriber management, hardware automation, support, field service, inventory, analytics, voice automation, APIs, and AI agents into one intelligent platform.
            </p>

            <div className="space-y-2 pt-2 border-t border-[var(--border-default)]/60 text-xs text-[var(--text-primary)]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--text-link)]" />
                <span>Global presence: Dubai, Singapore, Dallas (US), and Kathmandu (Nepal)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--text-accent)]" />
                <a href="mailto:info@kashtrix.com" className="hover:text-[var(--text-link)]">Contact: info@kashtrix.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] text-[11px] font-bold text-[var(--text-primary)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-link)]" /> Enterprise Security
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border-default)] text-[11px] font-bold text-[var(--text-primary)]">
                ISO 27001 Architecture
              </span>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-[var(--text-secondary)]">
              <a href="https://facebook.com/kashtrix" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Facebook</a>
              <span>·</span>
              <a href="https://twitter.com/kashtrix" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Twitter / X</a>
              <span>·</span>
              <a href="https://linkedin.com/company/kashtrix" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {footerColumns.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors block leading-snug"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Payment Gateways */}
      <div className="border-t border-[var(--border-default)] bg-[var(--surface-1)]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <div className="flex items-center gap-2 font-sora text-sm font-semibold text-[var(--text-primary)]">
                <WalletCards className="h-4 w-4 text-[var(--text-accent)]" />
                Payment gateways supported
              </div>
              <p className="mt-1 max-w-md font-inter text-xs leading-relaxed text-[var(--text-secondary)]">
                Accept regional and global payments through native connectors or the secure Kashtrix internal payment gateway.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              {PAYMENT_GATEWAYS.map((gateway) => (
                <span
                  key={gateway}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] px-2.5 py-1.5 font-inter text-[11px] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-purple)]"
                >
                  <CreditCard className="h-3 w-3 text-[var(--text-link)]" />
                  {gateway}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Strip */}
      <div className="border-t border-[var(--border-default)] bg-[var(--surface-2)]/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-secondary)]">
          <div>
            &copy; {new Date().getFullYear()} Kashtrix Technologies Inc. All rights reserved. Every System. One Platform. Limitless AI Possibilities.
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-[var(--text-primary)] transition-colors">
              Security Center
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[var(--text-primary)] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
