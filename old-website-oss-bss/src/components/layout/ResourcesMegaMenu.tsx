"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, BookOpen, Terminal, ListChecks, Cpu, Bot, Newspaper, FileChartColumn, Presentation, LifeBuoy, RefreshCcw, Shield, MessagesSquare, type LucideIcon } from "lucide-react";
import { RESOURCES_MEGA } from "@/lib/constants";

interface ResourcesMegaMenuProps {
  onClose: () => void;
}
const RESOURCE_ICONS: LucideIcon[] = [Calculator, BookOpen, Terminal, ListChecks, Cpu, Bot, Newspaper, FileChartColumn, Presentation, LifeBuoy, RefreshCcw, Shield, MessagesSquare];
const RESOURCE_COLORS = ["#E11D72", "#4A1B7A", "#2563EB", "#0891B2", "#0F9F8F", "#E11D72", "#D97706", "#6366F1", "#EA6A20", "#0EA5E9", "#168A5B", "#7C3A9E", "#F05298"];

export const ResourcesMegaMenu: React.FC<ResourcesMegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface-1)] border border-[var(--border-default)] rounded-2xl shadow-2xl shadow-[#2B0D3A]/15 overflow-hidden z-50 max-w-7xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {RESOURCES_MEGA.map((item, index) => {
          const Icon = RESOURCE_ICONS[index];
          const color = RESOURCE_COLORS[index];

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className="group block p-3 rounded-xl border border-[var(--border-default)]/70 hover:border-[var(--border-brand)] hover:bg-[var(--surface-2)] transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md transition-transform group-hover:scale-110" style={{ backgroundColor: `${color}18`, color }}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs font-bold text-[var(--text-primary)] font-sora group-hover:text-[var(--text-link)] transition-colors">
                    {item.title}
                  </h5>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[var(--text-link)] -translate-x-1 group-hover:translate-x-0" />
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-[var(--text-secondary)]">
          Looking for custom integration support? Our NOC solutions architects are available 24/7/365.
        </span>
        <Link
          href="/contact"
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-[#2B0D3A] text-white font-bold hover:bg-[#4A1B7A] transition-colors shrink-0"
        >
          Talk to a Network Architect
        </Link>
      </div>
    </motion.div>
  );
};
