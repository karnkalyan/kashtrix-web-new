"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Headset,
  CreditCard,
  Activity,
  DollarSign,
  Briefcase,
  PhoneCall,
  Cpu,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AI_AGENTS_LIST } from "@/lib/constants";
import { AITaskFlow } from "./AITaskFlow";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Headset,
  CreditCard,
  Activity,
  DollarSign,
  Briefcase,
  PhoneCall,
  Cpu,
};

export const AIAgents: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AI_AGENTS_LIST[3].id); // Default to NOC AI

  return (
    <section className="w-full bg-[var(--surface-1)] py-20 text-[var(--text-primary)] dark:bg-[var(--page-bg)] dark:text-white md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-pink)] text-[var(--text-accent)]">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous Workforce
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            AI Agents for ISP Network Operations, Billing &amp; Customer Support
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Kashtrix AI Agents aren&apos;t generic chatbots. They are specialized domain experts trained on telecom RFC standards, optical engineering formulas, and real-time OSS/BSS schemas.
          </p>
        </div>

        {/* Tab Selector Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {AI_AGENTS_LIST.map((agent) => {
            const Icon = ICON_MAP[agent.icon] || Activity;
            const isActive = activeTab === agent.id;

            return (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-semibold font-inter transition-colors duration-200 flex items-center gap-2 border border-transparent",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-[var(--surface-2)] text-[var(--text-primary)] border-[var(--border-default)] hover:bg-[var(--surface-purple)] dark:border-[var(--border-default)] dark:bg-[var(--surface-1)] dark:text-white dark:hover:bg-[var(--surface-2)]"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-[#FCE7F3]" : "text-[var(--text-link)]")} />
                <span>{agent.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D72]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Agent Overview Box */}
        <div className="mb-14">
          {AI_AGENTS_LIST.map((agent) => {
            if (agent.id !== activeTab) return null;
            const Icon = ICON_MAP[agent.icon] || Activity;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="pink-glow-card grid grid-cols-1 items-center gap-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 shadow-sm dark:border-[var(--border-brand)] dark:bg-[var(--surface-1)] md:grid-cols-12 md:p-8"
              >
                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-sora text-[var(--text-primary)]">{agent.title}</h3>
                      <span className="text-xs font-semibold text-[var(--text-link)] uppercase tracking-wider">
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                    {agent.description} Operates 24/7/365 across multiple regional data centers, verifying network changes before commit to ensure zero customer downtime.
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center border-t md:border-t-0 md:border-l border-[var(--border-default)] pt-4 md:pt-0 md:pl-6 space-y-2">
                  <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Primary Impact Metric</span>
                  <span className="text-2xl md:text-3xl font-bold font-space text-[var(--text-accent)]">
                    {agent.metrics}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)]">Verified across 500k+ circuits</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Embedded AITaskFlow */}
        <AITaskFlow key={activeTab} agentId={activeTab} />
      </div>
    </section>
  );
};
