"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  ShieldCheck,
  Search,
  AlertTriangle,
  Activity,
  Server,
  Lock,
  Download,
} from "lucide-react";
import { RADIUSPacketFlowAnimation } from "@/components/visual/RADIUSPacketFlowAnimation";

interface SyslogEntry {
  id: string;
  timestamp: string;
  severity: "EMERGENCY" | "CRITICAL" | "WARNING" | "INFO" | "CGNAT";
  source: string;
  facility: string;
  message: string;
}

const MOCK_SYSLOG_LOGS: SyslogEntry[] = [
  {
    id: "log-101",
    timestamp: "2026-07-31 02:48:12.102",
    severity: "CGNAT",
    source: "ASR9k-CGNAT-01",
    facility: "NAT444",
    message: "BIND PUBLIC 103.21.4.12:4012 -> PRIVATE 10.40.12.8:5020 PROTO=TCP SUB=KARNKALYAN_091",
  },
  {
    id: "log-102",
    timestamp: "2026-07-31 02:48:12.440",
    severity: "INFO",
    source: "Radius-Core-01",
    facility: "RADIUS_AAA",
    message: "Access-Accept username=karnkalyan_fiber nas_ip=10.3.2.140 reply=100Mbps_Profile Framed-IP=10.40.12.8",
  },
  {
    id: "log-103",
    timestamp: "2026-07-31 02:48:13.018",
    severity: "WARNING",
    source: "OLT-GPON-04",
    facility: "PON_OPTICAL",
    message: "ALARM PON 1/12: Optical attenuation reached -27.4 dBm on ONU DF5F-2510002575. Threshold is -27.0 dBm.",
  },
  {
    id: "log-104",
    timestamp: "2026-07-31 02:48:13.882",
    severity: "CRITICAL",
    source: "MikroTik-CCR2216",
    facility: "INTERFACE",
    message: "ether1-peering link DOWN. Primary BGP session to AS13335 (Cloudflare) changed state to Established -> Idle.",
  },
  {
    id: "log-105",
    timestamp: "2026-07-31 02:48:14.210",
    severity: "CGNAT",
    source: "ASR9k-CGNAT-01",
    facility: "NAT444",
    message: "UNBIND PUBLIC 103.21.4.12:4012 -> PRIVATE 10.40.12.8:5020 DURATION=1420s BYTES_TX=14.8MB",
  },
  {
    id: "log-106",
    timestamp: "2026-07-31 02:48:15.004",
    severity: "INFO",
    source: "TR069-ACS-02",
    facility: "CWMP",
    message: "Inform 2 PERIODIC from CPE HW_DF5F_9012. Parameters updated: InternetGatewayDevice.WANDevice.1.WANDSLInterfaceConfig",
  },
  {
    id: "log-107",
    timestamp: "2026-07-31 02:48:15.420",
    severity: "WARNING",
    source: "BNG-Core-02",
    facility: "PPPOE",
    message: "PADT received for session ID 14209 (user=ram_broadband). Session terminated cleanly. IP returned to pool.",
  },
];

