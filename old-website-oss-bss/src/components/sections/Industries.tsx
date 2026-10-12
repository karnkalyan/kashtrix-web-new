import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Building2, Cable, CheckCircle2, CircleDollarSign,
  CloudCog, Gauge, Headset, MapPinned, Network, PhoneCall, Radio,
  Router, Server, ShieldCheck, Smartphone, TicketCheck, UsersRound,
  Wifi, Workflow, Wrench, type LucideIcon,
} from "lucide-react";
import { OSS_BSS_ASSETS, SERVICE_ACCENTS, type ServiceAccent } from "@/lib/marketing";

type Industry = {
  id: string; title: string; eyebrow: string; description: string; icon: LucideIcon;
  accent: ServiceAccent; image: string; imageAlt: string; benefit: string;
  features: Array<{ title: string; description: string; icon: LucideIcon }>;
  workflow: string[];
};

const INDUSTRIES: Industry[] = [
  {
    id: "isps", title: "Internet service providers", eyebrow: "ISP operating system", accent: "isp", icon: Wifi,
    description: "Unify subscriber authentication, network service, billing, support, and field activity without replacing every system at once.",
    image: OSS_BSS_ASSETS.ossOverview, imageAlt: "Kashtrix real-time ISP operations dashboard", benefit: "One shared operating context from network event to customer outcome.",
    features: [
      { title: "Subscriber and AAA control", description: "Coordinate sessions, service policy, and subscriber context across the access network.", icon: Router },
      { title: "Network operations", description: "Connect topology, alarms, capacity, and service health for NOC teams.", icon: Network },
      { title: "Revenue journeys", description: "Link plans, invoices, payments, collections, and service policy.", icon: CircleDollarSign },
      { title: "Care and field work", description: "Turn customer and network events into owned support and technician tasks.", icon: Headset },
    ],
    workflow: ["Connect network signals", "Add subscriber context", "Apply service policy", "Coordinate teams", "Confirm the outcome"],
  },
  {
    id: "msp", title: "Managed service providers", eyebrow: "Multi-client operations", accent: "msp", icon: Building2,
    description: "Operate distinct client environments through a repeatable service model with clear tenant context, SLA workflows, and accountable delivery.",
    image: OSS_BSS_ASSETS.support, imageAlt: "Kashtrix support ticket workflow for managed service providers", benefit: "Standardized delivery that still preserves each client’s operational context.",
    features: [
      { title: "Tenant-aware operations", description: "Organize customers, services, sites, assets, and work with clear boundaries.", icon: UsersRound },
      { title: "SLA workflow", description: "Prioritize incidents and service tasks around customer commitments.", icon: Gauge },
      { title: "Service desk context", description: "Give agents network, asset, commercial, and interaction history together.", icon: TicketCheck },
      { title: "Managed automation", description: "Reuse controlled runbooks across devices, sites, and customer environments.", icon: CloudCog },
    ],
    workflow: ["Receive service signal", "Identify tenant impact", "Apply SLA policy", "Execute runbook", "Report completion"],
  },
  {
    id: "ftth", title: "FTTH and GPON operators", eyebrow: "Fiber operations", accent: "fiber", icon: Cable,
    description: "Connect fiber topology, OLT operations, equipment lifecycle, activation, and outage response.", image: OSS_BSS_ASSETS.oltManagement, imageAlt: "Kashtrix OLT management application", benefit: "A clearer path from physical access infrastructure to active service.",
    features: [
      { title: "OLT workflows", description: "Coordinate access hardware and activation operations.", icon: Server },
      { title: "Fiber context", description: "Relate network topology, assets, and affected services.", icon: Cable },
      { title: "Device lifecycle", description: "Track customer equipment from stock to installation.", icon: Router },
    ], workflow: ["Map infrastructure", "Qualify service", "Provision access", "Verify device", "Monitor health"],
  },
  {
    id: "wireless", title: "Wireless operators", eyebrow: "WISP operations", accent: "wireless", icon: Radio,
    description: "Coordinate tower health, sector capacity, subscriber policy, field response, and customer communication.", image: OSS_BSS_ASSETS.fiberMap, imageAlt: "Kashtrix network map application", benefit: "Operational context that travels from remote site to support desk.",
    features: [
      { title: "Site visibility", description: "Organize tower, link, and service health context.", icon: Radio },
      { title: "Capacity policy", description: "Coordinate subscriber and network policy decisions.", icon: Gauge },
      { title: "Field dispatch", description: "Convert site issues into prioritized mobile work.", icon: MapPinned },
    ], workflow: ["Observe site", "Assess impact", "Adjust policy", "Dispatch field team", "Verify recovery"],
  },
  {
    id: "cable", title: "Cable operators", eyebrow: "Broadband assurance", accent: "support", icon: Smartphone,
    description: "Bring access-network health, subscriber service, device context, and incident workflows into one operating rhythm.", image: OSS_BSS_ASSETS.tr069, imageAlt: "Kashtrix remote device management application", benefit: "Fewer handoff gaps between plant, device, service, and care teams.",
    features: [
      { title: "Device operations", description: "Connect remote equipment context and controlled actions.", icon: Smartphone },
      { title: "Service assurance", description: "Prioritize operational signals by subscriber impact.", icon: ShieldCheck },
      { title: "Work coordination", description: "Move issues between NOC, care, and field teams.", icon: Workflow },
    ], workflow: ["Capture signal", "Add service context", "Prioritize impact", "Coordinate response", "Close incident"],
  },
  {
    id: "voip", title: "VoIP and SIP providers", eyebrow: "Voice service operations", accent: "bss", icon: PhoneCall,
    description: "Connect voice platforms with subscriber, support, revenue, and communication workflows.", image: OSS_BSS_ASSETS.voice, imageAlt: "Kashtrix PBX and voice management application", benefit: "Voice operations grounded in customer and commercial context.",
    features: [
      { title: "PBX connectivity", description: "Relate trunks, extensions, and service operations.", icon: PhoneCall },
      { title: "Customer context", description: "Give teams relevant subscriber and account history.", icon: UsersRound },
      { title: "Response workflow", description: "Coordinate communication, support, and follow-up.", icon: Headset },
    ], workflow: ["Connect voice system", "Capture event", "Resolve identity", "Trigger workflow", "Review result"],
  },
];

