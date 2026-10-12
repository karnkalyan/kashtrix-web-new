import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { MarketingDetailPage } from "@/components/marketing/DetailPageSystem";
import { DETAIL_CONFIGS } from "@/lib/detailConfigs";
import { constructMetadata } from "@/lib/seo";
import { Smartphone, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Kashtrix Field Operations | ISP Field Technician App & Dispatch Management",
  description:
    "Empower ISP field crews with GPS route dispatching, offline mobile barcode/QR CPE scanning, fiber installation tracking, and AI-assisted dispatch scheduling.",
  keywords: [
    "ISP field operations app",
    "telecom technician dispatch software",
    "fiber installation tracking",
    "CPE QR barcode scanning",
    "ISP work order dispatch software",
    "Kashtrix Field Operations",
  ],
  canonical: "https://kashtrix.com/field-operations",
});

export default function FieldOperationsPage() {
  return (
    <SiteShell>
      <MarketingDetailPage config={DETAIL_CONFIGS.fieldOperations} />

      {/* Mobile Apps Showcase Section featuring public/mobile.png */}
      <section className="py-20 bg-[var(--surface-1)] border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
                <Smartphone className="w-4 h-4 text-[#E11D72]" /> Field Crew Mobile Application
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
                Native iOS &amp; Android App <br />
                <span className="text-[#E11D72]">For ISP Field Crews</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-inter">
                Equip your field installers and fiber repair technicians with our offline-capable mobile app. Scan ONT barcodes, run speed tests, capture customer signatures, and transmit sub-meter GPS positions back to the NOC.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)]">
                  <strong className="text-xs font-bold text-[var(--text-primary)] block mb-1">Offline Work Orders</strong>
                  <span className="text-[11px] text-[var(--text-secondary)]">Captures photos &amp; optical readouts without cell coverage.</span>
                </div>
                <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)]">
                  <strong className="text-xs font-bold text-[var(--text-primary)] block mb-1">CPE QR Scanning</strong>
                  <span className="text-[11px] text-[var(--text-secondary)]">Auto-provisions ONT MAC addresses onto OLT ports.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/request-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E11D72] hover:bg-[#FF2E93] text-white font-sora font-bold text-xs shadow-lg shadow-[#E11D72]/25 transition-all"
                >
                  Request Field App Sandbox <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-sm rounded-3xl border border-[var(--border-strong)] p-3 bg-[var(--surface-2)] shadow-2xl overflow-hidden group">
                <Image
                  src="/mobile.png"
                  alt="Kashtrix Mobile App interface for ISP field technicians and dispatchers"
                  width={800}
                  height={1200}
                  quality={95}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
