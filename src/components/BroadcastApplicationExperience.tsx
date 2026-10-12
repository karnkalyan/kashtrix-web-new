import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Gauge, Network, Radio,
  ShieldCheck, TimerReset, Workflow,
} from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollTriggeredFeaturePoints } from "@/components/ScrollTriggeredFeaturePoints";
import { InlineCTA } from "@/components/InlineCTA";
import { ApplicationScreenshotsShowcase } from "@/components/ApplicationScreenshotsShowcase";
import { broadcastApps } from "@/data/broadcast";

type App = (typeof broadcastApps)[number];

type Profile = {
  eyebrow:string;
  short:string;
  className:string;
  tags:string[];
  metrics:[string,string][];
};

const primaryImageSize: Record<string, { width: number; height: number }> = {
  "/media/broadcast/broadcast-16.png": { width: 2878, height: 1795 },
  "/media/broadcast/broadcast-28.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-01.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-08.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-18.png": { width: 2491, height: 1395 },
  "/media/broadcast/broadcast-29.png": { width: 2337, height: 1318 },
  "/media/broadcast/broadcast-32.png": { width: 2278, height: 1324 },
  "/media/broadcast/broadcast-23.png": { width: 2275, height: 1326 },
  "/media/broadcast/broadcast-19.png": { width: 2166, height: 1264 },
  "/media/broadcast/broadcast-21.png": { width: 1951, height: 1207 },
  "/media/broadcast/broadcast-22.png": { width: 1917, height: 1194 },
  "/media/broadcast/broadcast-31.png": { width: 2188, height: 1249 },
  "/media/broadcast/broadcast-25.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-26.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-30.png": { width: 2878, height: 1795 },
  "/media/broadcast/broadcast-20.png": { width: 2281, height: 1228 },
};

