import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Braces, Clock3, Layers3, MonitorPlay, RadioTower, ShieldCheck, Video } from "lucide-react";
import { broadcastApps } from "@/data/broadcast";
import { MotionReveal } from "@/components/MotionReveal";
import { ProductHardwareMockup } from "@/components/ProductHardwareMockup";
import { AnimatedBrandShapes } from "@/components/AnimatedBrandShapes";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Broadcast Playout Software & Television Automation Suite — Kashtrix",
  description: "Enterprise broadcast playout automation with 16 dedicated Windows desktop modules for 24/7 master control, Direct3D11 zero-copy rendering, DeckLink 12G-SDI, NDI 6, SCTE-35 digital ad insertion, and 1+1 redundant failover.",
  keywords: [
    "broadcast playout software",
    "TV playout automation",
    "master control playout",
    "linear TV automation",
    "FAST channel playout software",
    "DeckLink 12G-SDI playout",
    "NDI 6 broadcast playout",
    "SCTE-35 ad splice automation",
    "broadcast character generator",
    "broadcast rundown scheduler",
    "Kashtrix broadcast playout",
  ],
  alternates: { canonical: "/broadcast-playout" },
  openGraph: {
    title: "Broadcast Playout Software & Television Automation Suite — Kashtrix",
    description: "Enterprise broadcast playout automation with 16 dedicated Windows desktop modules for 24/7 master control, DeckLink 12G-SDI, NDI 6, and SCTE-35.",
    url: `${SITE.url}/broadcast-playout`,
    images: [{ url: "/media/broadcast/broadcast-16.png", width: 1920, height: 1080, alt: "Kashtrix Broadcast Playout Suite" }],
  },
};

const schema = { "@context":"https://schema.org", "@type":"SoftwareApplication", name:"Kashtrix Broadcast Playout Suite", applicationCategory:"MultimediaApplication", operatingSystem:"Windows 10, Windows 11, Windows Server", url:`${SITE.url}/broadcast-playout`, featureList:broadcastApps.map(a=>a.title) };

