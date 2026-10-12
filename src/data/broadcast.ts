export const broadcastApps = [
  {
    "number": 1,
    "slug": "master-control-playout",
    "label": "Playout",
    "product": "Master Control Playout",
    "title": "Master Control Playout & Compositor Engine",
    "purpose": "Core 24/7 master control playout engine delivering continuous, glitch-free broadcast video, audio, and graphics rendering.",
    "theme": "violet-grid",
    "accent": "#6d28d9",
    "screenshots": [
      "/media/broadcast/broadcast-16.png",
      "/media/broadcast/broadcast-14.png",
      "/media/broadcast/broadcast-17.png",
      "/media/broadcast/allapplication/playlist Editor.png"
    ],
    "capabilities": [
      {
        "title": "Dual Independent Video Pipelines (PGM & PVW)",
        "details": [
          "Program (PGM) Pipeline: Real-time presentation surface driving master broadcast outputs.",
          "Preview (PVW) Pipeline: Frame-accurate preview channel allowing operators to inspect upcoming clips, trim points, and graphics overlays before taking them to air."
        ]
      },
      {
        "title": "Transition & Mixing Engine",
        "details": [
          "Seamless cuts, dissolves (crossfades), wipes, slides, and pushes with user-definable durations (frames or milliseconds).",
          "Audio auto-follow-video crossfading with adjustable logarithmic and linear curve profiles."
        ]
      },
      {
        "title": "Multi-Format Media Engine",
        "details": [
          "Native hardware decoding via NVDEC, Intel QSV, DXVA2, and D3D11VA.",
          "Native format support: Apple ProRes (422, 422 HQ, 4444), Avid DNxHD/DNxHR, Sony XDCAM HD422 (MXF), D10/IMX, Panasonic AVC-Intra, H.264/AVC, H.265/HEVC, MPEG-2 Broadcast Transport/Program Streams, WebM, MP4, MKV, AVI, and QuickTime MOV.",
          "Transparent alpha-channel video playback (ProRes 4444, PNG sequences, WebM VP9 with alpha, QuickTime Animation)."
        ]
      },
      {
        "title": "On-Air Real-Time Graphics Compositor",
        "details": [
          "Multi-layered Direct3D rendering engine overlays dynamic tickers, station bugs (logos), lower thirds, scoreboards, and emergency crawls without dropping frames.",
          "Dynamic text field replacement on live graphics without stopping playback."
        ]
      },
      {
        "title": "Frame-Accurate Clock & Timecode",
        "details": [
          "SMPTE 12M linear timecode (LTC) and vertical interval timecode (VITC) support.",
          "NTP and PTP master clock synchronizer.",
          "Real-time countdown clocks: Elapsed time, Remaining time, Time to Next Event, and Next Program ID."
        ]
      },
      {
        "title": "Auxiliary & Secondary Event Automation",
        "details": [
          "Automated SCTE-35 digital cue marker injection for targeted ad insertion.",
          "Downstream Keyer (DSK) auto-triggering on specific playlist events.",
          "Router crosspoint triggers via GPI/O or IP commands."
        ]
      }
    ],
    "keywords": [
      "playout",
      "master control playout & compositor engine",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 2,
    "slug": "output-engine",
    "label": "Transmission",
    "product": "Kashtrix.OutputEngine",
    "title": "Transmission & Multi-Protocol Output",
    "purpose": "Multi-channel broadcast transmission and digital streaming matrix connecting playout video to physical broadcast cards, IP video networks, and internet CDNs.",
    "theme": "electric-cyan",
    "accent": "#0891b2",
    "screenshots": [
      "/media/broadcast/allapplication/OutputEngine.png",
      "/media/broadcast/allapplication/outpputEngine1 (1).png",
      "/media/broadcast/allapplication/outpputEngine1 (2).png",
      "/media/broadcast/broadcast-28.png",
      "/media/broadcast/broadcast-40.png"
    ],
    "capabilities": [
      {
        "title": "Baseband Hardware Broadcast Output",
        "details": [
          "Blackmagic Design DeckLink & UltraStudio: 12G/6G/3G/HD-SDI and HDMI output with multi-channel embedded audio (up to 16 channels), genlock sync, and VANC data insertion.",
          "AJA Kona & Corvid: Professional video I/O with reference sync and ultra-low latency.",
          "Matrox DSX Series: Enterprise hardware playout integration."
        ]
      },
      {
        "title": "IP Video & Studio Network Distribution",
        "details": [
          "NDI 6 Integration: Ultra-high-quality, low-latency network video output with full 32-bit RGBA alpha channel (fill & key) support and studio tally signaling.",
          "SMPTE ST 2110 / ST 2022-6: High-end uncompressed IP broadcast infrastructure compatibility."
        ]
      },
      {
        "title": "DVB Digital Television Transport Streams",
        "details": [
          "DVB-TS UDP (Unicast & Multicast): Fully compliant digital broadcast transport streams for cable (DVB-C), terrestrial (DVB-T/T2), and satellite (DVB-S/S2) modulators.",
          "DVB SI/PSI Table Engine: Injects Program Association Table (PAT), Program Map Table (PMT), Service Description Table (SDT), Network Information Table (NIT), and Time and Date Table (TDT/TOT).",
          "PCR Precision: High-precision Program Clock Reference packet clocking to prevent buffer underflows/overflows in professional receivers."
        ]
      },
      {
        "title": "Digital Ad Insertion & Splice Signaling",
        "details": [
          "SCTE-35 Engine: Generation and injection of standard SCTE-35 splice insert cues, time signals, and commercial segmentation descriptors for downstream regional ad replacement systems."
        ]
      },
      {
        "title": "Internet OTT & Streaming Protocols",
        "details": [
          "SRT (Secure Reliable Transport): Ultra-reliable, encrypted (AES-128/256), low-latency contribution feed in Caller, Listener, and Rendezvous modes with ARQ packet recovery.",
          "RTMP / RTMPS: Secure streaming to YouTube Live, Facebook Live, Twitch, Kick, and custom CDN endpoints.",
          "HLS & MPEG-DASH / MPD: On-the-fly chunking and manifest generation for direct web distribution.",
          "RTSP: Real-time streaming server for internal surveillance and IPTV distribution."
        ]
      },
      {
        "title": "Multi-Vendor GPU Accelerated Encoders",
        "details": [
          "NVIDIA NVENC: H.264 & HEVC/H.265 hardware encoding with CBR, VBR, and low-latency tuning profiles.",
          "Intel QuickSync Video (QSV): High-efficiency hardware encode offloading.",
          "AMD AMF: Hardware encoding support for Radeon/Pro graphics.",
          "Software Encoders: Multi-threaded libx264, libx265, and libvpx."
        ]
      }
    ],
    "keywords": [
      "transmission",
      "transmission & multi-protocol output",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 3,
    "slug": "cg-editor",
    "label": "Graphics",
    "product": "Kashtrix.CGEditor",
    "title": "Visual Motion CG & Graphic Template Designer",
    "purpose": "Standalone professional graphic template design studio for motion graphics, Coming Up/Next promos, Weather API automation, Back In commercial countdowns, lower thirds, news tickers, animated logos, and election/sports packages.",
    "theme": "magenta-canvas",
    "accent": "#7e22ce",
    "screenshots": [
      "/media/broadcast/allapplication/cg-editor (9).png",
      "/media/broadcast/allapplication/cg-editor (2).png",
      "/media/broadcast/allapplication/cg-editor (3).png",
      "/media/broadcast/allapplication/cg-editor (5).png",
      "/media/broadcast/allapplication/cg-editor (4).png",
      "/media/broadcast/allapplication/cg-editor (6).png",
      "/media/broadcast/allapplication/cg-editor (7).png",
      "/media/broadcast/allapplication/cg-editor (8).png",
      "/media/broadcast/allapplication/cg-editor (1).png"
    ],
    "capabilities": [
      {
        "title": "Automated 'Coming Up' & 'Coming Next' Channel Branding",
        "details": [
          "Dynamic Rundown Look-Ahead: Automatically synchronizes with master playout rundown to fetch upcoming show titles, start times, episodic metadata, and presenter tags without manual typing.",
          "DVE Video Squeeze-Back (PIP): Compresses active program video into a customized corner squeeze box while running automated 'Coming Up Next' dynamic straps, promos, and animated bumper clips during closing credits.",
          "Now / Next / Later Multi-Show Slates: Electronic program guide (EPG) graphic cards displaying multi-program channel lineups with live countdown clocks and station branding bugs."
        ]
      },
      {
        "title": "Weather API Automation & Meteorological Ingestion",
        "details": [
          "Direct REST Weather Connectors: Native automated ingestion from OpenWeatherMap, AccuWeather, NOAA, and municipal JSON endpoints with user-defined refresh intervals (e.g. 30s/60s).",
          "Dynamic Meteorological Badges: Live temperature ({TempC} / {TempF}), humidity, wind vector, barometric pressure, and air quality index dynamically bound to on-air straps and tickers.",
          "Automated Weather Icon Sequences: Maps live weather status codes to animated Lottie and PNG weather sequences (Sunny, Partly Cloudy, Heavy Rain, Snow, Thunderstorm, Dense Fog).",
          "Rotating Multi-City Forecasts & Emergency Warnings: City-by-city rotating regional temperature tickers, plus high-priority severe weather warning crawl overlays with alert chime triggers."
        ]
      },
      {
        "title": "'Back In' Commercial Countdowns & Break Return Features",
        "details": [
          "Frame-Accurate Commercial Countdown: Dynamic 'Back In 02:00' timer overlays that accurately countdown remaining commercial break time down to the exact frame.",
          "SCTE-35 & Ad Pod Duration Auto-Sync: Automatically reads SCTE-35 digital cue marker durations or playlist commercial pod lengths to compute precise countdown remaining times.",
          "Automated Intermission & Return Bumpers: Programmatic entrance triggers upon commercial start and auto-timed exit 5 seconds prior to program return, ensuring zero on-air collision."
        ]
      },
      {
        "title": "Multi-Track Non-Linear Animation Timeline",
        "details": [
          "Frame-by-frame zoomable timeline with interactive ruler, scalable time units (-/+ zoom controls), playhead, clips, and trim handles.",
          "Bezier curve keyframe editor for spatial position (X, Y, Z), scale, opacity, rotation, and color tinting."
        ]
      },
      {
        "title": "Selection & Hierarchical Grouping (Precompose)",
        "details": [
          "Precise multi-select workflows with Ctrl+Click exact toggling and Shift+Click anchored range selection.",
          "Precompose System: Group complex multi-layered objects into nested compositions; double-click to dive into sub-timelines, UP button to return to master composition."
        ]
      },
      {
        "title": "Comprehensive Layer Types",
        "details": [
          "Rich Text Blocks: Advanced typography, character/line spacing, auto-fit boundaries, drop shadows, gradients, and stroke outlines.",
          "Smooth Crawl / Roll Tickers: Infinite looping horizontal crawls and vertical credit rolls with configurable sub-pixel speed damping.",
          "Vector Shapes & Containers: Rectangles, rounded boxes, circles, polygons, and dynamic bounding boxes that auto-resize to text width.",
          "Dynamic Image & Alpha Video Layers: Loopable PNG sequences, ProRes 4444 video elements, and transparent animations.",
          "Live Clocks & Timers: Broadcast station clocks, countdowns, count-ups, and dual Gregorian/Nepali calendar date displays."
        ]
      },
      {
        "title": "Dynamic Data-Binding Architecture",
        "details": [
          "Link text, colors, and images to dynamic tags ({Title}, {Subtitle}, {GuestName}, {ScoreHome}, {Temperature}).",
          "Live external data connectors: JSON APIs, XML feeds, RSS news channels, SQL databases, and plain CSV spreadsheets."
        ]
      }
    ],
    "keywords": [
      "graphics",
      "visual motion cg & graphic template designer",
      "coming up next broadcast overlays",
      "weather api automation graphics",
      "back in commercial break countdown",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 4,
    "slug": "cg-controller",
    "label": "On-Air CG",
    "product": "Kashtrix.CGController",
    "title": "Live On-Air Character Generator Control Surface",
    "purpose": "Fast, tactile on-air operator surface for firing graphics, modifying live news straps, breaking news banners, and channel bugs during live broadcasts.",
    "theme": "rose-console",
    "accent": "#e11d48",
    "screenshots": [
      "/media/broadcast/allapplication/cg-controller (7).png",
      "/media/broadcast/allapplication/cg-controller (1).png",
      "/media/broadcast/allapplication/cg-controller (5).png",
      "/media/broadcast/allapplication/cg-controller (6).png",
      "/media/broadcast/allapplication/cg-controller (2).png",
      "/media/broadcast/broadcast-08.png"
    ],
    "capabilities": [
      {
        "title": "Layer Stacking & Channel Routing",
        "details": [
          "Assign templates to independent broadcast layers (e.g., Layer 1: Station Logo, Layer 2: Main Ticker, Layer 3: Lower Third, Layer 4: Emergency Alert, Layer 5: Fullscreen Chart).",
          "Prevents conflicts: Firing a new lower-third smoothly transitions the old one out without interrupting the ongoing news ticker."
        ]
      },
      {
        "title": "Fast Live Data Entry",
        "details": [
          "Immediate on-screen text fields allowing operators to type a breaking news headline or guest name and update the live graphic instantly.",
          "Quick rundown preset buttons for recurring news programs."
        ]
      },
      {
        "title": "Broadcast Playback Controls",
        "details": [
          "Take In / Take Out: Instant manual execution.",
          "Auto-Out Timers: Configurable display durations (e.g., lower third displays for 8 seconds and automatically animates out).",
          "Looping & Pause Triggers: Keyframe pause points awaiting manual operator trigger to advance to the next step."
        ]
      }
    ],
    "keywords": [
      "on-air cg",
      "live on-air character generator control surface",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 5,
    "slug": "channel-controller",
    "label": "Automation",
    "product": "Kashtrix.ChannelController",
    "title": "Channel Master Automation & Matrix Switching",
    "purpose": "Master control switching and multi-channel automation management interfacing with broadcast hardware matrix routers.",
    "theme": "amber-routing",
    "accent": "#d97706",
    "screenshots": [
      "/media/broadcast/allapplication/Channel-controller (3).png",
      "/media/broadcast/allapplication/Channel-controller (1).png",
      "/media/broadcast/allapplication/Channel-controller (2).png",
      "/media/broadcast/broadcast-18.png"
    ],
    "capabilities": [
      {
        "title": "Multi-Channel Playout Coordination",
        "details": [
          "Single console to supervise and manage multiple distinct broadcast channels running on the network."
        ]
      },
      {
        "title": "Hardware Router Integration",
        "details": [
          "Native network control protocols for SDI matrix routers (Blackmagic Videohub, Ross Video, Grass Valley, Utah Scientific).",
          "Switch physical router crosspoints synchronously with playlist events (e.g., switching from Playout Server to Studio 1 Live Feed)."
        ]
      },
      {
        "title": "Signal Quality Failover Automation",
        "details": [
          "Monitors live video feeds for signal lock, black frames, and frozen video.",
          "Auto-triggers emergency switchover to backup server, standby logo, or filler video upon signal loss."
        ]
      }
    ],
    "keywords": [
      "automation",
      "channel master automation & matrix switching",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 6,
    "slug": "playlist-editor",
    "label": "Rundown",
    "product": "Kashtrix.PlaylistEditor",
    "title": "Broadcast Rundown & Playlist Management",
    "purpose": "Interactive rundown creation tool for station operators to assemble, edit, and audit daily broadcast transmission logs.",
    "theme": "indigo-timeline",
    "accent": "#4f46e5",
    "screenshots": [
      "/media/broadcast/allapplication/playlist Editor.png",
      "/media/broadcast/broadcast-29.png"
    ],
    "capabilities": [
      {
        "title": "Rundown Construction & Timing",
        "details": [
          "Frame-accurate entry of media clips, live satellite feeds, graphics triggers, and ad blocks.",
          "Auto-calculates start time, duration, and projected end times for every event across the 24-hour broadcast day."
        ]
      },
      {
        "title": "Dynamic Live Modifications",
        "details": [
          "Non-disruptive live editing: Insert, reorder, delete, or modify clips while the rundown is actively playing out on air."
        ]
      },
      {
        "title": "Execution Modes",
        "details": [
          "Auto-Follow: Consecutive clips trigger automatically upon previous clip completion.",
          "Manual Hold / Cue: Pauses playback at the end of a clip awaiting operator trigger (ideal for news and live talk shows).",
          "Time-Locked Events: Hard start times bound to national clock time (e.g., National News at exactly 20:00:00:00)."
        ]
      },
      {
        "title": "Secondary Events Attachment",
        "details": [
          "Attach graphic template overlays and SCTE-35 ad cue triggers directly to specific rundown clips."
        ]
      }
    ],
    "keywords": [
      "rundown",
      "broadcast rundown & playlist management",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 7,
    "slug": "scheduler",
    "label": "Scheduling",
    "product": "Kashtrix.Scheduler",
    "title": "Long-Term Programming & Commercial Traffic",
    "purpose": "Long-range planning, weekly/monthly calendar grid scheduling, commercial contract placement, and broadcast compliance logging.",
    "theme": "emerald-calendar",
    "accent": "#059669",
    "screenshots": [
      "/media/broadcast/broadcast-32.png"
    ],
    "capabilities": [
      {
        "title": "Calendar-Based Programming Grid",
        "details": [
          "Schedule recurring daily and weekly program slots (morning news, daytime soap operas, evening prime-time films)."
        ]
      },
      {
        "title": "Commercial Traffic & Ad Campaign Management",
        "details": [
          "Commercial break management with collision prevention (prevents placing competing advertiser spots in the same ad pod).",
          "Track contract spot counts, campaign flights, and target demographics."
        ]
      },
      {
        "title": "As-Run Audit & Verification Logs",
        "details": [
          "Generates cryptographically secure, tamper-proof As-Run logs recording the exact frame time, duration, and channel on which each program and commercial aired.",
          "Export to industry billing and invoicing systems."
        ]
      },
      {
        "title": "EPG Generation",
        "details": [
          "Automatic generation of Electronic Program Guide schedules formatted for DVB EIT (Event Information Table) and XMLTV web guides."
        ]
      }
    ],
    "keywords": [
      "scheduling",
      "long-term programming & commercial traffic",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 8,
    "slug": "media-asset-management",
    "label": "MAM",
    "product": "Kashtrix.MAM",
    "title": "Media Asset Management & Catalog System",
    "purpose": "Central broadcast media library cataloging all video, audio, graphic, and promotional assets across the enterprise.",
    "theme": "blue-library",
    "accent": "#2563eb",
    "screenshots": [
      "/media/broadcast/allapplication/MAM (2).png",
      "/media/broadcast/allapplication/MAM (1).png",
      "/media/broadcast/broadcast-23.png"
    ],
    "capabilities": [
      {
        "title": "Asset Indexing & Metadata Schema",
        "details": [
          "Comprehensive metadata: Title, Episode Number, House ID, Season, Genre, Language, Subtitles, Rights/License Expiry, Aspect Ratio, and Audio Channel Mapping."
        ]
      },
      {
        "title": "Automatic Low-Res Proxy Generation",
        "details": [
          "Background transcode worker generates lightweight H.264 proxy files for instant operator scrubbing without loading multi-gigabyte master files over the network."
        ]
      },
      {
        "title": "Hierarchical Storage Management (HSM)",
        "details": [
          "Automatically moves files across storage tiers: High-speed local SSD (Tier 1 Play-out), Central SAN/NAS (Tier 2 Online), and Tape/Cloud archive (Tier 3 Cold Storage)."
        ]
      },
      {
        "title": "Integrated In-Out Point Trimming",
        "details": [
          "In-app media player to preview assets, set segment marks, and store non-destructive commercial break cut points."
        ]
      }
    ],
    "keywords": [
      "mam",
      "media asset management & catalog system",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 9,
    "slug": "file-manager",
    "label": "Media Ops",
    "product": "Kashtrix.FileManager",
    "title": "Media Explorer & Rapid Ingest",
    "purpose": "High-speed media browser and file-transfer manager designed specifically for broadcast server environments.",
    "theme": "orange-transfer",
    "accent": "#ea580c",
    "screenshots": [
      "/media/broadcast/allapplication/FileManager.png",
      "/media/broadcast/broadcast-19.png",
      "/media/broadcast/broadcast-39.png"
    ],
    "capabilities": [
      {
        "title": "Smart Broadcast Folder Watchers",
        "details": [
          "Continuously monitors hot-folders, USB drives, and shared network drives for incoming video files."
        ]
      },
      {
        "title": "Automatic Transcoding & Normalization",
        "details": [
          "On-the-fly transcoding of consumer formats (MP4, MKV, cellphone clips) into standardized broadcast station house formats (e.g., ProRes 422 or XDCAM 50Mbps)."
        ]
      },
      {
        "title": "Media Verification on Transfer",
        "details": [
          "MD5 / SHA-256 checksum verification during file copying between ingest stations and master playout storage to ensure zero file corruption."
        ]
      }
    ],
    "keywords": [
      "media ops",
      "media explorer & rapid ingest",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 10,
    "slug": "ingest-server",
    "label": "Ingest",
    "product": "Kashtrix.IngestServer",
    "title": "Live Multi-Channel Ingest & Recording Server",
    "purpose": "Dedicated baseband and network stream recording server for live sports, news studio feeds, and satellite broadcasts.",
    "theme": "red-record",
    "accent": "#dc2626",
    "screenshots": [
      "/media/broadcast/broadcast-21.png",
      "/media/broadcast/broadcast-38.png",
      "/media/broadcast/broadcast-35.png"
    ],
    "capabilities": [
      {
        "title": "Multi-Channel Simultaneous Capture",
        "details": [
          "Record multiple SDI baseband feeds (via DeckLink/AJA) and IP streams (SRT/NDI/RTMP) at high bitrates."
        ]
      },
      {
        "title": "Crash & Scheduled Recording",
        "details": [
          "Immediate manual one-click record or pre-programmed timer schedules linked to the master calendar."
        ]
      },
      {
        "title": "Edit-While-Ingest (Growing Files)",
        "details": [
          "Captures media into standard broadcast formats (MXF / QuickTime MOV) with live header updates, allowing the Master Control Playout engine to begin airing a recorded file while the event is still being captured."
        ]
      },
      {
        "title": "Audio & Video Track Selection",
        "details": [
          "Multi-channel audio capture (up to 16 discrete channels) with custom channel-mapping matrices."
        ]
      }
    ],
    "keywords": [
      "ingest",
      "live multi-channel ingest & recording server",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 11,
    "slug": "input-engine",
    "label": "Input Hub",
    "product": "Kashtrix.InputEngine",
    "title": "Live Video Hub & Baseband Ingest Matrix",
    "purpose": "Hardware signal acquisition engine converting live physical inputs and network streams into virtual internal feeds for the playout switcher.",
    "theme": "teal-hub",
    "accent": "#0f766e",
    "screenshots": [
      "/media/broadcast/allapplication/InputEngine (4).png",
      "/media/broadcast/allapplication/InputEngine (5).png",
      "/media/broadcast/allapplication/InputEngine (2).png",
      "/media/broadcast/allapplication/InputEngine (3).png",
      "/media/broadcast/allapplication/InputEngine (1).png",
      "/media/broadcast/broadcast-22.png"
    ],
    "capabilities": [
      {
        "title": "Hardware Card Input Management",
        "details": [
          "Interfaces directly with Blackmagic DeckLink, Magewell, and AJA capture cards."
        ]
      },
      {
        "title": "IP Stream Pull Hub",
        "details": [
          "Pulls SRT (Caller/Listener), RTSP, RTMP, and NDI streams from field cameras, wireless transmitters, and remote studio bureaus."
        ]
      },
      {
        "title": "Frame Synchronizer & De-interlacer",
        "details": [
          "Built-in frame synchronizer prevents frame tearing and audio pitch distortion when switching between unsynchronized live remote feeds and master playout."
        ]
      }
    ],
    "keywords": [
      "input hub",
      "live video hub & baseband ingest matrix",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 12,
    "slug": "qc-controller",
    "label": "Quality",
    "product": "Kashtrix.QCController",
    "title": "Automated Broadcast Quality Control",
    "purpose": "Automated compliance checking engine validating audio loudness, video integrity, and technical standards before airing.",
    "theme": "lime-verify",
    "accent": "#65a30d",
    "screenshots": [
      "/media/broadcast/allapplication/QC Controller.png",
      "/media/broadcast/allapplication/Screenshot 2026-10-09 011541.png",
      "/media/broadcast/broadcast-31.png"
    ],
    "capabilities": [
      {
        "title": "Audio Loudness Compliance (EBU R128 & ITU-R BS.1770)",
        "details": [
          "Measures Integrated Loudness (LUFS), Loudness Range (LRA), and Maximum True Peak (dBTP).",
          "Generates correction parameters or auto-normalizes files to target loudness standards (e.g., -23 LUFS / -24 LUFS)."
        ]
      },
      {
        "title": "Video Anomaly Detection",
        "details": [
          "Black frame detection (sustained black thresholds).",
          "Freeze frame detection (static video feed detection).",
          "Letterbox / Pillarbox aspect ratio violation detection.",
          "Digital video artifact and macroblock detection."
        ]
      },
      {
        "title": "Container & Stream Syntax Validation",
        "details": [
          "Verifies audio/video sync offsets, dropped frames, corrupt GOPs, and missing audio tracks."
        ]
      }
    ],
    "keywords": [
      "quality",
      "automated broadcast quality control",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 13,
    "slug": "multiview",
    "label": "Multiview",
    "product": "Kashtrix.Multiview",
    "title": "Broadcast Monitoring Wall & Tile Mosaic",
    "purpose": "Low-latency mosaic video wall monitor displaying multiple channel outputs, live inputs, and preview channels on a single or multi-screen display.",
    "theme": "purple-mosaic",
    "accent": "#7e22ce",
    "screenshots": [
      "/media/broadcast/allapplication/Multiviewer (4).png",
      "/media/broadcast/allapplication/Multiviewer (6).png",
      "/media/broadcast/allapplication/Multiviewer (1).png",
      "/media/broadcast/allapplication/Multiviewer (5).png",
      "/media/broadcast/broadcast-25.png"
    ],
    "capabilities": [
      {
        "title": "Flexible Mosaic Layouts",
        "details": [
          "Supports 2x2, 3x3, 4x4, 8+1, and customized non-uniform grid layouts."
        ]
      },
      {
        "title": "On-Screen Heads-Up Display (HUD)",
        "details": [
          "Multi-channel audio VU meters and Peak Program Meters (PPM) with peak-hold bars.",
          "On-Air Tally borders: Red (Live on Program) and Green (Cued on Preview).",
          "Running timecode clocks, channel names, format tags (e.g., 1080i50 · ProRes · Stereo), and clip countdown timers."
        ]
      },
      {
        "title": "Direct Tile Expansion",
        "details": [
          "Double-click any mosaic tile to instantly expand it to full-screen confidence monitoring."
        ]
      }
    ],
    "keywords": [
      "multiview",
      "broadcast monitoring wall & tile mosaic",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 14,
    "slug": "nrcs",
    "label": "Newsroom",
    "product": "Kashtrix.NRCS",
    "title": "Newsroom Computer System Integration (MOS 2.8.4)",
    "purpose": "Native integration with television newsrooms, synchronizing stories, scripts, and broadcast rundowns.",
    "theme": "sky-newsroom",
    "accent": "#0284c7",
    "screenshots": [
      "/media/broadcast/allapplication/NRCS (3).png",
      "/media/broadcast/allapplication/NRCS (2).png",
      "/media/broadcast/allapplication/NRCS (1).png",
      "/media/broadcast/allapplication/NRCS (4).png",
      "/media/broadcast/broadcast-26.png"
    ],
    "capabilities": [
      {
        "title": "MOS Protocol 2.8.4 Compliance",
        "details": [
          "Bi-directional Media Object Server (MOS) protocol implementation over TCP/IP sockets.",
          "Seamless integration with industry newsroom computer systems (Avid iNEWS, AP ENPS, Octopus, Dalet News, Ross Inception)."
        ]
      },
      {
        "title": "Real-Time Rundown Synchronization",
        "details": [
          "News producers can reorder stories, insert breaking news segments, or modify rundown items in their newsroom terminal; changes immediately reflect on the playout rundown."
        ]
      },
      {
        "title": "Script & Lower-Third Attachment",
        "details": [
          "News stories carry attached video clips, camera cues, and graphic lower thirds (CG templates) directly into the broadcast automation queue."
        ]
      },
      {
        "title": "Localized Calendar Features",
        "details": [
          "Native dual Gregorian and Nepali calendar conversion engine for newsroom scheduling and broadcast documentation."
        ]
      }
    ],
    "keywords": [
      "newsroom",
      "newsroom computer system integration (mos 2.8.4)",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 15,
    "slug": "prompter",
    "label": "Prompter",
    "product": "Kashtrix.Prompter",
    "title": "Broadcast Studio Teleprompter",
    "purpose": "Professional studio teleprompter engine providing smooth, high-precision script scrolling for news anchors and presenters.",
    "theme": "gold-teleprompter",
    "accent": "#ca8a04",
    "screenshots": [
      "/media/broadcast/allapplication/Prompter (3).png",
      "/media/broadcast/allapplication/Prompter (1).png",
      "/media/broadcast/allapplication/Prompter (2).png",
      "/media/broadcast/broadcast-30.png"
    ],
    "capabilities": [
      {
        "title": "Hardware-Accelerated Smooth Scrolling",
        "details": [
          "Sub-pixel smooth text rendering eliminates jitter and flicker at all scroll speeds."
        ]
      },
      {
        "title": "Optical Mirror & Flip Modes",
        "details": [
          "Instant horizontal flip and vertical inversion to support through-the-lens studio glass beam-splitter rigs."
        ]
      },
      {
        "title": "Live Hardware Controller Support",
        "details": [
          "Integrates with studio foot pedals, hand-held USB/wireless scroll wheels, and network remotes."
        ]
      },
      {
        "title": "NRCS Dynamic Script Linking",
        "details": [
          "Dynamically updates the prompter script in real time as journalists edit copy in the newsroom system."
        ]
      }
    ],
    "keywords": [
      "prompter",
      "broadcast studio teleprompter",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  },
  {
    "number": 16,
    "slug": "ha-controller",
    "label": "HA",
    "product": "Kashtrix.HAController",
    "title": "High Availability & Redundancy Controller",
    "purpose": "Enterprise failover and redundancy supervisor ensuring zero-downtime, continuous 24/7 channel transmission.",
    "theme": "slate-failover",
    "accent": "#475569",
    "screenshots": [
      "/media/broadcast/allapplication/HAController (1).png",
      "/media/broadcast/allapplication/HAController (2).png",
      "/media/broadcast/broadcast-20.png",
      "/media/broadcast/broadcast-36.png"
    ],
    "capabilities": [
      {
        "title": "1+1 & N+1 Redundancy Topologies",
        "details": [
          "Monitors Main (Primary) and Backup (Secondary) playout servers over redundant network heartbeats."
        ]
      },
      {
        "title": "Continuous State & Clip Synchronization",
        "details": [
          "Keeps the backup playout engine in exact frame lock with the primary server, mirroring playlist state, active clip position, and graphic overlays."
        ]
      },
      {
        "title": "Automatic Seamless Failover",
        "details": [
          "Detects hardware crash, software exception, frame freeze, or network failure on the primary node.",
          "Instantly triggers SDI/IP matrix router switchovers and activates the backup transmission stream without visible disruption on home TV screens."
        ]
      }
    ],
    "keywords": [
      "ha",
      "high availability & redundancy controller",
      "broadcast automation software",
      "Kashtrix broadcast playout"
    ]
  }
] as const;

export type BroadcastApp = (typeof broadcastApps)[number];
