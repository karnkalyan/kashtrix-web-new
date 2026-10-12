"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";

const streamOpsPillars = [
  {
    id: "transcoding",
    number: "01",
    label: "Live Transcoding",
    title: "Live TV Channel Composer & Transcoding Grid",
    role: "Transform raw SDI/HDMI, SRT, RTMP, and UDP feeds into pristine broadcast channels with hardware GPU acceleration.",
    tech: "NVIDIA NVENC/CUDA · Intel QSV · AMD AMF · v210 · MPEG-2 4:2:2 · HEVC · DVB Multicast",
    accent: "#a62573",
    image: "/media/streamops/streamops-04.png",
    bullets: [
      "Hardware-accelerated scaling via NVIDIA NVENC, Intel QuickSync (QSV), AMD AMF, and Apple VideoToolbox",
      "Broadcast codecs: H.264, H.265/HEVC, MPEG-2 (4:2:0 & 4:2:2), VP9, AV1, and uncompressed 10-bit v210",
      "Studio audio encoding: AAC-LC, MP2 (broadcast standard), AC3, E-AC3, Opus, MP3, and uncompressed PCM 16/24-bit",
      "Strict rate control with VBV buffer enforcement (CBR, VBR, CQP, CRF) and adaptive motion deinterlacing (bwdif, yadif)",
      "Simultaneous egress: DVB UDP/RTP Multicast (pkt_size=1316), low-latency HLS/DASH, RTMP relays, and SRT links",
    ],
  },
  {
    id: "mpts",
    number: "02",
    label: "DVB MPTS Mux",
    title: "Enterprise DVB MPTS Multiplexer Engine",
    role: "Combine multiple independent channels into standards-compliant digital Multi-Program Transport Streams with automatic PSI/SI tables.",
    tech: "ISO/IEC 13818-1 · ETSI EN 300 468 · CBR Null-Stuffing (PID 0x1FFF) · PCR ≤20ms Jitter",
    accent: "#0891b2",
    image: "/media/streamops/streamops-05.png",
    bullets: [
      "Collision-free PID architecture: automatically calculates and assigns standards-compliant PCR, PMT, Video, and Audio PIDs",
      "Automatic continuous DVB PSI/SI table generation: Program Association (PAT), Program Map (PMT), Service Description (SDT), and NIT",
      "CBR null-packet stuffing (PID 0x1FFF) enforcing aggregate constant bitrates required by satellite transponders and cable QAM modulators",
      "One-click source discovery: imports active StreamOps channels, live RTMP/SRT streams, and VOD files directly into the multiplex matrix",
      "Live bandwidth distribution telemetry: visualizes real-time bandwidth consumption per service alongside null stuffing percentages",
    ],
  },
  {
    id: "ingest",
    number: "03",
    label: "10-Bit & MXF Ingest",
    title: "Professional Studio Ingest & Master Recording",
    role: "Capture uncompressed 10-bit 4:2:2 masters and broadcast MXF files from Blackmagic DeckLink SDI/HDMI cards with zero lost frames.",
    tech: "Blackmagic DeckLink · MOV (v210 10-Bit) · MXF (XDCAM HD422 50Mbps) · 8-Channel PCM Audio",
    accent: "#b428bf",
    image: "/media/streamops/streamops-06.png",
    bullets: [
      "Native hardware integration: Blackmagic Design DeckLink (4K Extreme, Duo 2, Quad, Mini Recorder), Intensity Pro, AJA, and Magewell",
      "Studio-grade master profiles: MOV v210 (uncompressed 10-bit 4:2:2 with 8ch PCM) and MXF XDCAM HD422 (50 Mbps MPEG-2 4:2:2)",
      "Live confidence source monitoring: in-browser zero-latency preview player, dynamic stereo/multi-channel VU meters, and elapsed timecode",
      "Automated recording workflows: auto-record on carrier lock, and continuous segmented recording (15/30/60m) without dropped frames",
      "Custom file naming templates with dynamic token replacement: {channel}_{date}_{time}",
    ],
  },
  {
    id: "security",
    number: "04",
    label: "Ingest & Security",
    title: "Live Ingest Gateway & Anti-Hijack Security",
    role: "Hardened RTMP/RTMPS and SRT ingest gateway engineered to prevent unauthorized broadcast access and stream hijacking.",
    tech: "Single-Publisher Concurrency Lock · URL Token Auth · Ed25519 Signatures · Session Telemetry",
    accent: "#16825f",
    image: "/media/streamops/streamops-07.png",
    bullets: [
      "Dual security enforcement modes: toggle between Open (studio staging) and Protected (production enforcement) modes",
      "Multi-factor publisher authentication: URL stream key (?key=... / ?token=...), username/password credentials, and application whitelisting",
      "Single-publisher concurrency lock: strict anti-hijacking prevention ensuring duplicate publishers cannot transmit on an active key",
      "Live session telemetry: monitor publisher IP, protocol, incoming bitrate, jitter, frame rate, and active duration",
      "Instant one-click publisher disconnect and automated IP banning for unauthorized access attempts",
    ],
  },
  {
    id: "network",
    number: "05",
    label: "Bonding & Carrier Ops",
    title: "Enterprise Carrier Networking & TCP Automation",
    role: "Operate high-throughput broadcast networks with 802.3ad LACP bonding, 802.1Q VLANs, IGMPv3 SSM, and TCP automation on port 9999.",
    tech: "IEEE 802.3ad LACP Bonding · 802.1Q VLAN · IGMPv3 SSM · TCP Automation Port 9999",
    accent: "#2f67c8",
    image: "/media/streamops/streamops-09.png",
    bullets: [
      "Physical interface management: monitor link state, speed (1G, 10G, 25G, 40G, 100G), duplex, MTU, and carrier status",
      "IEEE 802.3ad LACP NIC bonding: aggregate multiple physical network adapters for link redundancy and doubled throughput",
      "802.1Q VLAN tagging: segregate management traffic, broadcast ingest, and internet egress onto dedicated VLANs",
      "Dedicated TCP automation socket on Port 9999 (ASCII & JSON) for Elgato Stream Deck, Ross OverDrive, and Grass Valley switchers",
      "Statmux Multicast & IGMPv3 Source-Specific Multicast (SSM) with dual-NIC egress for enterprise IPTV networks",
    ],
  },
  {
    id: "telemetry",
    number: "06",
    label: "SNMP & DecodX Fleet",
    title: "Hardware Telemetry, SNMP Alarms & STB Fleet",
    role: "Prevent broadcast failures with GPU/VRAM telemetry, SNMP v2c/v3 traps, and centralized DecodX Set-Top Box fleet management.",
    tech: "nvidia-smi Direct Query · SNMP v2c/v3 Traps · DecodX STB Fleet · OTA Firmware & APKs",
    accent: "#536273",
    image: "/media/streamops/streamops-03.png",
    bullets: [
      "GPU and VRAM telemetry: direct nvidia-smi query tracking NVENC encoding utilization, core temperature, memory load, and fan speed",
      "Broadcast SNMP alarm manager: SNMP v2c and v3 trap notifications sent directly to NOC dashboards (Nagios, Zabbix, PRTG)",
      "Configurable alarm rules: bitrate drop, high temperature, high dropped frames, low disk space, and high CPU/GPU load",
      "DecodX Fleet device registry: monitor online status, IP, MAC address, firmware version, and playback health across thousands of STBs",
      "Remote device operations: remotely switch channels, reboot decoders, or push OTA APK updates across subscriber tiers",
    ],
  },
];

