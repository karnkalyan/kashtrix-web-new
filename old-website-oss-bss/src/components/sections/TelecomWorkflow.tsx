"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Play, RotateCcw, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKFLOW_STEPS = [
  { id: 1, title: "Customer Reports Issue", desc: "Customer calls or opens ticket regarding flashing red LOS light on optical router." },
  { id: 2, title: "AI Checks Account", desc: "Verifies active contract, subscriber tier (1Gbps VIP), and SLA uptime guarantees." },
  { id: 3, title: "AI Checks Billing", desc: "Confirms account is current with zero billing lock or payment dispute flags." },
  { id: 4, title: "AI Checks Radius", desc: "Detects sudden PPPoE authentication drop at 14:22:04 UTC with cause: Lost-Carrier." },
  { id: 5, title: "AI Checks BNG", desc: "Queries ASR-9000-BNG-01 session table → Confirms interface tenGigE0/0/0/1 is up." },
  { id: 6, title: "AI Checks OLT/ONT", desc: "Runs gNMI diagnostics on MA5800-OLT-04 port 1/12 → Reads optical loss: -36.2 dBm." },
  { id: 7, title: "AI Checks Hardware", desc: "Correlates -36dBm reading with 8 neighboring houses → Confirms localized fiber drop cut." },
  { id: 8, title: "Incident Created", desc: "Auto-generates Priority 1 Fiber Outage Incident #INC-FTTH-8901 with GIS pin." },
  { id: 9, title: "Technician Assigned", desc: "Dispatches closest field tech via GPS mobile app with exact splice enclosure coordinates." },
  { id: 10, title: "Customer Notified", desc: "Sends automated SMS tracking link to customer: 'Field tech dispatched, ETA 28 mins'." },
];

export const TelecomWorkflow: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-1)] border-t border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
            End-to-End Orchestration
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            Built for real telecom workflows.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Watch how Kashtrix connects customer tickets directly to Radius session tables, optical attenuation meters, and automated GPS field dispatching in under 4 seconds.
          </p>
        </div>

        {/* Workflow Progression Container */}
        <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] shadow-xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-default)]">
            <div>
              <h3 className="text-base font-bold font-sora text-[var(--text-primary)] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--text-link)]" /> 10-Step Automated Troubleshooting &amp; Dispatch Sequence
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Progress: Stage {activeIdx + 1} of 10 — {(activeIdx + 1) * 10}% Complete
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-1.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isPlaying ? "Pause Sequence" : "Resume Sequence"}
              </button>
              <button
                onClick={() => {
                  setActiveIdx(0);
                  setIsPlaying(true);
                }}
                className="p-1.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[var(--surface-4)] rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2B0D3A] via-[#4A1B7A] to-[#E11D72]"
              animate={{ width: `${((activeIdx + 1) / WORKFLOW_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Horizontal Step Pills on Desktop / Vertical on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isDone = idx < activeIdx;
              const isCurr = idx === activeIdx;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[85px] relative",
                    isCurr
                      ? "bg-[var(--surface-1)] border-[#E11D72] shadow-md scale-105 z-10"
                      : isDone
                      ? "bg-[var(--surface-1)] border-[var(--border-brand)]/40 text-[var(--text-primary)]"
                      : "bg-[var(--surface-1)]/60 border-[var(--border-default)] text-[var(--text-secondary)] opacity-60 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                        isCurr
                          ? "bg-[#E11D72] text-white animate-pulse"
                          : isDone
                          ? "bg-[#2B0D3A] text-white"
                          : "bg-[var(--surface-purple)] text-[var(--text-link)]"
                      )}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3" /> : step.id}
                    </span>
                    {isCurr && <span className="w-1.5 h-1.5 rounded-full bg-[#E11D72] animate-ping" />}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-bold font-sora leading-tight line-clamp-2",
                      isCurr ? "text-[var(--text-accent)]" : "text-[var(--text-primary)]"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detail Viewport Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[var(--surface-purple)] text-[var(--text-link)]">
                    Step {activeIdx + 1} of 10
                  </span>
                  <h4 className="text-base md:text-lg font-bold font-sora text-[var(--text-primary)]">
                    {WORKFLOW_STEPS[activeIdx].title}
                  </h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {WORKFLOW_STEPS[activeIdx].desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveIdx((prev) => (prev + 1) % WORKFLOW_STEPS.length);
                    setIsPlaying(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center gap-2"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
