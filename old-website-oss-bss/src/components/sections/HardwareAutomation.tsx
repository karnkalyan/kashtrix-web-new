"use client";

import React from "react";
import { Cpu, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HardwareWorkflowAnimation } from "@/components/visual/HardwareWorkflowAnimation";

const PROTOCOLS = [
  { name: "NETCONF / YANG", desc: "Standardized XML configuration transactions via RFC 6241 with automatic lock/unlock." },
  { name: "gNMI / gRPC", desc: "Microsecond streaming telemetry and model-driven interface operations." },
  { name: "RESTCONF", desc: "HTTP-based data store manipulation with JSON payload syntax verification." },
  { name: "SSH / CLI Macro Engine", desc: "Stateful regex prompt detection and automated terminal command orchestration." },
  { name: "SNMP v2c/v3 Trap Listener", desc: "Real-time fault trap parsing, OID polling, and proactive threshold alerting." },
  { name: "Streaming Telemetry", desc: "High-frequency push telemetry feeding the timeseries AI predictive engine." },
];

export const HardwareAutomation: React.FC = () => {
  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-1)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            Multi-Vendor Orchestration
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            Orchestrate multi-vendor infrastructure from one platform.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Stop managing separate vendor controllers. Kashtrix provides unified drivers and automated rollback loops for Cisco, Huawei, Nokia, Juniper, Fortinet, and over 450+ network operating systems.
          </p>
        </div>

        {/* Embedded Interactive Hardware Workflow Sandbox */}
        <div className="mb-16">
          <HardwareWorkflowAnimation />
        </div>

        {/* Supported Protocols & Matrix Overview */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
            <div>
              <h3 className="text-lg font-bold font-sora text-[var(--text-primary)]">
                Enterprise Network Protocols Supported Natively
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Every command is wrapped in pre-commit validation and atomic state rollback loops.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--text-link)]" /> Zero-Trust Command Vault
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROTOCOLS.map((p) => (
              <div
                key={p.name}
                className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)]/50 hover:border-[var(--border-brand)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--text-link)]" />
                    <h4 className="text-sm font-bold font-sora text-[var(--text-primary)]">{p.name}</h4>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
