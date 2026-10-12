"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Mail,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  Clock,
  RefreshCw,
  Eye,
  Server,
  Layers,
  Database,
  CheckCircle2,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  product: string;
  message: string;
  status: string;
  notifiedAdmin: boolean;
  autoReplied: boolean;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  inReview: number;
  contacted: number;
  resolved: number;
}

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, inReview: 0, contacted: 0, resolved: 0 });
  const [knowledgeCount, setKnowledgeCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [resInq, resK] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/knowledge"),
      ]);
      const dataInq = await resInq.json();
      const dataK = await resK.json();

      if (dataInq.ok) {
        setInquiries(dataInq.inquiries.slice(0, 5));
        setStats(dataInq.stats);
      }
      if (dataK.ok) {
        setKnowledgeCount(dataK.items?.length || 0);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title & Refresh */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Admin Overview
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Summary of contact inquiries, mail delivery configuration, and AI knowledge.
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#716876]">Total Inquiries</span>
            <div className="rounded-[4px] bg-[#f5eff8] p-1.5 text-[#4b1b63]">
              <Inbox className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#171219]">{stats.total}</span>
            <span className="text-xs text-emerald-600">Saved</span>
          </div>
        </div>

        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#716876]">New Leads</span>
            <div className="rounded-[4px] bg-purple-50 p-1.5 text-[#4b1b63]">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#4b1b63]">{stats.new}</span>
            <span className="text-xs text-[#716876]">Awaiting action</span>
          </div>
        </div>

        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#716876]">SMTP Relay</span>
            <div className="rounded-[4px] bg-emerald-50 p-1.5 text-emerald-600">
              <Mail className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-emerald-700">Port 465 (SSL)</span>
          </div>
          <p className="mt-1 text-[10px] text-[#716876]">s11638.sgp1.stableserver.net</p>
        </div>

        <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#716876]">Knowledge Items</span>
            <div className="rounded-[4px] bg-[#f5eff8] p-1.5 text-[#4b1b63]">
              <BrainCircuit className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#171219]">{knowledgeCount}</span>
            <span className="text-xs text-[#716876]">Trained topics</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/email"
          className="group rounded-[5px] border border-[#e8e2e9] bg-white p-4 hover:border-[#4b1b63] hover:shadow-[0_4px_12px_rgba(75,27,99,0.06)] transition"
        >
          <div className="flex items-center gap-2.5 font-semibold text-xs text-[#171219]">
            <div className="rounded-[4px] bg-[#f5eff8] p-1.5 text-[#4b1b63] group-hover:bg-[#4b1b63] group-hover:text-white transition">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span>Configure Email & SMTP</span>
          </div>
          <p className="mt-2 text-xs text-[#716876] leading-relaxed">
            Update SMTP server parameters, test mail dispatch to support@kashtrix.com, and customize auto-reply triggers.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4b1b63]">
            <span>Manage SMTP</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>

        <Link
          href="/admin/knowledge"
          className="group rounded-[5px] border border-[#e8e2e9] bg-white p-4 hover:border-[#4b1b63] hover:shadow-[0_4px_12px_rgba(75,27,99,0.06)] transition"
        >
          <div className="flex items-center gap-2.5 font-semibold text-xs text-[#171219]">
            <div className="rounded-[4px] bg-[#f5eff8] p-1.5 text-[#4b1b63] group-hover:bg-[#4b1b63] group-hover:text-white transition">
              <BrainCircuit className="h-3.5 w-3.5" />
            </div>
            <span>Manage AI Knowledge Base</span>
          </div>
          <p className="mt-2 text-xs text-[#716876] leading-relaxed">
            Add or edit technical knowledge articles so the assistant answers customer questions accurately.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4b1b63]">
            <span>Edit Knowledge</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>

        <Link
          href="/admin/theme"
          className="group rounded-[5px] border border-[#e8e2e9] bg-white p-4 hover:border-[#4b1b63] hover:shadow-[0_4px_12px_rgba(75,27,99,0.06)] transition"
        >
          <div className="flex items-center gap-2.5 font-semibold text-xs text-[#171219]">
            <div className="rounded-[4px] bg-[#f5eff8] p-1.5 text-[#4b1b63] group-hover:bg-[#4b1b63] group-hover:text-white transition">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span>Theme & Branding Controls</span>
          </div>
          <p className="mt-2 text-xs text-[#716876] leading-relaxed">
            Customize deep purple primary tones, hero headline gradient colors, and portal branding defaults.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4b1b63]">
            <span>Customize Theme</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </Link>
      </div>

      {/* Recent Contact Inquiries Table */}
      <div className="rounded-[5px] border border-[#e8e2e9] bg-white overflow-hidden shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
        <div className="flex items-center justify-between border-b border-[#e8e2e9] p-4 bg-white">
          <div>
            <h2 className="text-sm font-bold text-[#171219]">Recent Inquiries</h2>
            <p className="text-[11px] text-[#716876]">Submissions from website contact and live demo forms</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-xs font-semibold text-[#4b1b63] hover:underline"
          >
            <span>View All ({stats.total})</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="flex h-36 items-center justify-center text-xs text-[#716876]">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#716876]">
            No inquiries recorded yet. Forms submitted on the website will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#e8e2e9] bg-[#f8f5f9] text-[11px] font-semibold text-[#716876]">
                <tr>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Company</th>
                  <th className="py-2.5 px-4">Solution Evaluating</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebf2] text-xs">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#faf8fb] transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#171219]">{inq.name}</div>
                      <div className="text-[11px] text-[#716876]">{inq.email}</div>
                    </td>
                    <td className="py-3 px-4 text-[#352c3b] font-medium">{inq.company}</td>
                    <td className="py-3 px-4">
                      <span className="rounded-[4px] bg-[#f5eff8] px-2 py-0.5 text-[11px] font-medium text-[#4b1b63] border border-[#e8dcef]">
                        {inq.product}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`rounded-[4px] px-2 py-0.5 text-[10px] font-semibold ${
                          inq.status === "NEW"
                            ? "bg-purple-100 text-[#4b1b63]"
                            : inq.status === "CONTACTED"
                            ? "bg-emerald-100 text-emerald-800"
                            : inq.status === "IN_REVIEW"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "RESOLVED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {inq.status === "NEW"
                          ? "New"
                          : inq.status === "IN_REVIEW"
                          ? "In Review"
                          : inq.status === "CONTACTED"
                          ? "Contacted"
                          : inq.status === "RESOLVED"
                          ? "Resolved"
                          : inq.status === "ARCHIVED"
                          ? "Archived"
                          : inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#716876]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/inquiries?id=${inq.id}`}
                        className="button-secondary-sm !min-h-0 !py-0.5 !px-2 !text-xs font-semibold"
                      >
                        <Eye className="h-3 w-3 text-[#4b1b63]" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
