"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity, ArrowRight, Bot, Boxes, Cable, CheckCircle2,
  CircleDollarSign, ContactRound, Cpu, Database, Gauge, KeyRound, MapPinned,
  Network, Radio, ReceiptText, Router, Server, ServerCog, ShieldCheck, Sparkles,
  TicketCheck, Workflow, Wrench,
} from "lucide-react";

const ossLayers = [
  {
    id: "layer-1",
    num: "LAYER 1",
    name: "Network, SNMP & Device Automation",
    subtitle: "Complete multi-vendor device management, SNMP telemetry, and high-concurrency AAA.",
    accent: "#0891b2",
    badge: "OSS / Hardware & SNMP",
    image: "/media/oss-bss/01580174-2bd9-4e23-8664-ca9cb115db84.png",
    serverLabel: "TELECOM OSS CORE",
    highlight: "50,000+ AAA Req/s · Multi-Vendor SNMP",
    detail: "Complete device lifecycle management for MikroTik RouterOS (v6 & v7 API/REST), Nokia ISAM OLTs, Huawei SmartAX MA5800, ZTE C300/C600, Cisco ASR 9000, and Juniper MX. Continuous SNMP v1/v2c/v3 telemetry with MIB compilation and sub-second polling.",
    modules: [
      { icon: Radio, title: "Multi-Vendor SNMP v1/v2c/v3 Telemetry", desc: "Built-in MIB compiler, bulk OID polling, and asynchronous SNMP trap reception monitoring optical TX/RX power (dBm), CPU, temperature, and port bandwidth." },
      { icon: ServerCog, title: "Complete Device Management", desc: "Automates configuration, backup, and firmware rollouts across MikroTik, Nokia ISAM, Huawei MA5800, ZTE C300/C600, and Cisco BNG routers via SSH, NETCONF, and REST APIs." },
      { icon: KeyRound, title: "FreeRADIUS AAA & PPPoE Engine", desc: "Clustered AAA handling 50,000+ auth req/s, PPPoE/IPoE sessions, dynamic IP pool allocation, CoA speed boosts, and automated disconnection upon dunning expiry." },
      { icon: Cable, title: "GPON & XGS-PON Provisioning", desc: "Auto-discovers and provisions ONTs upon connection to the optical splitter. Assigns VLANs, bandwidth profiles, and verifies optical power levels automatically." },
      { icon: Router, title: "TR-069 & TR-369 CWMP ACS", desc: "Zero-touch customer CPE provisioning, Wi-Fi SSID and password configuration, remote diagnostics, speed testing, and scheduled maintenance firmware updates." },
      { icon: Activity, title: "BNG / BRAS Session Orchestration", desc: "Coordinates subscriber traffic shaping, VLAN mapping, QoS priority queues, and dual-stack IPv4/IPv6 allocation across Cisco, Juniper, and MikroTik CCR routers." },
    ],
    links: [
      { label: "Telecom OSS", href: "/oss" },
      { label: "Device Automation", href: "/hardware-automation" },
      { label: "Network Management", href: "/network-management" },
      { label: "FreeRADIUS AAA", href: "/network-automation" },
    ],
  },
  {
    id: "layer-2",
    num: "LAYER 2",
    name: "Convergent BSS & Revenue Management",
    subtitle: "Zero-leakage real-time financial billing, 360° customer relationship management, and dunning.",
    accent: "#db2777",
    badge: "BSS / Revenue & CRM",
    image: "/media/oss-bss/38de87f4-1fdf-4a22-aa0b-04140a2fedcf.png",
    serverLabel: "CONVERGENT BSS",
    highlight: "Real-Time Convergent Rating Engine",
    detail: "Eliminates billing discrepancies by linking circuit throughput directly to prepaid and postpaid rating meters. Automatically triggers SMS payment links, grace period speed throttling, and instant CoA service restoration.",
    modules: [
      { icon: ContactRound, title: "360° Subscriber CRM", desc: "Consolidates customer identity, active PPPoE sessions, optical RX power, open support tickets, and complete financial ledger in one single-pane-of-glass." },
      { icon: ReceiptText, title: "Automated Cycle Invoicing", desc: "Generates multi-currency compliant batch invoices, pro-rated plan adjustments, tax calculations (VAT/GST), and automated email/SMS/WhatsApp PDF delivery." },
      { icon: CircleDollarSign, title: "Dunning & Smart Collections", desc: "Configurable grace periods with automated bandwidth throttling prior to suspension. Sends automated payment links and triggers instant CoA disconnection upon expiry." },
      { icon: Boxes, title: "Flexible Product Catalog", desc: "Model unlimited speed packages, time-of-day boosts, FUP quotas, bandwidth add-ons, bundled IPTV/OTT entitlements, and static IP lease plans." },
      { icon: CheckCircle2, title: "Multi-Gateway Payment Integration", desc: "Pre-integrated with Stripe, PayPal, Razorpay, direct bank settlement, instant QR wallets, and reseller agent cash collection portals." },
      { icon: Gauge, title: "Revenue Leakage & ARPU Analytics", desc: "Real-time dashboards tracking Monthly Recurring Revenue (MRR), Churn Rate, Average Revenue Per User (ARPU), and unpaid invoice aging cohorts." },
    ],
    links: [
      { label: "Telecom BSS", href: "/bss" },
      { label: "ISP Billing", href: "/billing" },
      { label: "Subscriber CRM", href: "/crm" },
    ],
  },
  {
    id: "layer-3",
    num: "LAYER 3",
    name: "Field Operations & Serialized Inventory",
    subtitle: "GPS technician dispatching, offline mobile app, barcode ONT scanning, and OTDR verification.",
    accent: "#ea580c",
    badge: "Service & Logistics",
    image: "/media/oss-bss/62477c36-f04b-4465-ba1c-30f22b7fc4ec.png",
    serverLabel: "FIELD LOGISTICS",
    highlight: "Mobile App with Barcode & OTDR Sync",
    detail: "Empowers field technicians with an offline-ready mobile app to scan optical terminal QR barcodes, run remote OLT line attenuation tests from the customer premises, and close work orders with digital customer signatures.",
    modules: [
      { icon: MapPinned, title: "GPS-Optimized Technician Dispatch", desc: "Automates task assignment based on technician skill level, required equipment in van stock, and real-time travel proximity." },
      { icon: Boxes, title: "Serialized Asset Registry", desc: "Tracks individual MAC addresses and serial numbers from central warehouse through technician van stock to customer installation." },
      { icon: Wrench, title: "Work Order Fiber Tracking", desc: "Structured workflows for drop cable installation, optical power budget verification, splitter port assignment, and ONT activation." },
      { icon: Router, title: "On-Site CPE Barcode Verification", desc: "Scanning ONT barcode with mobile camera automatically binds the device to the subscriber profile and triggers OLT provisioning." },
      { icon: ShieldCheck, title: "Automated SLA Credit Management", desc: "Monitors circuit downtime against enterprise SLAs, auto-calculating service credits and customer reimbursements." },
      { icon: CheckCircle2, title: "Digital Customer Sign-Off", desc: "Captures customer touch signature and geo-tagged proof-of-installation photos directly in the field mobile application." },
    ],
    links: [
      { label: "Field Operations", href: "/field-operations" },
      { label: "Telecom Inventory", href: "/inventory" },
      { label: "Network Management", href: "/network-management" },
    ],
  },
  {
    id: "layer-4",
    num: "LAYER 4",
    name: "AI Agentic NOC & Carrier-Grade Syslog",
    subtitle: "Autonomous digital employees, root-cause correlation, and carrier-grade CGNAT compliance.",
    accent: "#10b981",
    badge: "Autonomous Intelligence & Compliance",
    image: "/media/oss-bss/030d7016-5b75-4531-ab1e-2bd488cf5ac0.png",
    serverLabel: "AI NOC & CARRIER SYSLOG",
    highlight: "100K+ msgs/s · CGNAT Law Compliance",
    detail: "Autonomous telecom AI agents that correlate optical attenuation drops with RADIUS disconnects to isolate fiber cuts and suppress cascading alarms. Carrier-grade syslog ingests 100,000+ msgs/s with 1-year encrypted CGNAT audit search.",
    modules: [
      { icon: Bot, title: "AI NOC Copilot & Root-Cause Analysis", desc: "Correlates multi-layer network alarms across OLT splitters and core links. When a fiber break occurs, suppresses hundreds of downstream ONT loss alerts and identifies the exact cut location." },
      { icon: ShieldCheck, title: "AI Deterministic Policy Guardrails", desc: "Strict execution boundaries separating low-risk autonomous diagnostics from high-impact core changes (e.g., BGP route tweaks or bulk disconnects), which require human engineer approval." },
      { icon: Sparkles, title: "AI Care & Churn Prediction Copilot", desc: "Assists support agents with instant optical line health summaries, predictive churn risk indicators, and automated troubleshooting scripts during customer calls." },
      { icon: Activity, title: "High-Throughput Syslog Ingest (100K+ EPS)", desc: "Ingests high-frequency syslog flows via UDP/TCP 514 and TLS from MikroTik, Cisco, Huawei, and Nokia devices with zero loss during DDoS attacks or broadcast storms." },
      { icon: ShieldCheck, title: "CGNAT Audit Archiving for Compliance", desc: "Meets law enforcement and regulatory mandates by indexing public IP and source port mappings to private subscriber identities with 1-year encrypted columnar storage." },
      { icon: Database, title: "Sub-Second Subpoena & Audit Search", desc: "Instantly queries billions of historical NAT translation records by public IP, port, and timestamp to return verified subscriber account details in under 500 milliseconds." },
    ],
    links: [
      { label: "Carrier-Grade Syslog", href: "/syslog" },
      { label: "AI Telecom Agents", href: "/ai-agents" },
      { label: "Platform Architecture", href: "/platform" },
    ],
  },
];

