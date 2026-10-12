import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  constructMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  getZeroTouchProvisioningProductSchema,
} from "@/lib/seo";
import {
  Zap,
  UploadCloud,
  Cpu,
  Server,
  Radio,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Zero-Touch ISP Provisioning & ONT Auto-Configuration | Kashtrix",
  description:
    "Automate FTTH subscriber activation with zero-touch ISP provisioning software. Batch ONT file upload, automated TR-069 ACS server, OMCI profile sync, and ONU provisioning engine for Huawei, ZTE, Nokia, BDCOM, and MikroTik OLTs.",
  keywords: [
    "Zero touch ISP zero configuration provisioning software",
    "ONT file upload and auto configuration management system",
    "Automated TR069 ACS server for zero touch subscriber activation",
    "Self provisioning FTTH software with zero touch deployment",
    "Automated ONU provisioning engine for Huawei and ZTE OLT",
    "Nokia ISAM OLT zero touch provisioning",
    "BDCOM GPON EPON auto provisioning",
    "MikroTik PPPoE zero touch provisioning",
    "Cisco Juniper BNG subscriber activation",
  ],
  canonical: "https://kashtrix.com/solutions/zero-touch-provisioning",
});

const FAQS = [
  {
    question: "How does Kashtrix zero-touch ONT provisioning work from box-to-activation?",
    answer:
      "When a field technician plugs an unconfigured ONT into the fiber drop, the OLT detects the optical serial number (e.g. 48575443...). Kashtrix listens to OLT SNMP traps or TR-069 bootstrap events, matches the serial to the CRM subscriber work order, pushes the matching OMCI line/service profiles, and provisions the TR-069 ACS server to configure WAN PPPoE credentials, VLAN tags, and Wi-Fi SSID/WPA3 keys with zero manual typing.",
  },
  {
    question: "Can we bulk-upload existing ONT serials via CSV/Excel spreadsheets?",
    answer:
      "Yes. Kashtrix includes an enterprise ONT file upload and auto-configuration management system. Network teams can upload thousands of ONT serials, MAC addresses, model numbers, and pre-assigned VLANs in CSV/XML format. The engine pre-stages configs across Huawei MA5800, Nokia 7360, ZTE C300/C600, BDCOM, and VSOL OLTs automatically.",
  },
  {
    question: "Which TR-069 / TR-369 USP ACS parameters are automated?",
    answer:
      "Kashtrix ACS automates InternetGatewayDevice (TR-098) and Device (TR-181) data models. It configures WAN IP/PPPoE settings, dual-band Wi-Fi (2.4GHz & 5GHz SSIDs, channels, encryption), LAN DHCP pools, DNS servers, remote management credentials, SIP VoIP accounts, and automated firmware over-the-air (FOTA) upgrades.",
  },
  {
    question: "Does Kashtrix support multi-vendor OLTs simultaneously in the same network?",
    answer:
      "Yes. Kashtrix acts as an abstracted hardware automation layer. You can operate Huawei SmartAX in Region A, Nokia ISAM in Region B, and ZTE / BDCOM in Region C. The provisioning engine translates unified subscriber service intents into vendor-specific CLI, NETCONF, TL1, or RESTCONF commands automatically.",
  },
];

export default function ZeroTouchProvisioningPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Solutions", href: "/solutions" },
    { name: "Zero-Touch Provisioning", href: "/solutions/zero-touch-provisioning" },
  ]);
  const faqSchema = getFAQSchema(FAQS);
  const productSchema = getZeroTouchProvisioningProductSchema();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        {/* Hero Section */}
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
                Zero-Touch Provisioning
              </span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4">
              <Zap className="w-3.5 h-3.5" /> Zero-Configuration Subscriber Activation
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">
              Zero-Touch ISP Provisioning & ONT Auto-Configuration Engine
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Eliminate manual CLI configurations and truck-roll activation delays. Kashtrix connects
              bulk ONT file uploads, multi-vendor OLT auto-discovery (Huawei, Nokia, ZTE, BDCOM,
              MikroTik), automated TR-069 ACS servers, and FreeRADIUS AAA to activate FTTH subscribers
              in under 15 seconds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
              >
                Request Zero-Touch Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions/olt-provisioning"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all"
              >
                OLT Provisioning Docs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Step Zero Touch Pipeline Visual */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                How Zero-Touch FTTH Provisioning Operates
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                From physical fiber splice to live gigabit throughput without touching an OLT terminal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "ONT Auto-Discovery",
                  desc: "Unregistered ONT is detected on PON port via GPON Serial Number (SN) broadcast trap.",
                  icon: Radio,
                },
                {
                  step: "02",
                  title: "CRM & Inventory Match",
                  desc: "Kashtrix queries subscriber work order, verifying plan bandwidth, WAN VLAN, and billing state.",
                  icon: FileSpreadsheet,
                },
                {
                  step: "03",
                  title: "OMCI & OLT Profile Push",
                  desc: "System auto-generates DBA, line-profile, and srv-profile on Huawei, Nokia, ZTE, or BDCOM OLT.",
                  icon: Terminal,
                },
                {
                  step: "04",
                  title: "TR-069 ACS Bootstrap",
                  desc: "ACS server pushes PPPoE credentials, Wi-Fi 6 SSID/password, and DNS to the ONT instantly.",
                  icon: CheckCircle2,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--page-bg)] space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E11D72]">{s.step}</span>
                    <s.icon className="w-5 h-5 text-[var(--text-link)]" />
                  </div>
                  <h3 className="text-sm font-bold font-sora">{s.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sora">
                Engineered for High-Velocity FTTH & WISP Deployments
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Everything required to scale subscriber onboarding from 100 to 500,000+ endpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: UploadCloud,
                  title: "Bulk ONT File Upload & Staging",
                  desc: "Import thousands of ONT MAC/SN barcodes directly from distributor delivery manifests via CSV/Excel. Pre-assign service tiers before hardware leaves the warehouse.",
                },
                {
                  icon: Server,
                  title: "Automated TR-069 / TR-369 ACS",
                  desc: "Carrier-grade ACS server supporting TR-098 and TR-181 data models. Push Wi-Fi channel optimization, PPPoE credentials, remote reboot, and real-time speedtests.",
                },
                {
                  icon: Layers,
                  title: "Multi-Vendor OLT Abstraction",
                  desc: "Full command translation for Huawei SmartAX MA5800/MA5608T, Nokia 7360 ISAM, ZTE C300/C600, BDCOM GP3600, VSOL, DBC, and FiberHome.",
                },
                {
                  icon: Cpu,
                  title: "Self-Provisioning Customer Portal",
                  desc: "Subscribers scan QR code on their ONT box to self-activate their service, pick a plan, complete KYC verification, and bind their MAC in seconds.",
                },
                {
                  icon: Activity,
                  title: "Live Optical Loss Telemetry",
                  desc: "Instantly read Rx/Tx optical power (dBm), temperature, voltage, and bias current right after provisioning to ensure splice quality meets SLA.",
                },
                {
                  icon: ShieldCheck,
                  title: "Automatic Fraud & Rogue ONT Lockout",
                  desc: "Isolate unregistered or unauthorized ONTs broadcasting on PON ports. Prevent rogue ONT lasers from degrading neighbor optical splitters.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3"
                >
                  <f.icon className="w-6 h-6 text-[#E11D72]" />
                  <h3 className="text-base font-bold font-sora">{f.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware Support Matrix */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">
              Supported Multi-Vendor OLT & ONT Hardware Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[var(--border-default)] rounded-xl bg-[var(--page-bg)]">
                <thead className="bg-[var(--surface-2)] text-[var(--text-primary)] font-semibold border-b border-[var(--border-default)]">
                  <tr>
                    <th className="p-3">Vendor</th>
                    <th className="p-3">Supported Models</th>
                    <th className="p-3">Provisioning Protocols</th>
                    <th className="p-3">Zero-Touch Capabilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)] text-[var(--text-secondary)]">
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">Huawei</td>
                    <td className="p-3">SmartAX MA5800, MA5608T, MA5683T</td>
                    <td className="p-3">SSH, SNMP, TL1, NETCONF</td>
                    <td className="p-3">Auto-find ONT, DBA/Line Profile push, Optical Power DB</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">Nokia / Alcatel</td>
                    <td className="p-3">7360 ISAM FX-4, FX-8, FX-16</td>
                    <td className="p-3">CLI, TL1, SNMP, gNMI</td>
                    <td className="p-3">EQPT card config, VLAN cross-connect, ONT uncfg auto-bind</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">ZTE</td>
                    <td className="p-3">C300, C320, C600, C650</td>
                    <td className="p-3">Telnet, SSH, SNMP, Netconf</td>
                    <td className="p-3">Unconfigured ONU discovery, T-CONT & GEM port binding</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">BDCOM</td>
                    <td className="p-3">GP3600, P3310, P3600 EPON/GPON</td>
                    <td className="p-3">CLI SSH, SNMP v2c/v3</td>
                    <td className="p-3">ONU bind, SLA bandwidth policing, loopback detection</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">MikroTik</td>
                    <td className="p-3">CCR2004, CCR2116, CCR2216 BNG</td>
                    <td className="p-3">RouterOS API, SSH, CoA / PoD</td>
                    <td className="p-3">PPPoE server, Queue trees, dynamic IP pool allocation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">ONT / CPE</td>
                    <td className="p-3">Huawei, ZTE, Nokia, TP-Link, Tenda, VSOL, DBC</td>
                    <td className="p-3">TR-069, TR-181, TR-369 USP</td>
                    <td className="p-3">Zero-touch WAN PPPoE, Wi-Fi SSID/PSK, FOTA firmware update</td>
                  </tr>
                </tbody>
              </table>
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

        {/* Related Solutions */}
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-bold font-sora">Explore Related ISP Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Multi-Vendor NMS",
                  href: "/solutions/multi-vendor-device-management-nms",
                  desc: "Single dashboard SNMP & SSH device control",
                },
                {
                  label: "Fiber GIS Mapping",
                  href: "/solutions/fiber-gis-olt-ont-splitter",
                  desc: "Strand-level ODN & optical loss tracking",
                },
                {
                  label: "FreeRADIUS & MikroTik",
                  href: "/solutions/freeradius-mikrotik-billing",
                  desc: "PPPoE, IPoE & AAA billing automation",
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

        {/* CTA Banner */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-sora">
              Ready for Zero-Touch Subscriber Provisioning?
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Schedule an architecture walkthrough and see live Huawei, Nokia, and MikroTik zero-touch
              activation.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all"
            >
              Book Technical Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
