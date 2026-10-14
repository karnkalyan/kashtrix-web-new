"use client";

import React from "react";
import { PhoneCall, Volume2, CheckCircle2, Sparkles } from "lucide-react";
import { VoiceWaveAnimation } from "@/components/visual/VoiceWaveAnimation";

const USE_CASES = [
  { title: "Payment Reminder Calls", desc: "Automated courtesy calls with IVR keypad or instant SMS Stripe pay links for past-due balances." },
  { title: "Outage Notifications", desc: "Proactive broadcast calls alerting subscribers to scheduled fiber drop maintenance or storm repairs." },
  { title: "Support Technical Calls", desc: "Human-like conversational AI diagnosing GPON loss of signal and rebooting CPE routers over the phone." },
  { title: "Lead & Package Follow-Up", desc: "Autonomous sales qualification calls checking fiber availability and booking installation windows." },
  { title: "Customer CSAT Surveys", desc: "Post-repair voice feedback collection automatically updating NPS scores in the customer CRM." },
  { title: "Installation Scheduling", desc: "Automated appointment confirmations with field technicians via natural speech dialogue." },
];

export const VoiceAutomation: React.FC = () => {
  return (
    <section className="w-full py-20 md:py-28 bg-[var(--surface-2)] border-t border-[var(--border-default)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-pink)] text-[var(--text-accent)]">
            <Sparkles className="w-3.5 h-3.5" /> Conversational Voice AI
          </span>
          <h2 className="section-heading text-[var(--text-primary)]">
            AI-powered voice automation for telecom operations.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Connect Kashtrix Voice AI directly to your existing Asterisk, Yeastar, or carrier SIP trunks. Conduct thousands of natural telephone interactions simultaneously without scaling call center overhead.
          </p>
        </div>

        {/* Embedded Voice Wave Interactive Animation */}
        <div className="mb-16">
          <VoiceWaveAnimation />
        </div>

        {/* Voice AI Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] hover:border-[var(--border-brand)] transition-all duration-300 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-link)] font-sora">
                  Voice Campaign
                </span>
                <PhoneCall className="w-4 h-4 text-[var(--text-accent)]" />
              </div>
              <h3 className="text-base font-bold font-sora text-[var(--text-primary)]">{uc.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
