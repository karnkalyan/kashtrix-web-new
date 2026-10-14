"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Headset,
  KeyRound,
  Maximize2,
  Pause,
  Play,
  Router,
  Users,
  X,
  Zap,
} from "lucide-react";

type ShowcaseMode = "all" | "oss" | "bss";

interface OSSBSSShowcaseProps {
  mode?: ShowcaseMode;
  ossImageSrc?: string;
  bssImageSrc?: string;
}

interface ShowcaseView {
  id: string;
  title: string;
  badge: string;
  description: string;
  src: string;
  url: string;
  telemetry: string;
  detail: string;
  metrics: Array<{ label: string; value: string }>;
  features: string[];
}

interface ShowcaseCategory {
  id: string;
  name: string;
  shortName: string;
  accent: {
    primary: string;
    secondary: string;
    soft: string;
    gradient: string;
    border: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  views: ShowcaseView[];
}

const CATEGORIES: ShowcaseCategory[] = [
  {
    id: "noc",
    name: "NOC & Fiber Network",
    shortName: "NOC Network",
    accent: {
      primary: "#10B981",
      secondary: "#06B6D4",
      soft: "rgba(16, 185, 129, 0.14)",
      gradient: "linear-gradient(135deg, #10B981, #06B6D4)",
      border: "rgba(16, 185, 129, 0.3)",
    },
    icon: Activity,
    eyebrow: "Kashtrix OSS/BSS · Operations Support System",
    title: "Unified Live Control Plane Across Core & Fiber Topology",
    description:
      "Observe GPON OLTs, BNG session pools, optical degradation, fiber splitters, and real-time core telemetry without switching between disconnected vendor tools.",
    href: "/network-management",
    views: [
      {
        id: "noc-dash",
        title: "NOC Real-Time Telemetry Dashboard",
        badge: "Real-time NOC",
        description: "Monitors core traffic throughput, OLT status, and automated fault correlation.",
        src: "/assets/030d7016-5b75-4531-ab1e-2bd488cf5ac0.png",
        url: "kashtrix.internal/oss/noc-dashboard",
        telemetry: "48 GPON Rings · 99.998% Sync",
        detail: "Real-time aggregated bandwidth & peering metrics",
        metrics: [
          { label: "Core Throughput", value: "1.48 Tbps" },
          { label: "Online ONTs", value: "341,220" },
          { label: "Active Rings", value: "48 GPON" },
        ],
        features: [
          "Sub-second telemetry ingestion",
          "Automated optical fiber fault correlation",
          "Multi-vendor OLT & BNG health sync",
        ],
      },
      {
        id: "noc-alerts",
        title: "Network Alarm Correlation & Alerts",
        badge: "Alarm Engine",
        description: "Prioritizes network alarms using topology mapping and customer impact scoring.",
        src: "/assets/38de87f4-1fdf-4a22-aa0b-04140a2fedcf.png",
        url: "kashtrix.internal/oss/alerts-engine",
        telemetry: "7 Alarms · 5 Auto-Correlated",
        detail: "Topology-aware impact evaluation & auto ticket dispatch",
        metrics: [
          { label: "Alert Latency", value: "< 50ms" },
          { label: "Auto Resolution", value: "84.2%" },
          { label: "Outage Saved", value: "12 incidents" },
        ],
        features: [
          "Topology-aware root cause analysis",
          "Suppression of cascade storm alarms",
          "Direct integration with field dispatch",
        ],
      },
      {
        id: "noc-onts",
        title: "Network ONTs & ONU Inventory",
        badge: "ONT Telemetry",
        description: "Tracks serial numbers, optical RX signal power, and active GPON ports in real time.",
        src: "/assets/5fb0e71a-8322-4013-8e25-a01918528e3c.png",
        url: "kashtrix.internal/oss/onts-inventory",
        telemetry: "341,220 ONTs · 99.94% Connected",
        detail: "Live optical power telemetry & port mapping",
        metrics: [
          { label: "Mean RX Signal", value: "-19.4 dBm" },
          { label: "Unprovisioned", value: "14 ONUs" },
          { label: "XGS-PON Ports", value: "1,240" },
        ],
        features: [
          "Automatic serial number discovery",
          "Optical power threshold monitoring",
          "Bulk firmware configuration rollout",
        ],
      },
    ],
  },
  {
    id: "tr069",
    name: "TR-069 ACS & CPEs",
    shortName: "TR-069 ACS",
    accent: {
      primary: "#8B5CF6",
      secondary: "#6366F1",
      soft: "rgba(139, 92, 246, 0.14)",
      gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)",
      border: "rgba(139, 92, 246, 0.3)",
    },
    icon: Router,
    eyebrow: "Auto-Configuration Server (ACS)",
    title: "Zero-Touch Provisioning & CPE Remote Diagnostics",
    description:
      "Automate TR-069 / TR-369 CWMP management for Wi-Fi routers, ONUs, and VoIP gateways with complete parameter visibility and remote action controls.",
    href: "/tr069",
    views: [
      {
        id: "tr069-main",
        title: "TR-069 ACS Device Management Overview",
        badge: "ACS Control",
        description: "Centralized view of connected CPE devices, active sessions, and firmware baselines.",
        src: "/assets/62477c36-f04b-4465-ba1c-30f22b7fc4ec.png",
        url: "kashtrix.internal/tr069/acs-overview",
        telemetry: "TR-069 ACS v3.2 · 10,842 CPEs",
        detail: "Real-time CWMP inform sessions & parameter trees",
        metrics: [
          { label: "CPE Pool", value: "10,842" },
          { label: "Inform Period", value: "300s" },
          { label: "Zero-Touch", value: "100% Active" },
        ],
        features: [
          "Standardized TR-069 & TR-181 parameter tree",
          "Automatic WAN & Wi-Fi SSIDs provisioning",
          "Remote reboot, reset, and ping diagnostics",
        ],
      },
      {
        id: "tr069-detail",
        title: "CPE Device Diagnostics & Live Log",
        badge: "CPE Diagnostics",
        description: "Drill down into individual subscriber routers for Wi-Fi signal, optical power, and logs.",
        src: "/assets/68c35006-c428-4b18-85b3-fc46dd973192.png",
        url: "kashtrix.internal/tr069/device-df5f-diagnostics",
        telemetry: "CPE Model DF5F · Signal -18.4 dBm",
        detail: "Live optical power & 5GHz Wi-Fi telemetry",
        metrics: [
          { label: "Optical Power", value: "-18.4 dBm" },
          { label: "Wi-Fi Clients", value: "8 connected" },
          { label: "Uptime", value: "14d 6h" },
        ],
        features: [
          "Live Wi-Fi channel analyzer & optimization",
          "Optical power threshold alert triggers",
          "One-click remote diagnostic snapshot",
        ],
      },
      {
        id: "tr069-table",
        title: "TR-069 Parameter Registry & Search",
        badge: "Parameter Registry",
        description: "Search and batch-update device parameter values across thousands of subscriber gateways.",
        src: "/assets/6e5aaa99-344d-43af-aa72-ef3d75694b27.png",
        url: "kashtrix.internal/tr069/parameter-registry",
        telemetry: "1,420 Templates · Multi-Vendor",
        detail: "Standardized CWMP parameter management",
        metrics: [
          { label: "Batch Operations", value: "2,840/hr" },
          { label: "Vendor Profiles", value: "24 models" },
          { label: "Config Compliance", value: "99.96%" },
        ],
        features: [
          "Multi-vendor template inheritance",
          "Safe configuration rollback protection",
          "Audit trail for parameter modification",
        ],
      },
    ],
  },
  {
    id: "radius",
    name: "RADIUS AAA & Disconnect",
    shortName: "RADIUS AAA",
    accent: {
      primary: "#2563EB",
      secondary: "#0EA5E9",
      soft: "rgba(37, 99, 235, 0.14)",
      gradient: "linear-gradient(135deg, #2563EB, #0EA5E9)",
      border: "rgba(37, 99, 235, 0.3)",
    },
    icon: KeyRound,
    eyebrow: "Authentication, Authorization & Accounting",
    title: "High-Throughput RADIUS Engine & Instant Session Disconnect",
    description:
      "Handle over 50,000 AAA requests per second with real-time PPPoE / IPoE session control, CoA bandwidth changes, and automated dunning disconnects.",
    href: "/network-automation",
    views: [
      {
        id: "radius-main",
        title: "RADIUS AAA Server Control Plane",
        badge: "AAA Engine",
        description: "Monitors active sessions, authentication throughput, and gateway latency.",
        src: "/assets/6ebf0249-bd4e-4c78-a3d1-b76566e7134c.png",
        url: "kashtrix.internal/oss/radius-control",
        telemetry: "50K Auth Req/s · Latency < 2ms",
        detail: "Real-time subscriber session authentication",
        metrics: [
          { label: "Auth Rate", value: "50,000 req/s" },
          { label: "Active Sessions", value: "289,104" },
          { label: "Auth Success", value: "99.97%" },
        ],
        features: [
          "High-performance clustered AAA architecture",
          "Dynamic CoA (Change of Authorization) execution",
          "PPPoE, IPoE, and 802.1X protocol support",
        ],
      },
      {
        id: "radius-disconnect",
        title: "RADIUS Session Disconnect & CoA Control",
        badge: "CoA Control",
        description: "Executes real-time disconnects or bandwidth adjustments without interrupting other gateway subscribers.",
        src: "/assets/7462371b-8c50-433b-8eff-de70b01e3479.png",
        url: "kashtrix.internal/oss/radius-disconnect",
        telemetry: "CoA Triggered · IP: 10.3.2.140",
        detail: "Instant subscriber session disconnection & speed boost",
        metrics: [
          { label: "CoA Latency", value: "4ms" },
          { label: "Disconnections Today", value: "142" },
          { label: "Auto Dunning Kill", value: "Active" },
        ],
        features: [
          "Instant session kill on dunning or fraud",
          "On-the-fly plan bandwidth throttle & burst boost",
          "Full audit logging of every CoA command",
        ],
      },
    ],
  },
  {
    id: "crm",
    name: "Subscriber CRM & Leads",
    shortName: "Subscriber CRM",
    accent: {
      primary: "#F59E0B",
      secondary: "#F97316",
      soft: "rgba(245, 158, 11, 0.14)",
      gradient: "linear-gradient(135deg, #F59E0B, #F97316)",
      border: "rgba(245, 158, 11, 0.3)",
    },
    icon: Users,
    eyebrow: "Kashtrix OSS/BSS · Business Support System",
    title: "360° Subscriber Account Management & Lead Feasibility",
    description:
      "Unify customer identity, active packages, network signal history, invoice ledger, and sales leads into a single operational profile.",
    href: "/crm",
    views: [
      {
        id: "crm-sub",
        title: "360° Subscriber Profile & Account Workspace",
        badge: "Subscriber 360",
        description: "Complete subscriber timeline with package status, optical signal, and billing transactions.",
        src: "/assets/859d1238-8d99-4b82-b965-1b0abf16cfd7.png",
        url: "kashtrix.internal/bss/subscriber/360-karnkalyan",
        telemetry: "Subscriber Active · Plan 100Mbps",
        detail: "Single pane of glass for customer & network state",
        metrics: [
          { label: "Active Plan", value: "100Mbps Fiber" },
          { label: "Account Balance", value: "$0.00 (Current)" },
          { label: "CPE Signal", value: "-18.2 dBm" },
        ],
        features: [
          "Live network signal status inside customer profile",
          "One-click service pause, upgrade, or renewal",
          "Full communication & ticket history",
        ],
      },
      {
        id: "crm-leads",
        title: "Sales Lead Feasibility & CRM Pipeline",
        badge: "Leads Engine",
        description: "Qualify prospective broadband leads with geographic coverage checks and auto-conversion.",
        src: "/assets/b4b4f136-67f0-4120-b250-0370f1263691.png",
        url: "kashtrix.internal/bss/leads-pipeline",
        telemetry: "1,284 Leads · 82% Feasible",
        detail: "Location feasibility check & lead qualification",
        metrics: [
          { label: "New Leads", value: "1,284" },
          { label: "Conversion Rate", value: "48.2%" },
          { label: "Feasibility Check", value: "< 2 sec" },
        ],
        features: [
          "GIS fiber splitter distance calculation",
          "Automated lead assignment to field sales",
          "Direct conversion to active customer account",
        ],
      },
      {
        id: "crm-lead-view",
        title: "Lead Feasibility & Service Qualification View",
        badge: "Service Qualification",
        description: "Inspect specific lead address, nearest OLT splitter port availability, and installation cost.",
        src: "/assets/d89b78ec-1e5c-40b6-9a68-02575eea5f48.png",
        url: "kashtrix.internal/bss/lead-qualification/21063",
        telemetry: "Lead #21063 · Splitter Port 4 Free",
        detail: "Instant fiber port allocation & quote generation",
        metrics: [
          { label: "Splitter Distance", value: "42 meters" },
          { label: "Available Ports", value: "4 of 16 free" },
          { label: "Estimated Setup", value: "24 hours" },
        ],
        features: [
          "Automated optical loss budgeting",
          "Digital contract signing & payment link dispatch",
          "Seamless handoff to installation field task",
        ],
      },
    ],
  },
  {
    id: "billing",
    name: "Billing & Invoicing",
    shortName: "Billing",
    accent: {
      primary: "#EC4899",
      secondary: "#EF4444",
      soft: "rgba(236, 72, 153, 0.14)",
      gradient: "linear-gradient(135deg, #EC4899, #EF4444)",
      border: "rgba(236, 72, 153, 0.3)",
    },
    icon: CreditCard,
    eyebrow: "Revenue Engine",
    title: "Convergent Rating, Automated Invoices & Payment Dunning",
    description:
      "Automate monthly recurring subscriptions, pro-rated plan changes, automated PDF invoices, and multi-gateway payment collections without revenue leakage.",
    href: "/billing",
    views: [
      {
        id: "billing-acc",
        title: "Automated Invoicing & Financial Accounting",
        badge: "Invoice Engine",
        description: "Overview of generated invoices, payment statuses, revenue ledger, and dunning cycles.",
        src: "/assets/e0aa4b02-eb96-417c-8415-0a0baaab4c87.png",
        url: "kashtrix.internal/bss/accounting-ledger",
        telemetry: "Monthly $4.85M · 98.4% Collection",
        detail: "Real-time rating, invoicing & ledger sync",
        metrics: [
          { label: "Monthly Revenue", value: "$4.85M" },
          { label: "Auto Dunning", value: "98.4% Collected" },
          { label: "Invoices Rated", value: "342,890" },
        ],
        features: [
          "Convergent prepaid and postpaid rating engine",
          "Automated payment gateway retries & reminders",
          "Audit-logged revenue assurance reconciliation",
        ],
      },
    ],
  },
  {
    id: "support",
    name: "Support Tickets & Field Ops",
    shortName: "Tickets & Field Ops",
    accent: {
      primary: "#0EA5E9",
      secondary: "#14B8A6",
      soft: "rgba(14, 165, 233, 0.14)",
      gradient: "linear-gradient(135deg, #0EA5E9, #14B8A6)",
      border: "rgba(14, 165, 233, 0.3)",
    },
    icon: Headset,
    eyebrow: "Customer Care & Field Workforce",
    title: "Context-Aware Ticketing & Dispatch Task Management",
    description:
      "Empower support agents with live optical signals and billing context. Automatically convert complex issues into dispatch field tasks for technicians.",
    href: "/field-operations",
    views: [
      {
        id: "support-tix",
        title: "Support Desk & Customer Ticket Workspace",
        badge: "Support Workspace",
        description: "Support ticket inbox integrated with live network telemetry for fast root-cause identification.",
        src: "/assets/f2fe4f31-8e23-4a09-ac1d-87594885a9c7.png",
        url: "kashtrix.internal/support/tickets-workspace",
        telemetry: "14 Open Tickets · Resolution < 12m",
        detail: "Ticket management enriched with network state",
        metrics: [
          { label: "Open Tickets", value: "14" },
          { label: "Avg First Response", value: "2.4 min" },
          { label: "AI Resolution", value: "78%" },
        ],
        features: [
          "Automatic signal diagnostic embed inside ticket",
          "One-click modem remote reboot from ticket",
          "Escalation directly to field dispatch task",
        ],
      },
      {
        id: "support-tasks",
        title: "Technician Field Operations & Task Dispatch",
        badge: "Field Ops",
        description: "Track field work orders, technician location, required inventory items, and mobile completion.",
        src: "/assets/fd9043e3-1a2b-42c1-aaa6-92d9261ef786.png",
        url: "kashtrix.internal/field/tasks-dispatch",
        telemetry: "186 Active Tasks · 42 Technicians",
        detail: "Work order dispatch with inventory tracking",
        metrics: [
          { label: "Field Tasks", value: "186" },
          { label: "Technician Fleet", value: "42 active" },
          { label: "SLA Adherence", value: "99.2%" },
        ],
        features: [
          "Location-aware technician dispatching",
          "Mobile barcode scanner for ONU inventory",
          "Customer ETA notification SMS updates",
        ],
      },
    ],
  },
  {
    id: "ai",
    name: "AI Agents & Voice",
    shortName: "AI & Voice PBX",
    accent: {
      primary: "#A855F7",
      secondary: "#EC4899",
      soft: "rgba(168, 85, 247, 0.14)",
      gradient: "linear-gradient(135deg, #A855F7, #EC4899)",
      border: "rgba(168, 85, 247, 0.3)",
    },
    icon: Bot,
    eyebrow: "Automation & Telephony Core",
    title: "Autonomous AI Operational Agents & PBX Voice Integration",
    description:
      "Deploy policy-governed AI agents that diagnose network faults, assist care teams, auto-reconcile revenue, and orchestrate Yeastar/Asterisk voice gateways.",
    href: "/ai-agents",
    views: [
      {
        id: "ai-studio",
        title: "AI Agents Workflow Builder & Policy Grid",
        badge: "AI Agents Studio",
        description: "Visual agent designer for autonomous NOC monitoring, billing dunning, and support copilot.",
        src: "/assets/kirtinet-light-colla.png",
        url: "kashtrix.internal/ai/agents-builder",
        telemetry: "8 Active AI Agents · 18.4K Tasks",
        detail: "Policy-governed autonomous telecom workforce",
        metrics: [
          { label: "Active AI Agents", value: "8" },
          { label: "Tasks / 24h", value: "18,420" },
          { label: "Policy Guardrail", value: "100% Verified" },
        ],
        features: [
          "Human-in-the-loop approval guardrails",
          "Multi-system action execution across APIs",
          "Complete execution audit log and rollback",
        ],
      },
      {
        id: "voice-yeastar",
        title: "Yeastar Voice Gateway Management",
        badge: "Yeastar Voice",
        description: "Voice infrastructure integration for SIP trunks, extensions, and IVR routing.",
        src: "/assets/fd9043e3-1a2b-42c1-aaa6-92d9261ef786.png",
        url: "kashtrix.internal/voice/yeastar-gateway",
        telemetry: "SIP Trunk Online · 128 Channels",
        detail: "Voice gateway & call routing management",
        metrics: [
          { label: "Active Channels", value: "128" },
          { label: "Call Quality MOS", value: "4.4 / 5.0" },
          { label: "Concurrent Calls", value: "412" },
        ],
        features: [
          "SIP trunk status monitoring and failover",
          "Direct integration with subscriber CRM calls",
          "Interactive IVR call campaign builder",
        ],
      },
      {
        id: "voice-asterisk",
        title: "Asterisk Telephony & SIP Server Control",
        badge: "Asterisk Core",
        description: "Low-level PBX trunk metrics, call duration telemetry, and SIP error analytics.",
        src: "/assets/030d7016-5b75-4531-ab1e-2bd488cf5ac0.png",
        url: "kashtrix.internal/voice/asterisk-core",
        telemetry: "Asterisk PBX · Zero Drop Rate",
        detail: "Enterprise SIP PBX engine telemetry",
        metrics: [
          { label: "SIP Trunks", value: "16 active" },
          { label: "Call Drop Rate", value: "0.01%" },
          { label: "Jitter Average", value: "1.2 ms" },
        ],
        features: [
          "Real-time RTP packet loss analyzer",
          "Automated CDR call detail recording",
          "Multi-tenant PBX extension provisioning",
        ],
      },
    ],
  },
];

