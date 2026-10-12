"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const API_STEPS = [
  { id: 1, title: "Request Created", desc: "POST /api/v1/network/devices/execute triggered with JWT token." },
  { id: 2, title: "Token Verified", desc: "HMAC cryptographic signature verified against SOC 2 Zero-Trust vault." },
  { id: 3, title: "Workflow Queued", desc: "Atomic transaction locked in high-concurrency Redis event queue." },
  { id: 4, title: "Device Action Sent", desc: "NETCONF / YANG configuration pushed to Cisco ASR-9000-BNG-01." },
  { id: 5, title: "Response Validated", desc: "Operational state verified via microsecond gNMI telemetry stream." },
  { id: 6, title: "Audit Record Created", desc: "Immutable compliance entry logged to PostgreSQL Drizzle database." },
  { id: 7, title: "Webhook Returned", desc: "HTTP 200 OK + payload dispatched to external billing webhook." },
];

const API_EXAMPLES = [
  {
    method: "POST",
    endpoint: "/api/v1/automation/workflows",
    code: `// Execute Multi-Vendor BNG Subscriber Policy Re-allocation
const response = await kashtrix.automation.executeWorkflow({
  workflowId: "wf_bng_qos_rebalance_09",
  targetVendor: "Cisco-ASR-9000",
  parameters: {
    poolName: "FTTH_GPON_POOL_A",
    maxSessionLimit: 10000,
    bandwidthProfile: "1Gbps_Symmetric_Priority",
  },
  autoRollbackOnFailure: true,
});`,
  },
  {
    method: "GET",
    endpoint: "/api/v1/radius/sessions?active=true&oltId=olt_04",
    code: `// Query Real-Time High-Speed AAA Sessions
const sessions = await kashtrix.radius.listSessions({
  activeOnly: true,
  oltIdentifier: "OLT-XGSPON-TOKYO-04",
  pagination: { limit: 1000, cursor: "curs_8943x" },
});
console.log("Active high-speed sessions:", sessions.totalCount);`,
  },
  {
    method: "POST",
    endpoint: "/api/v1/voice/campaigns",
    code: `// Trigger Autonomous Payment Reminder Voice Calls with IVR Pay Link
const campaign = await kashtrix.voice.launchCampaign({
  campaignName: "Overdue_Invoice_Cadence_Step_2",
  targetSegment: "Past_Due_15_Days",
  aiVoicePersona: "Professional_Friendly_En",
  actionOnAnswer: "Deliver_SMS_Stripe_Link",
});`,
  },
];

export const APIFlowAnimation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < API_STEPS.length - 1) {
          return prev + 1;
        } else {
          setIsRunning(false);
          return prev;
        }
      });
    }, 900);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleRunSimulation = () => {
    setActiveStep(0);
    setIsRunning(true);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: API Request Steps Flow */}
      <div className="lg:col-span-5 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
            Live Request Execution Pipeline
          </h4>
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              isRunning
                ? "bg-[var(--surface-4)] text-[var(--text-secondary)] cursor-not-allowed"
                : "pink-glow-button bg-[#E11D72] text-white hover:bg-[#FF2E93] shadow-md"
            )}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? "Simulating Pipeline..." : "Test Request"}
          </button>
        </div>

        {API_STEPS.map((step, idx) => {
          const isCompleted = idx < activeStep;
          const isCurrent = idx === activeStep && isRunning;

          return (
            <motion.div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3",
                isCurrent
                  ? "bg-[var(--surface-1)] border-[#E11D72] shadow-md -translate-y-0.5"
                  : isCompleted
                  ? "bg-[var(--surface-2)] border-[var(--border-brand)]/30"
                  : "bg-[var(--surface-1)] border-[var(--border-default)] opacity-75 hover:opacity-100"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors",
                  isCurrent
                    ? "bg-[#E11D72] text-white animate-pulse"
                    : isCompleted
                    ? "bg-[var(--brand-violet)] text-white"
                    : "bg-[var(--surface-purple)] text-[var(--text-link)]"
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.id}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5
                    className={cn(
                      "text-xs font-bold font-sora",
                      isCurrent ? "text-[var(--text-accent)]" : "text-[var(--text-primary)]"
                    )}
                  >
                    {step.title}
                  </h5>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold text-[var(--text-accent)] uppercase tracking-wider animate-pulse">
                      Active Step
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right: API Code Console with theme variables */}
      <div className="lg:col-span-7 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl overflow-hidden">
        {/* Console Header Tabs */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border-default)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E11D72]" />
            <span className="w-3 h-3 rounded-full bg-[#4A1B7A]" />
            <span className="w-3 h-3 rounded-full bg-[#76549A]" />
            <span className="ml-2 text-xs font-inter text-[var(--text-primary)] font-semibold">
              api.kashtrix.com · orchestration-sdk@2.4.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            {API_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setSelectedExample(i)}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-inter font-semibold transition-colors",
                  selectedExample === i
                    ? "bg-[#E11D72] text-white"
                    : "bg-[var(--surface-purple)] text-[var(--text-link)] hover:text-[var(--text-primary)]"
                )}
              >
                {ex.method}
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewport */}
        <div className="p-3 sm:p-5 whitespace-pre-wrap break-words no-scrollbar font-inter text-xs leading-relaxed text-[var(--text-primary)]">
          <div className="flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-[var(--border-default)] text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--text-accent)]">{API_EXAMPLES[selectedExample].method}</span>
            <span className="text-[var(--text-primary)] font-semibold break-all">https://api.kashtrix.com{API_EXAMPLES[selectedExample].endpoint}</span>
          </div>
          <pre className="whitespace-pre-wrap break-words">{API_EXAMPLES[selectedExample].code}</pre>
        </div>

        {/* Live Simulation Response Output Bar */}
        <div className="p-4 bg-[var(--surface-2)] border-t border-[var(--border-default)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E11D72] animate-ping" />
            <span className="text-xs font-inter text-[var(--text-primary)]">
              HTTP Status: <strong className="text-[var(--text-primary)]">200 OK</strong> | Latency:{" "}
              <strong className="text-[var(--text-primary)]">12.4ms</strong> | Audit ID:{" "}
              <strong className="text-[var(--text-secondary)]">AUD_8901_SEC</strong>
            </span>
          </div>
          <span className="text-[11px] font-inter px-2 py-0.5 rounded bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
            Zero-Trust Verified
          </span>
        </div>
      </div>
    </div>
  );
};
