"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Wifi, PhoneCall, Workflow, UserRoundCheck, Network, KeyRound, Braces, ShieldCheck, ServerCog, Router, Wrench, Activity, RefreshCcw, Bot, BellRing, Siren, TrendingUp, MessagesSquare, Cable, PanelsTopLeft, CalendarClock, ClipboardCheck, RotateCcw, PlugZap, type LucideIcon } from "lucide-react";
import { AUTOMATION_SUBSECTIONS } from "@/lib/constants";

interface AutomationMegaMenuProps {
  onClose: () => void;
}

const NETWORK_ICONS: LucideIcon[] = [UserRoundCheck, Network, KeyRound, Braces, ShieldCheck];
const HARDWARE_ICONS: LucideIcon[] = [ServerCog, Router, Wrench, Activity, RefreshCcw];
const VOICE_ICONS: LucideIcon[] = [Bot, BellRing, Siren, TrendingUp, MessagesSquare, Cable];
const WORKFLOW_ICONS: LucideIcon[] = [PanelsTopLeft, CalendarClock, ClipboardCheck, RotateCcw, PlugZap];
const COLORS = ["#2563EB", "#0891B2", "#0F9F8F", "#6366F1", "#E11D72", "#D97706"];

export const AutomationMegaMenu: React.FC<AutomationMegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-1)] border border-[var(--border-default)] rounded-2xl shadow-2xl shadow-[#2B0D3A]/15 overflow-hidden z-50 max-w-7xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Network Automation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
              <Wifi className="w-4 h-4 text-[var(--text-link)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                Network Automation
              </span>
            </div>
            <ul className="space-y-2">
              {AUTOMATION_SUBSECTIONS.network.map((item, index) => { const ItemIcon = NETWORK_ICONS[index] || Activity; const color = COLORS[index % COLORS.length]; return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                      <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                    </div>
                  </Link>
                </li>
              );})}
            </ul>
          </div>

          {/* Hardware Automation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
              <Cpu className="w-4 h-4 text-[var(--text-link)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                Hardware Automation
              </span>
            </div>
            <ul className="space-y-2">
              {AUTOMATION_SUBSECTIONS.hardware.map((item, index) => { const ItemIcon = HARDWARE_ICONS[index] || Activity; const color = COLORS[(index + 1) % COLORS.length]; return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                      <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                    </div>
                  </Link>
                </li>
              );})}
            </ul>
          </div>

          {/* Voice Automation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
              <PhoneCall className="w-4 h-4 text-[var(--text-accent)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                Voice Automation
              </span>
            </div>
            <ul className="space-y-2">
              {AUTOMATION_SUBSECTIONS.voice.map((item, index) => { const ItemIcon = VOICE_ICONS[index] || Activity; const color = COLORS[(index + 2) % COLORS.length]; return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                      <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                    </div>
                  </Link>
                </li>
              );})}
            </ul>
          </div>

          {/* Workflow Automation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
              <Workflow className="w-4 h-4 text-[var(--text-link)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                Workflow Automation
              </span>
            </div>
            <ul className="space-y-2">
              {AUTOMATION_SUBSECTIONS.workflow.map((item, index) => { const ItemIcon = WORKFLOW_ICONS[index] || Activity; const color = COLORS[(index + 3) % COLORS.length]; return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                      <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                    </div>
                  </Link>
                </li>
              );})}
            </ul>
          </div>
        </div>

        {/* Featured Panel */}
        <div className="md:col-span-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--surface-purple)] text-[var(--text-link)]">
              Multi-Vendor Core
            </span>
            <h4 className="text-base font-bold text-[var(--text-primary)] font-sora">
              Create automation for any supported platform
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drag-and-drop actions, pre-commit validation regex, and rollback loops for over 450 network vendor operating systems.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/network-automation"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Explore Automation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
