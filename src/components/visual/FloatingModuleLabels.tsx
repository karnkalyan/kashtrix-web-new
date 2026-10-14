"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingModuleLabelsProps {
  className?: string;
}

const LABELS = [
  { text: "OSS", position: "top-4 left-6", delay: 0.1, accent: false },
  { text: "BSS", position: "top-10 right-8", delay: 0.2, accent: false },
  { text: "CRM", position: "bottom-12 left-10", delay: 0.3, accent: false },
  { text: "Billing", position: "top-1/3 left-2", delay: 0.4, accent: false },
  { text: "NOC", position: "top-1/4 right-4", delay: 0.5, accent: false },
  { text: "AI Agents", position: "bottom-8 right-12", delay: 0.6, accent: true },
  { text: "FieldOps", position: "bottom-1/3 left-4", delay: 0.7, accent: false },
  { text: "Analytics", position: "bottom-1/4 right-2", delay: 0.8, accent: false },
  { text: "BNG", position: "top-20 left-1/4", delay: 0.9, accent: false },
  { text: "vBNG", position: "top-16 right-1/4", delay: 1.0, accent: false },
  { text: "OLT/ONT", position: "bottom-20 left-1/3", delay: 1.1, accent: false },
  { text: "Voice AI", position: "bottom-16 right-1/3", delay: 1.2, accent: true },
  { text: "Hardware Automation", position: "top-1/2 left-1", delay: 1.3, accent: false },
  { text: "API Orchestration", position: "top-1/2 right-1", delay: 1.4, accent: false },
];

export const FloatingModuleLabels: React.FC<FloatingModuleLabelsProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-10 hidden md:block", className)}>
      {LABELS.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: item.delay },
            scale: { duration: 0.5, delay: item.delay },
            y: {
              duration: 3.5 + (index % 3),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
          className={cn(
            "absolute px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border shadow-sm transition-colors",
            item.position,
            item.accent
              ? "bg-[#2B0D3A] text-white border-[#E11D72] dark:bg-[var(--surface-purple)]"
              : "bg-[var(--surface-1)]/90 backdrop-blur-md text-[var(--text-primary)] border-[var(--border-default)]"
          )}
        >
          {item.accent && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E11D72] mr-1.5 animate-pulse" />
          )}
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};
