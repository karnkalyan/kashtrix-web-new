"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PhoneCall, FileText, Sparkles, ArrowRight, CheckCircle2, Database, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const VOICE_STEPS = [
  {
    id: "call",
    label: "Inbound SIP Call",
    icon: PhoneCall,
    title: "Customer Calls Telecom Support Line",
    detail: "Caller ID # +1 (555) 019-2834 identified in real-time Radius & CRM records.",
  },
  {
    id: "transcript",
    label: "Live Transcription",
    icon: FileText,
    title: "Real-Time Technical Speech-to-Text",
    detail: `"Hello, my optical internet drop has been flashing red on my GPON router since the storm 30 minutes ago."`,
  },
  {
    id: "intent",
    label: "Intent & Sentiment",
    icon: Sparkles,
    title: "AI Intent Extraction (Confidence: 99.4%)",
    detail: "Detected: [Loss of Optical Signal (LOS) / Fiber Drop Event] | Customer Sentiment: [Frustrated / High Priority VIP].",
  },
  {
    id: "action",
    label: "Autonomous Action",
    icon: CheckCircle2,
    title: "Instant Diagnostics & Remedy Executed",
    detail: "Voice AI queries OLT-04 port 1/12 via gNMI → Confirms -34dBm loss → Checks local storm outage polygon.",
  },
  {
    id: "crm",
    label: "CRM / Ticket Update",
    icon: Database,
    title: "Automated Dispatch & Customer Confirmation",
    detail: "Creates Priority 1 Work Order #WO-8910 in FieldOps, assigns closest tech via GPS, and sends live SMS tracking link.",
  },
];

export const VoiceWaveAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % VOICE_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl p-6 text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-default)]">
        <div>
          <h4 className="text-sm font-bold font-sora text-[var(--text-primary)] flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[var(--text-link)] animate-pulse" /> AI Conversational Voice Pipeline
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            How Kashtrix Voice AI transforms raw SIP audio into verified autonomous field &amp; CRM outcomes.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)] hover:bg-sky-600 hover:text-white transition-colors"
        >
          {isPlaying ? "Pause Pipeline" : "Resume Pipeline"}
        </button>
      </div>

      {/* Waveform Bars Animation */}
      <div className="h-20 w-full rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] flex items-center justify-center gap-1.5 px-4 mb-8 overflow-hidden relative">
        <div className="absolute top-2 left-3 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" /> Live Audio Stream via Yeastar / Asterisk SIP Trunk
        </div>
        {[...Array(42)].map((_, i) => {
          const isAccent = i === Math.floor((currentStep / VOICE_STEPS.length) * 42);
          const wavePeak = 10 + ((i * 17 + 11) % 49);
          return (
            <motion.div
              key={i}
              animate={{
                height: isPlaying ? [12, wavePeak, 12] : 16,
              }}
              transition={{
                duration: 0.6 + (i % 5) * 0.1,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className={cn(
                "w-1.5 rounded-full transition-colors",
                isAccent ? "bg-sky-500" : i % 3 === 0 ? "bg-teal-600" : "bg-sky-400"
              )}
            />
          );
        })}
      </div>

      {/* Step by Step Progression Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {VOICE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;

          return (
            <div
              key={step.id}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className={cn(
                "p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between",
                isActive
                  ? "bg-[#2B0D3A] text-white border-[var(--border-brand)] shadow-md scale-102"
                  : isDone
                  ? "bg-[var(--surface-purple)]/60 text-[var(--text-primary)] border-[var(--border-brand)]/30"
                  : "bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[#9B82B5]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn("text-[11px] font-bold uppercase", isActive ? "text-[var(--text-accent)]" : "text-[var(--text-link)]")}>
                  Step {idx + 1}
                </span>
                <Icon className={cn("w-4 h-4", isActive ? "text-[#FCE7F3]" : "text-[var(--text-link)]")} />
              </div>
              <p className="text-xs font-bold leading-tight font-sora">{step.label}</p>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-5 rounded-xl bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface-purple)] border border-[var(--border-default)]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[var(--text-link)] font-sora uppercase tracking-wide">
            {VOICE_STEPS[currentStep].title}
          </span>
          <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
            Processing latency: &lt; 180ms
          </span>
        </div>
        <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed bg-[var(--surface-1)] p-3.5 rounded-lg border border-[var(--border-default)] shadow-2xs">
          {VOICE_STEPS[currentStep].detail}
        </p>
      </motion.div>
    </div>
  );
};