const profiles:Record<string,Profile> = {
  "master-control-playout":{eyebrow:"Master control",short:"Frame-accurate execution for the final path to air.",className:"app-master",tags:["PGM / PVW","SMPTE timing","SCTE-35","24/7"],metrics:[["PGM + PVW","Independent buses"],["SMPTE","Frame timing"],["24/7","Continuous playout"]]},
  "output-engine":{eyebrow:"Transmission",short:"Baseband, IP, DVB and OTT output from one transmission engine.",className:"app-output",tags:["12G-SDI","NDI 6","DVB-TS","SRT / HLS"],metrics:[["12G-SDI","Baseband"],["NDI 6","Studio IP"],["SRT / HLS","Internet"]]},
  "cg-editor":{eyebrow:"Motion graphics",short:"Design automated Coming Up/Next promos, Weather API feeds, Back In break countdowns and motion templates.",className:"app-cg-editor",tags:["Coming Up / Next","Weather API","Back In Timer","Bezier Curves","Data Binding"],metrics:[["Now / Next","Promos"],["Weather API","Live data"],["Back In","Countdown"]]},
  "cg-controller":{eyebrow:"Live graphics",short:"Preview, take, update and clear graphics during live transmission.",className:"app-cg-controller",tags:["PVW / PGM","Layer routing","Quick edit","Auto-out"],metrics:[["PVW","Prepare"],["PGM","Take"],["Layers","Independent output"]]},
  "channel-controller":{eyebrow:"Channel control",short:"Coordinate channels, routes and failover from a master switching surface.",className:"app-channel",tags:["Multi-channel","Router matrix","Signal health","Failover"],metrics:[["N-channel","Supervision"],["Router","Crosspoints"],["Failover","Signal response"]]},
  "playlist-editor":{eyebrow:"Rundown",short:"Assemble the transmission day with frame-aware events and live-safe edits.",className:"app-playlist",tags:["Frame timing","Auto-follow","Hard starts","Secondary events"],metrics:[["Frame","Accurate events"],["Live","Safe edits"],["Hard start","Timed events"]]},
  scheduler:{eyebrow:"Scheduling",short:"Turn programming and commercial plans into a repeatable 24/7 grid.",className:"app-scheduler",tags:["Calendar grid","Ad traffic","As-run","EPG"],metrics:[["24 h","Day grid"],["Recurring","Program slots"],["As-run","Audit trail"]]},
  "media-asset-management":{eyebrow:"Media library",short:"Catalog, proxy and move assets through production storage tiers.",className:"app-mam",tags:["Metadata","Proxy","HSM","Rights"],metrics:[["Proxy","Background"],["HSM","Storage tiers"],["Rights","Lifecycle"]]},
  "file-manager":{eyebrow:"Media ingest",short:"Move and normalize media quickly while preserving file integrity.",className:"app-files",tags:["Hot folders","SHA-256","Transcode","Transfer"],metrics:[["SHA-256","Verification"],["Watch","Hot folders"],["Auto","Normalize"]]},
  "ingest-server":{eyebrow:"Recording",short:"Capture SDI and IP sources with broadcast master profiles and growing files.",className:"app-ingest",tags:["SDI / IP","MXF / MOV","Growing files","16ch audio"],metrics:[["16 ch","Audio"],["MXF / MOV","Masters"],["Growing","Edit while ingest"]]},
  "input-engine":{eyebrow:"Signal acquisition",short:"Normalize physical and network inputs into stable internal live feeds.",className:"app-input",tags:["SDI / HDMI","SRT / NDI","Frame sync","De-interlace"],metrics:[["SDI / HDMI","Physical"],["SRT / NDI","Network"],["Sync","Frame aligned"]]},
  "qc-controller":{eyebrow:"Quality control",short:"Validate loudness, picture integrity and stream syntax before transmission.",className:"app-qc",tags:["EBU R128","BS.1770","Freeze detect","A/V sync"],metrics:[["R128","Loudness"],["BS.1770","True peak"],["QC","Decode checks"]]},
  multiview:{eyebrow:"Monitoring",short:"View program, preview and live sources in a low-latency confidence mosaic.",className:"app-multiview",tags:["Mosaic","PPM / VU","Tally","Timecode"],metrics:[["2×2 → 8+1","Layouts"],["PPM / VU","Meters"],["PGM / PVW","Tally"]]},
  nrcs:{eyebrow:"Newsroom",short:"Synchronize stories, scripts, media and graphics with the broadcast rundown.",className:"app-nrcs",tags:["MOS 2.8.4","Live sync","Story media","Dual calendar"],metrics:[["MOS 2.8.4","Integration"],["Live","Rundown sync"],["Dual","Calendar"]]},
  prompter:{eyebrow:"Teleprompter",short:"Smooth, controllable script movement for anchors and presenters.",className:"app-prompter",tags:["Sub-pixel scroll","Mirror / flip","Foot pedal","NRCS link"],metrics:[["Sub-pixel","Smooth scroll"],["Mirror","Optical modes"],["NRCS","Live link"]]},
  "ha-controller":{eyebrow:"High availability",short:"Keep primary and backup playout states synchronized and ready to switch.",className:"app-ha",tags:["1+1","N+1","Heartbeat","State mirror"],metrics:[["1+1","Redundancy"],["N+1","Topology"],["Frame lock","State mirror"]]},
};

function ProductFrame({app,dark=false}:{app:App;dark?:boolean}){
  const src=app.screenshots[0];
  const imageSize=primaryImageSize[src] ?? {width:1800,height:1125};
  return <div className={`product-stage overflow-hidden rounded-[5px] ${dark?"dark":"light"}`}>
    <Image src={src} alt={`${app.title} interface`} width={imageSize.width} height={imageSize.height} priority sizes="(max-width: 980px) 94vw, 760px" className="h-auto w-full object-contain"/>
  </div>;
}

