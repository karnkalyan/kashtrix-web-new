"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Server, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_CARDS = [
  {
    id: "system",
    title: "Every System",
    description: "OSS, BSS, CRM, Network, Support, Billing, Automation, Payments, and Analytics.",
    icon: Server,
    color: "#2B0D3A",
  },
  {
    id: "platform",
    title: "One Platform",
    description: "Unify infrastructure, customers, teams, workflows, and data into a single operational core.",
    icon: Layers,
    color: "#4A1B7A",
  },
  {
    id: "possibilities",
    title: "Limitless Possibilities",
    description: "Automate, predict, integrate, and scale with AI-powered multi-vendor operations.",
    icon: Sparkles,
    color: "#E11D72",
  },
];

export const TrustStrip: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="w-full py-12 bg-[var(--surface-1)] border-y border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUST_CARDS.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={cn(
                  "p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between bg-[var(--surface-1)]",
                  isHovered
                    ? "border-[var(--border-brand)] -translate-y-1 shadow-lg shadow-[#2B0D3A]/10"
                    : "border-[var(--border-default)]"
                )}
              >
                {/* Mini Logo Flowing Line SVG embedded inside each card */}
                <div className="absolute top-0 right-0 left-0 h-16 pointer-events-none opacity-40 overflow-hidden">
                  <svg viewBox="0 0 400 60" fill="none" className="w-full h-full">
                    <path
                      d="M-20 40 C 80 40, 120 10, 220 10 C 320 10, 360 50, 420 50"
                      stroke={card.id === "possibilities" ? "#E11D72" : "#4A1B7A"}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {isHovered && (
                      <motion.circle
                        r="4"
                        fill={card.id === "possibilities" ? "#E11D72" : "#2B0D3A"}
                        animate={{
                          offsetDistance: ["0%", "100%"],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          offsetPath: "path('M-20 40 C 80 40, 120 10, 220 10 C 320 10, 360 50, 420 50')",
                        }}
                      />
                    )}
                  </svg>
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[var(--surface-purple)] text-[var(--text-link)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.id === "possibilities" && (
                      <span className="w-2 h-2 rounded-full bg-[#E11D72] animate-ping" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-sora text-[var(--text-primary)] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
