"use client";

import React, { useState } from "react";
import { Globe, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { GlobalNetworkGlobe } from "@/components/visual/GlobalNetworkGlobe";
import { ScrollNetworkAccent } from "@/components/visual/ScrollNetworkAccent";

export const GlobalReady: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState("North America");

  const regionSpecs: Record<string, { circuits: string; ping: string; sla: string; hubs: string[] }> = {
    "North America": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["New York (US-East)", "Ashburn (US-East-2)", "San Jose (US-West)"] },
    "Europe": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["London (EU-West)", "Frankfurt (EU-Central)", "Amsterdam (EU-West-2)"] },
    "Asia Pacific": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["Tokyo (AP-East)", "Singapore (AP-South)", "Sydney (AP-Southeast)"] },
    "Middle East": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["Dubai (ME-Central)", "Riyadh (ME-East)"] },
    "South America": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["São Paulo (SA-East)", "Bogotá (SA-North)"] },
    "Australia": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["Sydney (AP-Southeast)", "Melbourne (AP-South)"] },
    "Africa": { circuits: "Multi-tenant deployment", ping: "Low-latency intra-region", sla: "High Availability", hubs: ["Cape Town (AF-South)", "Johannesburg (AF-Central)"] },
  };

  const currentSpecs = regionSpecs[activeRegion] || regionSpecs["North America"];

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-2)] border-t border-[var(--border-default)] text-[var(--text-primary)] relative overflow-hidden">
      <ScrollNetworkAccent side="left" className="top-auto bottom-8 opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Global Operations Specs */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
              <Globe className="w-3.5 h-3.5" /> Worldwide Multi-Tenant Core
            </span>

            <h2 className="section-heading text-[var(--text-primary)]">
              Global ISP infrastructure for broadband operations.
            </h2>

            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              Kashtrix is designed for multi-region deployment with automated geo-redundancy. If an optical terminal controller or BNG pool experiences hardware degradation, subscriber sessions can fail over to adjacent availability zones.
            </p>

            {/* Active Region Highlights Box */}
            <div className="p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-md space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-default)]">
                <span className="text-sm font-bold font-sora text-[var(--text-primary)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D72] animate-pulse" />
                  {activeRegion} Operations Hub
                </span>
                <span className="text-xs font-bold text-[var(--text-link)] bg-[var(--surface-purple)] px-2.5 py-0.5 rounded-full">
                  {currentSpecs.sla}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[var(--text-secondary)] block">Deployment:</span>
                  <strong className="text-[var(--text-primary)] text-sm">{currentSpecs.circuits}</strong>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] block">Average Latency:</span>
                  <strong className="text-[var(--text-primary)] text-sm">{currentSpecs.ping}</strong>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase text-[var(--text-secondary)] block mb-1">
                  Active Regional Peering Hubs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentSpecs.hubs.map((hub) => (
                    <span
                      key={hub}
                      className="px-2 py-1 rounded bg-[var(--surface-2)] text-[11px] font-semibold text-[var(--text-primary)] border border-[var(--border-default)]"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-primary)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--text-link)]" /> ISO 27001 Data Centers
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--text-accent)]" /> Anycast DNS Resolution
              </div>
            </div>
          </div>

          {/* Right Column: 3D Global Network Globe */}
          <div className="lg:col-span-7">
            <GlobalNetworkGlobe onNodeClick={(region) => setActiveRegion(region)} />
          </div>
        </div>
      </div>
    </section>
  );
};
