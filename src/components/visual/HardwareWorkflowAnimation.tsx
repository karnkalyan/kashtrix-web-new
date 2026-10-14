"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, CheckCircle2, AlertOctagon, RotateCcw, ShieldCheck, Play, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const VENDORS = [
  {
    id: "cisco",
    name: "Cisco Systems",
    os: "IOS-XR 7.4.1 (ASR 9000)",
    protocol: "NETCONF / YANG",
    command: `configure terminal
interface TenGigE0/0/0/1.100
 encapsulation dot1q 100
 ipv4 address 198.51.100.1 255.255.255.0
 service-policy input BNG_SUBSCRIBER_POLICY_1G
commit`,
    rollback: `rollback configuration last 1
commit confirmed 60`,
  },
  {
    id: "huawei",
    name: "Huawei Technologies",
    os: "VRP V800R012 (MA5800 OLT)",
    protocol: "NETCONF / CLI",
    command: `system-view
interface gpon 0/2
 ont add 1 12 sn-auth "4857544389012345" omci ont-lineprofile-id 10 ont-srvprofile-id 10
 ont port vlan 1 12 1 eth 1 vlan 100
quit`,
    rollback: `system-view
interface gpon 0/2
 ont delete 1 12
quit`,
  },
  {
    id: "nokia",
    name: "Nokia SR OS",
    os: "SR OS 23.4.R1 (7750 SR)",
    protocol: "gNMI / Model-Driven",
    command: `configure router 1 interface "vBNG-Pool-04"
 address 203.0.113.1/24
 subscriber-interface "sub-int-01"
  group-interface "group-01"
   sap 1/1/1:100 create
   exit
commit`,
    rollback: `configure router 1 interface "vBNG-Pool-04" shutdown
commit`,
  },
  {
    id: "juniper",
    name: "Juniper Networks",
    os: "Junos OS 23.2R1 (MX Series)",
    protocol: "RESTCONF / PyEZ",
    command: `set interfaces ae0 unit 100 vlan-id 100
set interfaces ae0 unit 100 family inet address 192.0.2.1/24
set class-of-service interfaces ae0 unit 100 scheduler-map 1G-FTTH-QoS
commit check`,
    rollback: `rollback 1
commit`,
  },
];