export function StreamOpsShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activeModule = streamOpsPillars[activeTab];

  return (
    <div className="w-full">
      {/* Category selector pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {streamOpsPillars.map((m, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 rounded-[5px] px-3.5 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "border-2 border-[#4b1b63] bg-[#fbf7fd] text-[#171219] shadow-sm dark:border-[#c084fc] dark:bg-[#280f38] dark:text-white dark:ring-1 dark:ring-[#c084fc]"
                  : "border border-[#e4dee6] bg-white text-[#635c67] hover:border-[#6f2b8f]/50 hover:text-[#6f2b8f] dark:border-[#381647] dark:bg-[#150720] dark:text-[#c4b3cf] dark:hover:bg-[#1e0a2d] dark:hover:border-[#c084fc]/60"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full transition-colors"
                style={{ background: isActive ? "#6f2b8f" : "#c4bcc8" }}
              />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main showcase card */}
      <div className="grid gap-8 rounded-[5px] border border-[#e5dfeb] bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_1.15fr] lg:items-center xl:p-8 dark:border-[#381647] dark:bg-[#160822]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-[3px] px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white"
              style={{ background: activeModule.accent }}
            >
              PILLAR {activeModule.number}
            </span>
            <span className="rounded-[3px] bg-[#f5f2f7] px-2.5 py-0.5 text-[11px] font-mono text-[#5b5460] dark:bg-[#260e38] dark:text-[#cbb8d8]">
              {activeModule.label}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-[#171219] dark:text-white sm:text-2xl">
            {activeModule.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#69626e] dark:text-[#b4a4be]">
            {activeModule.role}
          </p>

          <div className="mt-4 rounded-[4px] border border-[#e9e3ed] bg-[#faf8fc] px-3.5 py-2 dark:border-[#381647] dark:bg-[#1f0c2e]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#441a54] dark:text-[#e4b8ef]">
              <Cpu className="h-3.5 w-3.5" style={{ color: activeModule.accent }} />
              <span>Technology & Protocols:</span>
            </div>
            <p className="mt-1 text-xs font-mono text-[#736a77] dark:text-[#a090ab]">
              {activeModule.tech}
            </p>
          </div>

          <div className="mt-5 space-y-2.5">
            {activeModule.bullets.map((b) => (
              <div key={b} className="flex items-start gap-2.5 text-xs leading-5 text-[#544d57]">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: activeModule.accent }}
                />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/streamops"
              className="button-primary !py-2 !text-xs"
              style={{ background: activeModule.accent, borderColor: activeModule.accent }}
            >
              Explore StreamOps Architecture <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-xs text-[#8a828e]">
              Carrier-Grade Headends · 99.999% Broadcast Uptime
            </span>
          </div>
        </div>

        {/* Right side: Native Interface Display (No monitor frame) */}
        <div>
          <div className="overflow-hidden rounded-[5px] border border-[#e4dee6] dark:border-[#381647] shadow-sm transition hover:shadow-md">
            <Image
              src={activeModule.image}
              alt={activeModule.title}
              width={1900}
              height={1080}
              quality={95}
              priority
              sizes="(max-width: 1024px) 100vw, 580px"
              className="block h-auto w-full object-contain"
            />
          </div>
          <p className="mt-2 text-right font-mono text-[10px] text-[#8e8593] dark:text-[#a090ab]">
            StreamOps Live Console · {activeModule.label}
          </p>
        </div>
      </div>
    </div>
  );
}