function HeroCopy({app,profile,dark=false,center=false}:{app:App;profile:Profile;dark?:boolean;center?:boolean}){
  return <div className={center?"text-center":""}>
    <Link href="/broadcast-playout" className={`inline-flex items-center gap-2 text-xs font-medium ${dark?"text-white/55":"text-[#766f78]"}`}><ArrowLeft className="h-3.5 w-3.5"/> Broadcast Playout Suite</Link>
    <p className="mt-7 text-[11px] font-semibold uppercase tracking-[.15em]" style={{color:app.accent}}>{profile.eyebrow}</p>
    <h1 className={`mt-3 text-[clamp(2.7rem,5.2vw,5rem)] font-semibold leading-[.98] tracking-[-.05em] ${dark?"text-white":"text-[#171219]"}`}>{app.title}</h1>
    <p className={`mt-5 text-[clamp(1rem,1.35vw,1.14rem)] leading-8 ${center?"mx-auto max-w-3xl":"max-w-2xl"} ${dark?"text-white/60":"text-[#6f6872]"}`}>{app.purpose}</p>
    <div className={`mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs ${center?"justify-center":""}`}>{profile.tags.map(t=><span key={t} className={`border-b pb-1 ${dark?"border-white/15 text-white/65":"border-[#ddd6df] text-[#5f5862]"}`}>{t}</span>)}</div>
    <div className={`mt-8 flex flex-wrap gap-3 ${center?"justify-center":""}`}><Link href="/request-demo" className="button-primary" style={{background:app.accent,borderColor:app.accent}}>Request demo <ArrowRight className="h-4 w-4"/></Link><a href="#capabilities" className={`button-secondary ${dark?"!border-white/15 !bg-white/[.04] !text-white":""}`}>Capabilities</a></div>
  </div>;
}

function MetricStrip({profile,dark=false}:{profile:Profile;dark?:boolean}){
  return <div className={`grid grid-cols-3 border-y ${dark?"border-white/10":"border-[#e3dde5]"}`}>{profile.metrics.map(([v,l],i)=><div key={l} className={`py-4 ${i?dark?"border-l border-white/10 pl-5":"border-l border-[#e3dde5] pl-5":""}`}><p className={`text-base font-semibold ${dark?"text-white":"text-[#211b23]"}`}>{v}</p><p className={`mt-1 text-[10px] uppercase tracking-[.12em] ${dark?"text-white/35":"text-[#908893]"}`}>{l}</p></div>)}</div>;
}