export const HardwareWorkflowAnimation: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(VENDORS[0]);
  const [executionState, setExecutionState] = useState<"idle" | "running" | "success" | "rollback">("idle");
  const [timeoutSec, setTimeoutSec] = useState("30");
  const [retryPolicy, setRetryPolicy] = useState("3 attempts with exponential backoff");

  const runTest = (triggerRollback = false) => {
    setExecutionState("running");
    setTimeout(() => {
      setExecutionState(triggerRollback ? "rollback" : "success");
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl overflow-hidden text-[var(--text-primary)]">
      {/* Top Bar */}
      <div className="px-6 py-4 bg-[var(--surface-2)] border-b border-[var(--border-default)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold font-sora text-[var(--text-primary)] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--text-link)]" /> Multi-Vendor Atomic Action Builder
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Select infrastructure vendor to preview automated validation, commit, and state rollback branches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {VENDORS.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVendor(v);
                setExecutionState("idle");
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                selectedVendor.id === v.id
                  ? "bg-[#2B0D3A] text-white shadow-sm"
                  : "bg-[var(--surface-1)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-brand)]"
              )}
            >
              {v.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 gap-6">
        {/* Left: Configuration Form Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
              <label className="text-[10px] font-bold uppercase text-[var(--text-secondary)] tracking-wider block mb-1">
                Target OS
              </label>
              <span className="text-xs font-semibold text-[var(--text-primary)]">{selectedVendor.os}</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)]">
              <label className="text-[10px] font-bold uppercase text-[var(--text-secondary)] tracking-wider block mb-1">
                Protocol
              </label>
              <span className="text-xs font-semibold text-[var(--text-link)]">{selectedVendor.protocol}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Validation Pattern Regex</label>
              <input
                readOnly
                value="^.*(commit complete|OK|Validation successful).*$"
                className="w-full px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-inter text-[var(--text-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Timeout (Seconds)</label>
                <input
                  type="number"
                  value={timeoutSec}
                  onChange={(e) => setTimeoutSec(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Approval Policy</label>
                <select className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-semibold">
                  <option>Auto-Approve (Low Risk)</option>
                  <option>NOC Lead Signoff Required</option>
                  <option>Scheduled Maintenance Window</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Retry Policy</label>
              <input
                readOnly
                value={retryPolicy}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--text-secondary)]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => runTest(false)}
              disabled={executionState === "running"}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-sora font-bold text-xs hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Execute Atomic Command
            </button>
            <button
              onClick={() => runTest(true)}
              disabled={executionState === "running"}
              className="px-3 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[#E11D72] text-[var(--text-accent)] font-sora font-bold text-xs hover:bg-[var(--surface-pink)] transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Simulate Rollback
            </button>
          </div>
        </div>

        {/* Right: Code & Output Terminal Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] p-4 text-[var(--text-primary)] font-inter text-xs shadow-md">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-default)]">
              <span className="text-[var(--text-tertiary)] font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--text-accent)]" /> Atomic Command Script
              </span>
              <span className="text-[10px] text-[var(--text-accent)] uppercase font-bold">Transaction State Locked</span>
            </div>
            <pre className="whitespace-pre-wrap text-[var(--text-primary)] leading-relaxed">{selectedVendor.command}</pre>
          </div>

          {/* Execution Output Status / Rollback Branch */}
          <div className="min-h-[140px] rounded-xl border p-4 transition-all duration-300">
            {executionState === "idle" && (
              <div className="h-full flex flex-col items-center justify-center text-center py-6 text-[var(--text-secondary)]">
                <Layers className="w-8 h-8 text-[var(--text-tertiary)] mb-2 stroke-1" />
                <p className="text-xs font-medium">Click &quot;Execute Atomic Command&quot; or &quot;Simulate Rollback&quot; above to preview live device validation output.</p>
              </div>
            )}

            {executionState === "running" && (
              <div className="h-full flex items-center justify-center py-8 gap-3 text-[var(--text-primary)]">
                <div className="w-5 h-5 rounded-full border-2 border-[var(--border-brand)] border-t-transparent animate-spin" />
                <span className="text-xs font-bold font-sora">
                  Opening SSH/NETCONF channel to {selectedVendor.name} and checking pre-commit state...
                </span>
              </div>
            )}

            {executionState === "success" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--text-link)]" /> Validation &amp; Commit Successful (0.42s)
                </div>
                <p className="text-xs text-[var(--text-secondary)] bg-[var(--surface-2)] p-3 rounded-lg border border-[var(--border-default)] font-inter">
                  [SUCCESS] Configuration verified by syntax parser. Active subscriber interface &apos;TenGigE0/0/0/1.100&apos; policy updated without packet loss. Audit log record ID: #LOG_HW_9920.
                </p>
              </motion.div>
            )}

            {executionState === "rollback" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-accent)]">
                  <span className="flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4" /> State Validation Failure Detected → Triggering Rollback Branch
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-pink)] text-[10px] uppercase">Rollback Active</span>
                </div>
                <div className="p-3 rounded-lg bg-[#2B0D3A] text-white font-inter text-xs space-y-1.5 border border-[#E11D72]">
                  <div className="text-[var(--text-accent)] font-semibold">{"// Rollback Script Executed Automatically"}</div>
                  <pre className="whitespace-pre-wrap text-[#F4EEFF]">{selectedVendor.rollback}</pre>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-[#E8DFF0]">
                    [VERIFIED] Previous known good configuration restored in 380ms. Zero subscriber interruption.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
