"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AI_AGENTS_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AIAgentsMegaMenuProps {
  onClose: () => void;
}

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
const AGENT_COLORS = ["#2563EB", "#0EA5E9", "#E11D72", "#4A1B7A", "#D97706", "#6366F1", "#0F9F8F", "#EA6A20"];

export const AIAgentsMegaMenu: React.FC<AIAgentsMegaMenuProps> = ({ onClose }) => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-1)] border border-[var(--border-default)] rounded-2xl shadow-2xl shadow-[#2B0D3A]/15 overflow-hidden z-50 max-w-7xl mx-auto p-6"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--text-accent)]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
            Autonomous Telecom Employees
          </span>
        </div>
        <Link
          href="/ai-agents"
          onClick={onClose}
          className="text-xs font-bold text-[var(--text-link)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
        >
          Explore All 8 AI Agents <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AI_AGENTS_LIST.map((agent, index) => {
          const Icon = ICON_MAP[agent.icon] || Activity;
          const isHovered = hoveredAgent === agent.id;
          const color = AGENT_COLORS[index];

          return (
            <Link
              key={agent.id}
              href={`/ai-agents#${agent.id}`}
              onClick={onClose}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              className={cn(
                "p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between",
                isHovered
                  ? "bg-[var(--surface-2)] border-[var(--border-brand)] -translate-y-0.5 shadow-md"
                  : "bg-[var(--surface-1)] border-[var(--border-default)]"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2 rounded-lg transition-transform group-hover:scale-110" style={{ backgroundColor: `${color}18`, color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {/* Small animated node on hover */}
                  <span className="relative flex items-center justify-center">
                    {isHovered && (
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-[#E11D72] animate-ping opacity-75" />
                    )}
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        isHovered ? "bg-[#E11D72]" : "bg-[#9B82B5]/50"
                      )}
                    />
                  </span>
                </div>
                <h5 className="text-xs font-bold text-[var(--text-primary)] font-sora">{agent.title}</h5>
                <p className="text-[11px] font-semibold text-[var(--text-link)] mb-1">{agent.role}</p>
                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-[var(--border-default)]/60 flex items-center justify-between text-[10px] font-bold text-[var(--text-accent)]">
                <span>{agent.metrics}</span>
                <ArrowRight className="w-3 h-3 text-[var(--text-link)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