export default function BroadcastSuitePage(){
  return <main className="overflow-hidden bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>

    <section className="site-hero relative overflow-hidden border-b border-[#e8e3e9] bg-[#fcfbfc] dark:border-white/10 dark:bg-[#12051c]">
      <AnimatedBrandShapes />
      <div className="container-shell relative z-10 grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <p className="kicker !text-[#4b1b63] dark:!text-[#c084fc]">Broadcast Playout Suite</p>
          <h1 className="mt-5 text-[clamp(2.9rem,5.1vw,4.9rem)] font-semibold leading-[.98] tracking-[-.05em] text-[#171219] dark:text-white">Professional channel playout, <span className="text-[#4b1b63] dark:text-[#c084fc]">separated into focused applications.</span></h1>
          <p className="mt-6 max-w-2xl text-[1.04rem] leading-8 text-[#6d6670] dark:text-[#bdaec4]">Playout, transmission, graphics, scheduling, media, ingest, monitoring, newsroom and redundancy share one broadcast foundation without forcing operators into one oversized interface.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/request-demo" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#6f2b8f]">Request broadcast demo</Link><a href="#applications" className="button-secondary">Browse applications</a></div>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-[#e3dde4] dark:border-white/10 py-5 sm:grid-cols-4">{[["16","Applications"],["SDI + IP","Hybrid I/O"],["SMPTE","Timing"],["24/7","Operation"]].map(([v,l])=><div key={l}><p className="text-base font-semibold text-[#171219] dark:text-white">{v}</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-[#8d8590] dark:text-[#a090ab]">{l}</p></div>)}</div>
        </div>
        <MotionReveal delay={0.06} className="relative w-full">
          <ProductHardwareMockup
            image="/media/broadcast/broadcast-16.png"
            alt="Kashtrix Broadcast Playout Suite Master Control"
            serverLabel="PLAYOUT MASTER SERVER"
            accent="#6f2b8f"
            priority
          />
        </MotionReveal>
      </div>
    </section>

    <section className="section-pad bg-[#fbfaf8] dark:bg-[#12051c]"><div className="container-shell"><MotionReveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="kicker">Shared foundation</p><h2 className="heading mt-4 text-[#171219] dark:text-white">Common engines. Different operator surfaces.</h2></div><p className="subheading max-w-2xl lg:justify-self-end text-[#706a73] dark:text-[#bdaec4]">The suite shares media, timing and automation infrastructure, while each application page uses the visual language of its own job: timeline, canvas, routing, recording, monitoring or newsroom.</p></MotionReveal><div className="mt-12 grid gap-px border border-[#e5dfe6] bg-[#e5dfe6] dark:border-white/10 dark:bg-white/10 md:grid-cols-4">{[[MonitorPlay,"Playout","PGM/PVW, transitions and real-time composition."],[Layers3,"Graphics","Motion templates, live data and layered control."],[Clock3,"Timing","SMPTE timecode, hard starts and scheduled events."],[Braces,"Automation","REST, WebSocket, TCP/UDP and system integration."]].map(([Icon,title,text])=>{const I=Icon as typeof MonitorPlay;return <div key={String(title)} className="swipe-card bg-white dark:bg-[#170724] p-6"><I className="h-5 w-5 text-[#6f2b8f] dark:text-[#c084fc]"/><h3 className="mt-5 text-base font-semibold text-[#171219] dark:text-white">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#706a73] dark:text-[#bdaec4]">{String(text)}</p></div>})}</div></div></section>

    <section id="applications" className="section-pad bg-white dark:bg-[#14061e]"><div className="container-shell"><MotionReveal className="max-w-3xl"><p className="kicker">Application suite</p><h2 className="heading mt-4 text-[#171219] dark:text-white">Choose the surface that matches the operator job.</h2><p className="subheading mt-5 text-[#736c76] dark:text-[#bdaec4]">Each application has its own page and only its matching product interface is used there.</p></MotionReveal><div className="mt-10 border-t border-[#e6e1e7] dark:border-white/10">{broadcastApps.map((app,i)=><MotionReveal key={app.slug} delay={(i%4)*.025}><Link href={`/broadcast-playout/${app.slug}`} className="group grid gap-4 border-b border-[#e6e1e7] dark:border-white/10 py-6 transition hover:bg-[#fbfafb] dark:hover:bg-[#230d35] md:grid-cols-[58px_150px_1fr_auto] md:items-center md:px-3"><span className="text-xs text-[#9c949f] dark:text-[#a090ab]">{String(i+1).padStart(2,"0")}</span><span className="text-sm font-semibold" style={{color:app.accent}}>{app.label}</span><div><h3 className="text-lg font-semibold tracking-[-.02em] text-[#171219] dark:text-white">{app.title}</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-[#736c76] dark:text-[#bdaec4]">{app.purpose}</p></div><ArrowRight className="h-4 w-4 text-[#8c848f] dark:text-[#a090ab] transition group-hover:translate-x-1"/></Link></MotionReveal>)}</div></div></section>

    <section className="border-y border-[#e7e2e8] bg-[#f8f6f8] dark:border-white/10 dark:bg-[#12051c] py-16"><div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><MotionReveal><div className="flex items-center gap-2 text-[#4b1b63] dark:text-[#c084fc]"><Video className="h-5 w-5"/><span className="text-[11px] font-semibold uppercase tracking-[.14em]">Live production</span></div><h2 className="heading mt-4 text-[#171219] dark:text-white">Need a live production switcher?</h2><p className="subheading mt-5 text-[#736c76] dark:text-[#bdaec4]">Kashtrix Studio is a separate production environment for program/preview switching, source monitoring and audio. It is not presented as another playout screenshot.</p><Link href="/studio" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#4b1b63] dark:text-[#c084fc]">Explore Kashtrix Studio <ArrowRight className="h-4 w-4"/></Link></MotionReveal><MotionReveal delay={.06} className="grid grid-cols-3 gap-px border border-[#e1dbe3] bg-[#e1dbe3] dark:border-white/10 dark:bg-white/10">{[[RadioTower,"Broadcast","Playout & automation"],[Video,"Studio","Live production"],[ShieldCheck,"HA","Continuity & failover"]].map(([Icon,t,d])=>{const I=Icon as typeof RadioTower;return <div key={String(t)} className="swipe-card bg-white dark:bg-[#170724] p-5"><I className="h-5 w-5 text-[#6f2b8f] dark:text-[#c084fc]"/><p className="mt-4 text-sm font-semibold text-[#171219] dark:text-white">{String(t)}</p><p className="mt-1 text-xs leading-5 text-[#777079] dark:text-[#a090ab]">{String(d)}</p></div>})}</MotionReveal></div></section>

    <InlineCTA eyebrow="Broadcast engineering" title="Map the suite to your channel architecture." text="Tell us your video standards, channel count, graphics workflows, SDI/IP interfaces, storage and redundancy targets. We’ll propose a focused application stack." accent="#6f2b8f"/>
  </main>;
}
