"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, FileCheck, Key, Server, CheckCircle2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const SECURITY_PILLARS = [
  {
    title: "SOC 2 Type II Certified",
    desc: "Verified annual third-party audits confirming continuous adherence to Trust Services Criteria for security, availability, and confidentiality.",
    icon: ShieldCheck,
  },
  {
    title: "Zero-Trust Command Vault",
    desc: "Every SSH, NETCONF, and gNMI hardware command requires cryptographic HMAC token verification and role-based access approval before execution.",
    icon: Lock,
  },
  {
    title: "Immutable Audit Trail",
    desc: "All configuration commits, subscriber policy changes, and AI reasoning steps are written to an append-only PostgreSQL ledger with tamper-proof hashing.",
    icon: FileCheck,
  },
  {
    title: "Role-Based Access Control (RBAC)",
    desc: "Granular multi-tenant permissions separating NOC tier-1 technicians, billing accountants, and senior network architects.",
    icon: Key,
  },
];

export const SecuritySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-1)] border-t border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Grade &amp; Secure
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            Security engineered into every network packet.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Telecom infrastructure requires military-grade isolation. Kashtrix secures every multi-vendor interaction with mutual TLS, zero-trust token vaults, and continuous compliance monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SECURITY_PILLARS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between",
                  activeTab === index
                    ? "bg-gradient-to-r from-emerald-700 to-teal-700 text-white border-emerald-400 shadow-lg"
                    : "bg-[var(--surface-1)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-emerald-500/40"
                )}
              >
                <div>
                  <div
                    className={cn(
                      "p-3 rounded-xl w-fit mb-4 transition-colors",
                      activeTab === index ? "bg-emerald-400 text-slate-950 font-bold" : "bg-[var(--surface-purple)] text-[var(--text-link)]"
                    )}
                  >
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold font-sora mb-2 leading-snug">{item.title}</h3>
                  <p className={cn("text-xs leading-relaxed", activeTab === index ? "text-emerald-100" : "text-[var(--text-secondary)]")}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Immutable Audit Log Preview */}
        <div className="rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] p-6 text-[var(--text-primary)] font-inter text-xs shadow-md">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-default)]">
            <span className="text-[var(--text-tertiary)] font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--text-accent)]" /> Real-Time SOC 2 Compliance &amp; Audit Log Stream
            </span>
            <span className="text-[10px] text-[var(--text-accent)] uppercase font-bold tracking-wider">
              Zero-Trust Vault: Active
            </span>
          </div>

          <div className="space-y-2.5 text-[var(--text-primary)] leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-[var(--text-secondary)] shrink-0">[2026-03-30 14:22:01 UTC]</span>
              <span>
                <strong className="text-[var(--text-accent)]">AUTH_VERIFIED</strong> | User: AI_NOC_AGENT_01 | Token: HMAC_SHA256_VERIFIED | Action: Query gNMI telemetry on Cisco ASR-9000-BNG-01.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--text-secondary)] shrink-0">[2026-03-30 14:22:04 UTC]</span>
              <span>
                <strong className="text-white">COMMAND_EXEC</strong> | Target: MA5800-OLT-04 | Protocol: NETCONF/YANG | Command: &apos;ont add 1 12 sn-auth 4857544389012345&apos;.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--text-secondary)] shrink-0">[2026-03-30 14:22:06 UTC]</span>
              <span>
                <strong className="text-[#E8DFF0]">AUDIT_HASH_WRITTEN</strong> | RecordID: #LOG_SEC_89412 | SHA256: 9e83a4c1...04f2 | Status: Immutable Ledger Stored.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
