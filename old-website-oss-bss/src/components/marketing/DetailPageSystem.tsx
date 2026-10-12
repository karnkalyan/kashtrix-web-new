import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, ImageIcon, PlugZap, ShieldCheck } from "lucide-react";
import { SERVICE_ACCENTS, type ServiceAccent } from "@/lib/marketing";
import { ProductScreenshotFrame } from "./ProductScreenshotFrame";

export { ProductScreenshotFrame };

export interface DetailCapability {
  title: string;
  description: string;
  icon: LucideIcon;
  label?: string;
}

export interface MarketingDetailConfig {
  accent: ServiceAccent;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
  metrics: Array<{ value: string; label: string }>;
  capabilities: DetailCapability[];
  workflow: string[];
  integrations: string[];
  imagePosition?: "left" | "right";
  variant?: "software" | "solution";
}

export function DetailPageSubnav({ accent }: { accent: ServiceAccent }) {
  const color = SERVICE_ACCENTS[accent].primary;
  const items = [
    ["overview", "Overview"],
    ["capabilities", "Capabilities"],
    ["product-tour", "Product tour"],
    ["workflow", "How it works"],
    ["integrations", "Integrations"],
  ];

  return (
    <nav aria-label="Page sections" className="sticky top-20 z-30 border-y border-[var(--border-default)] bg-[var(--surface-overlay)] backdrop-blur-xl">
      <div className="mx-auto flex flex-wrap max-w-7xl items-center gap-1 px-4 py-2 sm:px-6 lg:px-8">
        {items.map(([href, label]) => (
          <a key={href} href={`#${href}`} className="rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 font-inter text-[10px] sm:text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] focus-visible:outline-none" style={{ "--focus-border": color } as CSSProperties}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function SectionImagePlaceholder({ title, accent }: { title: string; accent: ServiceAccent }) {
  const colors = SERVICE_ACCENTS[accent];
  return (
    <div className="grid aspect-[16/10] place-items-center rounded-3xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] p-8 text-center">
      <div>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl" style={{ background: colors.soft, color: colors.primary }}><ImageIcon className="h-6 w-6" /></span>
        <p className="mt-4 font-poppins text-sm font-semibold text-[var(--text-primary)]">{title}</p>
      </div>
    </div>
  );
}

export function ServiceAccentCard({ capability, accent, index }: { capability: DetailCapability; accent: ServiceAccent; index: number }) {
  const colors = SERVICE_ACCENTS[accent];
  const Icon = capability.icon;
  const accents = [colors.primary, colors.secondary, "#6366F1", "#0EA5E9", "#D97706", "#168A5B"];
  const color = accents[index % accents.length];

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${index === 0 ? "md:col-span-2" : ""}`} style={{ borderTopColor: color, borderTopWidth: 2 }}>
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ color, backgroundColor: `${color}18` }}><Icon className="h-5 w-5" /></span>
        {capability.label && <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 font-roboto text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">{capability.label}</span>}
      </div>
      <h3 className="mt-5 font-poppins text-lg font-semibold text-[var(--text-primary)]">{capability.title}</h3>
      <p className="mt-2 font-inter text-sm leading-6 text-[var(--text-secondary)]">{capability.description}</p>
    </article>
  );
}

export function MarketingDetailPage({ config, children }: { config: MarketingDetailConfig; children?: ReactNode }) {
  const colors = SERVICE_ACCENTS[config.accent];
  const Icon = config.icon;
  const imageFirst = config.imagePosition === "left";

  return (
    <>
      <section id="overview" className="relative overflow-hidden border-b border-[var(--border-default)] bg-[var(--surface-1)] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 82% 18%,${colors.soft},transparent 32%),radial-gradient(circle at 12% 82%,${colors.soft},transparent 28%)` }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : ""}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-1.5 font-poppins text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: colors.primary }}><Icon className="h-4 w-4" />{config.badge}</span>
            <h1 className="mt-6 font-poppins text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {config.title} <span className="block" style={{ color: colors.primary }}>{config.highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl font-inter text-base leading-7 text-[var(--text-secondary)]">{config.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/request-demo" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-inter text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5" style={{ background: colors.gradient }}>Request tailored demo <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-3.5 font-inter text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-2)]">Talk to an architect</Link>
            </div>
          </div>
          <div className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : ""}`}>
            {config.image ? <ProductScreenshotFrame src={config.image} alt={config.imageAlt || `${config.badge} application screenshot`} accent={config.accent} label="Actual Kashtrix application workflow" priority /> : <SectionImagePlaceholder title={`${config.badge} solution visual`} accent={config.accent} />}
          </div>
        </div>
      </section>

      <DetailPageSubnav accent={config.accent} />

      <section className="border-b border-[var(--border-default)] bg-[var(--surface-2)] py-7">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {config.metrics.map((metric) => <div key={metric.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] px-4 py-3"><div className="font-poppins text-lg font-semibold" style={{ color: colors.primary }}>{metric.value}</div><div className="mt-1 font-inter text-xs text-[var(--text-secondary)]">{metric.label}</div></div>)}
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-36 bg-[var(--page-bg)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><span className="font-poppins text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: colors.primary }}>Core capabilities</span><h2 className="section-heading mt-3">Core capabilities for ISP and telecom operations.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{config.capabilities.map((capability, index) => <ServiceAccentCard key={capability.title} capability={capability} accent={config.accent} index={index} />)}</div>
        </div>
      </section>

      <section id="product-tour" className="scroll-mt-36 border-y border-[var(--border-default)] bg-[var(--surface-1)] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5"><span className="font-poppins text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: colors.primary }}>Product tour</span><h2 className="section-heading mt-3">See operational context without turning the website into a dashboard.</h2><p className="mt-4 font-inter text-sm leading-7 text-[var(--text-secondary)]">The product view is presented as evidence inside a public marketing story—showing how teams move from signal to action while the surrounding page stays focused on business outcomes.</p></div>
          <div className="lg:col-span-7">{config.image ? <ProductScreenshotFrame src={config.image} alt={config.imageAlt || `${config.badge} product view`} accent={config.accent} label="Live product capability" /> : <SectionImagePlaceholder title={`${config.badge} product screenshot`} accent={config.accent} />}</div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-36 border-y border-[var(--border-default)] bg-[var(--surface-2)] py-20 text-[var(--text-primary)] md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><span className="font-poppins text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: colors.secondary }}>Connected workflow</span><h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">How it works: from network signal to operational outcome.</h2></div><ol className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">{config.workflow.map((step, index) => <li key={step} className="relative rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-5 shadow-xs"><span className="font-roboto text-xs font-bold text-[var(--text-tertiary)]">0{index + 1}</span><p className="mt-3 font-poppins text-sm font-semibold text-[var(--text-primary)]">{step}</p>{index < config.workflow.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 text-[var(--text-muted)] lg:block" />}</li>)}</ol></div>
      </section>

      {children && <div id="deep-dive" className="scroll-mt-36">{children}</div>}

      <section id="integrations" className="scroll-mt-36 border-t border-[var(--border-default)] bg-[var(--surface-2)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><PlugZap className="h-7 w-7" style={{ color: colors.primary }} /><h2 className="mt-4 font-poppins text-3xl font-semibold text-[var(--text-primary)]">Integrates with your existing ISP infrastructure.</h2><p className="mt-3 font-inter text-sm leading-6 text-[var(--text-secondary)]">Connect existing network, finance, subscriber and operational systems through APIs, events and managed adapters.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">{config.integrations.map((integration) => <div key={integration} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-4 font-inter text-sm font-semibold text-[var(--text-primary)]"><CheckCircle2 className="h-4 w-4" style={{ color: colors.primary }} />{integration}</div>)}</div></div></div>
      </section>

      <section className="bg-[var(--surface-1)] py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-12" style={{ background: colors.gradient }}><ShieldCheck className="h-8 w-8 text-white/80" /><h2 className="mt-5 max-w-3xl font-poppins text-3xl font-semibold tracking-tight sm:text-4xl">Modernize ISP operations without disrupting your network.</h2><p className="mt-4 max-w-2xl font-inter text-sm leading-6 text-white/75">Plan a phased rollout around your current ISP systems, subscriber base, network devices and commercial priorities.</p><Link href="/request-demo" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-inter text-sm font-semibold text-[#2B0F3D] shadow-xl">Build your rollout plan <ArrowRight className="h-4 w-4" /></Link></div></div></section>
    </>
  );
}
