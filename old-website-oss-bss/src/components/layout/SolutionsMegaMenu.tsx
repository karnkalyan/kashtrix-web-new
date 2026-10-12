"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Target, Users2, Wifi, Cable, RadioTower, Tv, PhoneCall, ServerCog, CircleDollarSign, ReceiptText, Activity, Headset, CreditCard, MapPinned, Network, Landmark, BadgeDollarSign, LifeBuoy, TrendingUp, Wrench, BriefcaseBusiness, type LucideIcon } from "lucide-react";
import { SOLUTIONS_MEGA } from "@/lib/constants";

interface SolutionsMegaMenuProps {
  onClose: () => void;
}
const PROVIDER_ICONS: LucideIcon[] = [Wifi, Cable, RadioTower, Tv, PhoneCall, ServerCog];
const NEED_ICONS: LucideIcon[] = [CircleDollarSign, ReceiptText, Activity, Headset, CreditCard, MapPinned];
const TEAM_ICONS: LucideIcon[] = [Network, Landmark, BadgeDollarSign, LifeBuoy, TrendingUp, Wrench, BriefcaseBusiness];
const COLORS = ["#2563EB", "#0891B2", "#6366F1", "#E11D72", "#0F9F8F", "#D97706", "#4A1B7A"];

export const SolutionsMegaMenu: React.FC<SolutionsMegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-1)] border border-[var(--border-default)] rounded-2xl shadow-2xl shadow-[#2B0D3A]/15 overflow-hidden z-50 max-w-7xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* By Provider Type */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
            <Building2 className="w-4 h-4 text-[var(--text-link)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
              By Provider Type
            </span>
          </div>
          <ul className="space-y-3">
            {SOLUTIONS_MEGA.providerType.map((item, index) => { const ItemIcon = PROVIDER_ICONS[index]; const color = COLORS[index]; return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group block p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                    <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-1">{item.desc}</p>
                </Link>
              </li>
            );})}
          </ul>
        </div>

        {/* By Business Need */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
            <Target className="w-4 h-4 text-[var(--text-link)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
              By Business Need
            </span>
          </div>
          <ul className="space-y-3">
            {SOLUTIONS_MEGA.businessNeed.map((item, index) => { const ItemIcon = NEED_ICONS[index]; const color = COLORS[(index + 1) % COLORS.length]; return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group block p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                    <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-1">{item.desc}</p>
                </Link>
              </li>
            );})}
          </ul>
        </div>

        {/* By Team */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-default)]">
            <Users2 className="w-4 h-4 text-[var(--text-accent)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora">
              By Team
            </span>
          </div>
          <ul className="space-y-3">
            {SOLUTIONS_MEGA.byTeam.map((item, index) => { const ItemIcon = TEAM_ICONS[index]; const color = COLORS[(index + 2) % COLORS.length]; return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group block p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--text-link)]">
                    <span className="flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-1">{item.desc}</p>
                </Link>
              </li>
            );})}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
