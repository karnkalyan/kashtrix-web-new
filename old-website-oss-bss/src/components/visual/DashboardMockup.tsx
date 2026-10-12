"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CheckCircle2, Users, DollarSign, Ticket, Cpu, Wifi, Sparkles, ArrowUpRight, TrendingUp, Server, ShieldCheck, CreditCard, Boxes, Bot, Gauge, Router, Lock, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Icon = React.ComponentType<{ className?: string }>;
type Metric = { label: string; value: string; change: string; icon: Icon };
type View = {
  label: string; icon: Icon; accent?: boolean; health: string; healthState: string; healthDetail: string;
  chartTitle: string; chartDetail: string; chartValue: string; insightLabel: string; insightTitle: string; insightBody: string; insightStatus: string; metrics: Metric[];
};

const VIEWS: Record<string, View> = {
  noc: {
    label: "NOC Telemetry", icon: Activity, health: "OLT/BNG Health", healthState: "Optimal", healthDetail: "All 48 GPON rings and 12 BNG gateways synchronized.",
    chartTitle: "Live Core Bandwidth Throughput", chartDetail: "Real-time aggregated traffic across peering gateways", chartValue: "1.48 Tbps", insightLabel: "Autonomous NOC AI", insightTitle: "Proactive BNG Load Rebalance", insightBody: "NOC AI detected early latency spikes (+18ms) on ASR-9000-BNG-02 and migrated 1,420 PPPoE subscribers to BNG-04 without a session drop.", insightStatus: "Auto-Resolved · 0 human touch",
    metrics: [
      { label: "Active Customers", value: "342,890", change: "+4.2% this month", icon: Users }, { label: "Network Uptime", value: "99.998%", change: "Zero unplanned drop", icon: Wifi },
      { label: "Monthly Revenue", value: "$4.85M", change: "+12.8% YoY growth", icon: DollarSign }, { label: "Radius Sessions", value: "289,104", change: "2,410 req/s auth rate", icon: Activity },
      { label: "Payment Collection", value: "98.4%", change: "+3.1% auto dunning", icon: CheckCircle2 }, { label: "Open Tickets", value: "14", change: "-78% via Support AI", icon: Ticket },
    ],
  },
  subscriber: {
    label: "Subscribers & BNG", icon: Users, health: "Subscriber Core", healthState: "Stable", healthDetail: "289,104 active sessions balanced across 12 BNG gateways.",
    chartTitle: "Concurrent Subscriber Sessions", chartDetail: "PPPoE and IPoE sessions across all access regions", chartValue: "289.1K", insightLabel: "Subscriber Intelligence", insightTitle: "Session Pool Rebalanced", insightBody: "Capacity prediction moved 8,240 new authentications to the lowest-latency BNG pool before the evening traffic peak.", insightStatus: "Optimized · SLA protected",
    metrics: [
      { label: "Active Sessions", value: "289,104", change: "+8,240 today", icon: Activity }, { label: "New Activations", value: "1,284", change: "+16.2% this week", icon: Users },
      { label: "Auth Success", value: "99.97%", change: "2,410 requests/s", icon: CheckCircle2 }, { label: "Average ARPU", value: "$48.20", change: "+3.8% this quarter", icon: DollarSign },
      { label: "BNG Capacity", value: "64.2%", change: "35.8% headroom", icon: Gauge }, { label: "Churn Risk", value: "1.8%", change: "-0.6% via Sales AI", icon: TrendingUp },
    ],
  },
  olt: {
    label: "OLT/ONT GPON", icon: Server, health: "Optical Network", healthState: "Optimal", healthDetail: "48 rings, 186 OLTs, and 341,220 ONTs reporting normally.",
    chartTitle: "Optical Signal Distribution", chartDetail: "Live receive-power telemetry across GPON and XGS-PON", chartValue: "-19.4 dBm", insightLabel: "Fiber Assurance AI", insightTitle: "Degradation Detected Early", insightBody: "A gradual 2.1 dB signal decline on OLT-04/PON-12 was isolated to a splitter segment and queued for preventive field maintenance.", insightStatus: "Work order created · No outage",
    metrics: [
      { label: "Managed OLTs", value: "186", change: "12 vendor models", icon: Server }, { label: "Online ONTs", value: "341,220", change: "99.94% connected", icon: Router },
      { label: "GPON Rings", value: "48", change: "All synchronized", icon: Activity }, { label: "Mean Optical RX", value: "-19.4 dBm", change: "Within optimal range", icon: Wifi },
      { label: "PON Utilization", value: "61.8%", change: "38.2% headroom", icon: Gauge }, { label: "Active Alarms", value: "7", change: "5 auto-correlated", icon: Ticket },
    ],
  },
  billing: {
    label: "Billing & Revenue", icon: DollarSign, health: "Revenue Engine", healthState: "Reconciled", healthDetail: "All rating, invoicing, and gateway settlement jobs completed.",
    chartTitle: "Revenue Collection Velocity", chartDetail: "Real-time invoice, payment, and settlement performance", chartValue: "$4.85M", insightLabel: "Revenue Assurance AI", insightTitle: "Leakage Automatically Recovered", insightBody: "Billing AI matched 126 active circuits to missing rating events and recovered revenue without interrupting subscriber service.", insightStatus: "Reconciled · Audit logged",
    metrics: [
      { label: "Monthly Revenue", value: "$4.85M", change: "+12.8% YoY", icon: DollarSign }, { label: "Collection Rate", value: "98.4%", change: "+3.1% auto dunning", icon: CreditCard },
      { label: "Invoices Rated", value: "342,890", change: "100% completed", icon: CheckCircle2 }, { label: "Revenue Recovered", value: "$84.2K", change: "126 circuits corrected", icon: TrendingUp },
      { label: "Failed Payments", value: "0.7%", change: "-18% after retries", icon: Ticket }, { label: "Settlement Match", value: "99.99%", change: "All gateways synced", icon: Activity },
    ],
  },
  ai: {
    label: "AI Employee Grid", icon: Sparkles, accent: true, health: "AI Workforce", healthState: "8 Active", healthDetail: "All autonomous agents operating inside approval and audit policies.",
    chartTitle: "Autonomous Tasks Completed", chartDetail: "Cross-department AI task execution over the last 24 hours", chartValue: "18,420", insightLabel: "AI Orchestrator", insightTitle: "Cross-Agent Resolution Completed", insightBody: "NOC, Support, and Billing AI collaborated to restore a service, apply the SLA credit, and notify affected subscribers in one workflow.", insightStatus: "Completed · Policy verified",
    metrics: [
      { label: "Active AI Agents", value: "8", change: "All systems operational", icon: Bot }, { label: "Tasks Today", value: "18,420", change: "+22% automation rate", icon: Sparkles },
      { label: "Auto Resolution", value: "82.6%", change: "+7.4% this month", icon: CheckCircle2 }, { label: "Human Escalations", value: "214", change: "1.2% of total tasks", icon: Users },
      { label: "Time Recovered", value: "3,840h", change: "Across 6 departments", icon: Activity }, { label: "Policy Compliance", value: "100%", change: "Zero unauthorized actions", icon: ShieldCheck },
    ],
  },
  hardware: {
    label: "Device Automation", icon: Cpu, health: "Device Fleet", healthState: "Compliant", healthDetail: "10,842 devices aligned with approved configuration baselines.",
    chartTitle: "Configuration Execution Rate", chartDetail: "NETCONF, RESTCONF, gNMI, and CLI transactions", chartValue: "2,840/hr", insightLabel: "Automation AI", insightTitle: "Configuration Drift Remediated", insightBody: "Automation AI detected an unauthorized QoS deviation on 24 edge routers and restored the approved baseline with validation.", insightStatus: "Remediated · Rollback armed",
    metrics: [
      { label: "Managed Devices", value: "10,842", change: "24 vendor families", icon: Cpu }, { label: "Config Compliance", value: "99.96%", change: "+0.8% this week", icon: ShieldCheck },
      { label: "Changes Today", value: "6,284", change: "100% audit logged", icon: Activity }, { label: "Automation Success", value: "99.91%", change: "5 safe rollbacks", icon: CheckCircle2 },
      { label: "Templates", value: "1,420", change: "86 updated this month", icon: Boxes }, { label: "Drift Events", value: "24", change: "All auto-remediated", icon: Ticket },
    ],
  },
};

