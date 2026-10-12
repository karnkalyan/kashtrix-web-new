import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Cable, CheckCircle2, CircleDollarSign, Clapperboard,
  Clock3, Cpu, Database, Gauge, Headphones, KeyRound, Layers3, Monitor, MonitorPlay, Network,
  RadioTower, ServerCog, ShieldCheck, Tv, Users, Video, Waypoints, Zap,
} from "lucide-react";
import { AnimatedBrandShapes } from "@/components/AnimatedBrandShapes";
import { ProductHardwareMockup } from "@/components/ProductHardwareMockup";
import { MotionReveal } from "@/components/MotionReveal";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Broadcast Playout Software, StreamOps, Studio & Telecom OSS/BSS — Kashtrix",
  description: "Enterprise broadcast playout automation, live StreamOps media transcode, studio production, and unified AI-powered telecom OSS/BSS for 24/7 linear channels, ISPs, and FTTH operators.",
  keywords: [
    "broadcast playout software",
    "TV playout automation",
    "linear broadcast playout",
    "FAST channel playout software",
    "NDI 6 playout",
    "DeckLink 12G-SDI playout",
    "SCTE-35 ad insertion",
    "telecom OSS BSS",
    "ISP management software",
    "ISP billing software",
    "FreeRADIUS AAA server",
    "GPON OLT provisioning",
    "SNMP device management",
    "TR-069 ACS software",
    "carrier grade syslog",
    "CGNAT compliance logging",
    "AI agents for telecom",
    "Kashtrix StreamOps",
    "Kashtrix Studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Broadcast Playout Software, StreamOps, Studio & Telecom OSS/BSS — Kashtrix",
    description: "Enterprise broadcast playout automation, live StreamOps media transcode, studio production, and unified AI-powered telecom OSS/BSS.",
    url: SITE.url,
    siteName: "Kashtrix",
    images: [{ url: "/media/broadcast/broadcast-16.png", width: 1920, height: 1080, alt: "Kashtrix Broadcast Playout Suite" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Broadcast Playout Software, StreamOps, Studio & Telecom OSS/BSS — Kashtrix",
    description: "Enterprise broadcast playout automation, live StreamOps media transcode, studio production, and unified AI-powered telecom OSS/BSS.",
    images: ["/media/broadcast/broadcast-16.png"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kashtrix software portfolio",
  itemListElement: [
    { "@type": "SoftwareApplication", name: "Kashtrix Broadcast Playout Suite", applicationCategory: "MultimediaApplication", url: `${SITE.url}/broadcast-playout` },
    { "@type": "SoftwareApplication", name: "Kashtrix StreamOps", applicationCategory: "MultimediaApplication", url: `${SITE.url}/streamops` },
    { "@type": "SoftwareApplication", name: "Kashtrix Studio", applicationCategory: "MultimediaApplication", url: `${SITE.url}/studio` },
    { "@type": "SoftwareApplication", name: "Kashtrix OSS/BSS", applicationCategory: "BusinessApplication", url: `${SITE.url}/platform` },
  ],
};

const summaries = [
  {
    icon: RadioTower,
    title: "Broadcast Playout",
    href: "/broadcast-playout",
    text: "Standalone Windows desktop applications for 24/7 master control, SDI/IP transmission, motion CG, rundown scheduling, MAM and failover redundancy.",
    bullets: ["Master control PGM/PVW (Direct3D11)", "Motion CG & live graphics surfaces", "DeckLink 12G-SDI & NDI 6 transmission", "1+1 frame-locked HA failover"],
  },
  {
    icon: Waypoints,
    title: "StreamOps",
    href: "/streamops",
    text: "Ingest, transcode, record, multiplex and distribute live media from a high-throughput browser-based broadcast control plane.",
    bullets: ["SRT / RTMP / NDI / RTSP ingest", "NVIDIA NVENC & Intel QSV GPU ABR", "DVB MPTS multiplexing with full SI/PSI", "24/7 compliance recording & archive"],
  },
  {
    icon: Monitor,
    title: "Kashtrix Studio",
    href: "/studio",
    text: "A dedicated live studio production workspace for program/preview switching, mosaic multiviewer monitoring, graphics and prompter.",
    bullets: ["Dual-bus live studio controller", "Mosaic multiviewer with VU/PPM meters", "Studio teleprompter with optical flip", "Live character generator integration"],
  },
  {
    icon: Database,
    title: "OSS / BSS Platform",
    href: "/platform",
    text: "Unified ISP, FTTH and telecom operations connecting FreeRADIUS AAA, GPON OLTs, TR-069, convergent billing, CRM, mobile field ops, and carrier syslog.",
    bullets: ["50K+ AAA auth req/s & session control", "Multi-vendor OLTs (Nokia, Huawei, ZTE)", "Convergent billing & automated dunning", "100K+ msgs/s CGNAT compliance syslog"],
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
          Spacious layout, Poppins/Inter typography, 3D scroll-rotated monitor
          Front: broadcast-16.png (Native Desktop)
          Back: broadcast-14.png (Web Version)
      ───────────────────────────────────────────────────────────── */}
      <section className="site-hero home-hero relative overflow-hidden border-b border-[#e9e4ea] bg-[#fcfbfc]">
        <AnimatedBrandShapes />

        <div className="container-shell relative z-10 grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_1.18fr] xl:grid-cols-[1.05fr_1.15fr]">
          <MotionReveal>
            <h1 className="max-w-[760px] text-[clamp(2.75rem,4.4vw,4.4rem)] font-bold leading-[1.02] tracking-[-.045em] text-[#151117] dark:text-white">
              Broadcast software, StreamOps, Studio & OSS/BSS —{" "}
              <span className="bg-gradient-to-r from-[#ec1778] via-[#8b3bb3] to-[#4b1b63] bg-clip-text text-transparent dark:from-[#f472b6] dark:via-[#c084fc] dark:to-[#e879f9]">
                reimagined for modern media.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[1.12rem] leading-8 text-[#5f5863] dark:text-[#bdaec4]">
              A unified Kashtrix portfolio for channel playout, live ingest, transcoding, graphics, studio production and complete telecom operations — without forcing every workflow into the same interface.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-demo" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#6f2b8f] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f] hover:dark:!bg-[#7e22ce] !px-6 !py-3 !text-sm">
                Request live demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#products" className="button-secondary !px-5 !py-3 !text-sm">
                Explore
              </a>
            </div>

            <div className="mt-10 grid max-w-[640px] grid-cols-3 border-y border-[#e4dee5] dark:border-white/10 py-4">
              <div>
                <p className="text-sm font-bold text-[#171219] dark:text-white">Reliable</p>
                <p className="mt-1 text-xs leading-5 text-[#776f7b] dark:text-[#a090ab]">24/7 master control & continuous playout</p>
              </div>
              <div className="border-l border-[#e4dee5] dark:border-white/10 pl-5">
                <p className="text-sm font-bold text-[#171219] dark:text-white">Modular</p>
                <p className="mt-1 text-xs leading-5 text-[#776f7b] dark:text-[#a090ab]">Standalone broadcast & telecom modules</p>
              </div>
              <div className="border-l border-[#e4dee5] dark:border-white/10 pl-5">
                <p className="text-sm font-bold text-[#171219] dark:text-white">Carrier-Grade</p>
                <p className="mt-1 text-xs leading-5 text-[#776f7b] dark:text-[#a090ab]">Single channel to national broadcast headends</p>
              </div>
            </div>
          </MotionReveal>

          {/* Workstation Hero Display with Server & Monitor Mockup */}
          <MotionReveal delay={0.06} className="relative w-full">
            <ProductHardwareMockup
              image="/media/broadcast/broadcast-16.png"
              alt="Kashtrix Broadcast Playout Suite"
              serverLabel="BROADCAST PLAYOUT WORKSTATION"
              accent="#6f2b8f"
              priority
            />
          </MotionReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PORTFOLIO SUMMARY BAR
      ───────────────────────────────────────────────────────────── */}
      <section id="products" className="border-b border-[#ebe6ec] bg-[#faf9fa] py-10 dark:border-[#381647] dark:bg-[#160822]">
        <div className="container-shell grid gap-4 lg:grid-cols-4">
          {summaries.map((p, i) => {
            const Icon = p.icon;
            return (
              <MotionReveal key={p.title} delay={i * 0.035}>
                <Link href={p.href} className="product-summary-card group block h-full">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#f4eef7] text-[#6f2b8f] dark:bg-[#2a0e38] dark:text-[#c084fc]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#a298a5] transition group-hover:translate-x-1 group-hover:text-[#6f2b8f] dark:group-hover:text-[#c084fc]" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-[-.025em]">{p.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-[#6c6570] dark:text-[#a090ab]">{p.text}</p>
                  <div className="mt-4 grid gap-1.5 border-t border-[#f0eaf2] dark:border-[#381647] pt-3">
                    {p.bullets.map((b) => (
                      <p key={b} className="flex gap-2 text-[11px] leading-4 text-[#59525c] dark:text-[#c4b3cf]">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc]" />
                        {b}
                      </p>
                    ))}
                  </div>
                </Link>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          01 · BROADCAST PLAYOUT
          Show 4 Featured Applications (Master Playout, CG Editor, Channel Controller, MAM)
      ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 · BROADCAST PLAYOUT
          Flagship On-Air Grid with 4 Featured Applications (No tabs, No monitor mockup)
      ───────────────────────────────────────────────────────────── */}
      <section className="product-scroll-section border-b border-[#ebe6ec] bg-white dark:border-[#381647] dark:bg-[#12051c]">
        <AnimatedBrandShapes subtle />
        <div className="container-shell relative z-10 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 border border-[#ded3e3] dark:border-[#4d1f60] bg-[#f7f2f9] dark:bg-[#200c2e] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]">
                <span className="h-2 w-2 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc] animate-pulse" /> Flagship Broadcast Playout Suite
              </div>
              <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold tracking-tight text-[#171219] dark:text-white">
                Kashtrix Broadcast Playout
              </h2>
              <p className="mt-2 text-base font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                Enterprise master control, real-time motion graphics & linear transmission.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#645d69] dark:text-[#b4a4be]">
                Standalone Windows desktop modules engineered in .NET 8 with Direct3D11 zero-copy rendering, NDI 6 native video, Blackmagic DeckLink 12G-SDI, SMPTE 12M timecode, and SCTE-35 ad splice automation.
              </p>

              <div className="mt-6 grid grid-cols-3 border-y border-[#e4dee5] dark:border-[#381647] py-4">
                <div>
                  <p className="text-sm font-bold text-[#171219] dark:text-white">PGM + PVW</p>
                  <p className="mt-1 text-xs text-[#756d78] dark:text-[#a090ab]">Dual zero-copy GPU buses</p>
                </div>
                <div className="border-l border-[#e4dee5] dark:border-[#381647] pl-4">
                  <p className="text-sm font-bold text-[#171219] dark:text-white">12G-SDI + NDI</p>
                  <p className="mt-1 text-xs text-[#756d78] dark:text-[#a090ab]">Baseband & IP studio</p>
                </div>
                <div className="border-l border-[#e4dee5] dark:border-[#381647] pl-4">
                  <p className="text-sm font-bold text-[#171219] dark:text-white">SCTE-35</p>
                  <p className="mt-1 text-xs text-[#756d78] dark:text-[#a090ab]">Automated ad cueing</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/broadcast-playout" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#5e217d] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f] !py-2.5 !text-xs font-bold">
                  Explore Suite Directory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-[#8e8592] dark:text-[#a090ab]">
                  Dedicated workstation interfaces for each role
                </span>
              </div>
            </MotionReveal>

            {/* Native Workstation with Server & Monitor Mockup */}
            <MotionReveal delay={0.05}>
              <ProductHardwareMockup
                image="/media/broadcast/broadcast-16.png"
                alt="Kashtrix Broadcast Playout Master Control"
                serverLabel="MASTER CONTROL PLAYOUT"
                accent="#6f2b8f"
              />
            </MotionReveal>
          </div>

          {/* 4 Featured Flagship Applications (Not all 16 on homepage) */}
          <div className="mt-14 border-t border-[#f0eaf2] dark:border-[#381647] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8e8592] dark:text-[#a090ab]">
                  Featured Flagship Applications
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-[#171219] dark:text-white">
                  Core Workstations for Linear Transmission
                </h3>
              </div>
              <Link href="/broadcast-playout" className="text-xs font-semibold text-[#6f2b8f] dark:text-[#c084fc] hover:underline flex items-center gap-1">
                View all applications <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  slug: "master-control-playout",
                  num: "01",
                  title: "Master Control Playout",
                  badge: "24/7 Linear Transmission",
                  desc: "Dual independent PGM/PVW video pipeline with Direct3D11 zero-copy GPU decoding, sub-frame transition mixing, and multi-track audio.",
                  href: "/broadcast-playout/master-control-playout",
                },
                {
                  slug: "cg-editor",
                  num: "02",
                  title: "Visual Motion CG",
                  badge: "Motion Graphics Designer",
                  desc: "Multi-track Bezier timeline for authoring broadcast lower thirds, news crawlers, dynamic station bugs, and data-bound sports templates.",
                  href: "/broadcast-playout/cg-editor",
                },
                {
                  slug: "channel-controller",
                  num: "03",
                  title: "Channel Automation",
                  badge: "Matrix & Signal Control",
                  desc: "Multi-channel playout supervision, SDI matrix router crosspoint switching, and automated signal quality failover in < 40ms.",
                  href: "/broadcast-playout/channel-controller",
                },
                {
                  slug: "media-asset-management",
                  num: "04",
                  title: "Media Asset Management",
                  badge: "Catalog & HSM Tiering",
                  desc: "Central broadcast media library with automatic low-res proxy generation, metadata indexing, and multi-tier HSM storage lifecycle.",
                  href: "/broadcast-playout/media-asset-management",
                },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group flex flex-col justify-between rounded-[5px] border border-[#e8e2ea] bg-white p-5 transition hover:border-[#6f2b8f] hover:shadow-md dark:border-[#381647] dark:bg-[#1a0a27] dark:hover:bg-[#250e38]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#6f2b8f] dark:text-[#c084fc]">{item.num}</span>
                      <span className="rounded-[3px] bg-[#f5f2f7] dark:bg-[#2a0e3a] px-2 py-0.5 text-[10px] font-mono text-[#5b5460] dark:text-[#c4b3cf]">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="mt-3 text-base font-bold text-[#171219] dark:text-white group-hover:text-[#6f2b8f] dark:group-hover:text-[#c084fc]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-[#6c6570] dark:text-[#a090ab]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#6f2b8f] dark:text-[#c084fc] pt-3 border-t border-[#f2edf4] dark:border-[#381647]">
                    Launch application details <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 · STREAMOPS
          High-Throughput Processing Flow (Deep Purple Theme)
      ───────────────────────────────────────────────────────────── */}
      <section className="product-scroll-section border-b border-[#ebe6ec] bg-[#fbfafb] dark:border-[#381647] dark:bg-[#140620]">
        <AnimatedBrandShapes subtle />
        <div className="container-shell relative z-10 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 border border-[#e3d5ec] dark:border-[#3d1656] bg-[#f7f0fb] dark:bg-[#1a0827] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]">
                <span className="h-2 w-2 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc]" /> High-Throughput Media Processing Plane
              </div>
              <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold tracking-tight text-[#171219] dark:text-white">
                Kashtrix StreamOps
              </h2>
              <p className="mt-2 text-base font-semibold text-[#6f2b8f] dark:text-[#c084fc]">
                Live TV channel composition, GPU transcoding, and DVB MPTS multiplexing.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#645d69] dark:text-[#b4a4be]">
                A high-throughput live broadcast control plane engineered for 24/7 headend operation. Transcode raw SDI/HDMI baseband, SRT, RTMP, and UDP multicast feeds with hardware GPU acceleration (NVIDIA NVENC, Intel QSV) and standard-compliant DVB MPTS multiplexing with CBR null packet stuffing.
              </p>

              {/* Distinct 3-Stage Pipeline Flow */}
              <div className="mt-6 space-y-3">
                {[
                  {
                    step: "Stage 01",
                    title: "Baseband & IP Ingestion",
                    desc: "DeckLink 12G-SDI, AJA, SRT Caller/Listener, RTMP, NDI 6, and growing MXF/MOV files with auto-detection.",
                  },
                  {
                    step: "Stage 02",
                    title: "Multi-Vendor GPU Transcoding Grid",
                    desc: "Hardware NVENC & QSV acceleration, H.264/HEVC/MPEG-2 encoding, uncompressed v210, and VBV CBR rate control.",
                  },
                  {
                    step: "Stage 03",
                    title: "Carrier DVB Multiplex & Egress",
                    desc: "ISO/IEC 13818-1 DVB MPTS with PSI/SI tables (PAT, PMT, SDT), PCR jitter ≤20ms, and LACP bonding.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3 rounded-[5px] border border-[#e8e2ea] dark:border-[#381647] bg-white dark:bg-[#1a0a27] p-3.5">
                    <span className="font-mono text-xs font-bold text-[#6f2b8f] dark:text-[#c084fc] shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#171219] dark:text-white">{s.title}</h4>
                      <p className="text-[11px] leading-4 text-[#756d78] dark:text-[#a090ab] mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/streamops" className="button-primary !border-[#6f2b8f] !bg-[#6f2b8f] !py-2.5 !text-xs font-bold">
                  Explore StreamOps Architecture <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-[#8e8592] dark:text-[#a090ab]">
                  Carrier-grade 99.999% broadcast uptime
                </span>
              </div>
            </MotionReveal>

            {/* StreamOps Interface with Server & Monitor Mockup */}
            <MotionReveal delay={0.05}>
              <ProductHardwareMockup
                image="/media/streamops/streamops-01.png"
                alt="Kashtrix StreamOps Dashboard"
                serverLabel="STREAMOPS MEDIA SERVER"
                accent="#6f2b8f"
              />
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 · KASHTRIX STUDIO
          Live Studio Production Desk (No tabs, No monitor mockup)
      ───────────────────────────────────────────────────────────── */}
      <section className="product-scroll-section border-b border-[#ebe6ec] bg-white dark:border-[#381647] dark:bg-[#12051c]">
        <AnimatedBrandShapes subtle />
        <div className="container-shell relative z-10 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.95fr] lg:items-center">
            {/* Studio Interface with Server & Monitor Mockup */}
            <MotionReveal delay={0.04} className="order-2 lg:order-1">
              <ProductHardwareMockup
                image="/media/broadcast/allapplication/Kashtrix Studio (2).png"
                alt="Kashtrix Studio Live Production Surface"
                serverLabel="STUDIO PRODUCTION DESK"
                accent="#6f2b8f"
              />
            </MotionReveal>

            {/* Right: Studio Production Overview */}
            <MotionReveal className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 border border-[#ded3e3] dark:border-[#4d1f60] bg-[#f7f1f9] dark:bg-[#200c2e] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]">
                <span className="h-2 w-2 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc]" /> Live Control Room & Multicam Desk
              </div>
              <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold tracking-tight text-[#171219] dark:text-white">
                Kashtrix Studio
              </h2>
              <p className="mt-2 text-base font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                Live switching, mosaic multiviewing, 3D virtual sets and prompter confidence.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#6a636f] dark:text-[#b4a4be]">
                A dedicated production workspace built specifically for studio control rooms, talk shows, news broadcasts, and live OB vans. Keeps live camera cuts, confidence audio metering, and anchor scripts perfectly synchronized.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  [Monitor, "Program / Preview Bus", "Two-bus switching with tactile T-Bar transitions & DDR clip players"],
                  [Tv, "Mosaic Multiviewer", "2x2 to 8+1 D3D mosaic with VU/PPM level meters & camera tally"],
                  [Clapperboard, "3D Virtual Sets", "Real-time GPU chroma keying with despill & 3D camera tracking"],
                  [Video, "Dynamic CG Overlays", "Live lower thirds, breaking tickers, scoreboards & alpha keying"],
                ].map(([Icon, title, desc]) => {
                  const I = Icon as typeof Monitor;
                  return (
                    <div key={String(title)} className="feature-tile rounded-[5px] border border-[#e8e2ea] dark:border-[#381647] bg-white dark:bg-[#1a0a27] p-3.5">
                      <div className="flex items-center gap-2">
                        <I className="h-4 w-4 text-[#6f2b8f] dark:text-[#c084fc]" />
                        <h4 className="text-xs font-bold text-[#171219] dark:text-white">{String(title)}</h4>
                      </div>
                      <p className="mt-1 text-[11px] leading-4 text-[#756d78] dark:text-[#a090ab]">{String(desc)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/studio" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#5e217d] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f] !py-2.5 !text-xs font-bold">
                  Explore Kashtrix Studio Workflow <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-[#8e8592] dark:text-[#a090ab]">
                  Hardware controller & MIDI/USB compatible
                </span>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 · TELECOM OSS / BSS
          Carrier Scale Architecture (No tabs, No monitor mockup)
      ───────────────────────────────────────────────────────────── */}
      <section className="product-scroll-section border-b border-[#e9e4ea] bg-[#fbfafb] dark:border-[#381647] dark:bg-[#140620]">
        <AnimatedBrandShapes subtle />
        <div className="container-shell relative z-10 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 border border-[#ded5ea] dark:border-[#3c1e5c] bg-[#f6f2fb] dark:bg-[#1a0c2e] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]">
                <span className="h-2 w-2 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc]" /> Carrier-Grade Telecom Infrastructure
              </div>
              <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold tracking-tight text-[#171219] dark:text-white">
                Kashtrix OSS / BSS Platform
              </h2>
              <p className="mt-2 text-base font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                Unified telecom operations, multi-vendor device management & billing.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#645d69] dark:text-[#b4a4be]">
                Connect ISP network operations, FreeRADIUS AAA, GPON OLT provisioning, TR-069 ACS, convergent subscriber billing, CRM, mobile field technician dispatch, and carrier-grade syslog compliance into one composable telecom architecture.
              </p>

              {/* 4 Architectural Layers Overview */}
              <div className="mt-6 space-y-2.5">
                {[
                  {
                    num: "Layer 1",
                    title: "Network, SNMP & Device Automation",
                    desc: "Multi-vendor drivers (MikroTik, Nokia, Huawei, ZTE, Cisco) & 50,000+ AAA auth req/s.",
                  },
                  {
                    num: "Layer 2",
                    title: "Convergent BSS & Revenue Management",
                    desc: "Real-time rating engine, automated cycle billing, dunning & multi-gateway payments.",
                  },
                  {
                    num: "Layer 3",
                    title: "Field Operations & Serialized Inventory",
                    desc: "Mobile field technician app, GPS geo-tagging, optical fiber mapping & asset tracking.",
                  },
                  {
                    num: "Layer 4",
                    title: "AI Agentic NOC & Carrier-Grade Syslog",
                    desc: "Autonomous NOC incident remediation & 100K+ EPS CGNAT regulatory syslog logging.",
                  },
                ].map((lyr) => (
                  <div key={lyr.num} className="flex items-start gap-3 rounded-[5px] border border-[#e8e2ea] dark:border-[#381647] bg-white dark:bg-[#1a0a27] p-3">
                    <span className="font-mono text-xs font-bold text-[#6f2b8f] dark:text-[#c084fc] shrink-0 mt-0.5">
                      {lyr.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#171219] dark:text-white">{lyr.title}</h4>
                      <p className="text-[11px] leading-4 text-[#756d78] dark:text-[#a090ab] mt-0.5">{lyr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/platform" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#5e217d] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f] !py-2.5 !text-xs font-bold">
                  Explore Full Telecom Platform Architecture <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-[#8e8592] dark:text-[#a090ab]">
                  Multi-vendor SNMP & FreeRADIUS AAA
                </span>
              </div>
            </MotionReveal>

            {/* Telecom OSS/BSS Interface with Server & Monitor Mockup */}
            <MotionReveal delay={0.05}>
              <ProductHardwareMockup
                image="/media/oss-bss/01580174-2bd9-4e23-8664-ca9cb115db84.png"
                alt="Kashtrix Telecom OSS/BSS Platform"
                serverLabel="TELECOM OSS/BSS PLATFORM"
                accent="#6f2b8f"
              />
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          GLOBAL STATS
      ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#e7e2e8] bg-white py-10">
        <div className="container-shell grid grid-cols-2 gap-y-6 md:grid-cols-4">
          {[
            ["500+", "Channels on-air 24/7", "Master control playout"],
            ["100M+", "Viewers reached", "Linear, DVB and OTT"],
            ["50K+ req/s", "AAA Authentication", "FreeRADIUS session throughput"],
            ["99.999%", "Platform reliability", "High availability failover"],
          ].map(([value, label, sub], i) => (
            <MotionReveal delay={i * 0.03} key={label} className="stat-item px-5 first:pl-0">
              <p className="text-3xl font-bold tracking-tight text-[#171219]">{value}</p>
              <p className="mt-1 text-xs font-semibold text-[#544d57]">{label}</p>
              <p className="mt-0.5 text-[11px] text-[#8e8591]">{sub}</p>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INDUSTRIES WE SERVE
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#faf9fa] py-14">
        <div className="container-shell">
          <p className="kicker !text-[#8b828f]">Industries we serve</p>
          <div className="mt-7 grid gap-px border border-[#e4dee5] bg-[#e4dee5] dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {[
              [Tv, "Television Broadcasters", "24/7 Master control, SDI/IP transmission, motion CG & rundowns"],
              [RadioTower, "Telecom & ISP Operators", "Broadband OSS/BSS, FreeRADIUS AAA, GPON OLTs & billing"],
              [Video, "OTT & Streaming Media", "GPU live transcoding, ABR manifests & low-latency SRT/WebRTC"],
              [Clapperboard, "Production Studios", "Live switching, mosaic multiviewing, teleprompter & graphics"],
              [ServerCog, "Enterprise & IPTV Networks", "Carrier syslog CGNAT audit archiving & internal video headends"],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Tv;
              return (
                <div key={String(title)} className="swipe-card bg-white p-5 dark:bg-[#170724]">
                  <I className="h-5 w-5 text-[#6f2b8f] dark:text-[#c084fc]" />
                  <p className="mt-4 text-sm font-bold text-[#171219] dark:text-white">{String(title)}</p>
                  <p className="mt-1.5 text-xs leading-5 text-[#7c7480] dark:text-[#a090ab]">{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INLINE CTA
      ───────────────────────────────────────────────────────────── */}
      <InlineCTA
        eyebrow="Kashtrix deployment"
        title="Build around your actual operation — not a generic template."
        text="Tell us whether you are building a broadcast control room, a live media headend, a studio production environment or a telecom OSS/BSS platform. We’ll map the right product and deployment architecture."
        accent="#4b1b63"
      />
    </main>
  );
}
