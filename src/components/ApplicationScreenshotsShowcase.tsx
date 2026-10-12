import Image from "next/image";
import { CheckCircle2, Cpu, Eye, Gauge, Layers, Monitor, Network, Radio, Shield, Sparkles, Workflow } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollTriggeredFeaturePoints } from "@/components/ScrollTriggeredFeaturePoints";

export interface ScreenshotDetail {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

interface ApplicationScreenshotsShowcaseProps {
  appSlug: string;
  appTitle: string;
  appLabel: string;
  accent: string;
  screenshots: readonly string[];
}

// Exact pixel dimensions of broadcast images to maintain natural aspect ratios with zero filler/padding
const imageDimensions: Record<string, { width: number; height: number }> = {
  "/media/broadcast/allapplication/Api-gateway.png": { width: 2872, height: 1725 },
  "/media/broadcast/allapplication/Channel-controller (1).png": { width: 1729, height: 1042 },
  "/media/broadcast/allapplication/Channel-controller (2).png": { width: 1729, height: 1048 },
  "/media/broadcast/allapplication/Channel-controller (3).png": { width: 2866, height: 1798 },
  "/media/broadcast/allapplication/FileManager.png": { width: 2158, height: 1261 },
  "/media/broadcast/allapplication/HAController (1).png": { width: 2260, height: 1242 },
  "/media/broadcast/allapplication/HAController (2).png": { width: 775, height: 735 },
  "/media/broadcast/allapplication/InputEngine (1).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/InputEngine (2).png": { width: 1828, height: 1144 },
  "/media/broadcast/allapplication/InputEngine (3).png": { width: 2878, height: 1729 },
  "/media/broadcast/allapplication/InputEngine (4).png": { width: 1827, height: 1147 },
  "/media/broadcast/allapplication/InputEngine (5).png": { width: 1831, height: 1141 },
  "/media/broadcast/allapplication/Kashtrix Studio (1).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Kashtrix Studio (2).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Kashtrix Studio (3).png": { width: 1935, height: 1192 },
  "/media/broadcast/allapplication/Kashtrix Studio (4).png": { width: 2025, height: 1222 },
  "/media/broadcast/allapplication/Kashtrix Studio (5).png": { width: 2167, height: 1264 },
  "/media/broadcast/allapplication/MAM (1).png": { width: 1459, height: 925 },
  "/media/broadcast/allapplication/MAM (2).png": { width: 2286, height: 1332 },
  "/media/broadcast/allapplication/Multiviewer (1).png": { width: 2871, height: 1798 },
  "/media/broadcast/allapplication/Multiviewer (2).png": { width: 1036, height: 973 },
  "/media/broadcast/allapplication/Multiviewer (3).png": { width: 1059, height: 979 },
  "/media/broadcast/allapplication/Multiviewer (4).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Multiviewer (5).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Multiviewer (6).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/NRCS (1).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/NRCS (2).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/NRCS (3).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/NRCS (4).png": { width: 1155, height: 1020 },
  "/media/broadcast/allapplication/OutputEngine.png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Prompter (1).png": { width: 1707, height: 1528 },
  "/media/broadcast/allapplication/Prompter (2).png": { width: 588, height: 1519 },
  "/media/broadcast/allapplication/Prompter (3).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/QC Controller.png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/Screenshot 2026-10-09 011541.png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/cg-controller (1).png": { width: 916, height: 622 },
  "/media/broadcast/allapplication/cg-controller (2).png": { width: 799, height: 682 },
  "/media/broadcast/allapplication/cg-controller (3).png": { width: 850, height: 703 },
  "/media/broadcast/allapplication/cg-controller (4).png": { width: 823, height: 691 },
  "/media/broadcast/allapplication/cg-controller (5).png": { width: 808, height: 711 },
  "/media/broadcast/allapplication/cg-controller (6).png": { width: 808, height: 691 },
  "/media/broadcast/allapplication/cg-controller (7).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/cg-editor (1).png": { width: 541, height: 942 },
  "/media/broadcast/allapplication/cg-editor (2).png": { width: 421, height: 1063 },
  "/media/broadcast/allapplication/cg-editor (3).png": { width: 526, height: 700 },
  "/media/broadcast/allapplication/cg-editor (4).png": { width: 592, height: 1155 },
  "/media/broadcast/allapplication/cg-editor (5).png": { width: 580, height: 1125 },
  "/media/broadcast/allapplication/cg-editor (6).png": { width: 597, height: 1171 },
  "/media/broadcast/allapplication/cg-editor (7).png": { width: 1183, height: 810 },
  "/media/broadcast/allapplication/cg-editor (8).png": { width: 2871, height: 492 },
  "/media/broadcast/allapplication/cg-editor (9).png": { width: 2878, height: 1798 },
  "/media/broadcast/allapplication/outpputEngine1 (1).png": { width: 796, height: 960 },
  "/media/broadcast/allapplication/outpputEngine1 (2).png": { width: 772, height: 733 },
  "/media/broadcast/allapplication/playlist Editor.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-01.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-02.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-03.png": { width: 592, height: 1258 },
  "/media/broadcast/broadcast-04.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-05.png": { width: 517, height: 937 },
  "/media/broadcast/broadcast-06.png": { width: 583, height: 1267 },
  "/media/broadcast/broadcast-07.png": { width: 2878, height: 703 },
  "/media/broadcast/broadcast-08.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-09.png": { width: 816, height: 685 },
  "/media/broadcast/broadcast-10.png": { width: 829, height: 723 },
  "/media/broadcast/broadcast-11.png": { width: 2878, height: 1774 },
  "/media/broadcast/broadcast-12.png": { width: 2878, height: 1797 },
  "/media/broadcast/broadcast-13.png": { width: 1981, height: 1233 },
  "/media/broadcast/broadcast-14.png": { width: 2875, height: 1440 },
  "/media/broadcast/broadcast-15.png": { width: 1966, height: 1231 },
  "/media/broadcast/broadcast-16.png": { width: 2878, height: 1795 },
  "/media/broadcast/broadcast-17.png": { width: 1824, height: 1117 },
  "/media/broadcast/broadcast-18.png": { width: 2491, height: 1395 },
  "/media/broadcast/broadcast-19.png": { width: 2166, height: 1264 },
  "/media/broadcast/broadcast-20.png": { width: 2281, height: 1228 },
  "/media/broadcast/broadcast-21.png": { width: 1951, height: 1207 },
  "/media/broadcast/broadcast-22.png": { width: 1917, height: 1194 },
  "/media/broadcast/broadcast-23.png": { width: 2275, height: 1326 },
  "/media/broadcast/broadcast-24.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-25.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-26.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-27.png": { width: 2851, height: 1798 },
  "/media/broadcast/broadcast-28.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-29.png": { width: 2337, height: 1318 },
  "/media/broadcast/broadcast-30.png": { width: 2878, height: 1795 },
  "/media/broadcast/broadcast-31.png": { width: 2188, height: 1249 },
  "/media/broadcast/broadcast-32.png": { width: 2278, height: 1324 },
  "/media/broadcast/broadcast-33.png": { width: 2869, height: 1795 },
  "/media/broadcast/broadcast-34.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-35.png": { width: 2527, height: 808 },
  "/media/broadcast/broadcast-36.png": { width: 2263, height: 1312 },
  "/media/broadcast/broadcast-37.png": { width: 2527, height: 730 },
  "/media/broadcast/broadcast-38.png": { width: 2524, height: 877 },
  "/media/broadcast/broadcast-39.png": { width: 2491, height: 1165 },
  "/media/broadcast/broadcast-40.png": { width: 1737, height: 1113 },
  "/media/broadcast/broadcast-41.png": { width: 2878, height: 1798 },
  "/media/broadcast/broadcast-42.png": { width: 2878, height: 1798 },
};

// Detailed metadata mapping for each screenshot of each broadcast application
const screenshotDetailsMap: Record<string, ScreenshotDetail[]> = {
  "master-control-playout": [
    {
      image: "/media/broadcast/broadcast-16.png",
      tag: "Master Control Surface",
      title: "Primary Master Control & Program Bus",
      subtitle: "24/7 continuous linear transmission with zero-downtime execution.",
      description: "Direct3D11 zero-copy rendering engine driving master broadcast outputs. Displays active program clip countdown, upcoming preview event, real-time LTC/VITC timecode, and multichannel audio VU/PPM peak meters.",
      bullets: [
        "Frame-accurate transition execution: Sub-frame transition timing (cuts, dissolves, wipes, pushes) with frame-locked sync",
        "Hardware decoding engine: Multi-format hardware NVDEC and DXVA2 decoding with Apple ProRes, Avid DNxHD, Sony XDCAM, and HEVC",
        "On-air real-time compositing: Integrated station bug and lower-third overlay rendering without dropping frames",
        "SMPTE master clock synchronization: Continuous LTC/VITC timecode tracking with NTP clock sync and real-time event countdowns",
      ],
    },
    {
      image: "/media/broadcast/broadcast-14.png",
      tag: "Operator Console",
      title: "Remote Web Playout & Control Surface",
      subtitle: "Full-fidelity browser-based operational control for MCR engineers.",
      description: "Secure, low-latency web management surface allowing broadcast operators to supervise playout channels, inspect rundown timing, trigger emergency manual interventions, and audit as-run logs remotely.",
      bullets: [
        "Remote operational intervention: Web-based clip cueing, pausing, and emergency cut-to-live source switching",
        "Audio peak monitoring: Live audio peak program metering and multi-channel volume trim controls",
        "Real-time countdown telemetry: Sub-second elapsed time, remaining duration, and time-to-next-event counters",
        "Comprehensive access control: Secure TLS WebSocket control plane with role-based MCR operator permissions",
      ],
    },
    {
      image: "/media/broadcast/broadcast-17.png",
      tag: "Suite Integration",
      title: "Unified Broadcast Suite Launcher",
      subtitle: "Seamless inter-module communication across the complete Kashtrix ecosystem.",
      description: "Native desktop hub providing one-click launch and real-time status monitoring for all broadcast modules—from CG Editor and NRCS Newsroom to Output Engine and Redundancy HA Controllers.",
      bullets: [
        "Single-click module launcher: Instant access to all specialized desktop broadcast applications from a single tray",
        "Inter-process IPC coordination: Shared channel presets, active clips, and rundown databases with zero latency",
        "System health diagnostics: Real-time service monitoring, port telemetry, and network endpoint supervision",
        "Automated workspace recall: Multi-monitor display window arrangement saving and instant layout restoration",
      ],
    },
    {
      image: "/media/broadcast/allapplication/playlist Editor.png",
      tag: "Rundown Management",
      title: "Master Rundown & Playlist Editor",
      subtitle: "Frame-accurate 24/7 schedule execution and media queue sequencing.",
      description: "Professional rundown management module controlling linear playlist playback, hard-timed events, manual triggers, commercial block timing, and as-run log auditing.",
      bullets: [
        "Instant media bin loading: Drag and drop video clips, stinger transitions, and audio beds directly into live DDR channels",
        "Color-coded category tagging: High-contrast event flags for Media, Commercial, Graphics, Live, and Filler clips",
        "Wall-clock timing engine: Real-time schedule over/under calculation against station master clocks",
        "Non-destructive live editing: Drag-and-drop reordering with safe insertion while playout is active on air",
      ],
    },
  ],
  "output-engine": [
    {
      image: "/media/broadcast/allapplication/OutputEngine.png",
      tag: "Transmission Matrix",
      title: "Multi-Protocol Master Transmission Matrix",
      subtitle: "Connecting linear playout to SDI baseband, IP networks, and OTT CDNs.",
      description: "Central transmission router distributing master control video to physical broadcast cards, uncompressed IP studio fabrics, and multi-bitrate internet streaming endpoints simultaneously.",
      bullets: [
        "Simultaneous multi-destination output: Concurrent routing to DeckLink baseband, NDI IP, and OTT CDNs with independent scaling",
        "Hardware encoding acceleration: Full offload support for NVIDIA NVENC, Intel QSV, and AMD AMF video pipelines",
        "Transmission telemetry: Continuous packet loss counters, buffer occupancy gauges, and network bitrate graphs",
        "Automated stream reconnect: Sub-second failover recovery with auto-healing TCP/UDP stream reconnects",
      ],
    },
    {
      image: "/media/broadcast/allapplication/outpputEngine1 (1).png",
      tag: "Baseband Hardware",
      title: "Blackmagic DeckLink 12G-SDI & Genlock Engine",
      subtitle: "Direct-to-silicon uncompressed baseband television output.",
      description: "Professional hardware driver interface for Blackmagic DeckLink 12G/6G/3G/HD-SDI and HDMI outputs. Supports up to 16 channels of embedded audio, hardware genlock sync, and VANC closed captioning.",
      bullets: [
        "Comprehensive device support: Blackmagic DeckLink 12G-SDI, HDMI, AJA Kona, Magewell, and USB3 UVC cameras",
        "Genlock frame synchronization: Tri-level and blackburst sync reference alignment for glitch-free production cutting",
        "Uncompressed baseband broadcast: SMPTE 292M, 424M, and 2082 compliant 10-bit uncompressed YUV 4:2:2 output",
        "Ancillary data embedding: VANC closed captioning insertion for CEA-608 / CEA-708 and active format descriptors (AFD)",
      ],
    },
    {
      image: "/media/broadcast/allapplication/outpputEngine1 (2).png",
      tag: "Studio IP & NDI 6",
      title: "NDI 6 High-Fidelity Studio Network Distribution",
      subtitle: "Ultra-low-latency IP video with 32-bit RGBA alpha channel.",
      description: "Broadcast-grade NDI 6 integration for modern IP studio infrastructures. Emits pristine full-raster video with 32-bit alpha channel (Fill and Key) for downstream vision mixers with bi-directional studio tally signaling.",
      bullets: [
        "Low-latency NDI 6 studio networking: Network video discovery with bi-directional PTZ camera control and tally",
        "Fill & Key alpha transparency: Full 32-bit RGBA transparency over standard 10GbE network infrastructures",
        "Bi-directional tally signaling: Automated red (Program on air) and green (Preview cued) tally states",
        "SMPTE IP compatibility: Ready for SMPTE ST 2110 and ST 2022-6 uncompressed IP transport workflows",
      ],
    },
    {
      image: "/media/broadcast/broadcast-28.png",
      tag: "Digital TV Multiplexing",
      title: "DVB Transport Stream & Table Multiplexing Engine",
      subtitle: "Compliant digital television broadcast multiplexing for cable, sat & DTT.",
      description: "Generates fully standard-compliant DVB-TS UDP unicast and multicast streams for DVB-T/T2, DVB-S/S2, and DVB-C modulators with microsecond-level PCR precision and full SI/PSI metadata table insertion.",
      bullets: [
        "DVB table generation: Automated multiplexing of PAT, PMT, SDT, NIT, and TDT/TOT signaling tables",
        "PCR clock precision: High-precision Program Clock Reference packet clocking preventing receiver buffer overflows",
        "Constant Bitrate (CBR) enforcement: Automated null packet stuffing maintaining exact modulator bitrates",
        "Multi-program multiplexing: Coordinated multi-channel transport streams for DVB-T/T2, DVB-S/S2, and DVB-C systems",
      ],
    },
  ],
  "cg-editor": [
    {
      image: "/media/broadcast/allapplication/cg-editor (9).png",
      tag: "Master CG Canvas & Tools",
      title: "Motion Graphics Canvas, Safe Areas & Tool Palette",
      subtitle: "Direct3D interactive canvas with Action Safe 5% / Title Safe 10% grids and broadcast toolset.",
      description: "Central visual graphics workstation equipped with specialized tools for Text, Shapes, Pen masks, Tickers, Timers, Weather, Roll credits, Analog clocks, and Program PIP. Authors broadcast-grade graphics with live rasterized playback at 50/59.94/60fps.",
      bullets: [
        "Integrated broadcast tool palette: Text, Shape, Pen Mask, Ticker, Timer, Weather, Roll, and PIP tools",
        "Broadcast safe area guides: Action Safe (5%) and Title Safe (10%) visual boundaries to prevent display cutoff",
        "Sub-pixel typography canvas: Direct3D Direct2D GPU composition with antialiased font rasterization",
        "Real-time master bus preview: Frame-accurate 50/59.94/60fps playback verification on primary program outputs",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (2).png",
      tag: "Weather API & Now/Next Feeds",
      title: "Weather API Automation & Now/Next Schedule Ingestion",
      subtitle: "Native OpenWeather API polling and automated Coming Up / Coming Next metadata extraction.",
      description: "Dedicated Text Data Sources console for connecting real-time external providers. Features dedicated buttons for Weather, Weather Fields, and Now/Next program look-ahead, binding live meteorological data ({TempC}, {Humidity}, {Wind}) and upcoming show guides directly to graphic fields.",
      bullets: [
        "Dedicated data source connectors: Live Weather, Weather Fields, and Now/Next program look-ahead bindings",
        "Native OpenWeather API integration: Automated periodic polling with metric/imperial units and failover cache",
        "Automated schedule ingestion: Coming Up and Coming Next metadata extraction directly from playout rundowns",
        "Multi-format push ingestion: Real-time JSON, XML/RSS, Excel, CSV, and local database bindings",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (3).png",
      tag: "Coming Next PIP & Visibility Masks",
      title: "Program Video PIP (Squeeze-Back) & Dynamic Masking",
      subtitle: "Automated DVE squeeze-backs for Coming Next promos with multi-stop color palettes.",
      description: "Specialized inspector for Program Video Picture-in-Picture (PIP) squeezes and element canvas masks. Squeezes live broadcast video into an on-screen preview box during closing credits while running automated 'Coming Next' promos and lower-third channel branding.",
      bullets: [
        "Program Video PIP squeeze: Automated DVE squeeze-backs for closing credits and next-program promotional windows",
        "Dynamic element masking: Canvas visibility and wipe masks for lower-third banners and teaser graphics",
        "Multi-stop gradient engine: 360° rotation clock with instant broadcast color palette presets",
        "Alpha transparency blending: Hardware-accelerated smooth alpha transitions over live program video",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (5).png",
      tag: "Back In Countdowns & Sequence Presets",
      title: "Back In Commercial Countdowns & Authentic Sequence Presets",
      subtitle: "Frame-accurate commercial break timers, Quick Bumpers, and Standard Promos.",
      description: "Composition settings console managing authentic sequence duration presets including Quick Bumper (5.0s), Commercial ID (15.0s), and Standard Promo (30.0s). Provides automated 'Back In' countdown timers synchronized with playlist commercial ad pods.",
      bullets: [
        "Automated commercial break timers: 'Back In' countdown overlays synchronized with active playlist ad pods",
        "Authentic sequence presets: 5.0s Quick Bumper, 15.0s Commercial ID, and 30.0s Standard Promo durations",
        "Continuous loop execution: Loop composition mode for perpetual station bugs and animated channel IDs",
        "Broadcast frame rate presets: Native synchronization with 50, 59.94, 60, and 120 fps broadcast rasters",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (4).png",
      tag: "3D Transform & Geometry",
      title: "3D Transform Geometry, Anchor Points & Typography",
      subtitle: "Sub-pixel vector coordinate engine with custom perspective and typography styling.",
      description: "Granular inspector for positioning, 3D rotation (X, Y, Z), skew, perspective, anchor points, corner radii, and outline strokes. Powers multi-layered dynamic straps and automated news push tickers.",
      bullets: [
        "Independent 3D transforms: Custom perspective depth (1200px) and sub-pixel coordinate positioning",
        "Vector container styling: Per-corner radius customization, stroke borders, and responsive background plates",
        "Sub-frame timing triggers: Start time, end time, and active duration controls for precision graphic in/out",
        "Dynamic anchor positioning: Center, corner, and custom pivot points for organic rotational animations",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (6).png",
      tag: "Layer Visual Effects",
      title: "Broadcast Layer Effects: Light Sweep Shine & Glow Shaders",
      subtitle: "High-end broadcast aesthetics with light sweep beams, outer glows, and motion blur.",
      description: "Real-time shader pipeline applying dynamic light sweep shines, customizable beam widths, intensity, sweep angles, and drop shadows to on-air channel bugs, scoreboards, and lower thirds.",
      bullets: [
        "Light Sweep Shine engine: Controllable sweep progress (-0.5 to 1.5), beam width, and lighting sweep angle",
        "Broadcast drop shadow shader: Sub-pixel blur radius, offset angle vectors, and color selection",
        "Outer glow illumination: Dynamic glow intensity and radius for breaking news alert straps",
        "Multi-sample motion blur: Real-time GPU motion blur for high-speed graphic wipes and sports templates",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (7).png",
      tag: "Bézier Velocity Curves",
      title: "Bézier Motion Velocity Speed Curves & Easing Interpolation",
      subtitle: "Professional motion curve tangents for organic acceleration, ease-in, and bounce.",
      description: "Interactive Bézier curve graph editor allowing designers to sculpt custom velocity profiles for graphic entrances and exits. Supports ease-in, ease-out, smooth acceleration, bounce, and cubic-bezier expressions.",
      bullets: [
        "Interactive Bézier curve editor: Visual coordinate grid with draggable tangent handles and frame offset",
        "Standard easing curve presets: Linear, Ease In, Ease Out, Ease In-Out, Smooth Accel, and Bounce",
        "Cubic-bezier expression export: Mathematical curve definitions exported for zero-latency GPU execution",
        "Velocity curve inspection: Frame-by-frame velocity graphs for perfectly smooth acceleration and deceleration",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (8).png",
      tag: "Timeline Sequencer",
      title: "Multi-Track Non-Linear Keyframe Timeline & Push Tickers",
      subtitle: "Frame-accurate multi-layer animation sequencing with hold/push triggers.",
      description: "Multi-track non-linear timeline console featuring zoom controls (-/+ zoom, fit), scrubbable playhead, hold/push start markers, in/out durations, and layer visibility toggles. Orchestrates complex multi-element broadcast graphics.",
      bullets: [
        "Multi-track non-linear timeline: Independent layer tracks for Base Bar, Top Line, Badge Plate, and Text",
        "Hold and push start markers: Scrubbable playhead with user-defined dwell times for breaking news tickers",
        "Auto-keyframing workflow: Automated keyframe generation with real-time SMPTE timecode display",
        "Non-destructive track editing: Instant solo, mute, lock, and visibility toggling per graphic layer",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-editor (1).png",
      tag: "Web & Dynamic HTML Source",
      title: "HTML5 / Web Source Engine & WebGL Browser Integration",
      subtitle: "Integrate live interactive web graphics, WebGL canvases, and dynamic web endpoints.",
      description: "Embedded Chromium/WebKit rendering surface allowing web developers to build graphics using HTML, CSS, JavaScript, and WebGL. Ingests live web-based weather maps, interactive charts, and remote data streams.",
      bullets: [
        "Embedded Chromium/WebGL canvas: Real-time HTML5, CSS animations, JavaScript, and WebGL rendering",
        "Custom browser viewports: User-defined resolution raster, target FPS, and opacity blending with live video",
        "Isolated process execution: Sandboxed rendering architecture ensuring web script crashes never impact playout",
        "Bidirectional WebSocket telemetry: Real-time remote data injection into live web graphics templates",
      ],
    },
  ],
  "cg-controller": [
    {
      image: "/media/broadcast/allapplication/cg-controller (7).png",
      tag: "On-Air Playout Surface",
      title: "Live Program / Preview Character Generator Desk",
      subtitle: "Immediate tactile control for firing graphics during live television broadcasts.",
      description: "Two-bus Program/Preview graphics control console. Operators preview template updates, verify spelling and visual balance, and take graphics to air with one-click transitions or timed auto-out triggers.",
      bullets: [
        "Two-bus display channels: Separate Preview (prepare) and Program (on-air) graphic display channels",
        "Tactile hardware control: Dedicated keyboard shortcuts, X-keys, and GPI/O hardware panel integration",
        "Multi-layer independent routing: Fire a ticker, station bug, and lower third simultaneously",
        "Immediate cut & dissolve takes: Sub-frame transitions with manual crossfading and auto-out timers",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-controller (1).png",
      tag: "Layer Routing Matrix",
      title: "Multi-Layer Z-Index Template Routing Matrix",
      subtitle: "Simultaneous execution of multiple graphic layers without collisions.",
      description: "Coordinate multiple active templates across 16 independent visual layers. Station logos, breaking news crawls, clock displays, and sports bugs can be updated and cleared independently.",
      bullets: [
        "Layer collision isolation: 16 independent visual layers preventing breaking crawls from displacing station bugs",
        "Timed auto-clear countdowns: Programmable countdown triggers ensuring graphics do not linger on screen",
        "Master panic clear trigger: Emergency 'Clear All' button to instantly drop all active on-air graphics",
        "Z-Index template prioritization: Dynamic depth ordering maintaining channel watermarks over lower thirds",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-controller (5).png",
      tag: "Live Field Inspector",
      title: "Live Quick-Edit & On-the-Fly Text Replacement",
      subtitle: "Update breaking news text while the graphic is already on air.",
      description: "When breaking news develops, operators update active lower-third text fields in real time. Smooth typography transitions update the on-screen graphic without jumping or cutting away.",
      bullets: [
        "Sub-frame live text replacement: Direct typography updates on active, running on-air graphic templates",
        "Automated broadcast guardrails: Built-in spellcheck and profanity filtering guards prior to committing text",
        "MOS newsroom rundown link: Direct bi-directional binding with NRCS newsroom story rundowns",
        "Instant breaking banner takeover: Urgent bulletin strap insertion without disturbing scheduled playlists",
      ],
    },
    {
      image: "/media/broadcast/allapplication/cg-controller (6).png",
      tag: "Automation Integration",
      title: "Playout Rundown Secondary Event Triggering",
      subtitle: "Automated graphics firing driven by master control rundown logs.",
      description: "Automates graphic playout by synchronizing with master rundown events. Programs automatically trigger their respective title bugs, and commercial breaks automatically suppress on-air graphics.",
      bullets: [
        "Automated commercial bug suppression: Smart logo bug suppression during paid sponsor commercial breaks",
        "Auto-follow secondary event timing: Graphic in/out triggers linked to master video clip start offsets",
        "REST API & WebSocket control plane: High-speed IP control endpoints for external studio vision switchers",
        "As-run graphics log auditing: Timestamped proof-of-play logging for all aired graphic templates",
      ],
    },
  ],
  "channel-controller": [
    {
      image: "/media/broadcast/allapplication/Channel-controller (3).png",
      tag: "Master Supervision Wall",
      title: "Multi-Channel Master Supervision Desk",
      subtitle: "Centralized operational overview for multi-channel broadcast headends.",
      description: "Comprehensive operational desk supervising N linear playout channels from a single unified interface. Displays live video feeds, transmission status, storage capacity, and redundant server health.",
      bullets: [
        "Multi-channel status wall: Unified multiview grid displaying live program feeds with tally indicators",
        "Continuous audio telemetry: Real-time audio level monitoring and silence detection alarms",
        "Channel-level operational drilldown: Instant inspection of rundown timing and transmission configurations",
        "Headend supervision matrix: Simultaneous multi-station playout oversight from a single control seat",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Channel-controller (1).png",
      tag: "Router Matrix",
      title: "Studio Input & Router Crosspoint Matrix",
      subtitle: "Coordinate live feeds, remote contributions, and studio switchers.",
      description: "Software routing matrix controlling upstream physical and IP video crosspoints. Switch effortlessly between automated playout, live studio feeds, and remote satellite links.",
      bullets: [
        "Software crosspoint routing: Direct control for Blackmagic Videohub, Ross, and NDI IP router matrices",
        "Clean-switch frame synchronization: Reference clock alignment preventing visual tearing during cuts",
        "Emergency cut-to-slate trigger: One-click bypass switch to emergency disaster recovery slate or backup loop",
        "Bi-directional tally coordination: Studio camera and matrix router tally indicators synchronized via IP",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Channel-controller (2).png",
      tag: "Redundancy Supervisor",
      title: "Frame-Locked 1+1 Redundant Failover Supervisor",
      subtitle: "Continuous state mirroring between Main and Hot-Standby playout servers.",
      description: "Monitors primary and backup playout engines with sub-second heartbeats. In the event of primary hardware, OS, or stream failure, initiates clean downstream video router failover in under 40 milliseconds.",
      bullets: [
        "Sub-40ms automated failover: Rapid transfer triggering on signal loss, application crash, or frozen frames",
        "Continuous state mirroring: Frame-locked playlist position and clip timecode synchronization across servers",
        "Manual maintenance override: Hardware lockouts for seamless maintenance during live broadcast hours",
        "Redundant storage heartbeat: Continuous verification of shared SAN/NAS and local storage paths",
      ],
    },
    {
      image: "/media/broadcast/broadcast-18.png",
      tag: "Signal Health Diagnostics",
      title: "Real-Time Signal Health & Anomaly Alarms",
      subtitle: "Instant operational visibility into transmission stream parameters.",
      description: "Ingests sub-second telemetry regarding CPU load, GPU render time, DeckLink buffer fill levels, and network output bitrates to detect degradation before it impacts transmission.",
      bullets: [
        "Buffer telemetry alarms: Dropped frame and buffer underrun detection with visual alert banners",
        "DVB transport bitrate compliance: Continuous output bitrate tracking and packet jitter monitoring",
        "Engineering audit logs: Historical incident tracking and error logs for post-broadcast engineering reviews",
        "System resource telemetry: Real-time GPU decoding load, CPU utilization, and thermal monitoring",
      ],
    },
  ],
  "playlist-editor": [
    {
      image: "/media/broadcast/allapplication/playlist Editor.png",
      tag: "24/7 Linear Rundown",
      title: "24/7 Frame-Accurate Linear Rundown Editor",
      subtitle: "Assemble broadcast transmission days with sub-frame precision.",
      description: "Master broadcast rundown compilation environment. Assemble thousands of media events, commercials, live inputs, and secondary graphics triggers with frame-accurate timecode and live-safe editing.",
      bullets: [
        "Transition trigger modes: Frame-accurate auto-follow, hard-start, and manual-cue event triggers",
        "Visual status flags: High-contrast color flags for Aired, Playing, Cued, Ready, and Missing media",
        "Live-safe rundown editing: Insert, reorder, or delete upcoming items without interrupting playback",
        "Commercial pod segmentation: Clear timing boundaries and calculated overrun/underrun indicators",
      ],
    },
    {
      image: "/media/broadcast/broadcast-29.png",
      tag: "Event & Multipart Workflow",
      title: "Secondary Events & Multipart Clip Management",
      subtitle: "Configure trim points, multipart segments, and rundown metadata.",
      description: "Detailed rundown event inspection console. Define multiple in/out ranges per media asset, attach graphics lower thirds, set commercial tags, and publish updates directly to active playout servers.",
      bullets: [
        "Multipart segmentation workflow: Define multiple in/out ranges treated as continuous playout events",
        "Timecode duration validation: Real-time duration summation and clip timecode integrity checks",
        "Instant playout publishing: One-click 'Publish to Playout' synchronization across master control engines",
        "Secondary graphics binding: Attach automated station lower thirds and bugs directly to playlist events",
      ],
    },
  ],
  "scheduler": [
    {
      image: "/media/broadcast/broadcast-32.png",
      tag: "24/7 Channel Automation",
      title: "Kashtrix Scheduler & Day Timeline Grid",
      subtitle: "Plan 24/7 channel programming grids across days, weeks, and seasons.",
      description: "Visual calendar planner and day timeline editor for television station scheduling directors. Layout program blocks, recurring series, daily news hours, and commercial breaks across the broadcast schedule with automated filler management.",
      bullets: [
        "Interactive day timeline: 24-hour visual grid (00:00 — 24:00) with hard-start and recurring event modes",
        "Automated gap filler insertion: Automatic fallback to configured filler folders upon schedule gaps",
        "Instant schedule conflict detection: Real-time verification flagging overlaps, missing files, and license limits",
        "EPG metadata compilation: Export compliant XMLTV, DVB-SI EIT, and JSON guides for downstream distribution",
      ],
    },
  ],
  "media-asset-management": [
    {
      image: "/media/broadcast/allapplication/MAM (2).png",
      tag: "Broadcast Media Library",
      title: "Enterprise Broadcast Media Asset Library",
      subtitle: "Centralized catalog for ingest, production, and broadcast archive assets.",
      description: "Single-pane-of-glass media repository organizing all station content: master programs, commercial spots, station promos, and raw footage. Features fast search, custom metadata schemas, and rights tracking.",
      bullets: [
        "Sub-second catalog search: Fast filtering across titles, House IDs, categories, actors, and metadata",
        "Broadcast rights management: License start/expiry dates, maximum run count, and territory restrictions",
        "Automated technical metadata extraction: Extraction of video codec, bitrate, loudness, and audio tracks",
        "Multi-seat collaborative tagging: Custom metadata schemas with user permissions and audit logs",
      ],
    },
    {
      image: "/media/broadcast/allapplication/MAM (1).png",
      tag: "Proxy & Frame Scrubbing",
      title: "Fast Proxy Generation & Frame-Accurate Scrubbing",
      subtitle: "Review, annotate, and mark in/out points directly in the web interface.",
      description: "Automatically transcodes incoming high-bitrate broadcast masters into lightweight H.264 web proxies. Operators scrub through video, set frame-accurate in/out mark points, and create clip segments.",
      bullets: [
        "Low-bandwidth proxy streaming: Smooth web proxy streaming with sub-frame scrub bar and audio waveforms",
        "Rough-cut sub-clipping: Frame-accurate in/out marker logging for creating promo clips and ad segments",
        "Collaborative editorial notes: Timecode-anchored comments and QC annotations for newsroom producers",
        "Instant clip extraction: Export proxy selections into full-raster edit bins without moving source files",
      ],
    },
    {
      image: "/media/broadcast/broadcast-23.png",
      tag: "Storage Lifecycle (HSM)",
      title: "Tiered Storage & Hierarchical Storage Management (HSM)",
      subtitle: "Automate asset movement between fast NVMe playout storage and cold archives.",
      description: "Automated storage lifecycle policies. Clips scheduled to air within 24 hours are automatically staged to local high-speed NVMe playout storage, while expired programs are moved to deep S3 cold storage.",
      bullets: [
        "Policy-driven automated staging: Pre-load assets scheduled within 24 hours to high-speed NVMe storage",
        "Multi-tier storage lifecycle: Automatic migration to nearline NAS and deep cold cloud archives (S3 / B2)",
        "Proactive storage purges: Automated deletion policies for expired commercial files and temporary proxies",
        "Checksum integrity verification: Continuous SHA-256 validation preventing corrupted file playback",
      ],
    },
  ],
  "file-manager": [
    {
      image: "/media/broadcast/allapplication/FileManager.png",
      tag: "File Operations Hub",
      title: "High-Throughput Media Ingest & Normalization Hub",
      subtitle: "Automate file ingestion, watch folder scanning, and integrity verification.",
      description: "Centralized file movement engine connecting editing suites, external FTP/cloud drops, and master playout servers. Automatically detects new files, verifies checksums, and normalizes formats.",
      bullets: [
        "Multi-threaded watch folders: Continuous scanning across local NVMe, SMB/CIFS, SAN, and SFTP drops",
        "Cryptographic checksum verification: Automated MD5 and SHA-256 integrity verification preventing corrupted files",
        "Automated file normalization: Rule-based renaming and House ID extraction based on directory rules",
        "High-concurrency file transfers: Multi-stream bandwidth acceleration optimized for 10GbE and 25GbE networks",
      ],
    },
    {
      image: "/media/broadcast/broadcast-19.png",
      tag: "Playout Synchronization",
      title: "Playout Server Storage Synchronization",
      subtitle: "Coordinated media distribution to Primary and Backup playout servers.",
      description: "Ensures that media scheduled on the broadcast rundown is mirrored simultaneously across primary and redundant playout servers with configurable transfer bandwidth throttling.",
      bullets: [
        "Parallel playout mirroring: Simultaneous file transfers to primary and redundant playout server arrays",
        "Adaptive bandwidth rate limiting: Configurable transfer throttling preventing live broadcast network congestion",
        "Prioritized urgent ingest queues: Immediate queue preemption allowing breaking news files to jump to air",
        "Transfer retry with resume: Resilient network transfers with automated retry on intermittent link dropouts",
      ],
    },
    {
      image: "/media/broadcast/broadcast-39.png",
      tag: "Transcode Normalization",
      title: "Automated Transcoding & Audio Normalization",
      subtitle: "Convert heterogeneous incoming media into uniform broadcast standards.",
      description: "Background GPU transcode worker converting incoming MP4, MKV, and WebM files into broadcast-standard XDCAM HD422 MXF or ProRes files with EBU R128 audio normalization.",
      bullets: [
        "Hardware-accelerated transcoding: High-throughput GPU pipelines converting MP4/MKV to XDCAM HD422 MXF",
        "EBU R128 loudness normalization: Integrated audio loudness leveling conforming to ITU-R BS.1770 standards",
        "Lossless container re-wrapping: Instant container re-wrapping without re-encoding when codecs match specs",
        "Automated audio channel shuffling: Channel track remapping from stereo tracks to discrete 8/16-channel masters",
      ],
    },
  ],
  "ingest-server": [
    {
      image: "/media/broadcast/broadcast-21.png",
      tag: "Baseband & IP Capture",
      title: "Multi-Channel Baseband & IP Ingest Station",
      subtitle: "Simultaneous real-time capture from SDI, HDMI, NDI, and SRT sources.",
      description: "Multi-channel recording server engineered for master control and live sports ingest. Captures uncompressed baseband video and IP contribution feeds directly into studio SAN/NAS storage.",
      bullets: [
        "Continuous ISO recording: Individual camera feeds alongside master PGM recording to high-speed NVMe storage",
        "Multi-channel concurrent ingest: Synchronous capture across Blackmagic DeckLink SDI and NDI 6 studio streams",
        "Broadcast master codec support: Native Apple ProRes 422 HQ, Avid DNxHD, and Sony XDCAM HD422 recording formats",
        "Automated trigger recording: Crash record, scheduled timer recordings, and GPI trigger recording integration",
      ],
    },
    {
      image: "/media/broadcast/broadcast-38.png",
      tag: "Edit-While-Ingest",
      title: "Edit-While-Ingest & Growing File Support",
      subtitle: "Begin editing and airing files while the live event is still being recorded.",
      description: "Captures media with continuous container header updates in MXF and QuickTime MOV. Editors in Adobe Premiere Pro or DaVinci Resolve can edit live files, and playout can air recordings in progress.",
      bullets: [
        "Growing file index updates: Live index table updates allowing non-linear editors to access growing files",
        "Instant playout chase: Start airing recorded sporting events minutes after recording begins",
        "Zero-loss crash protection: Continuous container header updates preventing corruption upon power loss",
        "NLE multi-vendor workflow: Native playback in Adobe Premiere Pro, DaVinci Resolve, and Final Cut",
      ],
    },
    {
      image: "/media/broadcast/broadcast-35.png",
      tag: "Audio & Timecode Mapping",
      title: "16-Channel Audio Capture & SMPTE Timecode Preservation",
      subtitle: "Preserve discrete audio tracks, timecode tracks, and VANC data.",
      description: "Captures up to 16 discrete channels of embedded audio with flexible channel mapping. Embeds LTC or VITC timecode tracks to ensure frame-accurate synchronization with multi-camera productions.",
      bullets: [
        "16-channel audio tracking: Multi-track audio capture with discrete surround sound (5.1/7.1) and stereo pairs",
        "SMPTE 12M timecode preservation: Linear timecode track embedding with NTP/PTP reference synchronization",
        "VANC ancillary data capture: Closed captioning (CEA-608/708) and broadcast telemetry preservation",
        "Audio track level metering: Per-channel peak meters and clipping indicators during ingest operations",
      ],
    },
  ],
  "input-engine": [
    {
      image: "/media/broadcast/allapplication/InputEngine (4).png",
      tag: "Signal Ingest Matrix",
      title: "Universal Signal Acquisition & Router Hub",
      subtitle: "Normalize physical SDI, HDMI, NDI, SRT, and RTMP into stable internal feeds.",
      description: "Signal normalization matrix that ingests varied physical and network video streams, strips packet jitter, synchronizes clocks, and converts color spaces into pristine internal studio feeds.",
      bullets: [
        "Multi-protocol signal ingest: DeckLink SDI, HDMI 2.1, NDI 6, SRT Caller/Listener, RTMP, and RTSP",
        "Hardware-accelerated decoding: Zero-copy GPU ingest pipelines via NVIDIA NVDEC and Intel QuickSync",
        "Direct3D texture sharing: Unified GPU texture sharing passing input frames directly to playout and multiviewer",
        "Audio track demuxing: Ingestion of up to 16 embedded audio channels with flexible matrix cross-routing",
      ],
    },
    {
      image: "/media/broadcast/allapplication/InputEngine (5).png",
      tag: "Frame Synchronization",
      title: "Hardware Frame Synchronizer & De-Jitter Buffer",
      subtitle: "Prevent frame tearing and audio pitch glitches when switching live remotes.",
      description: "Built-in broadcast frame synchronizer aligns unsynchronized remote contribution feeds to the station reference clock. Dynamic de-jitter buffering prevents packet loss artifacts on public internet links.",
      bullets: [
        "Genlock frame alignment: Hardware frame synchronizer preventing tearing when cutting between unsynced feeds",
        "Adaptive audio rate conversion: Sample rate converters preventing pitch shifts, audio clicks, and drift",
        "SRT ARQ packet recovery: Dynamic de-jitter buffering handling up to 30% packet loss on internet links",
        "Reference clock locking: Internal master clock sync locking all asynchronous feeds to broadcast standards",
      ],
    },
    {
      image: "/media/broadcast/allapplication/InputEngine (2).png",
      tag: "Format & Color Conversion",
      title: "Real-Time De-Interlacing & Color Space Management",
      subtitle: "Convert interlaced 1080i to progressive 1080p with studio-grade algorithms.",
      description: "GPU-accelerated video filtering converting interlaced broadcast feeds into high-quality progressive frames using motion-adaptive YADIF algorithms. Performs accurate Rec.709 to Rec.2020 color mapping.",
      bullets: [
        "Motion-adaptive de-interlacing: High-quality GPU YADIF algorithms converting 1080i to progressive 1080p",
        "Automated aspect ratio conversion: Pillarbox, letterbox, and anamorphic stretch handling without distortion",
        "3D LUT color management: Real-time camera color grading and HDR-to-SDR (Rec.2020 to Rec.709) tone mapping",
        "Video levels legalizer: Broadcast gamut legalizer preventing luminance and chrominance out-of-gamut spikes",
      ],
    },
    {
      image: "/media/broadcast/allapplication/InputEngine (3).png",
      tag: "Failover Safeguards",
      title: "Loss-of-Signal Safeguards & Automatic Cut-to-Slate",
      subtitle: "Ensure on-air stability even when remote contribution feeds disconnect.",
      description: "Continuous signal health supervisor monitoring incoming video feeds. If a live remote link fails or freezes, the system automatically triggers a clean cut to an emergency slate or backup video feed.",
      bullets: [
        "Sub-second black/freeze detection: Automated visual health supervisors with configurable alarm thresholds",
        "Automatic cut-to-slate fallback: Seamless failover to secondary live feed, standby video loop, or graphic slate",
        "Audio silence detection: Automated silence detectors triggering emergency backup audio bed playback",
        "Restoration hysteresis: Stable return switching ensuring links remain glitch-free before cutting back",
      ],
    },
  ],
  "qc-controller": [
    {
      image: "/media/broadcast/allapplication/QC Controller.png",
      tag: "Automated Broadcast QC",
      title: "Real-Time Automated Broadcast Quality Control",
      subtitle: "Continuous video and audio integrity verification before and during transmission.",
      description: "Automated QC workstation inspecting playout outputs and incoming media files for compliance with international broadcast standards. Flags technical anomalies before they reach transmission air.",
      bullets: [
        "Real-time compliance validation: Simultaneous automated audio and video checking across all channels",
        "Configurable alarm severity: Tiered alert profiles (Info, Warning, Error, Critical) with audible chimes",
        "Automated PDF/XML certification: Export formal compliance certificates for regulatory broadcast submissions",
        "Live stream probe logging: Continuous timestamped telemetry records for engineering post-mortems",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Screenshot 2026-10-09 011541.png",
      tag: "Media Probe & Decode",
      title: "Fast Probe & Deep Media Decode Conformance",
      subtitle: "Active preset validation for broadcast raster, framerates, and codecs.",
      description: "Fast probe metadata extraction and deep video decode stream analysis. Inspects video raster (1920x1080), framerate (24-60 fps), and codec specifications (h264, hevc, mpeg2video, dnxhd, prores) to guarantee playout compatibility.",
      bullets: [
        "Deep frame decode analysis: Frame-by-frame decoding detecting macroblocking, freeze, and stream corruptions",
        "Fast container probe verification: Sub-second validation of container metadata, track counts, and framerate",
        "Shared broadcast presets: Uniform QC rule profiles linked directly across master Kashtrix Settings",
        "Multi-codec conformance testing: Validation of ProRes, Avid DNxHD, Sony XDCAM MXF, HEVC, and H.264",
      ],
    },
    {
      image: "/media/broadcast/broadcast-31.png",
      tag: "Audio Loudness (R128)",
      title: "EBU R128 & ITU BS.1770 Loudness Normalization",
      subtitle: "Eliminate commercial loudness spikes and comply with broadcast regulations.",
      description: "Real-time compliance meters measuring Integrated Loudness (LUFS), Short-Term Loudness, Momentary Loudness, and True Peak (dBTP). Prevents television commercial volume spikes and regulatory fines.",
      bullets: [
        "Integrated loudness compliance: EBU R128 (-23 LUFS) and CALM Act (-24 LKFS) target enforcement",
        "True-peak limiter guard: Intersample peak detection preventing digital clipping on D/A convertors",
        "Loudness regulatory audit logs: Historical loudness logs proving compliance to broadcast authorities",
        "Multi-channel audio phase meters: Stereo correlation meters identifying out-of-phase acoustic cancellations",
      ],
    },
  ],
  "multiview": [
    {
      image: "/media/broadcast/allapplication/Multiviewer (4).png",
      tag: "Confidence Mosaic",
      title: "Low-Latency Broadcast Confidence Mosaic",
      subtitle: "High-density multi-channel monitoring wall with hardware acceleration.",
      description: "Hardware-accelerated broadcast multiviewer displaying up to 16 program, preview, and live camera feeds on high-resolution master control room monitors with under 1 frame of rendering latency.",
      bullets: [
        "Flexible mosaic layouts: 1+3, 2x2, 3x3, 4x4, 8+2, and custom user-defined operational grids",
        "Ultra-low rendering latency: Sub-16ms GPU pipeline ensuring frame-accurate live visual switching",
        "Universal output streaming: Multi-head HDMI 2.1, DisplayPort 1.4, and low-latency NDI 6 IP studio feeds",
        "GPU hardware acceleration: Dedicated NVDEC/NVENC hardware decoders supporting up to 16 concurrent 4K feeds",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Multiviewer (6).png",
      tag: "Dynamic Tally",
      title: "Dynamic Tally & Program / Preview Indicator Borders",
      subtitle: "Sub-frame visual tally borders reflecting master switcher states.",
      description: "Displays dynamic tally borders around video tiles: Red for on-air Program, Green for cued Preview, and Amber for auxiliary channels. Tally signals synchronize instantaneously via TSL UMD protocol and NDI.",
      bullets: [
        "Bi-directional visual tally: Red (PGM) and Green (PVW) colored border highlights with custom stroke width",
        "TSL UMD protocol integration: Native TSL UMD v3.1, v4.0, and v5.0 network protocol binding with vision mixers",
        "Dynamic source identification: Automated UMD text updates reflecting routing switcher crosspoints and camera IDs",
        "Auxiliary status indicators: Yellow preview cues, freeze-frame alerts, and loss-of-signal warning banners",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Multiviewer (1).png",
      tag: "Audio Telemetry",
      title: "Multi-Channel PPM & VU Peak Audio Meters",
      subtitle: "Continuous confidence monitoring of all audio channels simultaneously.",
      description: "Real-time audio meter overlays rendered on each mosaic tile. Displays Peak Program Meters (PPM) and VU ballistics with peak-hold bars, dBFS scales, and stereo phase correlation indicators.",
      bullets: [
        "High-density audio metering: Multi-track PPM and True-Peak ballistic meters for up to 16 channels per tile",
        "Stereo phase correlation: Real-time phase correlation goniometers identifying acoustic cancellations instantly",
        "Intelligent threshold alarms: Automated silence detection and audio clipping warnings rendered over video tiles",
        "Selectable solo audio monitor: Instant operator mouse-click soloing to master control room headphones",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Multiviewer (5).png",
      tag: "Clock & Timecode Overlays",
      title: "SMPTE Timecode & Precision Station Master Clocks",
      subtitle: "Synchronize master control timing with prominent on-screen clocks.",
      description: "Overlays precision broadcast clocks and linear timecode (LTC) displays onto the multiviewer canvas. MCR operators monitor wall-clock time, countdown to commercial breaks, and clip remaining times at a glance.",
      bullets: [
        "Precision master clock synchronization: PTP IEEE-1588 and NTP synchronized analog and digital studio wall clocks",
        "SMPTE timecode telemetry: Continuous SMPTE 12M LTC and VITC timecode display with sub-frame accuracy",
        "Automated rundown countdowns: Dynamic countdown timers showing exact time remaining to commercial blocks",
        "Custom text & branding overlays: Station bugs, channel identifiers, and emergency crawl monitor indicators",
      ],
    },
  ],
  "nrcs": [
    {
      image: "/media/broadcast/allapplication/NRCS (3).png",
      tag: "Newsroom Workspace",
      title: "Integrated Newsroom Computer System (NRCS)",
      subtitle: "Complete journalist and producer workspace for broadcast news operations.",
      description: "End-to-end news production environment. Journalists write stories, format news scripts, attach media clips, assign on-screen lower-third graphics, and build live news broadcast rundowns.",
      bullets: [
        "Multi-column news script editor: Split presenter camera copy alongside technical director timing cues",
        "Collaborative real-time editing: Granular story-level locking preventing editorial collisions during live news",
        "Intelligent pacing calculator: Word-count velocity algorithm estimating anchor spoken read time in seconds",
        "Integrated media attachment: Direct drag-and-drop linking of playout video clips and lower-third CG graphics",
      ],
    },
    {
      image: "/media/broadcast/allapplication/NRCS (2).png",
      tag: "MOS Protocol Integration",
      title: "MOS Protocol 2.8.4 Device Synchronization",
      subtitle: "Bi-directional synchronization with playout servers and studio graphics.",
      description: "Compliant Media Object Server (MOS) protocol gateway. Links news rundowns directly to master control playout engines, motion character generators, video servers, and teleprompters in real time.",
      bullets: [
        "MOS 2.8.4 protocol gateway: Bi-directional synchronization with master control video servers and CG engines",
        "Active rundown synchronization: Real-time updates push breaking script edits to on-air playout cues instantly",
        "Media readiness verification: Real-time MOS item status feedback confirming rendered video and graphic availability",
        "Direct template parameter binding: Fill news tickers, lower-third names, and strap text directly from story copy",
      ],
    },
    {
      image: "/media/broadcast/allapplication/NRCS (1).png",
      tag: "Timing & Back-Timing",
      title: "Live Story Timing & Dynamic Back-Timing Engine",
      subtitle: "Never run over time during live news broadcasts.",
      description: "Dynamic show timing engine recalculating broadcast schedules in real time as news anchors speak faster or slower. Displays exact under/over times and hard-out commercial break milestones.",
      bullets: [
        "Live dynamic back-timing engine: Continuous recalculation of show timing against scheduled commercial hard-outs",
        "Producer float & kill controls: Instant single-click floating of stories during breaking news timeline adjustments",
        "Hard-out commercial countdown: Visual precision countdown clocks ensuring satellite window compliance",
        "Segment over/under tracking: Color-coded over-run and under-run telemetry for executive show producers",
      ],
    },
    {
      image: "/media/broadcast/allapplication/NRCS (4).png",
      tag: "Wire Service Ingest",
      title: "Live Wire Service Intake & Agency Feed Filtering",
      subtitle: "Real-time intake from AP, Reuters, AFP, and custom RSS wire feeds.",
      description: "Ingests continuous news agency wire feeds directly into the journalist workspace. Filter stories by urgency, category, or keyword, and copy breaking news copy into story rundowns with one click.",
      bullets: [
        "Multi-agency wire ingestion: Real-time intake supporting AP, Reuters, AFP, NewsML-G2, and custom RSS feeds",
        "Automated keyword alerts: Immediate producer notifications for breaking regional news and urgent bulletin wires",
        "One-click story cloning: Instant conversion of wire copy into formatted anchor prompter scripts and rundowns",
        "Searchable wire archive: High-speed full-text indexing across incoming global news wires and agency bulletins",
      ],
    },
  ],
  "prompter": [
    {
      image: "/media/broadcast/allapplication/Prompter (3).png",
      tag: "Prompter Display Surface",
      title: "Studio Teleprompter Display & Optical Mirror Engine",
      subtitle: "Sub-pixel smooth scrolling optimized for broadcast studio talent.",
      description: "Hardware-accelerated teleprompter display engine providing silky smooth, jitter-free script scrolling. Features horizontal and vertical optical flip modes for high-transparency prompter glass beamsplitters.",
      bullets: [
        "Sub-pixel GPU scroll engine: Ultra-smooth hardware-accelerated text scrolling eliminating micro-stutters",
        "Optical mirror flip modes: Instant horizontal mirror and vertical invert for broadcast studio beamsplitter glass",
        "High-contrast talent typography: Customizable font sizing, presenter eye-line markers, and color-coded cues",
        "Dual-display multi-head output: Independent talent prompter display with low-latency operator preview mirror",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Prompter (1).png",
      tag: "Live Script Sync",
      title: "Real-Time NRCS Newsroom Script Synchronization",
      subtitle: "Update anchor scripts on prompter glass while the news is on air.",
      description: "Continuous synchronization with newsroom rundown systems. When producers edit an anchor script or reorder stories, the teleprompter updates position smoothly without disrupting the presenter's scroll flow.",
      bullets: [
        "Real-time NRCS rundown sync: Continuous background synchronization with newsroom stories without scroll interruption",
        "Story boundary navigation: Instant hotkey jumping to next story segment or breaking news insertions",
        "Multi-prompter synchronization: Synchronized script mirroring across anchor desk, guest monitors, and floor displays",
        "Automated presenter pacing: Dynamic auto-scroll velocity adapting to anchor reading cadence and cue markers",
      ],
    },
    {
      image: "/media/broadcast/allapplication/Prompter (2).png",
      tag: "Controller Hardware",
      title: "Hardware Controller & Wireless Foot Pedal Integration",
      subtitle: "Tactile speed control for professional prompter operators and anchors.",
      description: "Direct integration with professional teleprompter control hardware: ShuttleXpress jog-wheels, wireless presenter remotes, USB foot pedals, and IP studio automation consoles.",
      bullets: [
        "Tactile controller integration: Native support for Contour ShuttleXpress, USB foot pedals, and wireless hand remotes",
        "Logarithmic speed calibration: Fine-tuned scroll speed sensitivity with smooth acceleration and deceleration curves",
        "Emergency reverse & bookmark recall: Dedicated quick-return bookmarks for rapid review during live interviews",
        "Network IP controller protocol: Wireless iOS/Android prompter remote control via studio Wi-Fi network",
      ],
    },
  ],
  "ha-controller": [
    {
      image: "/media/broadcast/allapplication/HAController (1).png",
      tag: "Redundancy Supervisor",
      title: "1+1 Redundant Playout Supervisor & Heartbeat Engine",
      subtitle: "Continuous health surveillance maintaining 99.999% transmission continuity.",
      description: "High-availability clustering engine running active surveillance across Primary (Main) and Secondary (Backup) playout channels. Monitors process heartbeats, GPU render pipelines, and network link health.",
      bullets: [
        "Sub-second heartbeat surveillance: Continuous UDP/TCP heartbeat polling between primary and secondary playout servers",
        "Deep telemetry health probes: Continuous monitoring of GPU decode health, video buffers, and OS stability",
        "Automated state mirroring: Real-time playlist synchronization keeping both channels locked to identical frame offsets",
        "Isolated dual network architecture: Redundant management and media IP links preventing split-brain conditions",
      ],
    },
    {
      image: "/media/broadcast/allapplication/HAController (2).png",
      tag: "Sub-Frame Failover",
      title: "Clean Sub-Frame Failover Switching Engine",
      subtitle: "Automatic transfer to backup transmission in under 40 milliseconds.",
      description: "Triggers clean downstream hardware router switching upon detecting a primary channel anomaly. The switch occurs within a single video frame without audio pops, black flashes, or viewer interruption.",
      bullets: [
        "Sub-40ms clean switching: Ultra-fast failover triggers downstream routing switchers within a single video frame",
        "Glitch-free audio crossfade: Seamless audio transition eliminating acoustic pops, clicks, or digital muting",
        "Hysteresis safety lock: Configurable failover debounce timers preventing flapping during transient network blips",
        "Universal router protocol support: Native integration with Blackmagic Videohub, Ross, Evertz, and Grass Valley routers",
      ],
    },
    {
      image: "/media/broadcast/broadcast-20.png",
      tag: "State Mirroring",
      title: "Real-Time Database & Playlist State Replication",
      subtitle: "Frame-accurate continuous synchronization of playout and graphics state.",
      description: "Bi-directional replication engine syncing active playlist items, clip playhead offsets, loaded graphics templates, and manual override flags across both playout nodes with zero lag.",
      bullets: [
        "Frame-accurate playhead sync: Synchronous clip position tracking ensuring the backup node takes air without seam",
        "Dynamic graphics state replication: Real-time mirroring of on-air lower thirds, tickers, and DVE overlay states",
        "Seamless post-recovery resync: Automatic background resynchronization of primary node after maintenance reboot",
        "Comprehensive audit logging: Complete chronological incident logs recording failover events with sub-second timestamps",
      ],
    },
  ],
};

// Shape masks and contour profiles for detailing section sub-images
const maskShapes = [
  {
    name: "Oval Mask",
    shapeClass: "rounded-[46px] sm:rounded-[68px]",
    innerClass: "rounded-[42px] sm:rounded-[62px]",
  },
  {
    name: "Sculpted Arch Mask",
    shapeClass: "rounded-tl-[54px] rounded-br-[54px] rounded-tr-[20px] rounded-bl-[20px] sm:rounded-tl-[74px] sm:rounded-br-[74px] sm:rounded-tr-[26px] sm:rounded-bl-[26px]",
    innerClass: "rounded-tl-[48px] rounded-br-[48px] rounded-tr-[16px] rounded-bl-[16px] sm:rounded-tl-[68px] sm:rounded-br-[68px] sm:rounded-tr-[22px] sm:rounded-bl-[22px]",
  },
  {
    name: "Vault Dome Mask",
    shapeClass: "rounded-t-[54px] sm:rounded-t-[78px] rounded-b-[20px] sm:rounded-b-[24px]",
    innerClass: "rounded-t-[48px] sm:rounded-t-[72px] rounded-b-[16px] sm:rounded-b-[20px]",
  },
  {
    name: "Curved Squircle Mask",
    shapeClass: "rounded-[34px] sm:rounded-[46px]",
    innerClass: "rounded-[30px] sm:rounded-[40px]",
  },
  {
    name: "Diagonal Wave Mask",
    shapeClass: "rounded-tr-[54px] rounded-bl-[54px] rounded-tl-[20px] rounded-br-[20px] sm:rounded-tr-[74px] sm:rounded-bl-[74px] sm:rounded-tl-[26px] sm:rounded-br-[26px]",
    innerClass: "rounded-tr-[48px] rounded-bl-[48px] rounded-tl-[16px] rounded-br-[16px] sm:rounded-tr-[68px] sm:rounded-bl-[68px] sm:rounded-tl-[22px] sm:rounded-br-[22px]",
  },
];

export function ApplicationScreenshotsShowcase({
  appSlug,
  appTitle,
  appLabel,
  accent,
  screenshots,
}: ApplicationScreenshotsShowcaseProps) {
  const details = screenshotDetailsMap[appSlug] || [];

  if (details.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {details.map((item, idx) => {
        const isEven = idx % 2 === 1;
        const dim = imageDimensions[item.image] || { width: 1920, height: 1080 };
        const shape = maskShapes[idx % maskShapes.length];
        return (
          <section
            key={item.image}
            className={`section-pad border-b border-[#e8e2e9] dark:border-[#381647] ${
              isEven
                ? "bg-[#faf9fb] dark:bg-[#180a24]"
                : "bg-white dark:bg-[#12071a]"
            }`}
          >
            <div className="container-shell">
              <div
                className={`grid gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:items-center ${
                  isEven ? "lg:grid-cols-[1.15fr_1.05fr]" : ""
                }`}
              >
                {/* Details Column */}
                <MotionReveal className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-widest"
                      style={{ color: accent || "#6f2b8f" }}
                    >
                      View {String(idx + 1).padStart(2, "0")} / {String(details.length).padStart(2, "0")} · {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#171219] dark:text-[#f7f4f8] sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-[#4b1b63] dark:text-[#c084fc]">
                    {item.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#675f6d] dark:text-[#c4b3cf]">
                    {item.description}
                  </p>

                  {/* Operational Capabilities List with Scroll Trigger Animation */}
                  <div className="mt-6 border-t border-[#eee8f0] dark:border-[#381647] pt-5">
                    <ScrollTriggeredFeaturePoints
                      items={item.bullets}
                      accent={accent || "#6f2b8f"}
                    />
                  </div>
                </MotionReveal>

                {/* Sub-image Display Column with Oval and Different Shaped Masks & Soft Shadows Light */}
                <MotionReveal
                  delay={0.06}
                  className={isEven ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="group relative">
                    {/* Soft Luminous Backlight Aura / Diffused Light Glow */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-5 -z-10 ${shape.shapeClass} opacity-35 blur-2xl transition duration-500 group-hover:opacity-70`}
                      style={{
                        background: `radial-gradient(ellipse at center, ${accent}60 0%, ${accent}18 55%, transparent 75%)`,
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-1 -z-10 ${shape.shapeClass} opacity-25 blur-md transition duration-500 group-hover:opacity-45`}
                      style={{
                        background: `linear-gradient(135deg, ${accent}45, rgba(255,255,255,0.3) 50%, ${accent}30)`,
                      }}
                    />

                    {/* Shaped Mask Frame with Soft Shadows Light */}
                    <div
                      className={`relative overflow-hidden ${shape.shapeClass} border border-[#e5dce6]/90 dark:border-[#421d55] bg-[#0c0910] p-1.5 sm:p-2.5 transition-all duration-500 group-hover:-translate-y-1 ring-1 ring-inset ring-white/60 dark:ring-white/10`}
                      style={{
                        boxShadow: `0 24px 60px -12px rgba(22, 10, 32, 0.16), 0 10px 24px -5px rgba(0, 0, 0, 0.07), 0 0 35px -5px ${accent}33`,
                      }}
                    >
                      <div className={`overflow-hidden ${shape.innerClass} bg-[#0c0910]`}>
                        <Image
                          src={item.image}
                          alt={`${appTitle} - ${item.title}`}
                          width={dim.width}
                          height={dim.height}
                          quality={95}
                          priority={idx === 0}
                          sizes="(max-width: 1024px) 100vw, 760px"
                          className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                        />
                      </div>

                      {/* Floating subtle workstation indicator tag */}
                      <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-[#120a1a]/85 px-2.5 py-1 text-[9px] font-medium tracking-wider text-white/80 shadow-sm backdrop-blur-md border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                        <span>Interactive Workspace</span>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-2.5 flex items-center justify-between px-2 font-mono text-[10px] text-[#8e8593] dark:text-[#b4a4be]">
                      <span>Workstation Preview · View {String(idx + 1).padStart(2, "0")}</span>
                      <span>Native Workstation Display · {appLabel}</span>
                    </div>
                  </div>
                </MotionReveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
