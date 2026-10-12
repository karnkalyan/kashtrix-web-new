import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  AudioLines,
  Camera,
  CheckCircle2,
  CircleDot,
  Cpu,
  Layers,
  Maximize2,
  Mic,
  MonitorPlay,
  Radio,
  SlidersHorizontal,
  Tv,
  Video,
  WandSparkles,
} from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { AnimatedBrandShapes } from "@/components/AnimatedBrandShapes";
import { ProductHardwareMockup } from "@/components/ProductHardwareMockup";
import { ScrollTriggeredFeaturePoints } from "@/components/ScrollTriggeredFeaturePoints";
import { InlineCTA } from "@/components/InlineCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kashtrix Studio — Live Television Production Switcher & Control Room Workspace",
  description:
    "Kashtrix Studio is an enterprise live production workspace for multicam television switching, 3D virtual set chroma keying, D3D multiviewing, dynamic CG overlays, and multichannel audio mixing.",
  alternates: { canonical: "/studio" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kashtrix Studio",
  applicationCategory: "MultimediaApplication",
  description:
    "Enterprise live television production workspace for multicam switching, 3D virtual sets, mosaic multiview, graphics and audio control.",
  url: `${SITE.url}/studio`,
};

const studioWorkstations = [
  {
    num: "01",
    tag: "Master Control Desk",
    title: "Master Live Production Switcher Desk",
    subtitle: "Program/Preview bus, hardware T-Bar fader, dual DDR playback, and automated macro execution.",
    image: "/media/broadcast/allapplication/Kashtrix Studio (2).png",
    width: 2878,
    height: 1798,
    description:
      "A complete broadcast production control room surface engineered for live talk shows, news broadcasts, esports, and sports events. Operators switch live camera feeds, trigger transitions with the tactile T-Bar, fire automated DDR clip packages, manage auxiliary buses, and encode multi-destination internet streams.",
    bullets: [
      "Seamless broadcast transitions: Cut, Auto, Mix (Dissolve), Wipe, Dip to Black, and 3D DVE moves with user-defined frame durations",
      "Multichannel audio console: Integrated 8-channel stereo console with parametric EQ, compression, solo/mute bus, and auto-follow-video crossfading",
      "Dual DDR media bins: Instant VT clip playback, stingers, commercials, and animated alpha bugs with auto-cue",
      "One-click macro automation: Trigger 'Start Show', 'Take Lower Third', or 'Stinger Transition' with synchronized audio",
    ],
  },
  {
    num: "02",
    tag: "Multiview Grid",
    title: "Program & Preview Multiview Confidence Stage",
    subtitle: "Full-fidelity multi-camera confidence grid with low-latency tally signaling and live audio bars.",
    image: "/media/broadcast/allapplication/Kashtrix Studio (1).png",
    width: 2878,
    height: 1798,
    description:
      "High-precision Direct3D11 multiviewer displaying all studio inputs, media players, and master buses simultaneously. Anchors, directors, and technical operators keep visual confidence across all live cameras with distinct tally borders (Red for Program, Green for Preview).",
    bullets: [
      "Zero-latency GPU rasterization: Real-time camera angles alongside master Program and Preview confidence outputs",
      "Dynamic on-screen tally borders: Red for On-Air Program, Green for Cued Preview, and Amber for Aux routing",
      "Multichannel PPM and VU peak audio: Overload-detecting level indicators per camera channel with peak hold",
      "Signal line-up calibration: Integrated SMPTE color bars and test pattern generator built into auxiliary channels",
    ],
  },
  {
    num: "03",
    tag: "3D Virtual Sets",
    title: "3D Virtual Studio & Canvas Stage Editor",
    subtitle: "Real-time GPU green-screen chroma keying, anchor positioning, and interactive 3D virtual sets.",
    image: "/media/broadcast/allapplication/Kashtrix Studio (3).png",
    width: 1935,
    height: 1192,
    description:
      "Transform modest studio spaces into state-of-the-art virtual sets. The GPU stage canvas maps anchor talent over photorealistic 3D sets with real-time despill, depth masking, and coordinated pan/tilt virtual camera navigation.",
    bullets: [
      "Hardware-accelerated chroma keyer: Fine hair edge feathering, shadow retention, and green spill suppression",
      "Interactive 3D UV stage coordinates: Precision anchor placement behind virtual desks, monitors, and studio walls",
      "Virtual camera preset tracking: Instant switching between wide anchor shots, over-the-shoulder monitors, and close-ups",
      "Integrated video wall feeds: Live projection of remote Zoom/vMix callers or live graphics onto virtual studio screens",
    ],
  },
  {
    num: "04",
    tag: "Dynamic Overlays",
    title: "Live Lower-Third & Graphic Overlay Designer",
    subtitle: "On-the-fly text replacement, breaking news tickers, and scoreboard graphics during live production.",
    image: "/media/broadcast/allapplication/Kashtrix Studio (4).png",
    width: 2025,
    height: 1222,
    description:
      "A fast, dedicated graphics layer designer allowing studio operators to compose, edit, and fire dynamic title overlays, lower thirds, presenter tags, and emergency news tickers without interrupting ongoing program playback.",
    bullets: [
      "Live data entry & fast edits: Update guest names, titles, and breaking news banners while the graphic is cued or on air",
      "Sub-pixel typography rendering: Direct3D crisp font rasterization with broadcast safe-title and safe-action boundary guides",
      "Downstream alpha channel keying: 32-bit RGBA Fill and Key overlays with zero GPU dropouts or frame tearing",
      "Multi-layer template stacking: Fire channel bugs, live clock, lower third, and news crawl simultaneously without collisions",
    ],
  },
  {
    num: "05",
    tag: "I/O & Ingest",
    title: "Device Routing Matrix & Media Ingest Dock",
    subtitle: "Hardware SDI/HDMI baseband capture, NDI network streams, USB cameras, and high-speed asset bin.",
    image: "/media/broadcast/allapplication/Kashtrix Studio (5).png",
    width: 2167,
    height: 1264,
    description:
      "The input backbone connecting physical studio equipment to Kashtrix Studio. Configure Blackmagic DeckLink SDI inputs, AJA capture devices, NDI 6 low-latency IP streams, RTSP remotes, and direct NVMe disk recording in high-bitrate ProRes or MP4.",
    bullets: [
      "Comprehensive device support: Blackmagic DeckLink 12G-SDI, HDMI, AJA Kona, Magewell, and USB3 UVC cameras",
      "Low-latency NDI 6 IP studio network discovery: Bi-directional PTZ camera control and tally",
      "Continuous ISO recording: Individual camera feeds alongside master PGM recording to high-speed NVMe storage",
      "Instant media bin loading: Drag and drop video clips, stinger transitions, and audio beds directly into live DDR channels",
    ],
  },
];