function IndustrySection({ industry, index }: { industry: Industry; index: number }) {
  const colors = SERVICE_ACCENTS[industry.accent];
  const Icon = industry.icon;
  const imageFirst = index % 2 === 1;
  return (
    <section id={industry.id} className="scroll-mt-28 border-t border-[var(--border-default)] bg-[var(--surface-1)] py-12 sm:py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12">
          <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : ""}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-2)] px-2.5 py-1 sm:px-3 sm:py-1.5 font-poppins text-[10px] sm:text-xs font-semibold uppercase tracking-[.12em]" style={{ color: colors.primary }}><Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{industry.eyebrow}</span>
            <h2 className="mt-4 sm:mt-5 font-poppins text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">{industry.title}</h2>
            <p className="mt-3 sm:mt-4 font-inter text-sm sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">{industry.description}</p>
            <div className="mt-6 flex gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: colors.primary }} /><p className="font-inter text-sm font-semibold leading-6 text-[var(--text-primary)]">{industry.benefit}</p></div>
            <Link href="/request-demo" className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-inter text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5" style={{ background: colors.gradient }}>Explore this solution <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : ""}`}>
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--surface-2)] p-2 shadow-[var(--shadow-lg)] sm:p-3"><div className="relative overflow-hidden rounded-2xl"><Image src={industry.image} alt={industry.imageAlt} width={1920} height={1200} sizes="(max-width: 1024px) 100vw, 56vw" className="w-full h-auto object-contain" /></div></div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {industry.features.map(({ title, description, icon: FeatureIcon }, featureIndex) => <article key={title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)] p-4 sm:p-5" style={{ borderTopColor: featureIndex === 0 ? colors.primary : featureIndex === 1 ? colors.secondary : ["#6366F1", "#D97706"][featureIndex - 2], borderTopWidth: 2 }}><FeatureIcon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: featureIndex % 2 ? colors.secondary : colors.primary }} /><h3 className="mt-3 sm:mt-4 font-poppins text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{title}</h3><p className="mt-1.5 sm:mt-2 font-inter text-[10px] sm:text-xs leading-4 sm:leading-5 text-[var(--text-secondary)]">{description}</p></article>)}
        </div>
        <ol className="mt-4 sm:mt-6 grid gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-2)] p-3 sm:p-4 grid-cols-2 sm:grid-cols-5">
          {industry.workflow.map((step, stepIndex) => <li key={step} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-3 sm:p-4 text-[var(--text-primary)] shadow-xs"><span className="font-roboto text-[10px] font-bold text-[var(--text-tertiary)]">0{stepIndex + 1}</span><p className="mt-1.5 sm:mt-2 font-poppins text-[10px] sm:text-xs font-semibold text-[var(--text-primary)]">{step}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <div className="bg-[var(--page-bg)]">
      <section className="py-12 sm:py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"><span className="font-poppins text-[10px] sm:text-xs font-semibold uppercase tracking-[.14em] text-[var(--text-link)]">Provider solutions</span><h2 className="section-heading mt-3 text-2xl sm:text-3xl md:text-4xl">A telecom operating model shaped around your network.</h2><p className="mt-3 sm:mt-4 font-inter text-xs sm:text-sm leading-6 sm:leading-7 text-[var(--text-secondary)]">Start with the operational outcome that matters, then connect the network and business capabilities required to deliver it.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => { const Icon = industry.icon; const colors = SERVICE_ACCENTS[industry.accent]; return <a key={industry.id} href={`#${industry.id}`} className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]" style={{ borderTopColor: colors.primary, borderTopWidth: 2 }}><span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: colors.soft, color: colors.primary }}><Icon className="h-5 w-5" /></span><h3 className="mt-4 font-poppins text-base font-semibold text-[var(--text-primary)]">{industry.title}</h3><span className="mt-3 inline-flex items-center gap-1 font-inter text-xs font-semibold" style={{ color: colors.primary }}>View operating model <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></a>; })}
          </div>
        </div>
      </section>
      {INDUSTRIES.map((industry, index) => <IndustrySection key={industry.id} industry={industry} index={index} />)}
    </div>
  );
}