function ApplicationHero({app,profile}:{app:App;profile:Profile}){
  switch(app.slug){
    case "master-control-playout":
      return <section className="site-hero app-pattern-master bg-[#f8f6f8]"><div className="container-shell grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.72fr_1.28fr]"><div><HeroCopy app={app} profile={profile}/><div className="mt-8"><MetricStrip profile={profile}/></div></div><div className="relative"><div className="absolute -left-4 top-8 bottom-8 w-1 bg-[#6d28d9]"/><ProductFrame app={app}/></div></div></section>;
    case "output-engine":
      return <section className="site-hero relative overflow-hidden bg-[#eefbfd]"><div className="absolute inset-x-0 top-[42%] h-px bg-[#8bcbd9]/40"/><div className="container-shell grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr]"><div><HeroCopy app={app} profile={profile}/><div className="mt-8 grid grid-cols-4 gap-px border border-[#cce4e9] bg-[#cce4e9] text-center text-[10px] font-semibold uppercase tracking-[.12em] text-[#4c7580]">{["SDI","NDI","DVB","OTT"].map(x=><div key={x} className="bg-white py-3">{x}</div>)}</div></div><div className="relative"><div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.14em] text-[#477782]"><span>Transmission matrix</span><span>Baseband → IP → CDN</span></div><ProductFrame app={app}/></div></div></section>;
    case "cg-editor":
      return <section className="site-hero app-pattern-cg bg-[#fcf7fc]"><div className="container-shell py-16"><div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><HeroCopy app={app} profile={profile}/><div className="relative"><div className="absolute -left-5 -top-5 border border-[#dcb9df] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8a3a91]">Canvas / Timeline</div><ProductFrame app={app}/></div></div><div className="mt-8"><MetricStrip profile={profile}/></div></div></section>;
    case "cg-controller":
      return <section className="site-hero bg-[#fff7f8]"><div className="container-shell py-16"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><HeroCopy app={app} profile={profile}/><div className="mt-9 grid grid-cols-2 gap-px border border-[#efd8df] bg-[#efd8df]"><div className="swipe-card bg-white p-4"><p className="text-[10px] uppercase tracking-[.14em] text-[#9a6d7b]">Preview</p><p className="mt-2 text-lg font-semibold">Prepare graphic</p></div><div className="swipe-card bg-[#26141b] p-4 text-white"><p className="text-[10px] uppercase tracking-[.14em] text-white/40">Program</p><p className="mt-2 text-lg font-semibold text-[#ef779d]">Take to air</p></div></div></div><ProductFrame app={app}/></div></div></section>;
    case "channel-controller":
      return <section className="site-hero app-pattern-routing bg-[#fffaf1]"><div className="container-shell grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.82fr_1.18fr]"><div><HeroCopy app={app} profile={profile}/><div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs"><div className="border border-[#ead9ba] bg-white p-3">PLAYOUT A</div><ArrowRight className="h-4 w-4 text-[#b56a08]"/><div className="border border-[#ead9ba] bg-white p-3">ROUTER / OUTPUT</div></div></div><ProductFrame app={app}/></div></section>;
    case "playlist-editor":
      return <section className="site-hero app-pattern-timeline bg-white"><div className="container-shell py-16"><HeroCopy app={app} profile={profile} center/><div className="mx-auto mt-10 max-w-[1080px]"><ProductFrame app={app}/></div><div className="mx-auto mt-8 max-w-[1080px]"><MetricStrip profile={profile}/></div></div></section>;
    case "scheduler":
      return <section className="site-hero app-pattern-calendar bg-[#f8fcfa]"><div className="container-shell grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.72fr_1.28fr]"><div><div className="mb-8 grid grid-cols-7 border-y border-[#d7e8df] py-2 text-center text-[9px] uppercase tracking-[.1em] text-[#719083]">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><span key={d}>{d}</span>)}</div><HeroCopy app={app} profile={profile}/></div><ProductFrame app={app}/></div></section>;
    case "media-asset-management":
      return <section className="site-hero bg-[#f5f8fd]"><div className="container-shell py-16"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><HeroCopy app={app} profile={profile}/><div><div className="mb-3 grid grid-cols-[1fr_auto] gap-3"><div className="border border-[#d9e2f0] bg-white px-4 py-3 text-sm text-[#7c8796]">Search title, House ID, rights, storage…</div><div className="border border-[#d9e2f0] bg-white px-4 py-3 text-xs font-semibold text-[#2f67c8]">FILTER</div></div><ProductFrame app={app}/></div></div></div></section>;
    case "file-manager":
      return <section className="site-hero bg-[#fff9f4]"><div className="container-shell grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.75fr_1.25fr]"><div><HeroCopy app={app} profile={profile}/><div className="mt-8 border-l-2 border-[#d65a12] pl-5 text-sm leading-7 text-[#71685f]">Watch folder → verify checksum → normalize media → hand off to playout storage.</div></div><ProductFrame app={app}/></div></section>;
    case "ingest-server":
      return <section className="site-hero bg-[#171416] text-white"><div className="container-shell grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[.72fr_1.28fr]"><div><div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#ff9a9a]"><span className="h-2.5 w-2.5 rounded-full bg-[#df3b3b] shadow-[0_0_0_6px_rgba(223,59,59,.10)]"/> RECORD READY</div><HeroCopy app={app} profile={profile} dark/><div className="mt-8"><MetricStrip profile={profile} dark/></div></div><ProductFrame app={app} dark/></div></section>;
    case "input-engine":
      return <section className="site-hero bg-[#f3faf8]"><div className="container-shell py-16"><div className="grid gap-10 lg:grid-cols-[.74fr_1.26fr] lg:items-center"><HeroCopy app={app} profile={profile}/><div><div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.14em] text-[#4e7a73]"><span>Sources</span><span>Frame sync</span><span>Internal feeds</span></div><ProductFrame app={app}/></div></div><div className="signal-line mt-10"/></div></section>;
    case "qc-controller":
      return <section className="site-hero bg-[#fafcf5]"><div className="container-shell grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.8fr_1.2fr]"><div><HeroCopy app={app} profile={profile}/><div className="mt-8 grid gap-2 text-sm">{["Loudness","Black / freeze","Aspect ratio","Stream syntax"].map(x=><div key={x} className="flex items-center justify-between border-b border-[#dfe7cf] py-2"><span>{x}</span><CheckCircle2 className="h-4 w-4 text-[#668c1c]"/></div>)}</div></div><ProductFrame app={app}/></div></section>;
    case "multiview":
      return <section className="site-hero bg-[#121014] text-white"><div className="container-shell py-16"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center"><HeroCopy app={app} profile={profile} dark/><ProductFrame app={app} dark/></div><div className="mt-6 grid grid-cols-6 gap-2">{["PGM","PVW","CAM 1","CAM 2","GFX","REMOTE"].map((x,i)=><div key={x} className="border border-white/10 bg-white/[.03] px-3 py-2 text-center text-[10px] tracking-[.12em] text-white/45"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{background:i===0?"#ef4444":i===1?"#22c55e":"#8241b5"}}/>{x}</div>)}</div></div></section>;
    case "nrcs":
      return <section className="site-hero app-pattern-news bg-[#f5fbfe]"><div className="border-b border-[#dceaf1] bg-white py-2 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-[#6d8794]">STORY · SCRIPT · MOS · RUNDOWN · PLAYOUT</div><div className="container-shell grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.74fr_1.26fr]"><HeroCopy app={app} profile={profile}/><ProductFrame app={app}/></div></section>;
    case "prompter":
      return <section className="site-hero bg-[#0e0d0f] text-white"><div className="container-shell grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[.86fr_1.14fr]"><div><p className="text-[clamp(2.4rem,4.8vw,4.8rem)] font-medium leading-[1.04] tracking-[-.04em] text-white">“Read clean.<br/><span className="text-[#d1ac42]">Stay on pace.</span><br/>Stay on camera.”</p><div className="mt-9 border-t border-white/10 pt-8"><HeroCopy app={app} profile={profile} dark/></div></div><ProductFrame app={app} dark/></div></section>;
    case "ha-controller":
      return <section className="site-hero bg-[#f5f7f8]"><div className="container-shell py-16"><HeroCopy app={app} profile={profile} center/><div className="mx-auto mt-9 grid max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="swipe-card border border-[#dfe4e8] bg-white p-4"><p className="text-[10px] uppercase tracking-[.13em] text-[#7c8790]">Primary</p><p className="mt-2 text-sm font-semibold text-[#168765]">ONLINE · FRAME LOCKED</p></div><TimerReset className="h-5 w-5 text-[#536273]"/><div className="swipe-card border border-[#dfe4e8] bg-white p-4"><p className="text-[10px] uppercase tracking-[.13em] text-[#7c8790]">Backup</p><p className="mt-2 text-sm font-semibold text-[#5d6974]">READY · MIRRORED</p></div></div><div className="mx-auto mt-8 max-w-[1050px]"><ProductFrame app={app}/></div></div></section>;
    default:
      return <section className="site-hero bg-white"><div className="container-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-2"><HeroCopy app={app} profile={profile}/><ProductFrame app={app}/></div></section>;
  }
}