export function OssBssShowcase() {
  const [activeLayer, setActiveLayer] = useState(0);
  const current = ossLayers[activeLayer];

  return (
    <div className="w-full">
      {/* 4 Architecture Layers Navigation (Max 5px radius) */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-6">
        {ossLayers.map((layer, idx) => {
          const isActive = activeLayer === idx;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayer(idx)}
              className={`flex flex-col items-start p-3.5 rounded-[5px] text-left transition-all ${
                isActive
                  ? "border-2 border-[#4b1b63] bg-[#fbf7fd] text-[#171219] shadow-sm dark:border-[#c084fc] dark:bg-[#280f38] dark:text-white dark:ring-1 dark:ring-[#c084fc]"
                  : "border border-[#e4dee6] bg-white text-[#564e59] hover:border-[#6f2b8f]/50 hover:bg-[#fffbfd] dark:border-[#381647] dark:bg-[#150720] dark:text-[#c4b3cf] dark:hover:bg-[#1e0a2d] dark:hover:border-[#c084fc]/60"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[10px] font-mono tracking-wider font-semibold ${
                    isActive ? "text-[#4b1b63] dark:text-[#c084fc]" : "opacity-75 text-[#736c78] dark:text-[#9e90a6]"
                  }`}
                >
                  {layer.num}
                </span>
                <span
                  className="h-2 w-2 rounded-full transition-colors"
                  style={{ background: isActive ? "#6f2b8f" : "#c9c2cc" }}
                />
              </div>
              <p className={`mt-1.5 text-xs font-bold leading-tight line-clamp-1 ${isActive ? "text-[#171219] dark:text-white" : ""}`}>
                {layer.name}
              </p>
              <p className="mt-1 text-[11px] opacity-75 hidden md:block line-clamp-1">
                {layer.badge}
              </p>
            </button>
          );
        })}
      </div>

      {/* Layer Content Card (Max 5px radius) */}
      <div className="rounded-[5px] border border-[#e5dfeb] bg-white p-6 shadow-sm xl:p-8 dark:border-[#381647] dark:bg-[#160822]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-[3px] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white"
                style={{ background: current.accent }}
              >
                {current.badge}
              </span>
              <span className="rounded-[3px] bg-[#f5f2f7] px-2.5 py-0.5 text-[11px] font-mono font-semibold text-[#171219]">
                {current.highlight}
              </span>
            </div>

            <h3 className="mt-3.5 text-2xl font-bold tracking-tight text-[#171219] sm:text-3xl">
              {current.name}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-[#b30f5f]">
              {current.subtitle}
            </p>
            <p className="mt-3 text-xs leading-6 text-[#675f6d]">
              {current.detail}
            </p>

            {/* 6 Capabilities Matrix for Active Layer */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {current.modules.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="flex flex-col rounded-[4px] border border-[#f0ebf2] bg-[#fcfbfc] p-3 transition hover:border-[#6f2b8f]/50 hover:bg-white dark:border-[#381647] dark:bg-[#1f0c2e] dark:hover:bg-[#280f38]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] text-white"
                        style={{ background: current.accent }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <h4 className="text-xs font-bold leading-tight text-[#171219] dark:text-white">
                        {m.title}
                      </h4>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-4 text-[#736c77] dark:text-[#b4a4be]">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Related Domain Links */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-[#f0ebf2] dark:border-[#381647]">
              <span className="text-[11px] font-bold text-[#8d8592] dark:text-[#a090ab] uppercase tracking-wider">
                Explore Deep Dive:
              </span>
              {current.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-[3px] border border-[#e6e1e8] bg-white px-2.5 py-1 text-xs font-semibold text-[#171219] transition hover:border-[#4b1b63] hover:text-[#4b1b63] dark:border-[#381647] dark:bg-[#1a0928] dark:text-white dark:hover:border-[#c084fc] dark:hover:text-[#c084fc]"
                >
                  {link.label} <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>

          {/* Layer Interface (No monitor frame) */}
          <div>
            <div className="overflow-hidden rounded-[5px] border border-[#e4dee6] dark:border-[#381647] shadow-sm transition hover:shadow-md">
              <Image
                src={current.image}
                alt={current.name}
                width={1900}
                height={1080}
                quality={95}
                priority
                sizes="(max-width: 1024px) 100vw, 580px"
                className="block h-auto w-full object-contain"
              />
            </div>
            <p className="mt-2 text-right font-mono text-[10px] text-[#8e8593] dark:text-[#a090ab]">
              Telecom OSS/BSS Console · {current.badge}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
