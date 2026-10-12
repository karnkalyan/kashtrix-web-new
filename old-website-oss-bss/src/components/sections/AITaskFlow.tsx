"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const AI_STEPS = [
  { id: "detect", title: "1. Detect", desc: "Monitors BNG-02 subscriber failure rate increase (+18% spike across 312 active sessions)." },
  { id: "analyze", title: "2. Analyze", desc: "Queries Radius authentication logs, IP pool saturation, and local optical attenuation meters." },
  { id: "correlate", title: "3. Correlate", desc: "Links 312 dropped PPPoE circuits directly to a localized power dip on OLT-04 port 1/12." },
  { id: "recommend", title: "4. Recommend", desc: "Formulates remediation: Re-route subscriber sessions to backup BNG-04 while rebooting GPON card." },
  { id: "approve", title: "5. Approve", desc: "Evaluates approval policy: Pre-approved under NOC Low-Risk SLA criteria → Proceeding." },
  { id: "execute", title: "6. Execute", desc: "Applies NETCONF/CLI configuration update to switch session routes without packet drop." },
  { id: "verify", title: "7. Verify", desc: "Polls gNMI telemetry every 100ms → Confirms 100% of 312 subscribers successfully re-authenticated." },
  { id: "report", title: "8. Report", desc: "Generates Incident Summary #INC-9012, logs audit record, and alerts NOC channel via Slack/Email." },
];

const AGENT_SCENARIOS: Record<string, { name: string; scenario: string; subject: string; action: string; result: string }> = {
  "sales-ai": { name: "Sales AI", scenario: "A high-usage subscriber is approaching the limits of their current plan.", subject: "subscriber usage, eligibility, serviceability, and offer history", action: "create a personalized 1 Gbps upgrade offer in CRM", result: "offer delivery, attribution, consent, and projected ARPU uplift" },
  "support-ai": { name: "Support AI", scenario: "A subscriber reports intermittent internet service and high latency.", subject: "Radius sessions, CPE health, optical levels, and outage signals", action: "refresh the session and safely reprovision the ONT profile", result: "stable optical power, restored service, and normal latency" },
  "billing-ai": { name: "Billing AI", scenario: "An active circuit has usage but no matching rated invoice item.", subject: "usage, activation, package, discount, tax, and ledger events", action: "repair the rating rule and create the approved ledger adjustment", result: "a reconciled invoice total and recovered revenue" },
  "finance-ai": { name: "Finance AI", scenario: "Gateway settlements do not match the daily cash ledger.", subject: "settlements, fees, refunds, chargebacks, and currencies", action: "post the approved reconciliation entry and update the cash forecast", result: "balanced gateway, bank, and general-ledger totals" },
  "ceo-ai": { name: "CEO AI", scenario: "Leadership requests an explanation for a sudden margin decline.", subject: "revenue, churn, transit cost, support load, and utilization", action: "generate an executive brief with prioritized accountable actions", result: "source-verified conclusions, owners, forecasts, and review dates" },
  "voice-ai": { name: "Voice AI", scenario: "Past-due subscribers need a compliant payment reminder campaign.", subject: "consent, language, balance, contact history, and quiet hours", action: "place personalized calls and send secure payment links", result: "call disposition, delivery status, payment outcome, and follow-up" },
  "automation-ai": { name: "Automation AI", scenario: "An engineer requests a safe multi-vendor QoS policy deployment.", subject: "intent, device models, running configuration, dependencies, and syntax", action: "deploy an approved atomic workflow with rollback protection", result: "validated gNMI state, service probes, configuration diff, and audit record" },
};

const createAgentSteps = (agentId: string) => {
  if (agentId === "noc-ai") return AI_STEPS;
  const flow = AGENT_SCENARIOS[agentId] ?? AGENT_SCENARIOS["support-ai"];
  return [
    { id: "detect", title: "1. Detect", desc: `Detects the triggering signal across ${flow.subject}.` },
    { id: "analyze", title: "2. Analyze", desc: `Analyzes ${flow.subject} against live policy and historical context.` },
    { id: "correlate", title: "3. Correlate", desc: "Correlates the evidence to isolate the most likely cause and affected records." },
    { id: "recommend", title: "4. Recommend", desc: `Recommends the safest response: ${flow.action}.` },
    { id: "approve", title: "5. Approve", desc: "Evaluates risk, consent, limits, and human-approval policy before execution." },
    { id: "execute", title: "6. Execute", desc: `Executes the approved action to ${flow.action}.` },
    { id: "verify", title: "7. Verify", desc: `Verifies ${flow.result}.` },
    { id: "report", title: "8. Report", desc: "Writes the outcome, evidence, ownership, and immutable audit record." },
  ];
};

interface AITaskFlowProps { agentId: string }

export const AITaskFlow: React.FC<AITaskFlowProps> = ({ agentId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const agent = agentId === "noc-ai" ? { name: "NOC AI", scenario: "BNG-02 subscriber authentication failures increased by 18%." } : AGENT_SCENARIOS[agentId] ?? AGENT_SCENARIOS["support-ai"];
  const steps = createAgentSteps(agentId);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isRunning, steps.length]);

  return (
    <div className="w-full rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl p-6 md:p-8 text-[var(--text-primary)]">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-default)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[var(--surface-pink)] text-[var(--text-accent)] mb-1">
            <Sparkles className="w-3 h-3" /> Autonomous Reasoning Engine
          </span>
          <h3 className="text-base font-bold font-sora text-[var(--text-primary)]">
            Real-Time {agent.name} Task Sequence Example
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Scenario: {agent.scenario} Watch how {agent.name} handles the task.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-inter font-semibold text-xs hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? "Pause Loop" : "Resume Loop"}
          </button>
          <button
            onClick={() => {
              setActiveStep(0);
              setIsRunning(true);
            }}
            className="p-1.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8-Stage Interactive Workflow Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <div
              key={step.id}
              onClick={() => {
                setActiveStep(index);
                setIsRunning(false);
              }}
              className={cn(
                "p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[95px] relative",
                isCurrent
                  ? "bg-[var(--surface-1)] border-[#E11D72] shadow-md scale-105 z-10"
                  : isCompleted
                  ? "bg-[var(--surface-2)] border-[#2B0D3A]/40"
                  : "bg-[var(--surface-1)] border-[var(--border-default)] opacity-60 hover:opacity-100"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                    isCurrent
                      ? "bg-[#E11D72] text-white animate-pulse"
                      : isCompleted
                      ? "bg-[#2B0D3A] text-white"
                      : "bg-[var(--surface-purple)] text-[var(--text-link)]"
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : index + 1}
                </span>
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D72] animate-ping" />
                )}
              </div>

              <h5
                className={cn(
                  "text-xs font-bold font-sora leading-tight",
                  isCurrent ? "text-[var(--text-accent)]" : "text-[var(--text-primary)]"
                )}
              >
                {step.title.split(". ")[1]}
              </h5>
              <span className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                {isCurrent ? "Active Step" : isCompleted ? "Completed" : "Queued"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detailed Explanation Panel for current step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface-purple)] border border-[var(--border-default)] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-accent)] uppercase tracking-wider font-sora">
                {steps[activeStep].title} Stage Analysis
              </span>
              <span className="text-[11px] text-[var(--text-secondary)]">| Elapsed Time: {(activeStep + 1) * 120}ms</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-primary)] font-medium leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-primary)] px-3 py-1.5 rounded-lg bg-[var(--surface-1)] border border-[var(--border-default)] shadow-2xs">
              Resolution Confidence: 99.8%
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
