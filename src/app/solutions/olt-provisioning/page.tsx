import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Cable, Network, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "OLT Provisioning Software — Huawei, Nokia & Multi-Vendor | Kashtrix",
  description: "Automate OLT provisioning across Huawei MA5800, Nokia ISAM, ZTE C300/C600 and other GPON/XGS-PON platforms. Manage ONT activation, VLAN assignment and service profiles from one interface.",
  keywords: ["OLT provisioning software", "Huawei OLT provisioning", "Nokia OLT provisioning", "multi-vendor OLT", "GPON provisioning", "ONT activation software", "XGS-PON management"],
  canonical: "https://kashtrix.com/solutions/olt-provisioning",
});

const FAQS = [
  { question: "Which OLT vendors does Kashtrix support?", answer: "Kashtrix supports Huawei SmartAX MA5800 series, Nokia ISAM series, ZTE C300/C600, Calix, and other GPON/XGS-PON OLT platforms via NETCONF, SNMP, TL1 and vendor-specific APIs." },
  { question: "Can Kashtrix auto-discover new ONTs?", answer: "Yes. Kashtrix monitors OLT ports for unregistered ONT serial numbers and can automatically provision them with pre-configured service profiles, VLAN assignments and bandwidth policies based on subscriber plan selection." },
  { question: "How does multi-vendor OLT management work?", answer: "Kashtrix abstracts vendor-specific CLI/API differences behind a unified provisioning interface. Operators define service intent (subscriber plan, speed, VLAN) and Kashtrix translates it into vendor-specific configuration commands." },
];

export default function OLTProvisioningPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "OLT Provisioning", href: "/solutions/olt-provisioning" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6"><Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span><Link href="/hardware-automation" className="hover:text-[var(--text-primary)]">Hardware Automation</Link><span>/</span><span className="text-[var(--text-primary)] font-semibold">OLT Provisioning</span></nav>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><Cable className="w-3.5 h-3.5" /> Multi-Vendor OLT Management</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">OLT Provisioning Software for ISPs</h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">Provision and manage GPON/XGS-PON OLTs from Huawei, Nokia, ZTE and other vendors through one unified interface. Automate ONT activation, service profile assignment, VLAN configuration and optical power monitoring across your entire fiber access network.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request OLT Demo <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/hardware-automation" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3 font-inter text-sm font-semibold hover:-translate-y-0.5 transition-all">Hardware Automation <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div></section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">The Multi-Vendor OLT Challenge</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">ISPs deploying GPON and XGS-PON fiber networks often manage OLTs from multiple vendors — Huawei SmartAX in one region, Nokia ISAM in another, ZTE C300 in new greenfield deployments. Each vendor has different CLI syntax, NETCONF schemas, SNMP MIBs and provisioning workflows. Engineers must learn and maintain expertise across all platforms, leading to configuration inconsistencies and provisioning delays.</p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Kashtrix abstracts these differences behind a unified provisioning layer. Define subscriber intent once — the platform translates it into vendor-specific commands and validates the result.</p>
        </div></section>

        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Supported Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Cable, title: "ONT Auto-Discovery", desc: "Detect unregistered ONT serial numbers on OLT PON ports. Match against pre-orders or stage for manual approval with subscriber context." },
              { icon: Network, title: "Service Profile Management", desc: "Define and deploy service profiles including bandwidth, VLAN tagging, QoS policies, multicast groups and voice service ports across any supported vendor." },
              { icon: Cable, title: "Optical Power Monitoring", desc: "Continuously sample OLT port and ONT RX/TX optical power levels (dBm). Alert on degradation thresholds before subscriber service impact." },
              { icon: Network, title: "Firmware Lifecycle", desc: "Plan and execute ONT firmware upgrades with rollback capabilities. Schedule maintenance windows and track deployment progress across PON ports." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] space-y-3">
                <item.icon className="w-6 h-6 text-[var(--text-link)]" />
                <h3 className="text-base font-bold font-sora">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div></section>

        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
          {FAQS.map((faq) => (<div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0"><h3 className="text-sm font-bold text-[var(--text-primary)]">{faq.question}</h3><p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p></div>))}
        </div></section>

        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">Related Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Hardware Automation", href: "/hardware-automation", desc: "Multi-vendor device management" },
              { label: "Fiber GIS & ONT Mapping", href: "/solutions/fiber-gis-olt-ont-splitter", desc: "Geospatial fiber topology" },
              { label: "Network Automation", href: "/network-automation", desc: "RADIUS, BNG & OLT workflows" },
            ].map((link) => (<Link key={link.href} href={link.href} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] hover:border-purple-500/40 hover:-translate-y-0.5 transition-all"><span className="text-sm font-bold block">{link.label}</span><span className="text-xs text-[var(--text-secondary)] mt-0.5 block">{link.desc}</span></Link>))}
          </div>
        </div></section>

        <section className="py-20 text-center"><div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold font-sora">Automate OLT Provisioning</h2>
          <p className="text-sm text-[var(--text-secondary)]">See multi-vendor OLT management in action with a personalized Kashtrix demo.</p>
          <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link>
        </div></section>
      </main>
    </SiteShell>
  );
}
