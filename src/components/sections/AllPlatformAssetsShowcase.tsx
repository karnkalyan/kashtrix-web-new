"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Search,
  Maximize2,
  X,
  Sparkles,
  Server,
  Cpu,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  Activity,
  Bot,
} from "lucide-react";

export interface AssetMeta {
  id: string;
  filename: string;
  title: string;
  category: "oss" | "syslog" | "hardware" | "ai" | "billing";
  categoryName: string;
  description: string;
  tags: string[];
}

export const ALL_48_ASSETS: AssetMeta[] = [
  // Category 1: OSS/BSS & Core NOC (12 Assets)
  {
    id: "asset-1",
    filename: "01580174-2bd9-4e23-8664-ca9cb115db84.png",
    title: "NOC Unified Command Matrix & Ring Monitoring",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Real-time GPON OLT ring monitoring and fiber attenuation topology overview.",
    tags: ["NOC", "GPON OLT", "Topology", "Ring Monitoring"],
  },
  {
    id: "asset-2",
    filename: "030d7016-5b75-4531-ab1e-2bd488cf5ac0.png",
    title: "Core Peering & Aggregate Throughput Telemetry",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Aggregate core BGP peering bandwidth and sub-second IP traffic metrics.",
    tags: ["BGP", "Peering", "Throughput", "Core Network"],
  },
  {
    id: "asset-3",
    filename: "0366310c-3fd7-4211-b47f-b0ff3a5a0827.png",
    title: "Fiber Splitter & Geographical Node GIS Map",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Geospatial fiber optic cable routes and passive optical splitter health.",
    tags: ["GIS", "Fiber Map", "Splitter", "Outage GIS"],
  },
  {
    id: "asset-4",
    filename: "1081f78c-e048-4269-9f85-93ce7e2524e8.png",
    title: "Optical Power Degradation & RX Threshold Alarms",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Live optical power levels (dBm) per ONT port with predictive alarm scoring.",
    tags: ["Optical RX", "ONU Telemetry", "Alarms", "dBm Threshold"],
  },
  {
    id: "asset-5",
    filename: "155b0e7e-b923-4898-90b3-50590dbf43ce.png",
    title: "RADIUS AAA Active Subscriber Session Pool",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "PPPoE and IPoE active subscriber sessions with IP framed address tracking.",
    tags: ["RADIUS AAA", "PPPoE", "Sessions", "Framed-IP"],
  },
  {
    id: "asset-6",
    filename: "17e42f35-08cb-42cd-ac57-cbd61bb8685a.png",
    title: "RADIUS Session Disconnect & CoA Command Console",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Instantaneous Change of Authorization (CoA) speed adjustments and disconnects.",
    tags: ["CoA", "Disconnect", "Session Control", "Dunning Kill"],
  },
  {
    id: "asset-7",
    filename: "222f9fea-166b-487f-a9b2-596c015f6847.png",
    title: "TR-069 ACS Device Management Overview",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Auto-Configuration Server management tree for CPE gateways and Wi-Fi routers.",
    tags: ["TR-069", "ACS", "CWMP", "CPE Provisioning"],
  },
  {
    id: "asset-8",
    filename: "25acdc87-1eb2-4bd4-b755-f3b753c994de.png",
    title: "TR-069 Wi-Fi Channel & Remote Diagnostics",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Live 5GHz Wi-Fi signal analyzer and remote optical diagnostic snapshot.",
    tags: ["Wi-Fi 6", "Diagnostics", "TR-181", "Remote Reset"],
  },
  {
    id: "asset-9",
    filename: "25c80313-5f2a-420f-a310-7ad706ebde36.png",
    title: "CWMP Parameter Registry & Batch Templates",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Standardized CWMP parameter templates across multi-vendor subscriber CPEs.",
    tags: ["CWMP", "Parameters", "Multi-Vendor", "Batch Update"],
  },
  {
    id: "asset-10",
    filename: "2bfe62a8-dea8-42c5-afac-c1b83f6705da.png",
    title: "Subscriber 360° Profile & Identity Workspace",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Unified account workspace combining billing ledger, package, and ONT status.",
    tags: ["Subscriber 360", "CRM Profile", "Ledger", "Package Sync"],
  },
  {
    id: "asset-11",
    filename: "3140276e-172c-4c25-8c75-9766d2f06a4e.png",
    title: "Sales Lead Geographic Coverage & Feasibility",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Automated broadband lead qualification and fiber port availability check.",
    tags: ["Feasibility", "Leads", "Port Allocation", "Sales Pipeline"],
  },
  {
    id: "asset-12",
    filename: "38de87f4-1fdf-4a22-aa0b-04140a2fedcf.png",
    title: "Lead Address Fiber Distance Budgeting",
    category: "oss",
    categoryName: "OSS/BSS Core NOC",
    description: "Instant optical loss calculation and quote generation for lead addresses.",
    tags: ["Loss Budget", "Quote Engine", "Fiber Port", "Feasibility"],
  },

  // Category 2: Carrier-Grade Syslog & CGNAT Audit (10 Assets)
  {
    id: "asset-13",
    filename: "3e6ac14b-32a8-4abc-80ad-dd4a3ffdc888.png",
    title: "Carrier Syslog High-Throughput Collector Stream",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Ingesting 100,000+ EPS log streams from Cisco, MikroTik, and Huawei CGNAT devices.",
    tags: ["Syslog Ingestion", "100k EPS", "CGNAT NAT444", "UDP/TCP Log"],
  },
  {
    id: "asset-14",
    filename: "40b5a0f0-27ad-412e-9bc9-2f2af5c578ad.png",
    title: "CGNAT Public IP & Port Mapping Log Vault",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Deterministic NAT session logging for IP-port mapping and law compliance.",
    tags: ["NAT444", "Public IP", "Port Allocation", "Compliance"],
  },
  {
    id: "asset-15",
    filename: "43e05fec-724d-490b-943a-80a1430b28fe.png",
    title: "Law Enforcement Subpoena Audit Query Engine",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Sub-second subscriber account lookup from target IP, port, and timestamp.",
    tags: ["Subpoena Search", "Law Enforcement", "IP Audit", "Subsecond Lookup"],
  },
  {
    id: "asset-16",
    filename: "5fb0e71a-8322-4013-8e25-a01918528e3c.png",
    title: "HMAC Cryptographic Log Verification Console",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "SHA-256 HMAC signed log chunks verifying legal log tamper integrity.",
    tags: ["HMAC", "SHA-256", "Tamper-Proof", "Court Admissible"],
  },
  {
    id: "asset-17",
    filename: "62477c36-f04b-4465-ba1c-30f22b7fc4ec.png",
    title: "Hot Cold Storage Tiering Management Screen",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Automated transition from fast NVMe storage to MinIO/S3 and Glacier cold vault.",
    tags: ["S3 Archiving", "Glacier Vault", "NVMe Hot", "Log Storage"],
  },
  {
    id: "asset-18",
    filename: "681113a7-64d7-4ebc-9185-ab087804e4dc.png",
    title: "DoT / TRAI Compliance Syslog Audit Vault",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Regulatory telecom compliance archiving satisfying legal log mandates.",
    tags: ["DoT Compliance", "TRAI Audit", "Regulatory Vault", "Legal Archiving"],
  },
  {
    id: "asset-19",
    filename: "68c35006-c428-4b18-85b3-fc46dd973192.png",
    title: "MikroTik Syslog Forwarder Real-Time Stream",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Forwarding logs from MikroTik RouterOS firewall and NAT sessions.",
    tags: ["MikroTik Forwarder", "RouterOS", "Firewall Logs", "UDP 514"],
  },
  {
    id: "asset-20",
    filename: "6e5aaa99-344d-43af-aa72-ef3d75694b27.png",
    title: "Cisco ASR CGNAT Syslog Collector Stream",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Carrier syslog ingestion from Cisco ASR 9000 series CGNAT modules.",
    tags: ["Cisco ASR9k", "IOS-XR", "CGNAT Collector", "NAT Stream"],
  },
  {
    id: "asset-21",
    filename: "6ebf0249-bd4e-4c78-a3d1-b76566e7134c.png",
    title: "Nokia & Huawei OLT Event Syslog Vault",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Aggregating optical events and PON port status logs from Nokia and Huawei OLTs.",
    tags: ["Nokia OLT", "Huawei OLT", "PON Events", "Syslog Collector"],
  },
  {
    id: "asset-22",
    filename: "6f6a7e2d-c7c5-4e23-b8bd-3576ec286ec3.png",
    title: "Buffered Ring Architecture Log Performance",
    category: "syslog",
    categoryName: "Syslog & CGNAT Compliance",
    description: "Handling peak traffic bursts up to 250,000 EPS without dropping packets.",
    tags: ["Ring Buffer", "Burst Ingestion", "250k EPS", "Zero Packet Loss"],
  },

  // Category 3: Multi-Vendor Hardware & OLT Provisioning (10 Assets)
  {
    id: "asset-23",
    filename: "704eb8be-d287-4b25-a2e5-42af3325af58.png",
    title: "MikroTik RouterOS API Provisioning Console",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Automated PPPoE secrets, queue speed limits, and firewall rules on MikroTik routers.",
    tags: ["MikroTik API", "RouterOS", "Queues", "PPPoE Setup"],
  },
  {
    id: "asset-24",
    filename: "7462371b-8c50-433b-8eff-de70b01e3479.png",
    title: "Nokia ISAM GPON OLT Provisioning Tool",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Zero-touch activation of subscriber ONTs on Nokia FX series optical line terminals.",
    tags: ["Nokia OLT", "ISAM FX", "ONT Provisioning", "NETCONF"],
  },
  {
    id: "asset-25",
    filename: "7a90de3e-0128-48ff-8e06-453d5f2854a8.png",
    title: "Cisco ASR vBNG Subscriber Queue Manager",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Configuring subscriber vBNG interface queues and RADIUS profiles via gNMI.",
    tags: ["Cisco ASR", "vBNG", "gNMI", "Bandwidth Profiles"],
  },
  {
    id: "asset-26",
    filename: "852a0aba-e517-46e3-9e81-161fd0c20e0f.png",
    title: "Huawei MA5800 OLT Optical Line Controller",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Managing Huawei SmartAX MA5800 GPON/XGS-PON boards and service ports.",
    tags: ["Huawei MA5800", "SmartAX", "XGS-PON", "Service Ports"],
  },
  {
    id: "asset-27",
    filename: "859d1238-8d99-4b82-b965-1b0abf16cfd7.png",
    title: "ZTE C300 & C600 OLT Hardware Provisioning",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Auto-discovering and registering unconfigured ZTE ONUs on GPON cards.",
    tags: ["ZTE C300", "ZTE C600", "ONU Auto-Find", "GPON Automation"],
  },
  {
    id: "asset-28",
    filename: "93d571c8-e02b-4683-8e52-c63c5a6fc755.png",
    title: "Juniper MX BNG Subscriber Control Engine",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Orchestrating subscriber dynamic interfaces on Juniper MX series BNG routers.",
    tags: ["Juniper MX", "BNG Router", "Dynamic Interface", "Junos Telemetry"],
  },
  {
    id: "asset-29",
    filename: "96985649-06e7-428b-9226-b522dd2709bf.png",
    title: "FiberHome GPON OLT Optical Management",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Managing FiberHome AN5516 OLT chassis and optical power budgets.",
    tags: ["FiberHome", "AN5516", "OLT Chassis", "Optical Budget"],
  },
  {
    id: "asset-30",
    filename: "96dd178b-d781-4059-a0df-4a608e7890ab.png",
    title: "Multi-Vendor Device Topology Matrix",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Unified inventory of routers, switches, and OLTs across multi-vendor networks.",
    tags: ["Multi-Vendor", "Topology", "Device Inventory", "NETCONF"],
  },
  {
    id: "asset-31",
    filename: "a6446df2-2d74-4aa6-9e86-9c4063a87c3a.png",
    title: "XGS-PON 10G Symmetry Optical Profile",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Configuring 10Gbps symmetric fiber profiles on XGS-PON OLT optical ports.",
    tags: ["XGS-PON", "10G Symmetry", "Optical Profile", "High-Speed Fiber"],
  },
  {
    id: "asset-32",
    filename: "afb8a89e-e33d-44ba-b310-fc92cd41f5dc.png",
    title: "Zero-Touch ONT Barcode Activation Flow",
    category: "hardware",
    categoryName: "Hardware & OLT Automation",
    description: "Technician mobile app scanning ONT barcode for instant OLT assignment.",
    tags: ["Zero-Touch", "Barcode Activation", "Technician Mobile", "ONT Serial"],
  },

  // Category 4: AI Autonomous Agents & NOC Telemetry (8 Assets)
  {
    id: "asset-33",
    filename: "b3706cf0-d232-439a-8e14-ac148a9e49fd.png",
    title: "AI Agents Workflow Designer & Guardrails",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "Visual agent designer for autonomous NOC fault isolation and self-healing.",
    tags: ["AI Agent Studio", "Policy Guardrails", "Visual Workflow", "Autonomous NOC"],
  },
  {
    id: "asset-34",
    filename: "b4b4f136-67f0-4120-b250-0370f1263691.png",
    title: "Predictive Optical Fiber Cut Detection AI",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "AI model analyzing micro-bends in fiber cables before total cable severing.",
    tags: ["Fiber Cut AI", "Predictive NOC", "Optical Micro-Bends", "MTTR Reduction"],
  },
  {
    id: "asset-35",
    filename: "b6603a65-e8e7-488c-bd32-500033e3b80b.png",
    title: "AI Alert Storm Noise Reduction Matrix",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "Correlating 1,000+ cascading alarms into a single root-cause fiber cut ticket.",
    tags: ["Alert Noise AI", "Root Cause", "Cascade Suppression", "NOC Copilot"],
  },
  {
    id: "asset-36",
    filename: "b833fff5-1474-4b23-930d-69775cf8edaa.png",
    title: "Autonomous Dunning Pause & Billing Bot",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "AI bot managing subscriber payment promise extensions and RADIUS CoA pause.",
    tags: ["Billing AI", "Dunning Bot", "Payment Promise", "CoA Pause"],
  },
  {
    id: "asset-37",
    filename: "be5dd7d1-9c02-48c4-bb08-d8cccc0e364b.png",
    title: "Customer Support AI Care Copilot",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "AI care assistant embedding live ONT signal telemetry inside support chat.",
    tags: ["Support Copilot", "Customer Care AI", "Live Signal", "Chatbot"],
  },
  {
    id: "asset-38",
    filename: "c0046705-ff30-4183-924e-5a50cb26606b.png",
    title: "Proactive Field Technician Task Dispatch AI",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "AI auto-generating field repair tasks with required replacement ONT inventory.",
    tags: ["Field Dispatch AI", "Auto Work Order", "Inventory Match", "Technician Routing"],
  },
  {
    id: "asset-39",
    filename: "d2384c7a-c5f2-4a5b-b4b8-4f7fb855cbf5.png",
    title: "Model Context Protocol (MCP) Live Endpoint Tool",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "Model Context Protocol (MCP) server endpoint at mcp.kashtrix.com/mcp.",
    tags: ["Kashtrix MCP", "mcp.kashtrix.com/mcp", "AI Agent API", "SSE Protocol"],
  },
  {
    id: "asset-40",
    filename: "kirtinet-light-colla.png",
    title: "Light & Dark Mode AI Telemetry Matrix",
    category: "ai",
    categoryName: "AI Autonomous Agents",
    description: "Unified AI telemetry dashboard rendered with adaptive light and dark theme.",
    tags: ["Light Mode", "Dark Mode", "UI Theme", "Telemetry Matrix"],
  },

  // Category 5: Billing, CRM, Field Ops & Voice (8 Assets)
  {
    id: "asset-41",
    filename: "d89b78ec-1e5c-40b6-9a68-02575eea5f48.png",
    title: "Automated Monthly Billing & Invoice Ledger",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Convergent rating engine generating automated PDF invoices and payment receipts.",
    tags: ["Billing Engine", "PDF Invoices", "Rating Ledger", "Convergent Billing"],
  },
  {
    id: "asset-42",
    filename: "e0aa4b02-eb96-417c-8415-0a0baaab4c87.png",
    title: "Multi-Gateway Payment Collections & Gateway Sync",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Integrating Stripe, PayPal, local bank cards, and automated dunning retries.",
    tags: ["Payment Gateways", "Stripe", "Dunning", "Revenue Assurance"],
  },
  {
    id: "asset-43",
    filename: "e6d78c35-7fce-4d47-9761-ce603419bb66.png",
    title: "Helpdesk Ticket Workspace with Network Context",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Support ticket desk enriched with subscriber modem status and billing ledger.",
    tags: ["Support Tickets", "Helpdesk", "Customer History", "Root Cause"],
  },
  {
    id: "asset-44",
    filename: "ed744b13-b83a-4527-8164-c5f8afe32557.png",
    title: "Technician Field Operations & Task Dispatch",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Managing technician dispatch routes, task SLAs, and mobile completion.",
    tags: ["Field Ops", "Work Orders", "Technician App", "SLA Tracking"],
  },
  {
    id: "asset-45",
    filename: "f21fb830-363d-4c9c-a91b-7452b5162872.png",
    title: "Network Inventory & ONT Hardware Lifecycle",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Tracking warehouse inventory stock, serial numbers, and equipment assignments.",
    tags: ["Inventory", "Serial Tracking", "Warehouse Stock", "Equipment Lifecycle"],
  },
  {
    id: "asset-46",
    filename: "f2fe4f31-8e23-4a09-ac1d-87594885a9c7.png",
    title: "Yeastar Voice PBX Gateway Control Screen",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Integrating Yeastar SIP PBX trunks, extensions, and automated IVR campaigns.",
    tags: ["Yeastar Voice", "SIP Trunks", "IVR Campaign", "VoIP Gateway"],
  },
  {
    id: "asset-47",
    filename: "f60f0dbe-94d7-4b03-baee-2934b0492b50.png",
    title: "Asterisk Telephony & SIP Server Analytics",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Low-level PBX trunk metrics, call duration recording, and RTP packet loss.",
    tags: ["Asterisk PBX", "SIP Telephony", "CDR Recording", "RTP Analytics"],
  },
  {
    id: "asset-48",
    filename: "fd9043e3-1a2b-42c1-aaa6-92d9261ef786.png",
    title: "Open REST API & Webhooks Integration Studio",
    category: "billing",
    categoryName: "Billing, CRM & Voice",
    description: "Open REST API, OpenAPI 3.0 schemas, and cryptographic HMAC webhooks.",
    tags: ["REST API", "OpenAPI", "Webhooks", "HMAC Signing"],
  },
];

