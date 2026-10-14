import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Boxes, Cable, Cpu, FileVideo2, Network, RadioTower, ShieldCheck, Waypoints } from "lucide-react";
import { streamOpsModules } from "@/data/streamops";
import { MotionReveal } from "@/components/MotionReveal";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

import { getPageMetadata } from "@/lib/meta";

export function generateStaticParams(){return streamOpsModules.map(m=>({slug:m.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const m=streamOpsModules.find(x=>x.slug===slug); if(!m)return{};
  return getPageMetadata(`/streamops/${m.slug}`, {
    title: `${m.title} — StreamOps Media Operations | Kashtrix`,
    description: m.description,
    keywords: `${m.title}, live transcoder, broadcast video transcoder, streamops, DVB MPTS multiplexer, Kashtrix StreamOps, NVENC hardware acceleration`,
    canonical: `https://kashtrix.com/streamops/${m.slug}`,
  });
}

const accents=["#5d48b9","#7d3b8f","#c14f6f","#317e8f","#b16625","#4f64af","#8a4da0","#2e7a6a","#3f6f8d","#886a2c","#6a588f","#4c7c67"];

function TechnicalVisual({slug,accent}:{slug:string;accent:string}){
  if(slug==="automation-api") return <div className="swipe-card border border-[#e3dee5] bg-[#171219] p-6 text-white"><div className="grid gap-3 font-mono text-sm">{["START studio_a","STATUS","PRESETS","STOP studio_a live","PING"].map((x,i)=><div key={x} className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-white/75">{x}</span><span className="text-[10px] uppercase tracking-[.12em]" style={{color:accent}}>{i===1?"JSON":"200 OK"}</span></div>)}</div><p className="mt-6 text-[10px] uppercase tracking-[.14em] text-white/35">TCP :9999 · REST · WebSocket</p></div>;
  if(slug==="transcode-studio") return <div className="swipe-card border border-[#e3dee5] bg-white p-6"><div className="mb-5 flex items-center justify-between"><p className="text-sm font-semibold">Transcode queue</p><Cpu className="h-5 w-5" style={{color:accent}}/></div>{[["Master_01.mov","72%","3.8×"],["Promo_4K.mxf","41%","2.4×"],["Web_cut.mp4","93%","5.1×"]].map(([n,p,s])=><div key={n} className="mb-4 grid grid-cols-[1fr_70px] gap-4"><div><div className="flex justify-between text-xs"><span>{n}</span><span className="text-[#807883]">{s}</span></div><div className="mt-2 h-1.5 bg-[#eee9ef]"><div className="h-full" style={{width:p,background:accent}}/></div></div><span className="text-right text-xs font-semibold">{p}</span></div>)}</div>;
  if(slug==="vod-playout") return <div className="swipe-card border border-[#e3dee5] bg-[#faf9fb] p-6"><div className="grid gap-3">{["Station ident","Morning loop","Promo block","Emergency filler"].map((x,i)=><div key={x} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border border-[#e8e3e9] bg-white p-3"><FileVideo2 className="h-4 w-4" style={{color:accent}}/><span className="text-sm font-medium">{x}</span><span className="text-[10px] uppercase tracking-[.12em] text-[#8d8590]">{i===1?"LOOP":"READY"}</span></div>)}</div></div>;
  if(slug==="decoder-fleet") return <div className="swipe-card border border-[#e3dee5] bg-white p-6"><div className="grid grid-cols-3 gap-px border border-[#e5e0e6] bg-[#e5e0e6] text-center">{[["1,284","Online"],["12","Updating"],["7","Attention"]].map(([v,l])=><div key={l} className="swipe-card bg-white p-4"><p className="text-2xl font-semibold" style={{color:accent}}>{v}</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-[#8d8590]">{l}</p></div>)}</div><div className="mt-5 grid gap-2">{["STB-NE-1048","STB-CT-8821","STB-WST-3054"].map((x,i)=><div key={x} className="flex items-center justify-between border-b border-[#ebe6ec] py-3 text-sm"><span>{x}</span><span className="text-xs" style={{color:i===2?"#b16625":"#168765"}}>{i===2?"Reboot pending":"Healthy"}</span></div>)}</div></div>;
  return <div className="border border-[#e3dee5] bg-white p-8"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center"><div className="swipe-card border border-[#e6e1e7] p-5"><RadioTower className="mx-auto h-6 w-6" style={{color:accent}}/><p className="mt-3 text-xs font-semibold">Source</p></div><Waypoints className="h-5 w-5" style={{color:accent}}/><div className="swipe-card border border-[#e6e1e7] p-5"><Network className="mx-auto h-6 w-6" style={{color:accent}}/><p className="mt-3 text-xs font-semibold">Destination</p></div></div></div>;
}

export default async function StreamOpsModulePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const m=streamOpsModules.find(x=>x.slug===slug); if(!m)notFound();
  const idx=streamOpsModules.findIndex(x=>x.slug===slug); const next=streamOpsModules[(idx+1)%streamOpsModules.length]; const accent=accents[idx%accents.length]; const reverse=idx%2===1;
  const schema={"@context":"https://schema.org","@type":"SoftwareApplication",name:`Kashtrix StreamOps — ${m.title}`,applicationCategory:"MultimediaApplication",description:m.description,url:`${SITE.url}/streamops/${m.slug}`,featureList:m.bullets};
  return <main className="overflow-hidden bg-white"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className={`site-hero relative overflow-hidden border-b border-[#e7e2e8] ${idx===4||idx===11?"bg-[#171219] text-white":"bg-[#faf9fb]"}`}>
      <div className="absolute right-[-10%] top-[-35%] h-[520px] w-[520px] rounded-full opacity-15 blur-[105px]" style={{background:accent}}/>
      <div className="container-shell relative z-10 grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[.82fr_1.18fr]">
        <div className={reverse?"lg:order-2":""}><Link href="/streamops" className={`inline-flex items-center gap-2 text-xs font-medium ${idx===4||idx===11?"text-white/55":"text-[#746d77]"}`}><ArrowLeft className="h-3.5 w-3.5"/> StreamOps</Link><p className="mt-7 text-[11px] font-semibold uppercase tracking-[.14em]" style={{color:accent}}>Module {String(idx+1).padStart(2,"0")}</p><h1 className={`mt-3 text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[.98] tracking-[-.048em] ${idx===4||idx===11?"text-white":""}`}>{m.title}</h1><p className={`mt-5 max-w-2xl text-lg leading-8 ${idx===4||idx===11?"text-white/58":"text-[#6f6872]"}`}>{m.description}</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/request-demo" className="button-primary" style={{background:accent,borderColor:accent}}>Request demo <ArrowRight className="h-4 w-4"/></Link><a href="#details" className={`button-secondary ${idx===4||idx===11?"!border-white/15 !bg-white/[.04] !text-white":""}`}>Technical details</a></div></div>
        <div className={reverse?"lg:order-1":""}>{m.screenshot?<div className={`product-stage overflow-hidden ${idx===4||idx===11?"dark":""} ${m.slug==="telemetry-snmp"?"mx-auto max-w-[440px]":""}`}><Image src={m.screenshot} alt={`${m.title} StreamOps interface`} width={m.slug==="telemetry-snmp"?370:1900} height={m.slug==="telemetry-snmp"?414:900} priority sizes={m.slug==="telemetry-snmp"?"(max-width: 1024px) 80vw, 420px":"(max-width: 1024px) 100vw, 58vw"} className="h-auto w-full object-contain"/></div>:<TechnicalVisual slug={m.slug} accent={accent}/>}</div>
      </div>
    </section>

    <section id="details" className="section-pad bg-white"><div className="container-shell grid gap-10 lg:grid-cols-[.64fr_1.36fr]"><MotionReveal><p className="kicker" style={{color:accent}}>Operational scope</p><h2 className="heading mt-4">Purpose-built for this media task.</h2><p className="subheading mt-5">The module remains part of the StreamOps control plane, but the page and visual treatment follow the actual workflow rather than a repeated template.</p></MotionReveal><div className="border-t border-[#e5e0e6]">{m.bullets.map((b,i)=><MotionReveal key={b} delay={i*.035} className="grid gap-4 border-b border-[#e5e0e6] py-5 sm:grid-cols-[50px_1fr]"><span className="text-xs font-semibold" style={{color:accent}}>{String(i+1).padStart(2,"0")}</span><p className="text-sm leading-7 text-[#625b65]">{b}</p></MotionReveal>)}</div></div></section>

    <section className="border-y border-[#e7e2e8] bg-[#faf9fb] py-14"><div className="container-shell grid gap-px border border-[#e2dde4] bg-[#e2dde4] md:grid-cols-3">{[[Cable,"Broadcast-native","Built around signal paths, protocols and operational state."],[ShieldCheck,"Governed","Roles and audit controls stay attached to actions."],[Boxes,"Observable","System state remains visible across related modules."]].map(([Icon,t,d])=>{const I=Icon as typeof Cable;return <div key={String(t)} className="swipe-card bg-white p-6"><I className="h-5 w-5" style={{color:accent}}/><h3 className="mt-4 text-base font-semibold">{String(t)}</h3><p className="mt-2 text-sm leading-6 text-[#716a74]">{String(d)}</p></div>})}</div></section>

    <section className="py-14"><div className="container-shell flex flex-col justify-between gap-5 border-t border-[#e2dde4] pt-7 lg:flex-row lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em]" style={{color:accent}}>Next StreamOps module</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{next.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#716a74]">{next.description}</p></div><Link href={`/streamops/${next.slug}`} className="button-secondary shrink-0">Next module <ArrowRight className="h-4 w-4"/></Link></div></section>
    <InlineCTA eyebrow="StreamOps engineering" title={`Deploy ${m.title} in your media path.`} text="Share the sources, protocols, hardware, bitrate targets and operating model. We’ll align the StreamOps configuration to the workflow." accent={accent}/>
  </main>
}
