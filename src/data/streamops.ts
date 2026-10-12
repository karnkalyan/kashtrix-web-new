export type StreamOpsModule = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  specs?: [string, string][];
  screenshot: string | null;
};

export const streamOpsModules: StreamOpsModule[] = [
  {
    slug: "live-transcoding",
    title: "Live TV Channel Composer & Transcoding Grid",
    description: "Ingest SDI, HDMI, SRT, RTMP, RTSP, HTTP-TS, UDP/RTP and VOD feeds to encode pristine broadcast and OTT linear television channels with hardware GPU acceleration.",
    bullets: [
      "Hardware-accelerated scaling via NVIDIA NVENC/CUDA, Intel QuickSync (QSV), AMD AMF and Apple VideoToolbox",
      "Broad broadcast codec support: H.264/AVC, H.265/HEVC, MPEG-2 Broadcast (4:2:0/4:2:2), VP9, AV1 and uncompressed 10-bit v210",
      "Studio audio encoding: AAC-LC, MP2 (broadcast standard), AC3, E-AC3 (Dolby Digital Plus), Opus, MP3 and uncompressed PCM 16/24-bit",
      "Strict rate control with VBV buffer enforcement (CBR, VBR, CQP, CRF) and adaptive motion deinterlacing (bwdif, yadif, tff/bff)",
      "Simultaneous egress: DVB UDP/RTP Multicast (pkt_size=1316), low-latency HLS/DASH, RTMP relays, SRT links and SCTE-35 ad splice",
    ],
    specs: [
      ["Video Codecs", "H.264, H.265/HEVC, MPEG-2 (4:2:2), VP9, AV1, v210"],
      ["Audio Codecs", "AAC-LC, MP2, AC3, E-AC3, Opus, PCM 16/24-bit (up to 8ch)"],
      ["Hardware Acceleration", "NVIDIA NVENC, Intel QSV, AMD AMF, Apple VideoToolbox"],
      ["Egress Protocols", "DVB UDP/RTP (pkt_size=1316), HLS, MPEG-DASH, SRT, RTMP"],
    ],
    screenshot: "/media/streamops/streamops-04.png",
  },
  {
    slug: "mpts-multiplexing",
    title: "Enterprise DVB MPTS Multiplexer Engine",
    description: "Combine multiple independent channels into standards-compliant Multi-Program Transport Streams with automatic DVB PSI/SI generation, collision-free PID mapping and CBR null-packet stuffing.",
    bullets: [
      "Collision-free PID architecture: automatically assigns standards-compliant PCR, PMT, Video and Audio PIDs across all multiplexed services",
      "Automatic continuous DVB PSI/SI table generation: Program Association (PAT), Program Map (PMT), Service Description (SDT) and NIT",
      "CBR null-packet stuffing (PID 0x1FFF) enforcing aggregate constant bitrates required by satellite transponders and DVB-C/T/T2 modulators",
      "One-click source discovery: imports active StreamOps channels, live RTMP/SRT streams and VOD media directly into the multiplex matrix",
      "Live bandwidth distribution telemetry: visualizes real-time bandwidth consumption per service alongside null stuffing percentages",
    ],
    specs: [
      ["DVB Standards", "ISO/IEC 13818-1, ETSI EN 300 468, TR 101 290 Priority 1/2"],
      ["Null Stuffing", "CBR enforcement with automated null packets (PID 0x1FFF)"],
      ["Table Generation", "PAT, PMT, SDT, NIT, TDT/TOT with custom Network ID & Service IDs"],
      ["PCR Precision", "Clocked to ≤ 20ms interval with ultra-low jitter for consumer STBs"],
    ],
    screenshot: "/media/streamops/streamops-05.png",
  },
  {
    slug: "ingest-recording",
    title: "Professional Studio Ingest & Master Recording",
    description: "Capture uncompressed 10-bit 4:2:2 masters and broadcast MXF files from Blackmagic DeckLink SDI/HDMI cards and IP streams with zero-frame-loss recording.",
    bullets: [
      "Native hardware integration: Blackmagic Design DeckLink (4K Extreme, Duo 2, Quad, Mini Recorder), Intensity Pro 4K, AJA and Magewell",
      "Studio-grade master profiles: MOV v210 (uncompressed 10-bit 4:2:2 with 8ch PCM), MXF XDCAM HD422 (50 Mbps MPEG-2 4:2:2) and NVENC MP4/MKV",
      "Live confidence source monitoring: in-browser zero-latency preview player, dynamic stereo/multi-channel audio VU meters and elapsed timecode",
      "Automated recording workflows: auto-record on carrier signal lock, continuous segmented recording (15/30/60m) without dropping frames",
      "Custom file naming templates with dynamic token replacement: {channel}_{date}_{time}",
    ],
    specs: [
      ["Master Formats", "MOV (v210 10-bit 4:2:2), MXF OP1a (XDCAM HD422 50 Mbps), MP4/MKV"],
      ["Capture Cards", "Blackmagic DeckLink, UltraStudio, Intensity Pro, AJA Kona, Magewell"],
      ["Audio Capture", "Up to 8/16 discrete channels of 24-bit 48kHz uncompressed PCM"],
      ["Trigger Modes", "Crash record, scheduled calendar timer, and auto-record on carrier lock"],
    ],
    screenshot: "/media/streamops/streamops-06.png",
  },
  {
    slug: "storage-cloud",
    title: "Distributed Storage, Network Shares & Cloud Sync",
    description: "Store, browse and distribute recorded broadcast masters across local NVMe storage, enterprise SMB/CIFS SANs, embedded FTP and Amazon S3.",
    bullets: [
      "Multi-tier storage targets: local NVMe/SSD, enterprise SMB/CIFS shares, embedded multi-user FTP server and Amazon S3 / MinIO clusters",
      "Embedded high-speed FTP server with isolated home directories, user authentication and granular upload/download bandwidth quotas",
      "Integrated web file manager: browse, preview, download, rename and delete recorded assets with disk quota usage indicators",
      "Instant archive transmuxer: in-browser HLS playback of multi-gigabyte MOV, MXF and MP4 master files without full re-encoding",
    ],
    specs: [
      ["Storage Protocols", "Local NVMe/SSD, SMB v2/v3, NFS, FTP/FTPS, AWS S3, MinIO"],
      ["Archive Transmuxing", "Instant in-browser HLS playback for multi-GB master files"],
      ["Embedded FTP", "Multi-user secure FTPS with quota and bandwidth governance"],
    ],
    screenshot: "/media/streamops/streamops-08.png",
  },
  {
    slug: "live-ingest-security",
    title: "Live Ingest Server & Stream Hijack Security",
    description: "Hardened RTMP/RTMPS and SRT ingest gateway designed to prevent unauthorized broadcast access and stream piracy.",
    bullets: [
      "Dual security enforcement modes: toggle between Open (studio staging) and Protected (production enforcement) modes",
      "Multi-factor publisher authentication: URL stream key (?key=... / ?token=...), username/password credentials and stream path whitelisting",
      "Single-publisher concurrency lock: strict anti-hijacking prevention ensuring duplicate publishers cannot transmit on an active key",
      "Live session telemetry: monitor publisher IP, protocol, incoming bitrate, jitter, frame rate and duration with one-click disconnect & IP ban",
    ],
    specs: [
      ["Ingest Protocols", "RTMP, RTMPS (TLS), SRT (Caller/Listener with AES-128/256)"],
      ["Authentication", "URL stream keys, user/pass credentials, application whitelisting"],
      ["Anti-Hijacking", "Single-publisher concurrency lock with instant kick and IP ban"],
    ],
    screenshot: "/media/streamops/streamops-07.png",
  },
  {
    slug: "automation-api",
    title: "External Studio Automation & TCP Control Protocol",
    description: "Integrate StreamOps with broadcast television studio automation, vision switchers and physical controllers via low-latency TCP socket protocol (Port 9999).",
    bullets: [
      "Dedicated TCP automation server on port 9999 supporting both ASCII plain-text and structured JSON payloads",
      "Supported control commands: START <preset>, STOP <app> <stream>, STOP_ALL, STATUS, PRESETS and PING",
      "Hardware controller compatibility: Elgato Stream Deck (via TCP/WebSocket plugin), Ross Video OverDrive, Grass Valley, Crestron",
      "Comprehensive RESTful HTTP API and WebSocket event bus for real-time status query and telemetry integration",
    ],
    specs: [
      ["Control Port", "TCP Port 9999 (ASCII text & JSON-RPC)"],
      ["Commands", "START, STOP, STOP_ALL, STATUS, PRESETS, PING"],
      ["Integration", "Elgato Stream Deck, Ross Video OverDrive, Grass Valley, Python, Node.js"],
    ],
    screenshot: null,
  },
  {
    slug: "transcode-studio",
    title: "Transcode Studio & Batch VOD Processing",
    description: "Offline parallel GPU transcoding engine converting high-bitrate studio masters into web, broadcast and mobile distribution profiles.",
    bullets: [
      "Multi-job parallel queue with real-time encoding speed multipliers (e.g., 4.2x realtime), progress bars and ETA calculations",
      "Standard broadcast presets: Broadcast Master 1080p50 (15 Mbps NVENC CBR), Web Standard 1080p (6 Mbps), 4K UHD HEVC and Mobile 720p",
      "Chunked resilient browser uploader: upload multi-gigabyte video files via browser with automatic retry and checksum verification",
      "Automated audio channel mapping and loudness normalization during transcoding",
    ],
    specs: [
      ["Queue Capacity", "Multi-job parallel queue with configurable GPU worker count"],
      ["Standard Presets", "1080p50 Master (NVENC), Web 1080p, 4K HEVC 10-bit, Mobile 720p"],
      ["File Uploader", "Chunked resumable browser uploads with SHA-256 verification"],
    ],
    screenshot: null,
  },
  {
    slug: "vod-playout",
    title: "VOD Playout & Virtual Linear Channels",
    description: "Convert static video libraries into scheduled 24/7 linear broadcast feeds with seamless looping and dynamic HLS/DASH packaging.",
    bullets: [
      "File-to-live transmuxing: stream pre-recorded MP4, MOV and MKV files as continuous live broadcast feeds",
      "Seamless loop and playlist mode: build automated 24/7 barker channels, emergency loop channels or interstitial filler",
      "Dynamic low-latency packaging into adaptive HLS and MPEG-DASH for OTT and web streaming",
    ],
    specs: [
      ["Playout Modes", "Seamless loop, sequential playlist, and time-scheduled VOD"],
      ["Packaging", "Low-latency HLS (LL-HLS) and MPEG-DASH"],
    ],
    screenshot: null,
  },
  {
    slug: "network-ha",
    title: "Carrier Networking & High Availability",
    description: "Operate high-throughput broadcast networks with 802.3ad LACP bonding, 802.1Q VLANs, IGMPv3 SSM and policy-based routing.",
    bullets: [
      "Physical interface telemetry: monitor link speed (1G, 10G, 25G, 40G, 100G), duplex, MTU and carrier lock",
      "IEEE 802.3ad LACP NIC bonding: aggregate multiple physical adapters for link redundancy and doubled throughput",
      "802.1Q VLAN tagging: segregate management traffic, broadcast ingest and internet egress onto dedicated VLANs",
      "Statmux Multicast & IGMPv3 SSM: advanced kernel-level multicast routing and dual-interface egress for IPTV headends",
    ],
    specs: [
      ["Bonding Protocols", "IEEE 802.3ad LACP, Active-Backup, Balance-XOR, Broadcast"],
      ["VLAN & Routing", "802.1Q VLAN tagging, static routing, policy-based routing"],
      ["Multicast", "IGMPv3 Source-Specific Multicast (SSM) with dual-NIC egress"],
    ],
    screenshot: "/media/streamops/streamops-09.png",
  },
  {
    slug: "telemetry-snmp",
    title: "Real-Time Hardware Telemetry & SNMP Alarms",
    description: "Prevent broadcast failures before they happen with GPU/VRAM telemetry, per-core CPU load, thermal monitoring and SNMP traps.",
    bullets: [
      "GPU and VRAM telemetry: direct nvidia-smi query tracking NVENC utilization, core temperature, memory load and fan speed",
      "CPU and system telemetry: per-core CPU load, system RAM utilization and hardware thermal sensors",
      "Broadcast SNMP alarm manager: SNMP v2c and v3 trap notifications sent directly to NOC dashboards (Nagios, Zabbix, PRTG)",
      "Configurable alarm rules: bitrate drop, high temperature, dropped frames, low disk space and high CPU/GPU load",
    ],
    specs: [
      ["GPU Telemetry", "NVIDIA NVENC utilization, VRAM usage, GPU core temperature, fan speed"],
      ["SNMP Traps", "SNMP v2c and v3 traps for Nagios, Zabbix, PRTG, Datadog"],
      ["Alarm Triggers", "Bitrate drops, thermal thresholds, dropped frames, storage warnings"],
    ],
    screenshot: "/media/streamops/streamops-03.png",
  },
  {
    slug: "decoder-fleet",
    title: "DecodX Fleet Middleware & STB Ecosystem",
    description: "Management plane for operating proprietary hardware decoders and Android TV Set-Top Box fleets with remote control and OTA updates.",
    bullets: [
      "Fleet device registry: monitor online status, IP, MAC address, firmware version and playback health across thousands of STBs",
      "Remote device control: remotely switch channels, reboot decoders or execute network diagnostic pings from the web UI",
      "Over-The-Air (OTA) APK manager: upload and stage new Android client versions and push automated fleet updates",
      "Subscriber management: associate hardware devices with user accounts, subscription tiers and authorized channel bundles",
    ],
    specs: [
      ["Device Support", "DecodX hardware decoders, Android TV STBs, IPTV set-top boxes"],
      ["Remote Operations", "Channel change, device reboot, ping diagnostics, volume control"],
      ["OTA Updates", "Centralized APK staging, channel package push, staged fleet rollouts"],
    ],
    screenshot: null,
  },
  {
    slug: "security-rbac",
    title: "Enterprise Security, Role-Based Access & Audit Logging",
    description: "Satisfy strict enterprise IT security audits with granular RBAC, immutable audit logging and Ed25519 cryptographic licensing.",
    bullets: [
      "Granular Role-Based Access Control dividing privileges across SuperAdmin, Admin, Operator and Viewer",
      "Immutable audit trail capturing user identity, IP address, exact action, target entity, timestamp and before/after diffs",
      "Cryptographic licensing: validated via Ed25519 signatures enforcing channels, live server, ingest server and transcode limits",
      "mTLS 1.3 encrypted telemetry heartbeats preventing key tampering or license spoofing",
    ],
    specs: [
      ["Access Control", "Granular RBAC: SuperAdmin, Admin, Operator, Viewer"],
      ["Audit Logging", "Immutable event history with complete before/after payload diffs"],
      ["Licensing", "Ed25519 cryptographic signatures with mTLS 1.3 heartbeat verification"],
    ],
    screenshot: "/media/streamops/streamops-10.png",
  },
];