export const AllPlatformAssetsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<AssetMeta | null>(null);

  const filteredAssets = ALL_48_ASSETS.filter((asset) => {
    const matchesCategory = activeCategory === "all" || asset.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-[var(--surface-1)] text-[var(--text-primary)] border-t border-b border-[var(--border-default)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
            Platform Application Screens (48 High-Res Assets)
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-sora tracking-tight leading-tight text-slate-900 dark:text-white">
            Explore All 48 Live Product <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Application Interfaces
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
            Browse our complete high-definition application interface gallery covering OSS/BSS NOC control, carrier syslog CGNAT audit, multi-vendor OLT provisioning, AI agents, billing ledgers, and voice PBX automation.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-[#130822] border border-purple-200 dark:border-purple-500/20">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All 48", icon: Layers },
              { id: "oss", label: "NOC (12)", icon: Activity },
              { id: "syslog", label: "Syslog (10)", icon: ShieldCheck },
              { id: "hardware", label: "OLT (10)", icon: Cpu },
              { id: "ai", label: "AI (8)", icon: Bot },
              { id: "billing", label: "Billing (8)", icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-sora font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 48 assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-500/30 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* 48 Asset Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-[#190B28] border border-purple-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative w-full overflow-hidden bg-slate-900">
                <Image
                  src={`/assets/${asset.filename}`}
                  alt={asset.title}
                  width={600}
                  height={380}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                  <span className="p-2 rounded-xl bg-purple-600 text-white shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                  {asset.categoryName}
                </span>
                <h3 className="text-sm font-bold font-sora text-slate-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-pink-300 transition-colors">
                  {asset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-300 line-clamp-2 font-inter leading-relaxed">
                  {asset.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Full High-Res View */}
        {selectedAsset && (
          <div
            onClick={() => setSelectedAsset(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-white dark:bg-[#1D0D2E] rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl space-y-4 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-500/20 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                    {selectedAsset.categoryName} · {selectedAsset.filename}
                  </span>
                  <h3 className="text-xl font-bold font-sora text-slate-900 dark:text-white">{selectedAsset.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full max-h-[60vh] overflow-hidden rounded-2xl border border-purple-200 dark:border-purple-500/30">
                <Image
                  src={`/assets/${selectedAsset.filename}`}
                  alt={selectedAsset.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                {selectedAsset.description}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