function BulletList({items,accent}:{items:readonly string[];accent:string}){
  return <div className="mt-4"><ScrollTriggeredFeaturePoints items={items} accent={accent}/></div>;
}

function CapabilityRows({app}:{app:App}){
  return <div className="border-t border-[#e5e0e6]">{app.capabilities.map((cap,i)=><MotionReveal key={cap.title} delay={(i%3)*.03} className="grid gap-4 border-b border-[#e5e0e6] py-7 md:grid-cols-[70px_310px_1fr]"><span className="text-xs font-semibold text-[#9a929c]">{String(i+1).padStart(2,"0")}</span><h3 className="text-lg font-semibold tracking-[-.02em]">{cap.title}</h3><BulletList items={cap.details} accent={app.accent}/></MotionReveal>)}</div>;
}

function CapabilityColumns({app}:{app:App}){
  return <div className="grid border border-[#e4dfe5] md:grid-cols-2">{app.capabilities.map((cap,i)=><MotionReveal key={cap.title} delay={(i%2)*.04} className={`p-6 ${i%2?"md:border-l":""} ${i>=2?"border-t":""} border-[#e4dfe5]`}><p className="text-[10px] font-semibold uppercase tracking-[.14em]" style={{color:app.accent}}>{String(i+1).padStart(2,"0")}</p><h3 className="mt-3 text-lg font-semibold tracking-[-.02em]">{cap.title}</h3><BulletList items={cap.details} accent={app.accent}/></MotionReveal>)}</div>;
}

