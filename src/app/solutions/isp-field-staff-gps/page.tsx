import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Navigation, Users, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "ISP Field Staff GPS Tracking & Mobile Work Order Software | Kashtrix",
  description: "Field staff GPS tracking and dispatch management software for ISPs. Coordinate installation technicians, fiber repair teams, real-time location routing, and mobile work order completion.",
  keywords: [
    "ISP field staff GPS tracking",
    "telecom field technician software",
    "ISP work order dispatch",
    "FTTH installer tracking",
    "field staff mobile app ISP",
    "ISP dispatch software",
    "technician location tracking"
  ],
  canonical: "https://kashtrix.com/solutions/isp-field-staff-gps",
});

const FAQS = [
  {
    question: "How does Kashtrix track field technician GPS locations?",
    answer: "Field technicians run the Kashtrix Field Mobile App (iOS/Android), which securely transmits location updates during active working shifts with operator-configurable privacy controls and battery optimization."
  },
  {
    question: "Can dispatchers automatically assign work orders based on proximity?",
    answer: "Yes. Kashtrix smart dispatch engine analyzes technician skills, current inventory, and real-time GPS proximity to automatically assign ticket urgent requests or fiber repair jobs."
  },
  {
    question: "Does the field app support offline mode when underground or out of coverage?",
    answer: "Yes. Work order details, optical power readouts, photo attachments, and customer signatures can be captured offline and automatically sync once mobile data or Wi-Fi reconnects."
  }
];

export default function FieldStaffGPSPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    { name: "ISP Field Staff GPS Tracking", href: "/solutions/isp-field-staff-gps" }
  ]);
  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
              <span>/</span>
              <Link href="/field-operations" className="hover:text-[var(--text-primary)]">Field Operations</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">Field Staff GPS</span>
            </nav>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Navigation className="w-3.5 h-3.5" /> Fleet & Dispatch Automation
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              ISP Field Staff GPS Tracking & Work Order Software
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Optimize field operations for broadband installers, fiber splice crews, and wireless technicians. Track real-time GPS locations, route field staff efficiently, streamline ONT provisioning proof-of-install, and eliminate dispatch bottlenecks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">
                Request Field Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/field-operations" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all">
                Field Operations Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Mobile App Showcase Section featuring public/mobile.png */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
                  Native iOS &amp; Android Field App
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                  Kashtrix Mobile App for Field Crews &amp; Technicians
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Empower field crews with offline barcode scanning, optical power test capture, route optimization, CPE QR activation, and instant dispatch sync.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-primary)]">
                    📱 Offline Mode Supported
                  </span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-primary)]">
                    📡 GPS Sub-Meter Accuracy
                  </span>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative max-w-sm rounded-3xl border border-[var(--border-strong)] p-3 bg-[var(--surface-2)] shadow-2xl overflow-hidden">
                  <Image
                    src="/mobile.png"
                    alt="Kashtrix Field Operations Mobile App Interface"
                    width={800}
                    height={1200}
                    quality={95}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Streamlining Broadband Field Service</h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Managing field teams for home fiber installations, wireless CPE alignments, and emergency repairs requires total visibility. Without integrated GPS tracking and dispatch automation, dispatchers waste hours calling technicians for status updates while customers wait through vague multi-hour arrival windows.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Kashtrix connects field technicians with CRM subscriber records, inventory balances, and network provisioning in real time. Dispatchers see live technician positions on a map while field staff receive optimized routes directly on their smartphones.
            </p>
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">Key Capabilities for Field Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Live GPS Tracking & Geofencing",
                  desc: "Monitor active technician locations, travel history, and geofenced site arrival/departure alerts automatically."
                },
                {
                  icon: Navigation,
                  title: "Intelligent Work Order Routing",
                  desc: "Automatically sequence installation jobs based on geographic density, traffic patterns, technician certifications, and truck stock."
                },
                {
                  icon: CheckCircle2,
                  title: "Mobile Proof of Installation",
                  desc: "Capture optical power test results, barcode scans of CPE/ONT serial numbers, speed test validation, and customer sign-off signatures."
                },
                {
                  icon: Users,
                  title: "Inventory & Truck Stock Sync",
                  desc: "Deduct installed ONTs, routers, fiber patch cords, and splitters from technician truck inventory in real time as jobs are completed."
                }
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3">
                  <item.icon className="w-6 h-6 text-[var(--text-link)]" />
                  <h3 className="text-base font-bold font-sora">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Explore Related Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Field Operations", href: "/field-operations", desc: "Work orders & technician dispatch" },
                { label: "Inventory Management", href: "/inventory", desc: "Truck stock & warehouse control" },
                { label: "Fiber GIS Mapping", href: "/solutions/fiber-gis-olt-ont-splitter", desc: "Geospatial fiber topology" }
              ].map((link) => (
                <Link key={link.href} href={link.href} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all">
                  <span className="text-sm font-bold block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl font-bold font-sora">Empower Your Field Technicians</h2>
            <p className="text-sm text-[var(--text-secondary)]">Experience Kashtrix Field Staff GPS tracking and mobile work order automation.</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
