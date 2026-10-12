"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import {
  Search,
  RefreshCw,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  FileSpreadsheet,
  ExternalLink,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Building,
  Calendar,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
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
  mode: string;
  autoReplied: boolean;
  notifiedAdmin: boolean;
  isRead: boolean;
  createdAt: string;
}

const statusOptions = ["NEW", "IN_REVIEW", "CONTACTED", "RESOLVED", "ARCHIVED"];

const statusFilterList = [
  { value: "ALL", label: "All Statuses" },
  { value: "NEW", label: "New" },
  { value: "IN_REVIEW", label: "In Review" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "ARCHIVED", label: "Archived" },
];

export default function InquiriesAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-[#716876]">Loading inquiries...</div>}>
      <InquiriesAdminContent />
    </Suspense>
  );
}

function InquiriesAdminContent() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [readFilter, setReadFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.ok) {
        setInquiries(data.inquiries);

        // Check if query param specifies an ID (e.g. /admin/inquiries?id=5)
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const targetId = params.get("id");
          if (targetId) {
            const found = data.inquiries.find((i: Inquiry) => i.id === Number(targetId));
            if (found) {
              handleOpenInquiry(found);
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleOpenInquiry(item: Inquiry) {
    const updated = { ...item, isRead: true };
    setSelectedInquiry(updated);

    if (!item.isRead) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isRead: true } : i))
      );
      try {
        await fetch("/api/admin/inquiries", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, isRead: true }),
        });
      } catch {
        // ignore
      }
    }

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("id", String(item.id));
      window.history.replaceState({}, "", url.toString());
    }
  }

  function handleBackToList() {
    setSelectedInquiry(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      window.history.replaceState({}, "", url.toString());
    }
  }

  async function toggleReadStatus(item: Inquiry, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    const nextRead = !item.isRead;

    setInquiries((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, isRead: nextRead } : i))
    );
    if (selectedInquiry && selectedInquiry.id === item.id) {
      setSelectedInquiry({ ...selectedInquiry, isRead: nextRead });
    }

    try {
      await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isRead: nextRead }),
      });
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function updateStatus(id: number, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteInquiry(id: number, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) handleBackToList();
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  }

  const filtered = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      const matchesRead =
        readFilter === "ALL" ||
        (readFilter === "UNREAD" && !item.isRead) ||
        (readFilter === "READ" && Boolean(item.isRead));

      const s = search.toLowerCase();
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(s) ||
        item.company.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.product.toLowerCase().includes(s) ||
        item.message.toLowerCase().includes(s);

      return matchesStatus && matchesRead && matchesSearch;
    });
  }, [inquiries, search, statusFilter, readFilter]);

  function exportCSV() {
    const headers = ["ID", "Name", "Company", "Email", "Phone", "Product", "Message", "Status", "Read", "Date"];
    const rows = filtered.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.company.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ""}"`,
      `"${i.product}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      i.status,
      i.isRead ? "READ" : "UNREAD",
      new Date(i.createdAt).toISOString(),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kashtrix_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((i) => !i.isRead).length;
  const readCount = inquiries.filter((i) => i.isRead).length;

  /* =========================================================================
     PAGE VIEW: DETAILED INQUIRY PAGE (NO MODAL / NO POPUP)
     ========================================================================= */
  if (selectedInquiry) {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        {/* Navigation / Header Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#e8e2e9] pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs font-semibold text-[#171219] hover:bg-[#f6f2f8] transition shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Inquiries</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4b1b63]">
                  Inquiry #{selectedInquiry.id}
                </span>
                <span className="rounded-[4px] bg-[#f5eff8] border border-[#e8dcef] px-2 py-0.2 text-[10px] font-semibold text-[#4b1b63] uppercase">
                  {selectedInquiry.mode}
                </span>
                {selectedInquiry.isRead ? (
                  <span className="rounded-[4px] bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-600">
                    Read
                  </span>
                ) : (
                  <span className="rounded-[4px] bg-[#ec1778] px-1.5 py-0.2 text-[10px] font-bold text-white uppercase">
                    Unread
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#171219] mt-0.5">
                {selectedInquiry.name} · {selectedInquiry.company}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleReadStatus(selectedInquiry)}
              className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
            >
              {selectedInquiry.isRead ? (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-[#716876]" />
                  <span>Mark as Unread</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 text-[#4b1b63]" />
                  <span>Mark as Read</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${selectedInquiry.email}?subject=Kashtrix Broadcast Systems — Discussion on ${encodeURIComponent(
                selectedInquiry.product
              )}`}
              className="button-primary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Reply to Customer</span>
            </a>

            <button
              onClick={() => deleteInquiry(selectedInquiry.id)}
              className="rounded-[5px] border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
              title="Delete Submission"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Detail Content Grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main 2-Col: Scope & Message Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Customer Requirements & Message Card */}
            <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-3">
              <div className="flex items-center justify-between border-b border-[#f0ebf2] pb-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#4b1b63]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#171219]">
                    Project Scope & Customer Requirements
                  </h3>
                </div>
                <span className="text-[11px] text-[#716876]">
                  Product: <strong className="text-[#4b1b63]">{selectedInquiry.product}</strong>
                </span>
              </div>

              <div className="rounded-[4px] border border-[#f0ebf2] bg-[#faf8fb] p-4 text-[#241c2b] leading-relaxed whitespace-pre-wrap text-xs">
                {selectedInquiry.message || "No detailed notes provided in submission."}
              </div>
            </div>

            {/* Email Dispatch & Notification Card */}
            <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-3">
              <div className="flex items-center gap-2 border-b border-[#f0ebf2] pb-2.5">
                <ShieldCheck className="h-4 w-4 text-[#4b1b63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171219]">
                  Automated Delivery Status
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="flex items-center justify-between rounded-[4px] border border-[#f0ebf2] bg-[#faf8fb] p-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#716876] block">Admin Alert Delivery</span>
                    <span className="text-[#171219] font-medium mt-0.5 block">
                      {selectedInquiry.notifiedAdmin ? "Dispatched to support@kashtrix.com" : "Pending in dispatch queue"}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`h-5 w-5 ${selectedInquiry.notifiedAdmin ? "text-emerald-600" : "text-amber-500"}`}
                  />
                </div>

                <div className="flex items-center justify-between rounded-[4px] border border-[#f0ebf2] bg-[#faf8fb] p-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#716876] block">Customer Auto-Reply</span>
                    <span className="text-[#171219] font-medium mt-0.5 block">
                      {selectedInquiry.autoReplied ? "Confirmation sent to customer" : "Auto-reply not activated"}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`h-5 w-5 ${selectedInquiry.autoReplied ? "text-emerald-600" : "text-zinc-400"}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Metadata & Workflow Card */}
          <div className="space-y-4">
            {/* Lead Card */}
            <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-4 text-xs">
              <div className="flex items-center gap-2 border-b border-[#f0ebf2] pb-2.5">
                <User className="h-4 w-4 text-[#4b1b63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171219]">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#716876] block">Full Name</span>
                  <span className="text-[#171219] font-bold text-sm block mt-0.5">{selectedInquiry.name}</span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#716876] block">Company / Organization</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building className="h-3.5 w-3.5 text-[#716876]" />
                    <span className="text-[#171219] font-semibold">{selectedInquiry.company}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#716876] block">Work Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-[#4b1b63] font-semibold flex items-center gap-1.5 mt-0.5 hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{selectedInquiry.email}</span>
                    <ExternalLink className="h-3 w-3 text-[#716876]" />
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#716876] block">Phone / WhatsApp</span>
                  {selectedInquiry.phone ? (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171219] font-semibold flex items-center gap-1.5 mt-0.5 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{selectedInquiry.phone}</span>
                    </a>
                  ) : (
                    <span className="text-[#9e94a3] mt-0.5 block">Not specified</span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#716876] block">Received Date</span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[#5e4b67]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="border-t border-[#f0ebf2] pt-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#716876] block mb-1.5">
                  Workflow Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                  disabled={updatingId === selectedInquiry.id}
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#171219] outline-none transition focus:border-[#4b1b63]"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     LIST VIEW: TABLE PAGE VIEW
     ========================================================================= */
  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Contact Inquiries
          </h1>
          <p className="mt-0.5 text-xs text-[#716876]">
            Customer evaluation requests and demo inquiries from the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchInquiries}
            className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar with Read/Unread Filters */}
      <div className="flex flex-col gap-3 rounded-[5px] border border-[#e8e2e9] bg-white p-3 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8a7f91]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, email, product..."
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white pl-8 pr-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          {/* Read / Unread Filter Pill Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#716876] mr-1">Read State:</span>
            {(["ALL", "UNREAD", "READ"] as const).map((r) => {
              const count = r === "ALL" ? totalCount : r === "UNREAD" ? unreadCount : readCount;
              return (
                <button
                  key={r}
                  onClick={() => setReadFilter(r)}
                  className={`rounded-[4px] px-2.5 py-1 text-xs font-semibold transition ${
                    readFilter === r
                      ? "bg-[#4b1b63] text-white shadow-2xs"
                      : "bg-[#faf8fb] text-[#716876] border border-[#e8e2e9] hover:bg-[#f2ebf5]"
                  }`}
                >
                  {r === "ALL" ? "All" : r === "UNREAD" ? "Unread" : "Read"} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Workflow Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#f0ebf2]">
          <span className="text-xs font-semibold text-[#716876] mr-1">Status:</span>
          {statusFilterList.map((st) => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`rounded-[4px] px-2.5 py-1 text-xs font-semibold transition whitespace-nowrap ${
                statusFilter === st.value
                  ? "bg-[#4b1b63] text-white"
                  : "bg-white text-[#716876] border border-[#e3dce6] hover:bg-[#f6f2f8]"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-[5px] border border-[#e8e2e9] bg-white overflow-hidden shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#716876]">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#716876]">
            No contact submissions found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#e8e2e9] bg-[#f8f5f9] font-semibold text-[#716876]">
                <tr>
                  <th className="py-2.5 px-4">Contact & Company</th>
                  <th className="py-2.5 px-4">Evaluating</th>
                  <th className="py-2.5 px-4">Delivery</th>
                  <th className="py-2.5 px-4">Workflow Status</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebf2]">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenInquiry(item)}
                    className={`cursor-pointer transition ${
                      item.isRead === false
                        ? "bg-[#fcf8fd] hover:bg-[#f8f0fa] font-medium"
                        : "hover:bg-[#faf8fb]"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-[#171219]">
                        {item.isRead === false && (
                          <span className="h-2 w-2 rounded-full bg-[#ec1778] shrink-0" title="Unread Inquiry" />
                        )}
                        <span>{item.name}</span>
                        <span className="text-[#8e8593] font-normal">· {item.company}</span>
                      </div>
                      <div className="text-[11px] text-[#716876] flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" />
                        <span>{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="text-[11px] text-[#8e8593] flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded-[4px] bg-[#f5eff8] px-2 py-0.5 text-[11px] font-semibold text-[#4b1b63] border border-[#e8dcef]">
                        {item.product}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <span className={`flex items-center gap-1 ${item.notifiedAdmin ? "text-emerald-700" : "text-amber-700"}`}>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Admin: {item.notifiedAdmin ? "Delivered" : "Queued"}
                        </span>
                        <span className={`flex items-center gap-1 ${item.autoReplied ? "text-emerald-700" : "text-zinc-500"}`}>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Auto-reply: {item.autoReplied ? "Sent" : "None"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        disabled={updatingId === item.id}
                        className="rounded-[4px] border border-[#e3dce6] bg-white px-2 py-1 text-[11px] font-semibold text-[#171219] outline-none focus:border-[#4b1b63]"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-[#716876]">
                      {new Date(item.createdAt).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={(e) => toggleReadStatus(item, e)}
                          className="rounded-[4px] p-1 text-[#716876] hover:bg-[#f4eff6] hover:text-[#4b1b63] transition"
                          title={item.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {item.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-[#4b1b63]" />}
                        </button>
                        <button
                          onClick={(e) => deleteInquiry(item.id, e)}
                          className="rounded-[4px] p-1 text-red-600 hover:bg-red-50 transition"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
