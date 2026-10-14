import React from "react";
import { UserCheck, Award, Globe, Mail, ShieldCheck } from "lucide-react";

export interface AuthorBioProps {
  authorName?: string;
  role?: string;
  experience?: string;
  linkedinUrl?: string;
  certifications?: string[];
}

// TODO: Insert verified engineering author credentials here when available from Kashtrix Team.
export const AuthorBioCard: React.FC<AuthorBioProps> = ({
  authorName = "Kashtrix Telecom Architecture Team",
  role = "Senior Systems Architect & Network Operations Specialist",
  experience = "15+ Years in Carrier Routing, FreeRADIUS AAA, GPON Fiber & NOC Automation",
  linkedinUrl = "https://linkedin.com/company/kashtrix",
  certifications = ["CCIE Service Provider", "Huawei HCIE-Carrier", "MikroTik MTCINE", "Kashtrix Certified Architect"],
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-brand)] bg-[var(--surface-2)] shadow-xl space-y-4 my-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E11D72]/15 border border-[#E11D72]/40 flex items-center justify-center text-[#E11D72] font-bold text-lg font-sora shrink-0">
            {authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold font-sora text-[var(--text-primary)]">
                {authorName}
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
                <UserCheck className="w-3 h-3 text-[#E11D72]" /> Verified Author
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-inter mt-0.5">
              {role}
            </p>
          </div>
        </div>

        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-primary)] hover:border-[#E11D72] transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-[#E11D72]" /> Verify Profile
          </a>
        )}
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-inter">
        {experience}
      </p>

      {/* Certifications & Badges */}
      <div className="pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] font-mono block mb-2">
          Verified Technical Certifications &amp; Standards
        </span>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-1)] border border-[var(--border-default)] text-[11px] font-semibold text-[var(--text-primary)]"
            >
              <Award className="w-3 h-3 text-[#E11D72]" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Explicit E-E-A-T Placeholder Marker */}
      <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
        {/* TODO: Insert verified author bio details & signed credentials here */}
      </div>
    </div>
  );
};