export const DashboardMockup: React.FC = () => {
  const [activeId, setActiveId] = useState("noc");
  const view = VIEWS[activeId];
  const ViewIcon = view.icon;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative w-full overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] font-inter text-[var(--text-primary)] shadow-[0_28px_70px_-30px_rgba(43,13,58,0.32)]">
      {/* Browser Window Chrome Header with Address Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-default)] bg-[var(--surface-2)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-xs" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-xs" />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[var(--text-secondary)] opacity-60">
            <ChevronLeft className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Centralized Address Bar */}
        <div className="flex max-w-md flex-1 items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--surface-1)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)] shadow-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">https://</span>
            <span className="truncate text-[var(--text-primary)] font-medium">kashtrix.com/products/oss-bss</span>
          </div>
          <RefreshCw className="h-3 w-3 opacity-40 shrink-0 ml-2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-purple)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-link)] md:inline-flex">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E11D72]" />
            AI Autonomous Mode: Active
          </span>
        </div>
      </div>

      <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-12">
        <aside className="hidden flex-col justify-between border-r border-[var(--border-default)] bg-[var(--surface-2)]/60 p-4 md:col-span-3 md:flex">
          <div className="space-y-1">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Operations Center</p>
            {Object.entries(VIEWS).map(([id, item]) => { const ItemIcon = item.icon; const active = id === activeId; return (
              <button key={id} onClick={() => setActiveId(id)} aria-pressed={active} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 font-inter text-xs font-medium transition-colors", active ? "bg-[#2B0D3A] text-white shadow-sm dark:bg-[var(--surface-purple)]" : "text-[var(--text-primary)] hover:bg-[var(--surface-purple)]")}>
                <span className="flex items-center gap-2.5"><ItemIcon className={cn("h-4 w-4", active ? "text-[#FCE7F3]" : item.accent ? "text-[var(--text-accent)]" : "text-[var(--text-link)]")} />{item.label}</span>
                {item.accent && !active && <i className="h-1.5 w-1.5 rounded-full bg-[#E11D72]" />}
              </button> ); })}
          </div>
          <div className="space-y-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-3 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]"><span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[var(--text-link)]" />{view.health}</span><span className="rounded bg-[var(--surface-purple)] px-1.5 py-0.5 text-[10px] text-[var(--text-link)]">{view.healthState}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]"><div className="h-full w-[98%] bg-gradient-to-r from-[#2B0D3A] to-[#4A1B7A]" /></div>
            <p className="text-[10px] leading-relaxed text-[var(--text-secondary)]">{view.healthDetail}</p>
          </div>
        </aside>

        <main className="col-span-1 flex flex-col justify-between space-y-5 p-5 md:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div key={activeId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="space-y-5">
              <div className="flex items-center gap-2"><ViewIcon className="h-4 w-4 text-[var(--text-link)]" /><div className="font-inter text-sm font-semibold text-[var(--text-primary)]">{view.label}</div></div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {view.metrics.map((metric) => { const MetricIcon = metric.icon; return (
                  <div key={metric.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-3.5 transition-all hover:-translate-y-0.5 hover:border-[var(--border-brand)] hover:shadow-md">
                    <div className="mb-2 flex items-center justify-between"><span className="font-inter text-xs font-medium text-[var(--text-secondary)]">{metric.label}</span><span className="rounded-lg bg-[var(--surface-purple)] p-1.5"><MetricIcon className="h-4 w-4 text-[var(--text-link)]" /></span></div>
                    <div className="type-kpi text-[clamp(1.2rem,2vw,1.7rem)] leading-none tracking-[-0.04em] text-[var(--text-primary)]">{metric.value}</div>
                    <div className="mt-1 flex items-center gap-1 font-inter text-[11px] font-medium text-[var(--text-link)]"><TrendingUp className="h-3 w-3" />{metric.change}</div>
                  </div> ); })}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="flex flex-col justify-between rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)]/40 p-4 lg:col-span-7">
                  <div className="mb-4 flex items-start justify-between gap-3"><div><div className="font-inter text-xs font-semibold text-[var(--text-primary)]">{view.chartTitle}</div><p className="font-inter text-[11px] text-[var(--text-secondary)]">{view.chartDetail}</p></div><span className="type-kpi shrink-0 text-xl tracking-[-0.04em] text-[var(--text-primary)]">{view.chartValue}</span></div>
                  <div className="h-28"><svg viewBox="0 0 400 110" className="h-full w-full"><defs><linearGradient id={`chart-${activeId}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A1B7A" stopOpacity=".24" /><stop offset="100%" stopColor="#4A1B7A" stopOpacity="0" /></linearGradient></defs><path d="M0 87 Q40 68 80 77 T160 48 T240 58 T320 20 T400 42 L400 110 L0 110Z" fill={`url(#chart-${activeId})`} /><path d="M0 87 Q40 68 80 77 T160 48 T240 58 T320 20 T400 42" fill="none" stroke="#2B0D3A" strokeWidth="2.5" strokeLinecap="round" /><circle cx="320" cy="20" r="4.5" fill="#E11D72" /></svg></div>
                  <div className="flex items-center justify-between border-t border-[var(--border-default)] pt-2 font-inter text-[10px] text-[var(--text-secondary)]"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><strong className="font-semibold text-[var(--text-accent)]">Now</strong></div>
                </div>
                <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#2B0D3A] to-[#4A1B7A] p-4 text-white shadow-lg lg:col-span-5">
                  <div><span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wider text-[#FCE7F3]"><Sparkles className="h-3 w-3 text-[var(--text-accent)]" />{view.insightLabel}</span><div className="mb-1 font-inter text-sm font-semibold">{view.insightTitle}</div><p className="mb-4 font-inter text-xs leading-relaxed text-[#E8DFF0]">{view.insightBody}</p></div>
                  <div className="flex items-center justify-between border-t border-white/15 pt-3 font-inter text-[11px]"><span className="text-[#FCE7F3]/80">{view.insightStatus}</span><button className="flex items-center gap-1 font-semibold hover:underline">View Log <ArrowUpRight className="h-3.5 w-3.5" /></button></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};