export const streamOpsSpecs = [
  ["Ingest protocols", "SDI (HD/3G/6G/12G), HDMI 2.0/2.1, SRT (Caller/Listener), RTMP/RTMPS, UDP/RTP Multicast (SPTS/MPTS), HTTP-TS, HLS, DASH, RTSP"],
  ["Egress protocols", "DVB UDP Multicast (pkt_size=1316), RTP Multicast, SRT (Caller/Listener), RTMP/RTMPS, HLS (Adaptive Bitrate), MPEG-DASH, HTTP-TS"],
  ["Video codecs", "H.264 (AVC Baseline/Main/High), H.265 (HEVC Main/Main10), MPEG-2 Broadcast (4:2:0 & 4:2:2), VP9, AV1, Uncompressed v210 (10-bit)"],
  ["Audio codecs", "AAC (LC/HE), MP2 (MPEG-1 Audio Layer II), AC3 (Dolby Digital), EAC3 (Dolby Digital Plus), Opus, MP3, PCM 16-bit / 24-bit (up to 8 channels)"],
  ["Hardware acceleration", "NVIDIA NVENC / NVDEC (Pascal through Ada Lovelace / Hopper / Blackwell), Intel QuickSync (QSV), AMD AMF, Apple VideoToolbox"],
  ["Capture hardware", "Blackmagic Design DeckLink Series, Intensity Pro 4K, UltraStudio, AJA Video Systems, Magewell, DirectShow, V4L2"],
  ["DVB specifications", "ISO/IEC 13818-1 (MPEG-2 TS), EN 300 468 (DVB SI), TR 101 290 (Priority 1/2 compliance), CBR null-stuffing (PID 0x1FFF)"],
  ["Storage & networking", "Local NVMe/SSD, SMB v2/v3, NFS, Embedded Secure FTP/FTPS, Amazon S3, MinIO, IEEE 802.3ad LACP, IEEE 802.1Q VLAN, IGMPv3 SSM"],
  ["Automation & NOC", "Dedicated TCP Socket Server (Port 9999), RESTful HTTP API, WebSocket Live Events, SNMP v2c/v3 Traps"],
] as const;