function CapabilityRail({app}:{app:App}){
  return <div className="grid gap-4 lg:grid-cols-[220px_1fr]"><div className="hidden lg:block"><div className="sticky top-28 border-l border-[#ddd6df] pl-5"><p className="text-xs font-semibold uppercase tracking-[.14em]" style={{color:app.accent}}>Workflow areas</p>{app.capabilities.map((c,i)=><p key={c.title} className="mt-4 text-xs leading-5 text-[#77707a]">{String(i+1).padStart(2,"0")} · {c.title}</p>)}</div></div><div className="grid gap-8">{app.capabilities.map((cap,i)=><MotionReveal key={cap.title} className="grid gap-4 border-b border-[#e4dfe5] pb-8 sm:grid-cols-[70px_1fr]"><span className="text-3xl font-light tracking-[-.04em]" style={{color:app.accent}}>{String(i+1).padStart(2,"0")}</span><div><h3 className="text-xl font-semibold tracking-[-.025em]">{cap.title}</h3><BulletList items={cap.details} accent={app.accent}/></div></MotionReveal>)}</div></div>;
}

function CapabilitySection({app,profile}:{app:App;profile:Profile}){
  const columnApps=["cg-controller","media-asset-management","qc-controller","multiview","ha-controller"];
  const railApps=["output-engine","channel-controller","file-manager","input-engine","nrcs"];
  return <section id="capabilities" className="section-pad bg-white"><div className="container-shell"><MotionReveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="kicker" style={{color:app.accent}}>Capabilities</p><h2 className="heading mt-4">Built around the {profile.eyebrow.toLowerCase()} workflow.</h2></div><p className="subheading max-w-2xl lg:justify-self-end">The page uses the interface and operating model of this application only. Screenshots from unrelated Kashtrix products are not reused here.</p></MotionReveal><div className="mt-12">{columnApps.includes(app.slug)?<CapabilityColumns app={app}/>:railApps.includes(app.slug)?<CapabilityRail app={app}/>:<CapabilityRows app={app}/>}</div></div></section>;
}

function SystemDetails({app,next}:{app:App;next:App}){
  const details:[[typeof Radio,string,string],[typeof Radio,string,string],[typeof Radio,string,string],[typeof Radio,string,string]]=[
    [Radio,"Role",app.label],[Workflow,"Workspace",app.title],[ShieldCheck,"Platform","Windows x64"],[Gauge,"Operation","24/7 broadcast"],
  ];
  return <section className="border-y border-[#e8e3e9] bg-[#faf9fa] py-14"><div className="container-shell"><div className="grid gap-px border border-[#e4dfe5] bg-[#e4dfe5] md:grid-cols-4">{details.map(([Icon,k,v])=><div key={k} className="swipe-card bg-white p-5"><Icon className="h-4 w-4" style={{color:app.accent}}/><p className="mt-4 text-[10px] font-semibold uppercase tracking-[.13em] text-[#928a95]">{k}</p><p className="mt-2 text-sm font-semibold leading-6">{v}</p></div>)}</div><div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#ded8e0] pt-7 lg:flex-row lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em]" style={{color:app.accent}}>Next application</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{next.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#716a74]">{next.purpose}</p></div><Link href={`/broadcast-playout/${next.slug}`} className="button-secondary shrink-0">Explore {next.label} <ArrowRight className="h-4 w-4"/></Link></div></div></section>;
}

export function BroadcastApplicationExperience({app,next}:{app:App;next:App}){
  const profile=profiles[app.slug];
  return <main className={`${profile.className} overflow-hidden bg-white`}>
    <ApplicationHero app={app} profile={profile}/>
    <ApplicationScreenshotsShowcase
      appSlug={app.slug}
      appTitle={app.title}
      appLabel={app.label}
      accent={app.accent}
      screenshots={app.screenshots}
    />
    <CapabilitySection app={app} profile={profile}/>
    <SystemDetails app={app} next={next}/>
    <InlineCTA eyebrow={`${app.label} deployment`} title={`Evaluate ${app.title} for your facility.`} text="Share your channel count, video standards, hardware interfaces, storage paths and automation requirements. We’ll map configuration and integration options around the actual broadcast workflow." accent={app.accent}/>
  </main>;
}
