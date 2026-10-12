import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, DatabaseZap, Network, Radio, ShieldCheck, Waypoints } from "lucide-react";
import { streamOpsModules, streamOpsSpecs } from "@/data/streamops";
import { MotionReveal } from "@/components/MotionReveal";
import { AnimatedBrandShapes } from "@/components/AnimatedBrandShapes";
import { ProductHardwareMockup } from "@/components/ProductHardwareMockup";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "StreamOps — Broadcast Ingest, Transcoding, MPTS & Recording",
  description: "Kashtrix StreamOps is a broadcast media control plane for SDI/IP ingest, GPU live transcoding, DVB MPTS multiplexing, studio recording, storage, networking and secure operations.",
  alternates: { canonical: "/streamops" },
};

const schema = { "@context":"https://schema.org", "@type":"SoftwareApplication", name:"Kashtrix StreamOps", applicationCategory:"MultimediaApplication", description:"Enterprise broadcast ingest, transcoding, multiplexing, recording and media infrastructure control plane.", url:`${SITE.url}/streamops`, featureList:streamOpsModules.map(m=>m.title) };

export default function StreamOpsPage(){
  return <main className="overflow-hidden bg-white dark:bg-[#12051c] text-[#171219] dark:text-[#f3edf7]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>

    <section className="site-hero relative overflow-hidden border-b border-[#e7e2e9] bg-[#fcfbfc] dark:border-[#381647] dark:bg-[#150722]">
      <AnimatedBrandShapes />
      <div className="container-shell relative z-10 grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <div className="inline-flex items-center gap-2 border border-[#ded3e3] dark:border-[#4d1f60] bg-white dark:bg-[#200c2e] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]"><span className="h-2 w-2 rounded-full bg-[#168765]"/> StreamOps Control Plane</div>
          <h1 className="mt-6 text-[clamp(2.9rem,5.1vw,4.9rem)] font-bold leading-[.98] tracking-[-.05em] text-[#171219] dark:text-white">Ingest, transcode, record and deliver <span className="text-[#4b1b63] dark:text-[#c084fc]">without command-line assembly.</span></h1>
          <p className="mt-6 max-w-2xl text-[1.04rem] leading-8 text-[#6d6670] dark:text-[#b4a4be]">Operate contribution, GPU encoding, DVB multiplexing, studio recording, storage and network delivery from one broadcast control plane.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/request-demo" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#5e217d] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f]">Request StreamOps demo <ArrowRight className="h-4 w-4"/></Link><a href="#modules" className="button-secondary">Browse modules</a></div>
          <div className="mt-10 grid grid-cols-3 border-y border-[#e2dde7] dark:border-[#381647] py-4 text-sm"><div><p className="font-bold text-[#171219] dark:text-white">SDI / IP</p><p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">Inputs</p></div><div className="border-l border-[#e2dde7] dark:border-[#381647] pl-5"><p className="font-bold text-[#171219] dark:text-white">GPU</p><p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">Processing</p></div><div className="border-l border-[#e2dde7] dark:border-[#381647] pl-5"><p className="font-bold text-[#171219] dark:text-white">DVB / OTT</p><p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">Outputs</p></div></div>
        </div>
        <MotionReveal delay={0.06} className="relative w-full">
          <ProductHardwareMockup
            image="/media/streamops/streamops-02.png"
            alt="Kashtrix StreamOps Dashboard"
            serverLabel="STREAMOPS SERVER"
            accent="#6f2b8f"
            priority
          />
        </MotionReveal>
      </div>
    </section>

    <section className="bg-[#171219] py-14 text-white"><div className="container-shell"><div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">{[[Radio,"Ingest","DeckLink / AJA · SRT · RTMP · UDP/RTP · RTSP · VOD"],[Cpu,"Process","FFmpeg core · NVENC · QSV · AMF · PSI/SI · recording"],[Waypoints,"Deliver","DVB MPTS · HLS/DASH · SRT · RTMP · storage · devices"]].map(([Icon,title,text])=>{const I=Icon as typeof Radio;return <div key={String(title)} className="swipe-card bg-[#171219] p-6"><I className="h-5 w-5 text-[#a99ae8]"/><h3 className="mt-5 text-lg font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#aaa2ad]">{String(text)}</p></div>})}</div></div></section>

    <section id="modules" className="section-pad bg-white dark:bg-[#12051c]"><div className="container-shell"><MotionReveal className="grid gap-8 lg:grid-cols-[.76fr_1.24fr] lg:items-end"><div><p className="kicker text-[#5d48b9]">Operational modules</p><h2 className="heading mt-4 text-[#171219] dark:text-white">Open the tool for the media job.</h2></div><p className="subheading max-w-2xl lg:justify-self-end text-[#716a74] dark:text-[#bdaec4]">Module pages no longer reuse a generic screenshot. Where a matching interface exists, that interface is shown. Where it does not, the page uses a purpose-built technical visualization instead.</p></MotionReveal><div className="mt-10 border-t border-[#e5e0e6] dark:border-white/10">{streamOpsModules.map((m,i)=><MotionReveal key={m.slug} delay={(i%4)*.025}><Link href={`/streamops/${m.slug}`} className="group grid gap-4 border-b border-[#e5e0e6] dark:border-white/10 py-6 transition hover:bg-[#faf9fc] dark:hover:bg-[#230d35] md:grid-cols-[58px_1fr_auto] md:items-center md:px-3"><span className="text-xs text-[#98909b] dark:text-[#a090ab]">{String(i+1).padStart(2,"0")}</span><div><h3 className="text-lg font-semibold tracking-[-.02em] text-[#171219] dark:text-white">{m.title}</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-[#716a74] dark:text-[#bdaec4]">{m.description}</p></div><ArrowRight className="h-4 w-4 text-[#8d8590] dark:text-[#a090ab] transition group-hover:translate-x-1"/></Link></MotionReveal>)}</div></div></section>

    <section className="border-y border-[#e7e2e8] dark:border-white/10 bg-[#faf9fb] dark:bg-[#12051c] py-16"><div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><MotionReveal><p className="kicker text-[#5d48b9]">Infrastructure depth</p><h2 className="heading mt-4 text-[#171219] dark:text-white">Broadcast protocols without command-line assembly.</h2><p className="subheading mt-5 text-[#716a74] dark:text-[#bdaec4]">Keep encoding, multiplexing, recording and network operations visible while retaining the protocol depth expected in a headend or studio environment.</p><div className="mt-7 grid gap-3 text-sm">{[[DatabaseZap,"NVMe · SMB/CIFS · S3 / MinIO"],[ShieldCheck,"RBAC · audit · signed licensing"],[Network,"LACP · VLAN · IGMPv3 SSM"]].map(([Icon,t])=>{const I=Icon as typeof DatabaseZap;return <div key={String(t)} className="flex items-center gap-3 text-[#5f5862] dark:text-[#bdaec4]"><I className="h-4 w-4 text-[#5d48b9]"/>{String(t)}</div>})}</div></MotionReveal><MotionReveal delay={.05}><div className="border border-[#e2dde4] dark:border-white/10 bg-white dark:bg-[#170724]">{streamOpsSpecs.map(([key,value],i)=><div key={key} className={`grid gap-2 px-5 py-4 md:grid-cols-[190px_1fr] ${i?"border-t border-[#ebe6ec] dark:border-white/10":""}`}><p className="text-sm font-semibold text-[#171219] dark:text-white">{key}</p><p className="text-sm leading-6 text-[#716a74] dark:text-[#bdaec4]">{value}</p></div>)}</div></MotionReveal></div></section>

    <InlineCTA eyebrow="StreamOps deployment" title="Build the media path around your headend or studio." text="Share your input protocols, channel count, encoding ladders, DVB requirements, recording formats, storage targets and network topology. We’ll map a StreamOps deployment." accent="#5d48b9"/>
  </main>
}
