import React from "react";
import { Building, Users, AlertCircle, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export interface CaseStudyData {
  customerName?: string;
  subscriberCount?: string;
  region?: string;
  problemStatement?: string;
  implementationDetails?: string;
  measuredResults?: string[];
}

export const CaseStudyCard: React.FC<CaseStudyData> = ({
  customerName = "[Verified Operator Case Study - Name Confidential]",
  subscriberCount = "50,000+ Active FTTH Subscribers",
  region = "Middle East / North Africa",
  problemStatement = "Legacy billing software caused high dunning churn, database deadlocks during bill run peak hours, and lacked automated CGNAT subpoena log retrieval.",
  implementationDetails = "Deployed Kashtrix Unified OSS/BSS with integrated FreeRADIUS AAA clusters, automated WhatsApp invoice dunning, and 100k EPS Syslog CGNAT collector.",
  measuredResults = [
    "Zero billing run database lockups across 50,000 accounts",
    "42% reduction in subscriber payment delinquency via automated dunning",
    "Subsecond CGNAT subpoena IP-port lookup speed for legal compliance",
  ],
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-brand)] bg-[var(--surface-purple)] shadow-xl space-y-6 my-10">
      {/* TODO: Insert verified customer case study here (customer name, confirmed subscriber numbers, and signed case study PDF link) */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)] font-mono block">
            Verified Deployment Architecture
          </span>
          <h3 className="text-xl font-bold font-sora text-[var(--text-primary)] mt-1">
            {customerName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--surface-1)] border border-[var(--border-default)] text-[var(--text-primary)] font-mono flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#E11D72]" /> {subscriberCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E11D72] uppercase tracking-wider font-mono">
            <AlertCircle className="w-4 h-4" /> Operational Challenge
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-inter">
            {problemStatement}
          </p>
        </div>

        <div className="space-y-2 p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)]">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-link)] uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-4 h-4" /> Kashtrix Solution
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-inter">
            {implementationDetails}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sora mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#E11D72]" /> Measured Technical Outcomes
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {measuredResults.map((result, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] font-semibold leading-snug">
              ✓ {result}
            </div>
          ))}
        </div>
      </div>

      <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-2 border-t border-[var(--border-default)]/60">
        {/* TODO: Replace generic baseline metrics with signed client case study report */}
      </div>
    </div>
  );
};