export const ISPSyslogSection: React.FC = () => {
  const [activeSeverity, setActiveSeverity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [logs, setLogs] = useState<SyslogEntry[]>(MOCK_SYSLOG_LOGS);

  // Live incoming syslog simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: SyslogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 23),
        severity: Math.random() > 0.6 ? "CGNAT" : Math.random() > 0.7 ? "WARNING" : "INFO",
        source: Math.random() > 0.5 ? "ASR9k-CGNAT-01" : "Radius-Core-01",
        facility: "NAT_STREAM",
        message: `BIND PUBLIC 103.21.${Math.floor(Math.random() * 20)}.${Math.floor(Math.random() * 250)}:${Math.floor(Math.random() * 8000 + 1024)} -> PRIVATE 10.40.${Math.floor(Math.random() * 50)}.${Math.floor(Math.random() * 250)} PROTO=TCP`,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 14)]);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSeverity = activeSeverity === "ALL" || log.severity === activeSeverity;
    const matchesSearch =
      searchQuery === "" ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <section id="syslog-compliance" className="w-full border-t border-[var(--border-default)] bg-[var(--surface-1)] dark:bg-slate-950 py-20 text-[var(--text-primary)] dark:text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Kashtrix Syslog &amp; CGNAT Archiving
          </span>
          <h2 className="mt-4 font-sora text-3xl font-bold tracking-tight text-[var(--text-primary)] dark:text-white sm:text-4xl md:text-5xl">
            Kashtrix Syslog — Carrier-Grade Log Management &amp; CGNAT Compliance.
          </h2>
          <p className="mt-4 font-inter text-sm leading-7 text-[var(--text-secondary)] dark:text-slate-300 md:text-base">
            Ingest over 100,000 syslog messages per second from MikroTik, Cisco, OLTs, and BNGs. Store tamper-proof CGNAT public-to-private IP mappings for mandatory law enforcement audit compliance.
          </p>
        </div>

        {/* Embedded Interactive Packet Flow Animation */}
        <div className="mb-16">
          <RADIUSPacketFlowAnimation />
        </div>

        {/* Kashtrix Syslog — Complete Feature Map */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Kashtrix Syslog for ISP · Full Feature Map
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Overview", icon: Activity, color: "#06B6D4", group: "core" },
              { name: "Live Logs", icon: Terminal, color: "#10B981", group: "core" },
              { name: "Subscribers", icon: Server, color: "#8B5CF6", group: "core" },
              { name: "Devices", icon: Server, color: "#2563EB", group: "core" },
              { name: "Log Sources", icon: Activity, color: "#F59E0B", group: "core" },
              { name: "Alerts", icon: AlertTriangle, color: "#EF4444", group: "monitoring" },
              { name: "Incidents", icon: ShieldCheck, color: "#E11D72", group: "monitoring" },
              { name: "Saved Searches", icon: Search, color: "#06B6D4", group: "analysis" },
              { name: "Parsing Rules", icon: Terminal, color: "#8B5CF6", group: "analysis" },
              { name: "Correlation Rules", icon: Activity, color: "#10B981", group: "analysis" },
              { name: "Dashboards", icon: Activity, color: "#2563EB", group: "reporting" },
              { name: "Reports", icon: Download, color: "#F59E0B", group: "reporting" },
              { name: "RADIUS", icon: Lock, color: "#4A1B7A", group: "network" },
              { name: "CGNAT Search", icon: Search, color: "#E11D72", group: "network" },
              { name: "IP History", icon: Server, color: "#06B6D4", group: "network" },
              { name: "DNS Analytics", icon: Activity, color: "#10B981", group: "network" },
              { name: "Traffic Flows", icon: Activity, color: "#2563EB", group: "network" },
              { name: "Retention", icon: Lock, color: "#8B5CF6", group: "storage" },
              { name: "Storage", icon: Server, color: "#F59E0B", group: "storage" },
              { name: "Integrations", icon: Activity, color: "#06B6D4", group: "system" },
              { name: "Audit Logs", icon: ShieldCheck, color: "#10B981", group: "system" },
              { name: "Server Settings", icon: Server, color: "#4A1B7A", group: "system" },
              { name: "Collector", icon: Terminal, color: "#E11D72", group: "system" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-500/40"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}18`, color: feature.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-inter text-[11px] font-semibold text-[var(--text-primary)] dark:text-white text-center leading-tight">
                    {feature.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Highlight Cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "100K+ Msgs/Sec Collector",
              desc: "High-performance UDP/TCP Port 514 and TLS 6514 syslog daemon with zero-packet loss buffer queues.",
              icon: Activity,
              badge: "High Throughput",
            },
            {
              title: "CGNAT Law Audit Log",
              desc: "Links NAT public IP + port ranges to private subscriber accounts with encrypted 1-year compliant archiving.",
              icon: Lock,
              badge: "Legal Compliance",
            },
            {
              title: "Multi-Vendor Parsing",
              desc: "Pre-built regex syslog parsers for MikroTik RouterOS, Cisco IOS-XR, Huawei VRP, Nokia SR-OS, and OLTs.",
              icon: Server,
              badge: "Vendor Agnostic",
            },
            {
              title: "Automated Alarm Trigger",
              desc: "Transforms syslog fiber attenuation and BGP flaps into actionable tickets and field tasks.",
              icon: AlertTriangle,
              badge: "Auto Remediate",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900/80 p-6 shadow-sm dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-[var(--surface-1)] dark:bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--text-secondary)] dark:text-slate-400 border border-[var(--border-default)] dark:border-white/5">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-sora text-base font-bold text-[var(--text-primary)] dark:text-white">{item.title}</h3>
                <p className="mt-2 font-inter text-xs leading-relaxed text-[var(--text-secondary)] dark:text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Live Syslog Interactive Console Terminal */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] dark:border-white/15 bg-[var(--surface-2)] dark:bg-slate-900 shadow-xl dark:shadow-2xl">
          
          {/* Terminal Top Bar */}
          <div className="flex flex-col gap-4 border-b border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-slate-950 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <Terminal className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] dark:text-white">Live ISP Syslog Stream Console</h3>
                <p className="font-mono text-[11px] text-[var(--text-secondary)] dark:text-slate-400">Port 514 UDP/TCP · Active Stream (100K msgs/sec)</p>
              </div>
            </div>

            {/* Severity Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-tertiary)] dark:text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter logs or IP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-2)] dark:bg-slate-900 py-1.5 pl-8 pr-3 font-mono text-xs text-[var(--text-primary)] dark:text-white placeholder-[var(--text-tertiary)] dark:placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center rounded-lg border border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-slate-950 p-1">
                {["ALL", "CGNAT", "CRITICAL", "WARNING", "INFO"].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setActiveSeverity(sev)}
                    className={`rounded px-2 py-1 font-mono text-[10px] font-bold transition ${
                      activeSeverity === sev
                        ? "bg-purple-600 text-white shadow"
                        : "text-[var(--text-secondary)] dark:text-slate-400 hover:text-[var(--text-primary)] dark:hover:text-white"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="max-h-[380px] min-h-[260px] overflow-y-auto bg-[var(--surface-3)] dark:bg-slate-950 p-4 font-mono text-xs leading-relaxed text-[var(--text-primary)] dark:text-slate-300 space-y-2 no-scrollbar">
            {filteredLogs.map((log) => {
              const isCGNAT = log.severity === "CGNAT";
              const isCrit = log.severity === "CRITICAL";
              const isWarn = log.severity === "WARNING";

              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 rounded-lg border border-[var(--border-default)] dark:border-white/5 bg-[var(--surface-1)] dark:bg-slate-900/40 p-2.5 hover:bg-[var(--surface-2)] dark:hover:bg-slate-900/80 transition"
                >
                  <span className="text-[var(--text-tertiary)] dark:text-slate-500 shrink-0 text-[11px]">{log.timestamp}</span>
                  
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      isCGNAT
                        ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                        : isCrit
                        ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        : isWarn
                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {log.severity}
                  </span>

                  <span className="text-[var(--text-secondary)] dark:text-slate-400 font-semibold shrink-0">[{log.source}]</span>
                  <span className="text-[var(--text-primary)] dark:text-slate-200 min-w-0 break-all">{log.message}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between border-t border-[var(--border-default)] dark:border-white/10 bg-[var(--surface-1)] dark:bg-slate-950 px-4 py-2.5 font-mono text-xs text-[var(--text-secondary)] dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing {filteredLogs.length} syslog entries · Tamper-Proof Encrypted Storage
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold"
            >
              <Download className="h-3.5 w-3.5" /> Export Law Compliance Archive (.csv)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
