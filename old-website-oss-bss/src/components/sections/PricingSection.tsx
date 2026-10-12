"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number | string;
  annualPrice: number | string;
  badge: string;
  featured?: boolean;
  features: string[];
}

const PRICING_PLANS: Plan[] = [
  {
    id: "regional",
    name: "Regional ISP Core",
    subtitle: "Ideal for growing WISPs & fiber providers automating their first 10,000 to 50,000 subscriber circuits.",
    monthlyPrice: 2450,
    annualPrice: 1950,
    badge: "Most Popular for WISPs",
    features: [
      "Up to 50,000 Active Subscriber Circuits",
      "Unified OSS & BSS Core (Radius + Billing)",
      "2 Active AI Agents (NOC AI + Billing AI)",
      "Multi-Vendor Hardware Support (Cisco, Huawei, Nokia)",
      "Standard Omnichannel Helpdesk & Tickets",
      "99.99% Uptime SLA Guarantee",
      "8x5 Technical NOC Support",
    ],
  },
  {
    id: "national",
    name: "National Operator",
    subtitle: "Built for FTTH and cable operators scaling between 50,000 and 250,000 circuits requiring sub-second automation.",
    monthlyPrice: 5800,
    annualPrice: 4650,
    badge: "Full Autonomous AI Suite",
    featured: true,
    features: [
      "Up to 250,000 Active Subscriber Circuits",
      "Full Unified OSS/BSS + Revenue Assurance",
      "All 8 Autonomous AI Agents Grid Enabled",
      "Multi-Vendor CLI / NETCONF / gNMI Builder",
      "GPS Field Operations App + QR Barcode Scan",
      "AI Voice Calls (15,000 monthly minutes included)",
      "99.999% High-Availability SLA + Dedicated Architect",
    ],
  },
  {
    id: "enterprise",
    name: "Tier-1 Carrier Enterprise",
    subtitle: "Custom architectural deployment for global carriers managing 250,000+ subscriber circuits and complex BNG rings.",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    badge: "Infinite Scale",
    features: [
      "Unlimited Active Subscriber Circuits",
      "Dedicated Private Cloud or On-Premises Core",
      "Custom Fine-Tuned AI Telecom Reasoning Models",
      "Custom Vendor Driver Pack Development",
      "Unlimited AI Voice & IVR Call Cadences",
      "Custom Billing & Gateway API Orchestration",
      "24/7/365 Dedicated C-Suite & Engineering Pod",
    ],
  },
];

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-1)] border-t border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            Predictable Telecom Economics
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            One platform. Transparent circuit-based pricing.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Stop paying 6 different software licenses for Radius, billing, inventory, ticketing, and network monitoring. Kashtrix scales predictably with your active subscriber circuits.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={cn("text-xs font-bold font-sora", billingCycle === "monthly" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "annual" ? "monthly" : "annual")}
              className="w-14 h-7 rounded-full bg-[#2B0D3A] p-1 flex items-center transition-all relative"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white transition-transform",
                  billingCycle === "annual" ? "translate-x-7 bg-[#E11D72]" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-xs font-bold font-sora flex items-center gap-1.5", billingCycle === "annual" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-[var(--surface-pink)] text-[var(--text-accent)] text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => {
            const val = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const currentPrice = typeof val === "number" ? formatCurrency(val) : val;
            const isCustom = typeof val === "string";

            return (
              <div
                key={plan.id}
                className={cn(
                  "rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 border",
                  plan.featured
                    ? "bg-gradient-to-br from-[#2B0D3A] to-[#4A1B7A] text-white border-[#E11D72] shadow-2xl scale-102"
                    : "bg-[var(--surface-1)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[var(--border-brand)]"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E11D72] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-sora">{plan.name}</h3>
                    <p className={cn("text-xs mt-1.5 leading-relaxed", plan.featured ? "text-[#E8DFF0]" : "text-[var(--text-secondary)]")}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="pb-6 border-b border-[var(--border-default)]/20">
                    <div className="flex items-baseline gap-1.5">
                      <span className="type-price text-4xl tracking-tight md:text-5xl">
                        {currentPrice}
                      </span>
                      {!isCustom && (
                        <span className={cn("text-xs font-semibold", plan.featured ? "text-[#E8DFF0]" : "text-[var(--text-secondary)]")}>
                          / month
                        </span>
                      )}
                    </div>
                    {!isCustom && (
                      <span className={cn("text-[11px] block mt-1", plan.featured ? "text-[#FCE7F3]/80" : "text-[var(--text-secondary)]")}>
                        {billingCycle === "annual" ? "Billed annually" : "Billed month-to-month"}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className={cn("text-xs font-bold uppercase tracking-wider block", plan.featured ? "text-[#FCE7F3]" : "text-[var(--text-link)]")}>
                      Included capabilities:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs font-semibold">
                          <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", plan.featured ? "text-[var(--text-accent)]" : "text-[var(--text-link)]")} />
                          <span className={plan.featured ? "text-white" : "text-[var(--text-primary)]"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={plan.id === "enterprise" ? "/contact" : "/request-demo"}
                    className={cn(
                      "w-full py-3.5 px-6 rounded-xl font-sora font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md",
                      plan.featured
                        ? "bg-white text-[#2B0F3D] hover:bg-[#F7F2FB]"
                        : "bg-[#2B0D3A] text-white hover:bg-[#4A1B7A] dark:bg-[var(--brand-violet)] dark:hover:bg-[var(--brand-pink)]"
                    )}
                  >
                    <span>{plan.id === "enterprise" ? "Contact Carrier Sales" : "Request Custom Sandbox"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Preview Banner */}
        <div className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-primary)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold font-sora text-[var(--text-primary)]">Have custom hardware or legacy database migration questions?</h4>
              <p className="text-[var(--text-secondary)] mt-0.5">Our solutions architects provide free 60-day migration blueprints for OLTs and BNG gateways.</p>
            </div>
          </div>
          <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold shrink-0 hover:bg-[#4A1B7A] transition-colors">
            Talk to an Architect
          </Link>
        </div>
      </div>
    </section>
  );
};
