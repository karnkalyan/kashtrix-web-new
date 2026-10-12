"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Server, Briefcase, Wrench, Sparkles, LayoutDashboard, Antenna, KeyRound, Network, Router, Map, BellRing, Activity, ContactRound, UsersRound, ReceiptText, CreditCard, Package, CircleDollarSign, Landmark, PanelsTopLeft, TicketCheck, MapPinned, PackageSearch, ClipboardList, Gauge, CalendarClock, Smartphone, RefreshCcw, Bot, BrainCircuit, ChartNoAxesCombined, UserMinus, TrendingUp, Siren, BriefcaseBusiness, BookOpenCheck, type LucideIcon } from "lucide-react";
import { PLATFORM_COLUMNS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PlatformMegaMenuProps {
  onClose: () => void;
}

const COLUMN_ICONS = [Server, Briefcase, Wrench, Sparkles];
const ITEM_ICONS: LucideIcon[][] = [
  [LayoutDashboard, Antenna, KeyRound, Network, Router, Map, BellRing, Activity],
  [ContactRound, UsersRound, ReceiptText, CreditCard, Package, CircleDollarSign, Landmark, PanelsTopLeft],
  [TicketCheck, MapPinned, PackageSearch, ClipboardList, Gauge, CalendarClock, Smartphone, RefreshCcw],
  [Bot, BrainCircuit, ChartNoAxesCombined, UserMinus, TrendingUp, Siren, BriefcaseBusiness, BookOpenCheck],
];
const ITEM_COLORS = ["#4A1B7A", "#2563EB", "#0891B2", "#0F9F8F", "#168A5B", "#D97706", "#E11D72", "#6366F1"];

export const PlatformMegaMenu: React.FC<PlatformMegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-1)] border border-[var(--border-default)] rounded-2xl shadow-2xl shadow-[#2B0D3A]/15 overflow-hidden z-50 max-w-7xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Four Columns Grid */}
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_COLUMNS.map((col, idx) => {
            const Icon = COLUMN_ICONS[idx];
            const isAI = idx === 3;

            return (
              <div key={col.title} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
                  <Icon className={cn("w-4 h-4", isAI ? "text-[var(--text-accent)]" : "text-[var(--text-link)]")} />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
                    {col.title}
                  </span>
                </div>
                <ul className="space-y-2">
                  {col.items.map((item, itemIndex) => {
                    const ItemIcon = ITEM_ICONS[idx]?.[itemIndex] || Activity;
                    const color = ITEM_COLORS[(idx * 2 + itemIndex) % ITEM_COLORS.length];
                    return (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group block p-2 -mx-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                          <span className="flex items-center gap-2">
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md transition-transform group-hover:scale-110" style={{ backgroundColor: `${color}18`, color }}>
                              <ItemIcon className="h-3 w-3" aria-hidden="true" />
                            </span>
                            {item.title}
                          </span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[var(--text-link)]" />
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  );})}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Two Product Cards */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {/* Kashtrix OSS/BSS Card */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[#2B0D3A] to-[#4A1B7A] p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#E11D72]/20 blur-2xl pointer-events-none" />
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/15 text-[#FCE7F3]">
                <Sparkles className="w-3 h-3 text-[var(--text-accent)]" /> Flagship Product
              </span>
              <h4 className="text-sm font-bold font-sora leading-tight">Kashtrix OSS/BSS</h4>
              <p className="text-[11px] text-[#E8DFF0] leading-relaxed">
                Unified telecom operations, billing, CRM, and AI agents in one platform.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/platform" onClick={onClose} className="w-full py-2 px-3 rounded-lg bg-white text-[#2B0F3D] font-sora font-bold text-xs hover:bg-[#F7F2FB] transition-all flex items-center justify-center gap-2 shadow-sm">
                Explore OSS/BSS <ArrowRight className="w-3.5 h-3.5 text-[#4A1B7A]" />
              </Link>
            </div>
          </div>

          {/* Kashtrix Syslog Card */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[#064E3B] to-[#155E75] p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/15 text-cyan-200">
                <Activity className="w-3 h-3 text-cyan-300" /> Standalone Product
              </span>
              <h4 className="text-sm font-bold font-sora leading-tight">Kashtrix Syslog</h4>
              <p className="text-[11px] text-cyan-100 leading-relaxed">
                Carrier-grade syslog collector with CGNAT law compliance archiving.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/syslog" onClick={onClose} className="w-full py-2 px-3 rounded-lg bg-white text-[#064E3B] font-sora font-bold text-xs hover:bg-cyan-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                Explore Syslog <ArrowRight className="w-3.5 h-3.5 text-[#155E75]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