export function OSSBSSShowcase({ mode = "all", ossImageSrc, bssImageSrc }: OSSBSSShowcaseProps) {
  const [activeCategoryId, setActiveCategoryId] = useState("noc");
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const category = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];
  const CategoryIcon = category.icon;
  const currentView = category.views[activeViewIndex] || category.views[0];

  // Auto-rotate views inside active category
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveViewIndex((prev) => (prev + 1) % category.views.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [category.views.length, isPlaying, activeCategoryId]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategoryId(catId);
    setActiveViewIndex(0);
  };

  return (
    <section id="oss-bss-showcase" className="relative w-full overflow-hidden border-y border-[var(--border-default)] bg-[var(--surface-1)] dark:bg-slate-950 py-12 sm:py-20 text-[var(--text-primary)] dark:text-white md:py-28">
      {/* Background Ambient Glow */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] transition-all duration-700" 
        style={{ background: category.accent.gradient }}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-8 sm:mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-ping rounded-full" style={{ backgroundColor: category.accent.primary }} />
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] dark:text-white/80">
              Interactive Live Demo Showcase
            </span>
          </div>
          
          <h2 className="mt-4 font-sora text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] dark:text-white md:text-4xl lg:text-5xl">
            ISP OSS &amp; BSS Applications.{" "}
            <span className="bg-gradient-to-r from-[var(--text-primary)] via-purple-600 to-[var(--text-accent)] dark:from-white dark:via-slate-200 dark:to-white/60 bg-clip-text text-transparent block sm:inline">
              One Unified Platform.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 font-inter text-xs sm:text-sm leading-6 sm:leading-7 text-[var(--text-secondary)] dark:text-slate-300">
            Explore ISP application screens from network NOC telemetry, TR-069 ACS, FreeRADIUS AAA sessions, subscriber CRM, automated billing, MikroTik management and AI-powered field dispatch.
          </p>
        </div>

        {/* Top Category Tabs */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/80 p-1.5 sm:p-2 shadow-xl dark:shadow-2xl backdrop-blur-xl">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`group relative flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl border px-2.5 py-2 sm:px-4 sm:py-2.5 font-inter text-[10px] sm:text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--surface-purple)] dark:bg-white/10 text-[var(--text-primary)] dark:text-white shadow-md backdrop-blur-md"
                      : "border-transparent text-[var(--text-secondary)] dark:text-slate-400 hover:bg-[var(--surface-3)] dark:hover:bg-white/5 hover:text-[var(--text-primary)] dark:hover:text-white"
                  }`}
                  style={{
                    borderColor: isActive ? cat.accent.primary : "transparent",
                  }}
                >
                  <span
                    className="grid h-5 w-5 sm:h-7 sm:w-7 place-items-center rounded-md sm:rounded-lg transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: isActive ? cat.accent.soft : "rgba(255,255,255,0.05)",
                      color: cat.accent.primary,
                    }}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </span>
                  <span className="hidden sm:inline">{cat.shortName}</span>
                  {isActive && (
                    <div
                      className="absolute inset-0 -z-10 rounded-lg sm:rounded-xl opacity-20 blur-sm pointer-events-none"
                      style={{ background: cat.accent.gradient }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Feature Details & Screenshot Switcher */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div>
              {/* Category Eyebrow & Title */}
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: category.accent.soft, color: category.accent.primary }}>
                  <CategoryIcon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: category.accent.primary }}>
                  {category.eyebrow}
                </span>
              </div>

              <h3 className="mt-4 font-sora text-2xl font-bold leading-tight text-[var(--text-primary)] dark:text-white sm:text-3xl">
                {category.title}
              </h3>

              <p className="mt-3 font-inter text-sm leading-6 text-[var(--text-secondary)] dark:text-slate-300">
                {category.description}
              </p>

              {/* Live Category Metrics Grid */}
              <div className="mt-6 grid grid-cols-3 gap-2 border-y border-[var(--border-default)] dark:border-white/10 py-4">
                {currentView.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-2)] dark:bg-white/[0.03] p-2.5 text-center">
                    <div className="font-mono text-sm font-bold sm:text-base" style={{ color: category.accent.primary }}>
                      {m.value}
                    </div>
                    <div className="mt-1 font-inter text-[10px] text-[var(--text-secondary)] dark:text-slate-400 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* View Switcher Thumbnails Cards */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between font-inter text-xs text-[var(--text-secondary)] dark:text-slate-400">
                  <span className="font-mono uppercase tracking-wider text-[var(--text-primary)] dark:text-slate-300">
                    Application Views ({category.views.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1.5 text-[11px] text-[var(--text-link)] dark:text-slate-300 hover:underline transition"
                  >
                    {isPlaying ? <Pause className="h-3 w-3 text-emerald-500" /> : <Play className="h-3 w-3 text-amber-500" />}
                    <span>{isPlaying ? "Pause auto-switch" : "Play auto-switch"}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {category.views.map((v, idx) => {
                    const isSelected = idx === activeViewIndex;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setActiveViewIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                          isSelected
                            ? "bg-[var(--surface-purple)] dark:bg-white/10 border-[var(--border-brand)] dark:border-white/20 text-[var(--text-primary)] dark:text-white shadow-md backdrop-blur-md"
                            : "bg-[var(--surface-2)] dark:bg-white/[0.02] border-[var(--border-default)] dark:border-white/5 text-[var(--text-secondary)] dark:text-slate-400 hover:bg-[var(--surface-3)] dark:hover:bg-white/[0.05] hover:text-[var(--text-primary)] dark:hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                              isSelected ? "text-white font-bold" : "bg-[var(--surface-3)] dark:bg-white/10 text-[var(--text-secondary)] dark:text-slate-400"
                            }`}
                            style={{ backgroundColor: isSelected ? category.accent.primary : undefined }}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-inter text-xs font-semibold">{v.title}</p>
                            <p className="truncate font-inter text-[11px] text-[var(--text-secondary)] dark:text-slate-400">{v.detail}</p>
                          </div>
                        </div>
                        {isSelected && <Zap className="h-4 w-4 shrink-0" style={{ color: category.accent.primary }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="mt-6 space-y-2">
                {currentView.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 font-inter text-xs text-[var(--text-secondary)] dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: category.accent.primary }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                href={category.href}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-inter text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ background: category.accent.gradient }}
              >
                <span>Explore {category.shortName} System</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Styled App Mockup Frame */}
          <div className="lg:col-span-7">
            <div className="group relative">
              
              {/* Outer Glow */}
              <div
                className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: category.accent.gradient }}
              />

              {/* App Window Chrome */}
              <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] dark:border-white/15 bg-[var(--surface-2)] dark:bg-slate-900 p-1.5 shadow-xl dark:shadow-2xl">
                
                {/* Header Toolbar */}
                <div className="flex items-center justify-between border-b border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-slate-950 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/90" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                    
                    {/* URL Bar */}
                    <div className="ml-3 hidden sm:flex items-center gap-2 rounded-md bg-[var(--surface-2)] dark:bg-white/5 border border-[var(--border-default)] dark:border-white/5 px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)] dark:text-slate-400">
                      <span style={{ color: category.accent.primary }}>https://</span>
                      <span>{currentView.url}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold"
                      style={{ backgroundColor: category.accent.soft, color: category.accent.primary }}
                    >
                      <span className="h-1.5 w-1.5 animate-ping rounded-full" style={{ backgroundColor: category.accent.primary }} />
                      LIVE SESSION
                    </span>

                    <button
                      type="button"
                      onClick={() => setLightboxImage({ src: currentView.src, title: currentView.title })}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--surface-3)] dark:bg-white/10 text-[var(--text-secondary)] dark:text-slate-300 transition hover:text-[var(--text-primary)] dark:hover:text-white"
                      title="View full high-res image"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Full Image Viewport Container */}
                <div
                  onClick={() => setLightboxImage({ src: currentView.src, title: currentView.title })}
                  className="group/viewport relative w-full cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-1)] dark:bg-slate-950"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView.src}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative w-full"
                    >
                      <Image
                        src={currentView.src}
                        alt={currentView.title}
                        width={1920}
                        height={1200}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover/viewport:scale-105"
                        quality={92}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 dark:from-slate-950/70 via-transparent to-transparent opacity-80" />

                  {/* Floating Telemetry Callout Card */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div className="rounded-xl border border-white/20 bg-slate-950/85 p-3 shadow-xl backdrop-blur-md min-w-0 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.accent.primary }} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                          {currentView.badge}
                        </span>
                      </div>
                      <p className="mt-1 font-inter text-xs font-semibold truncate text-white sm:text-sm">
                        {currentView.telemetry}
                      </p>
                    </div>

                    {/* View Controls & Lightbox Hint */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveViewIndex((prev) => (prev - 1 + category.views.length) % category.views.length);
                          setIsPlaying(false);
                        }}
                        aria-label="Previous view"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-white/20 bg-slate-900/90 text-white shadow-lg backdrop-blur-md hover:bg-white/20 transition"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-mono text-xs text-white/80 px-1">
                        {activeViewIndex + 1}/{category.views.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveViewIndex((prev) => (prev + 1) % category.views.length);
                          setIsPlaying(false);
                        }}
                        aria-label="Next view"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-white/20 bg-slate-900/90 text-white shadow-lg backdrop-blur-md hover:bg-white/20 transition"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Hint Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/viewport:opacity-100 bg-slate-950/30 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/90 px-4 py-2 font-inter text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
                      <Maximize2 className="h-4 w-4" style={{ color: category.accent.primary }} /> Click to Zoom Full Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 dark:bg-slate-950/90 p-4 backdrop-blur-2xl">
          <div className="relative max-h-[94vh] max-w-6xl w-full overflow-hidden rounded-2xl border border-[var(--border-default)] dark:border-white/20 bg-[var(--surface-1)] dark:bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-950 px-5 py-3.5 text-[var(--text-primary)] dark:text-white">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-[var(--text-primary)] dark:text-white/90">{lightboxImage.title} — High-Res UI View</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="rounded-lg p-1.5 text-[var(--text-secondary)] dark:text-white/70 hover:bg-[var(--surface-3)] dark:hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[84vh] overflow-auto p-4 bg-[var(--surface-2)] dark:bg-slate-950">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                width={1920}
                height={1200}
                className="w-full h-auto rounded-xl border border-[var(--border-default)] dark:border-white/10"
                quality={95}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