const studioFeatures = [
  {
    icon: MonitorPlay,
    title: "Program & Preview Bus",
    text: "True two-bus switching architecture allowing directors to inspect composition and transitions before cutting to air.",
  },
  {
    icon: SlidersHorizontal,
    title: "Hardware Fader & Transitions",
    text: "Support for physical USB/MIDI control surfaces, motorized T-Bars, and software transitions with sub-frame precision.",
  },
  {
    icon: AudioLines,
    title: "Multichannel Audio Console",
    text: "Comprehensive audio control with EQ, dynamics, delay compensation, auto-mix, and headphone monitoring.",
  },
  {
    icon: WandSparkles,
    title: "3D Virtual Sets & Keyer",
    text: "GPU-accelerated chroma keying with despill algorithms, virtual camera tracking, and photo-realistic stage rendering.",
  },
  {
    icon: Tv,
    title: "Mosaic Multiviewer",
    text: "Customizable multi-camera confidence grid with audio level meters, safe areas, and dynamic tally borders.",
  },
  {
    icon: Radio,
    title: "Direct Streaming & ISO Record",
    text: "Simultaneous multi-bitrate RTMP/SRT streaming to CDNs while capturing master PGM and isolated camera feeds to disk.",
  },
];

export default function StudioPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#12051c] text-[#171219] dark:text-[#f3edf7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION - CLEAN NATIVE WORKSTATION FRAME
      ───────────────────────────────────────────────────────────── */}
      <section className="site-hero relative overflow-hidden border-b border-[#e7e1e9] bg-[#fcfbfc] dark:border-[#381647] dark:bg-[#150722]">
        <AnimatedBrandShapes />
        <div className="container-shell relative z-10 grid min-h-[700px] items-center gap-12 py-16 lg:grid-cols-[.85fr_1.15fr]">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 border border-[#ded3e3] dark:border-[#4d1f60] bg-white dark:bg-[#200c2e] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-[#6f2b8f] dark:text-[#c084fc]">
              <span className="h-2 w-2 rounded-full bg-[#6f2b8f] dark:bg-[#c084fc] animate-pulse" /> Live Television Production Workspace
            </div>
            <h1 className="mt-6 text-[clamp(2.8rem,5vw,4.8rem)] font-bold leading-[.98] tracking-[-.05em] text-[#171219] dark:text-white">
              Kashtrix <span className="text-[#4b1b63] dark:text-[#c084fc]">Studio</span>
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-8 text-[#6d6670] dark:text-[#b4a4be]">
              A specialized broadcast production surface engineered for live switching, multicam monitoring, 3D virtual sets, dynamic CG overlays, and multichannel audio mixing — built for directors who demand instant tactile response.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-demo" className="button-primary !border-[#4b1b63] !bg-[#4b1b63] hover:!bg-[#5e217d] dark:!border-[#6f2b8f] dark:!bg-[#6f2b8f] !px-6 !py-3 !text-sm">
                Request Studio demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#workstations" className="button-secondary !px-5 !py-3 !text-sm">
                Explore Studio Workstations
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 border-y border-[#e2dde7] dark:border-[#381647] py-4 text-sm">
              <div>
                <p className="font-bold text-[#171219] dark:text-white">PGM / PVW</p>
                <p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">True two-bus switching</p>
              </div>
              <div className="border-l border-[#e2dde7] dark:border-[#381647] pl-5">
                <p className="font-bold text-[#171219] dark:text-white">Virtual Sets</p>
                <p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">Real-time 3D chroma key</p>
              </div>
              <div className="border-l border-[#e2dde7] dark:border-[#381647] pl-5">
                <p className="font-bold text-[#171219] dark:text-white">Multiviewer</p>
                <p className="mt-1 text-xs text-[#817984] dark:text-[#a090ab]">Low-latency tally grid</p>
              </div>
            </div>
          </MotionReveal>

          {/* Studio Hero Display with Server & Monitor Mockup */}
          <MotionReveal delay={0.06} className="relative w-full">
            <ProductHardwareMockup
              image="/media/broadcast/allapplication/Kashtrix Studio (2).png"
              alt="Kashtrix Studio Master Production Desk"
              serverLabel="STUDIO PRODUCTION DESK"
              accent="#6f2b8f"
              priority
            />
          </MotionReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CORE CAPABILITIES GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#ebe6ec] bg-[#faf9fa] dark:border-[#381647] dark:bg-[#160822] py-14">
        <div className="container-shell">
          <MotionReveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6f2b8f] dark:text-[#c084fc]">
              Control Room Architecture
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#171219] dark:text-white">
              Built for the Speed of Live Decisions
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#6d6670] dark:text-[#a090ab]">
              Every control, fader, and monitor is grouped by live production task so technical directors never lose sight of live output.
            </p>
          </MotionReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studioFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <MotionReveal key={item.title} delay={i * 0.03}>
                  <div className="h-full rounded-[5px] border border-[#e5dfe6] dark:border-[#381647] bg-white dark:bg-[#1d0b2a] p-6 transition hover:border-[#6f2b8f] hover:shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#f4eef7] text-[#6f2b8f] dark:bg-[#2e0e3d] dark:text-[#c084fc]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-[#171219] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#6f6871] dark:text-[#b4a4be]">{item.text}</p>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5 DEDICATED STUDIO WORKSTATIONS SHOWCASE
          Real uploaded screenshots from public/media/broadcast/allapplication
      ───────────────────────────────────────────────────────────── */}
      <section id="workstations" className="py-20 bg-white dark:bg-[#12051c]">
        <div className="container-shell">
          <MotionReveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#6f2b8f] dark:text-[#c084fc]">
              Operational Modules & Workstations
            </p>
            <h2 className="mt-2 text-[clamp(2.1rem,3.5vw,3.2rem)] font-bold tracking-tight text-[#171219] dark:text-white">
              5 Dedicated Production Surfaces
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6a636f] dark:text-[#b4a4be]">
              Kashtrix Studio divides production responsibilities into focused, high-performance workstation views — from live multicam switching and 3D virtual sets to on-air graphics and hardware I/O capture.
            </p>
          </MotionReveal>

          <div className="mt-14 space-y-20">
            {studioWorkstations.map((ws, i) => {
              const isEven = i % 2 === 1;
              return (
                <div
                  key={ws.title}
                  className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center pt-10 first:pt-0 border-t border-[#f0eaf2] dark:border-[#280f38] first:border-t-0"
                >
                  {/* Screenshot in Clean Native Frame */}
                  <MotionReveal
                    delay={0.04}
                    className={`relative w-full ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="overflow-hidden rounded-[5px] border border-[#e4dee6] dark:border-[#381647] bg-[#12051c] shadow-sm transition hover:shadow-md">
                      <Image
                        src={ws.image}
                        alt={ws.title}
                        width={ws.width}
                        height={ws.height}
                        sizes="(max-width: 1024px) 100vw, 720px"
                        className="block h-auto w-full object-contain"
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#8e8593] dark:text-[#a090ab]">
                      <span>{ws.tag} · Kashtrix Studio</span>
                      <span className="text-[#6f2b8f] dark:text-[#c084fc] font-bold">{ws.width} × {ws.height} Native</span>
                    </div>
                  </MotionReveal>

                  {/* Workstation Details & Capabilities */}
                  <MotionReveal
                    delay={0.08}
                    className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#6f2b8f] dark:text-[#c084fc]">{ws.num}</span>
                      <span className="rounded-[3px] bg-[#f5eff8] dark:bg-[#2e0e3d] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#6f2b8f] dark:text-[#c084fc]">
                        {ws.tag}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#171219] dark:text-white">
                      {ws.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                      {ws.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#6a636f] dark:text-[#b4a4be]">
                      {ws.description}
                    </p>

                    <div className="mt-6 border-t border-[#f0eaf2] dark:border-[#381647] pt-5">
                      <ScrollTriggeredFeaturePoints items={ws.bullets} accent="#6f2b8f" />
                    </div>
                  </MotionReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <InlineCTA
        eyebrow="Kashtrix Studio Production Desk"
        title="Elevate Your Live Television Production."
        text="Whether operating a broadcast news control room, OB production van, or multi-camera studio, Kashtrix Studio delivers rock-solid stability and sub-frame switching accuracy."
        accent="#4b1b63"
      />
    </main>
  );
}
