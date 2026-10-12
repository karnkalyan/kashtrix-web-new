"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Briefcase, Wrench, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ARCH_LAYERS = [
  {
    id: 1,
    title: "1. Network & Telemetry Layer",
    subtitle: "High-concurrency session control and optical infrastructure management.",
    icon: Server,
    color: "#2B0D3A",
    modules: [
      "OLT/ONT GPON Management",
      "Radius AAA & PPPoE Sessions",
      "BNG / BRAS / vBNG Orchestration",
      "TR-069 ACS CPE Auto-Config",
      "Fiber Topology GIS Mapping",
      "Sub-second Telemetry Engine",
    ],
    detail:
      "Direct driver-level integrations with Cisco ASR 9000, Huawei MA5800, Nokia 7750 SR, and Juniper MX routers. Processes over 50,000 AAA auth requests per second with zero drop.",
  },
  {
    id: 2,
    title: "2. Business & Rating Layer",
    subtitle: "Zero-leakage real-time financial billing and customer relationship management.",
    icon: Briefcase,
    color: "#4A1B7A",
    modules: [
      "Real-Time Rating & Mediation",
      "360° Telecom Subscriber CRM",
      "Dynamic Package & Bandwidth Boosts",
      "Automated Multi-Currency Dunning",
      "General Ledger Financial Export",
      "White-Label Self-Service Portal",
    ],
    detail:
      "Eliminates billing discrepancies by linking circuit throughput directly to prepaid and postpaid rating meters. Automatically triggers SMS payment links upon circuit speed throttling.",
  },
  {
    id: 3,
    title: "3. Service & Field Operations Layer",
    subtitle: "Omnichannel ticketing and GPS-optimized field technician dispatching.",
    icon: Wrench,
    color: "#76549A",
    modules: [
      "Omnichannel Helpdesk & Tickets",
      "GPS Technician Dispatching App",
      "QR Code Warehouse Inventory",
      "Automated SLA Uptime Credits",
      "Work Order Fiber Drop Tracking",
      "CPE Serial Lifecycle & Returns",
    ],
    detail:
      "Empowers field technicians with an offline-ready mobile app to scan optical terminal QR barcodes, run remote OLT line attenuation tests from the field, and close repair tickets in seconds.",
  },
  {
    id: 4,
    title: "4. AI & Autonomous Automation Layer",
    subtitle: "Digital employees executing complex multi-vendor workflows autonomously.",
    icon: Sparkles,
    color: "#E11D72",
    modules: [
      "Autonomous NOC Self-Healing AI",
      "Conversational Voice AI Calls",
      "Multi-Vendor CLI Script Builder",
      "Pre-Commit Validation Regex",
      "Automated Rollback Safeguards",
      "Executive Strategic Oracle AI",
    ],
    detail:
      "The unifying intelligence that continuously queries the bottom three layers. Correlates optical power drops with Radius session disconnects to isolate root-cause fiber cuts instantly.",
  },
];

export const ProductArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-2)] border-y border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            Every System. One Platform.
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            Network, business, service, and AI intelligence—connected.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Explore the four synchronized layers of the Kashtrix stack. Click any layer below to reveal how data flows between network gateways, billing engines, and AI agents.
          </p>
        </div>

        {/* Architecture Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Layer Selector Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {ARCH_LAYERS.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;
              const isAI = index === 3;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(index)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4",
                    isActive
                      ? isAI
                        ? "bg-[#2B0D3A] text-white border-[#E11D72] shadow-xl scale-102"
                        : "bg-[#2B0D3A] text-white border-[var(--border-brand)] shadow-xl scale-102"
                      : "bg-[var(--surface-1)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[#9B82B5]"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-xl shrink-0 transition-colors",
                      isActive
                        ? isAI
                          ? "bg-[#E11D72] text-white"
                          : "bg-[#4A1B7A] text-white"
                        : "bg-[var(--surface-purple)] text-[var(--text-link)]"
                    )}
                  >
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold font-sora truncate">{layer.title}</h3>
                      {isAI && (
                        <span className="w-2 h-2 rounded-full bg-[#E11D72] animate-ping" />
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-xs mt-1 leading-relaxed line-clamp-2",
                        isActive ? "text-[#E8DFF0]/90" : "text-[var(--text-secondary)]"
                      )}
                    >
                      {layer.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Layer Technical Deep-Dive Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#2B0D3A]" />
                    <span className="w-3 h-3 rounded-full bg-[#4A1B7A]" />
                    {activeLayer === 3 && <span className="w-3 h-3 rounded-full bg-[#E11D72]" />}
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-link)] font-sora">
                      Layer {activeLayer + 1} Specifications
                    </span>
                  </div>
                  <span className="text-xs font-inter font-semibold px-2.5 py-1 rounded bg-[var(--surface-2)] text-[var(--text-primary)]">
                    Active Module Count: {ARCH_LAYERS[activeLayer].modules.length}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-sora text-[var(--text-primary)]">
                  {ARCH_LAYERS[activeLayer].title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {ARCH_LAYERS[activeLayer].detail}
                </p>

                {/* Modules Grid inside the Layer */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora mb-3">
                    Synchronized Modules in Layer {activeLayer + 1}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ARCH_LAYERS[activeLayer].modules.map((mod, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] flex items-center gap-2.5 text-xs font-bold text-[var(--text-primary)]"
                      >
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4 shrink-0",
                            activeLayer === 3 ? "text-[var(--text-accent)]" : "text-[var(--text-link)]"
                          )}
                        />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-default)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">SLA Guarantee: 99.999% Multi-Zone High Availability</span>
                  <span className="font-bold text-[var(--text-link)] flex items-center gap-1">
                    Next Layer Synchronized <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
