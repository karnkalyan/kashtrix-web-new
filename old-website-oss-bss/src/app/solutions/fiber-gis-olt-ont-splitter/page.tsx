import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import {
  MapPin,
  Network,
  Cable,
  Activity,
  Layers,
  ArrowRight,
  Eye,
  Split,
  Route,
  Zap,
  Radio,
  FileSpreadsheet,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Strand-Level Fiber GIS & ODN Splitter Mapping Software | Kashtrix",
  description:
    "Integrated strand-level fiber GIS mapping software for ISPs and FTTH operators. Visualize ODN splitters, fiber optic paths, geospatial cable tracking in OSS/BSS, and live endpoint telemetry synced with CRM billing.",
  keywords: [
    "Integrated strand level fiber GIS mapping software for ISPs",
    "ODN splitters and fiber optic path visualization tool",
    "Geospatial fiber cable network tracking in OSS BSS",
    "Live fiber endpoint tracking and network telemetry mapping",
    "FTTH network design mapping with integrated CRM billing",
    "Fiber splice enclosure management",
    "OTDR break distance GIS overlay",
    "Optical loss budget calculator FTTH",
  ],
  canonical: "https://kashtrix.com/solutions/fiber-gis-olt-ont-splitter",
});

const FAQS = [
  {
    question: "How does strand-level fiber GIS mapping work from central office to customer ONT?",
    answer:
      "Kashtrix models the entire optical distribution network (ODN) at individual fiber strand precision. You can visualize color-coded buffer tubes (TIA/EIA-598 standards), fusion splices inside underground closures, 1:4/1:8 primary splitters, 1:32/1:64 secondary distribution boxes, and drop wires connecting directly to subscriber ONTs.",
  },
  {
    question: "How is live network telemetry and optical loss mapped onto GIS paths?",
    answer:
      "Kashtrix continuously polls SFP optical transmit power and subscriber ONT receive power (dBm) via SNMP/OMCI. If optical attenuation spikes on a particular feeder cable or splitter cluster, Kashtrix color-codes the GIS path (Green = &gt; -22dBm, Yellow = -23 to -26dBm, Red = &lt; -27dBm), immediately pinpointing micro-bends or degraded splices.",
  },
  {
    question: "Can we import Shapefiles, KMZ/KML, and export CAD drawings?",
    answer:
      "Yes. Kashtrix supports bidirectional GIS vector syncing with KML, KMZ, GeoJSON, and ESRI Shapefiles. Outdoor plant assets, poles, manholes, splice closures, and customer drop boundaries can be imported with automatic attribute mapping.",
  },
  {
    question: "How does GIS mapping integrate with CRM subscriber billing and feasibility checks?",
    answer:
      "When sales teams enter a lead address in the CRM, Kashtrix runs an instant GIS feasibility check: calculating the distance to the nearest available optical splitter port, estimating drop cable length, and verifying port availability before generating an automated quote and work order.",
  },
];

export default function FiberGISPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    {
      name: "Fiber GIS & ODN Splitter Mapping",
      href: "/solutions/fiber-gis-olt-ont-splitter",
    },
  ]);
  const faqSchema = getFAQSchema(FAQS);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        {/* Header Section */}
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)]">
                Home
              </Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-[var(--text-primary)]">
                Solutions
              </Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">
                Fiber GIS & ODN Mapping
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <MapPin className="w-3.5 h-3.5" /> Strand-Level Geospatial Intelligence
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Strand-Level Fiber GIS Mapping & ODN Splitter Topology Software
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Design, build, and operate your optical distribution network with micro-precision.
              Visualize individual fiber strands, splice trays, ODN splitters, and live optical power
              telemetry (dBm) seamlessly integrated with OSS/BSS subscriber billing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Schedule GIS Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions/zero-touch-provisioning"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                Zero-Touch Provisioning <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ODN Topology Architecture Flow */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                End-to-End ODN Path & Telemetry Visualization
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                From central office ODF down to last-mile customer optical drop cables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  tier: "Central Office ODF",
                  desc: "High-density optical distribution frames connected to Huawei, Nokia, or ZTE OLT chassis.",
                  icon: Network,
                },
                {
                  tier: "Feeder & Splice Closures",
                  desc: "Strand-level buffer tube tracing (12-288 core) with fusion splice loss calculations.",
                  icon: Cable,
                },
                {
                  tier: "ODN Splitter Trees",
                  desc: "Layered 1:4, 1:8, 1:16, 1:32, and 1:64 balanced and asymmetric PLC splitters.",
                  icon: Split,
                },
                {
                  tier: "Drop & Subscriber ONT",
                  desc: "Last-mile drop cable path connected to CRM customer profile and live Rx optical telemetry.",
                  icon: Radio,
                },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <t.icon className="w-5 h-5 text-[#E11D72]" />
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-secondary)]">
                      Active Telemetry
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-sora">{t.tier}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Enterprise Fiber GIS Capabilities for FTTH Operators
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Replace static CAD files with living, telemetry-driven geospatial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Strand-Level Fiber Core Tracking",
                  desc: "Manage color-coded 12-core buffer tubes, ribbon cables, pigtails, and connector loss budgets across all outdoor closures.",
                },
                {
                  icon: Activity,
                  title: "Live Optical Loss Overlay (dBm)",
                  desc: "Correlate real-time OLT and ONT optical power readings directly onto the GIS map to flag degrading splices before customers drop.",
                },
                {
                  icon: Route,
                  title: "OTDR Fault Triangulation",
                  desc: "Input OTDR reflection distance measurements to pinpoint exact road and pole coordinates of fiber cuts for field splicing crews.",
                },
                {
                  icon: FileSpreadsheet,
                  title: "CRM Feasibility & Splitter Port Capacity",
                  desc: "Sales teams check available splitter capacity and auto-generate installation work orders right from subscriber lead addresses.",
                },
                {
                  icon: Layers,
                  title: "KML / Shapefile Vector Import",
                  desc: "Import utility poles, underground ducts, right-of-way boundaries, and legacy fiber drawings with full attribute mapping.",
                },
                {
                  icon: Zap,
                  title: "Integrated Mobile Splicer App",
                  desc: "Field engineers view closure splice diagrams, update port assignments, and upload optical power test proofs directly from mobile.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3"
                >
                  <item.icon className="w-6 h-6 text-[#E11D72]" />
                  <h3 className="text-base font-bold font-sora">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-2"
                >
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Explore Related Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Zero-Touch Provisioning",
                  href: "/solutions/zero-touch-provisioning",
                  desc: "Automated ONT file upload & activation",
                },
                {
                  label: "Multi-Vendor NMS",
                  href: "/solutions/multi-vendor-device-management-nms",
                  desc: "Unified SNMP & OLT management",
                },
                {
                  label: "Field Staff GPS Dispatch",
                  href: "/solutions/isp-field-staff-gps",
                  desc: "Mobile technician dispatch & tracking",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--page-bg)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-sm font-bold block">{link.label}</span>
                  <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">
                    {link.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-sora">
              Transform Your Physical Fiber Network Visibility
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Request a live demo of Kashtrix Strand-Level Fiber GIS and ODN Splitter Topology Mapping.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Request GIS Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
