"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Mail } from "lucide-react";

interface FinalCTAProps {
  onRequestDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRequestDemo }) => {
  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-white relative overflow-hidden border-t border-[var(--border-default)]">
      {/* Background Flowing Line Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 400" fill="none" className="w-full h-full">
          <path
            d="M-100 200 C 300 200, 500 50, 800 50 C 1100 50, 1300 350, 1600 350"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M-100 300 C 400 300, 600 150, 900 150 C 1200 150, 1350 250, 1600 250"
            stroke="#EC4899"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Two Products. One Platform.
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-sora leading-tight tracking-tight">
          Ready to modernize your ISP operations<br className="hidden sm:block" /> with AI-powered OSS/BSS?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Schedule a live simulation tailored to your subscriber count and multi-vendor hardware. See how Kashtrix eliminates operational friction in under 60 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-sora font-bold text-sm hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-2xl flex items-center justify-center gap-2.5 group"
          >
            <span>Request Custom Sandbox Demo</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="mailto:info@kashtrix.com"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-sora font-bold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Mail className="w-4 h-4 text-cyan-400" /> Email info@kashtrix.com
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#E8DFF0]/90">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--text-accent)]" />
            <span>60-Day Risk-Free Migration Blueprint</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--text-accent)]" />
            <span>Zero Subscriber Downtime Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--text-accent)]" />
            <span>Dedicated Tier-1 Architect Assigned</span>
          </div>
        </div>
      </div>
    </section>
  );
};
