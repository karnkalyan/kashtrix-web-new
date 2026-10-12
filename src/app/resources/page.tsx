import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cable, RadioTower, Video, Zap } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata:Metadata={title:"Resources — Broadcast, Streaming & Telecom",description:"Product architecture resources for Kashtrix Broadcast Playout Suite, Kashtrix Studio, StreamOps and telecom OSS/BSS.",alternates:{canonical:"/resources"}};
const resources = [
  {
    icon: RadioTower,
    title: "Broadcast Playout Architecture",
    text: "Understand the comprehensive broadcast playout suite from PGM/PVW playout and CG through ingest, newsroom, QC and HA.",
    href: "/broadcast-playout",
    accent: "#6f2b8f",
  },
  {
    icon: Video,
    title: "Kashtrix Studio",
    text: "Explore the dedicated live production workspace for program/preview switching, source monitoring and audio control.",
    href: "/studio",
    accent: "#b72963",
  },
  {
    icon: Zap,
    title: "StreamOps Media Path",
    text: "See how SDI/IP sources move through GPU processing, DVB multiplexing, recording and multi-platform egress.",
    href: "/streamops",
    accent: "#5d48b9",
  },
  {
    icon: Cable,
    title: "Telecom OSS/BSS Platform",
    text: "See how AAA, network operations, billing, CRM, inventory and field workflows connect around subscriber context.",
    href: "/platform",
    accent: "#16778b",
  },
] as const;

export default function Page() {
  return (
    <main>
      <section className="site-hero section-pad bg-[#fbfaf8] dark:bg-[#12051c]">
        <div className="container-shell">
          <div className="max-w-4xl">
            <p className="kicker">Resources</p>
            <h1 className="display-md mt-4 text-[#171219] dark:text-white">
              Understand each product before the demo.
            </h1>
            <p className="subheading mt-6 text-[#706a73] dark:text-[#bdaec4]">
              Product architecture and workflows organized around dedicated Kashtrix product families — without a single-page screenshot dump.
            </p>
          </div>
          <div className="mt-12 border-t border-[#e5e0e6] dark:border-white/10">
            {resources.map((r, i) => (
              <MotionReveal key={r.href} delay={i * 0.04}>
                <Link
                  href={r.href}
                  className="group grid gap-5 border-b border-[#e5e0e6] dark:border-white/10 py-7 transition hover:bg-[#f6f2f7] dark:hover:bg-[#230d35] md:grid-cols-[56px_1fr_auto] md:items-center md:px-3"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center border border-[#e3dee5] bg-white dark:border-white/10 dark:bg-[#1b082d]"
                    style={{ color: r.accent }}
                  >
                    <r.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-[-.025em] text-[#171219] dark:text-white">
                      {r.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#706a73] dark:text-[#bdaec4]">
                      {r.text}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#8d8590] dark:text-[#a090ab] transition group-hover:translate-x-1" />
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
