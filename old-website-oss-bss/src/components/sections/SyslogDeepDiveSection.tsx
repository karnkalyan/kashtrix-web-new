"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Server,
  ShieldCheck,
  Search,
  Database,
  Lock,
  Cpu,
  Terminal,
  Zap,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";

export const SyslogDeepDiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cgnat" | "subpoena" | "tiering" | "forwarders">("cgnat");
  const [selectedVendor, setSelectedVendor] = useState<"mikrotik" | "cisco" | "nokia" | "huawei">("mikrotik");

  const forwarderConfigs = {
    mikrotik: `/system logging action add name=kashtrix-syslog target=remote remote=10.0.100.50 remote-port=514 src-address=10.0.0.1 transition-mode=udp
/system logging add action=kashtrix-syslog topics=firewall,info,account`,
    cisco: `logging host 10.0.100.50 transport udp port 514
logging facility local0
logging source-interface Loopback0
cgnat log session-creation-deletion enable`,
    nokia: `configure log sys-log-server 10.0.100.50 address 10.0.100.50 port 514 facility local0 create
configure log event-trigger cgnat-mapping enable`,
    huawei: `info-center loghost 10.0.100.50 port 514 facility local0
nat log session enable`,
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[var(--surface-1)] via-purple-950/20 to-[var(--surface-1)] text-[var(--text-primary)] border-t border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        
        {/* Deep Dive Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
            Carrier-Grade ISP Syslog Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-sora tracking-tight leading-tight text-slate-900 dark:text-white">
            Comprehensive CGNAT &amp; Legal <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Syslog Audit Architecture
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
            Designed specifically for tier-1 telecom operators and ISPs to ingest 100,000+ events per second (EPS), correlate CGNAT NAT444 subscriber sessions, enforce DoT / TRAI legal compliance, and provide sub-second law enforcement subpoena lookups.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#130822] border border-purple-200 dark:border-purple-500/20 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("cgnat")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-sora text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === "cgnat"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>CGNAT NAT444 Audit</span>
          </button>

          <button
            onClick={() => setActiveTab("subpoena")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-sora text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === "subpoena"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Subpoena IP Search</span>
          </button>

          <button
            onClick={() => setActiveTab("tiering")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-sora text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === "tiering"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Hot/Cold Storage Tiering</span>
          </button>

          <button
            onClick={() => setActiveTab("forwarders")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-sora text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === "forwarders"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Vendor Forwarder Setup</span>
          </button>
        </div>

        {/* Tab Content 1: CGNAT NAT444 Audit */}
        {activeTab === "cgnat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Deterministic NAT &amp; Dynamic Pools</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-sora text-slate-900 dark:text-white">
                  Deterministic Port Allocation &amp; High-Velocity Ingestion
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Kashtrix Syslog Server ingests UDP/TCP log streams from CGNAT routers (Cisco ASR9k, MikroTik CCR, Huawei NE40E) and stores subscriber public IP, source port range, timestamp, and destination mapping.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tamper-Proof HMAC Cryptographic Seals</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Every ingested log chunk is signed with SHA-256 HMAC checksums to guarantee legal admissibility in court.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Message Loss Architecture</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Buffered Ring Architecture handles network traffic bursts up to 250,000 EPS without dropping packets.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-500/30 shadow-2xl group bg-slate-950">
              <Image
                src="/assets/6ebf0249-bd4e-4c78-a3d1-b76566e7134c.png"
                alt="Kashtrix CGNAT Syslog Ingestion Control Screen"
                width={800}
                height={500}
                className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {/* Tab Content 2: Subpoena Search Engine */}
        {activeTab === "subpoena" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-500/30 shadow-2xl group order-2 lg:order-1 bg-slate-950">
              <Image
                src="/assets/7462371b-8c50-433b-8eff-de70b01e3479.png"
                alt="Kashtrix Law Enforcement Subpoena IP Audit Search Screen"
                width={800}
                height={500}
                className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-300"
              />
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Subsecond Subpoena Response</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-sora text-slate-900 dark:text-white">
                  Instantaneous Law Enforcement IP-to-Subscriber Lookup
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Enter any public IP address, target port number, and timestamp to instantly retrieve the exact subscriber account, PPPoE credentials, home address, and active ONT serial number.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-purple-200 font-mono text-xs space-y-2 border border-slate-800">
                <div className="flex justify-between text-slate-400 text-[10px] uppercase border-b border-slate-800 pb-2">
                  <span>Audit Query</span>
                  <span>Execution Time: 0.04s</span>
                </div>
                <p className="text-emerald-400">IP: 103.21.4.12:4012 @ 2026-07-31 02:48:12</p>
                <p className="text-purple-300">Subscriber: ACCT-9012 (Karn Kalyan) · MAC: 00:0C:29:4F:91:02</p>
                <p className="text-amber-300">Physical Address: Sector 4, Fiber Node 12, Port 4</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Hot/Cold Storage Tiering */}
        {activeTab === "tiering" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Cost-Effective Compliance Storage</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-sora text-slate-900 dark:text-white">
                  Automated Hot, Warm &amp; Cold Log Archiving
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Store active logs on high-speed NVMe storage for sub-second search, automatically compress and move 30-day logs to S3/Ceph storage, and archive 1-year+ compliance vaults to AWS Glacier.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-center">
                  <span className="text-lg font-bold text-purple-700 dark:text-purple-300 font-sora block">Hot Tier</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Local NVMe (0-30 Days)</span>
                </div>

                <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-500/20 text-center">
                  <span className="text-lg font-bold text-pink-700 dark:text-pink-300 font-sora block">Warm Tier</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">MinIO / S3 (30-180 Days)</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/20 text-center">
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-300 font-sora block">Cold Tier</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Glacier (1-5 Years)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-500/30 shadow-2xl group bg-slate-950">
              <Image
                src="/assets/859d1238-8d99-4b82-b965-1b0abf16cfd7.png"
                alt="Kashtrix Hot Cold Storage Tiering Management Interface"
                width={800}
                height={500}
                className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {/* Tab Content 4: Vendor Forwarder Setup */}
        {activeTab === "forwarders" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-500/20 pb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-sora text-slate-900 dark:text-white">Multi-Vendor Forwarder Setup Configuration</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Copy and paste CLI forwarder commands for your core router platform.</p>
              </div>

              <div className="flex items-center gap-2">
                {(["mikrotik", "cisco", "nokia", "huawei"] as const).map((vendor) => (
                  <button
                    key={vendor}
                    onClick={() => setSelectedVendor(vendor)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                      selectedVendor === vendor
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-purple-100"
                    }`}
                  >
                    {vendor}
                  </button>
                ))}
              </div>
            </div>

            <pre className="p-4 sm:p-6 rounded-2xl bg-slate-900 text-purple-200 font-mono text-xs sm:text-sm whitespace-pre-wrap break-words no-scrollbar border border-slate-800 shadow-xl">
              <code>{forwarderConfigs[selectedVendor]}</code>
            </pre>
          </div>
        )}

        {/* High-Resolution Screenshot Gallery */}
        <div className="space-y-8 pt-8 border-t border-purple-100 dark:border-purple-500/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold font-sora text-slate-900 dark:text-white">Live Application Console Showcase</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">High-definition interactive console screens for NOC monitoring, syslog audit, and device telemetry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl overflow-hidden border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all group">
              <Image
                src="/assets/b4b4f136-67f0-4120-b250-0370f1263691.png"
                alt="Kashtrix Live Log Ingestion Console"
                width={400}
                height={260}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase font-mono">Real-Time Ingestion</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Syslog Stream Ingestion</h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all group">
              <Image
                src="/assets/d89b78ec-1e5c-40b6-9a68-02575eea5f48.png"
                alt="Kashtrix Legal Compliance Audit Search"
                width={400}
                height={260}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400 uppercase font-mono">Legal Compliance</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Subpoena Search Console</h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all group">
              <Image
                src="/assets/e0aa4b02-eb96-417c-8415-0a0baaab4c87.png"
                alt="Kashtrix Storage Tiering Archiving"
                width={400}
                height={260}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase font-mono">S3 / Glacier Tiering</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hot Cold Storage Vault</h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all group">
              <Image
                src="/assets/f2fe4f31-8e23-4a09-ac1d-87594885a9c7.png"
                alt="Kashtrix Alarm Correlation & Alerts"
                width={400}
                height={260}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">Alarm Engine</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Fault Correlation Matrix</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
