"use client";

import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import {
  Inbox,
  Send,
  Mail,
  PenSquare,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  User,
  ArrowRight,
  Reply,
  Trash2,
  ExternalLink,
  Paperclip,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

interface InboxMessage {
  id: number;
  from: string;
  senderName: string;
  senderEmail: string;
  company: string;
  phone: string | null;
  subject: string;
  body: string;
  product: string;
  date: string;
  status: string;
  isRead?: boolean;
}

interface SentMessage {
  id: number;
  to: string;
  cc: string | null;
  subject: string;
  body: string;
  sentBy: string;
  status: string;
  createdAt: string;
}

interface AttachedFile {
  name: string;
  size: number;
  type: string;
  content: string; // base64
}

export default function WebmailPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "compose" | "sent">("inbox");
  const [inbox, setInbox] = useState<InboxMessage[]>([]);
  const [sent, setSent] = useState<SentMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [inboxReadFilter, setInboxReadFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [selectedInboxMsg, setSelectedInboxMsg] = useState<InboxMessage | null>(null);
  const [selectedSentMsg, setSelectedSentMsg] = useState<SentMessage | null>(null);

  // Compose form state
  const [composeTo, setComposeTo] = useState("");
  const [composeCc, setComposeCc] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [sending, setSending] = useState(false);
  const [composeStatus, setComposeStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadWebmail() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/webmail");
      const data = await res.json();
      if (data.ok) {
        const inb = data.inbox || [];
        const snt = data.sent || [];
        setInbox(inb);
        setSent(snt);
        if (inb.length > 0) {
          setSelectedInboxMsg((curr) => curr ? (inb.find((i: InboxMessage) => i.id === curr.id) || inb[0]) : inb[0]);
        }
        if (snt.length > 0) {
          setSelectedSentMsg((curr) => curr ? (snt.find((s: SentMessage) => s.id === curr.id) || snt[0]) : snt[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load webmail:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWebmail();
  }, []);

  async function handleSelectInboxMsg(msg: InboxMessage) {
    const updated = { ...msg, isRead: true };
    setSelectedInboxMsg(updated);
    if (!msg.isRead) {
      setInbox((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      try {
        await fetch("/api/admin/webmail", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: msg.id, isRead: true }),
        });
      } catch {
        // ignore
      }
    }
  }

  async function toggleReadStatus(msg: InboxMessage) {
    const nextRead = !msg.isRead;
    setInbox((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, isRead: nextRead } : m))
    );
    setSelectedInboxMsg({ ...msg, isRead: nextRead });
    try {
      await fetch("/api/admin/webmail", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, isRead: nextRead }),
      });
    } catch {
      // ignore
    }
  }

  function handleReply(msg: InboxMessage) {
    setComposeTo(msg.senderEmail);
    setComposeSubject(`Re: ${msg.subject}`);
    setComposeBody(`\n\n--- Original message from ${msg.senderName} (${msg.senderEmail}) ---\n${msg.body}`);
    setActiveTab("compose");
    setComposeStatus(null);
  }

  function handleFileAttach(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
            content: base64,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeAttachment(index: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSendEmail(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setComposeStatus(null);

    try {
      const res = await fetch("/api/admin/webmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeTo,
          cc: composeCc || undefined,
          subject: composeSubject,
          message: composeBody,
          attachments: attachments.map((a) => ({
            name: a.name,
            type: a.type,
            content: a.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setComposeStatus({
          type: "success",
          text: `Message successfully dispatched to ${composeTo}${
            attachments.length > 0 ? ` with ${attachments.length} attachment(s)` : ""
          }`,
        });
        setComposeTo("");
        setComposeCc("");
        setComposeSubject("");
        setComposeBody("");
        setAttachments([]);
        loadWebmail();
      } else {
        setComposeStatus({
          type: "error",
          text: data.error || "Failed to dispatch email",
        });
      }
    } catch (err: any) {
      setComposeStatus({
        type: "error",
        text: err.message || "Network error while sending email",
      });
    } finally {
      setSending(false);
    }
  }

  const filteredInbox = inbox.filter((m) => {
    const s = search.toLowerCase();
    const matchesSearch =
      !search ||
      m.senderName.toLowerCase().includes(s) ||
      m.senderEmail.toLowerCase().includes(s) ||
      m.company.toLowerCase().includes(s) ||
      m.subject.toLowerCase().includes(s) ||
      m.body.toLowerCase().includes(s);

    const matchesRead =
      inboxReadFilter === "ALL" ||
      (inboxReadFilter === "UNREAD" && !m.isRead) ||
      (inboxReadFilter === "READ" && Boolean(m.isRead));

    return matchesSearch && matchesRead;
  });

  const filteredSent = sent.filter((m) => {
    const s = search.toLowerCase();
    return !search || m.to.toLowerCase().includes(s) || m.subject.toLowerCase().includes(s) || m.body.toLowerCase().includes(s);
  });

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Webmail Center
          </h1>
          <p className="mt-0.5 text-xs text-[#716876]">
            Outbound & inbound communications via <span className="font-semibold text-[#4b1b63]">support@kashtrix.com</span>
          </p>
        </div>

        <button
          onClick={loadWebmail}
          disabled={loading}
          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Mail Container */}
      <div className="rounded-[5px] border border-[#e8e2e9] bg-white shadow-[0_2px_10px_rgba(20,8,30,0.03)] overflow-hidden">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between border-b border-[#f0ebf2] bg-[#faf8fb] px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`inline-flex items-center gap-1.5 rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "inbox"
                  ? "button-primary-sm !min-h-0 !py-1.5 !px-3"
                  : "button-secondary-sm !min-h-0 !py-1.5 !px-3"
              }`}
            >
              <Inbox className="h-3.5 w-3.5" />
              <span>Inbox ({inbox.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("compose");
                setComposeStatus(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "compose"
                  ? "button-primary-sm !min-h-0 !py-1.5 !px-3"
                  : "button-secondary-sm !min-h-0 !py-1.5 !px-3"
              }`}
            >
              <PenSquare className="h-3.5 w-3.5" />
              <span>Compose</span>
            </button>

            <button
              onClick={() => setActiveTab("sent")}
              className={`inline-flex items-center gap-1.5 rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "sent"
                  ? "button-primary-sm !min-h-0 !py-1.5 !px-3"
                  : "button-secondary-sm !min-h-0 !py-1.5 !px-3"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Sent ({sent.length})</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#716876]">
            <span>Active Sender:</span>
            <span className="font-semibold text-[#171219] bg-[#f5eff8] px-2 py-0.5 rounded-[4px] border border-[#e8dcef] text-[11px]">
              support@kashtrix.com
            </span>
          </div>
        </div>

        {/* Tab Content: INBOX */}
        {activeTab === "inbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] min-h-[500px]">
            {/* Inbox List */}
            <div className="border-r border-[#f0ebf2] p-3 space-y-2.5 bg-[#faf8fb]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8a7f91]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search inbox messages..."
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white pl-8 pr-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>

              {/* Read / Unread Filter Tabs */}
              <div className="flex items-center gap-1.5">
                {(["ALL", "UNREAD", "READ"] as const).map((mode) => {
                  const count =
                    mode === "ALL"
                      ? inbox.length
                      : mode === "UNREAD"
                      ? inbox.filter((m) => !m.isRead).length
                      : inbox.filter((m) => m.isRead).length;
                  return (
                    <button
                      key={mode}
                      onClick={() => setInboxReadFilter(mode)}
                      className={`rounded-[4px] px-2 py-0.5 text-[11px] font-semibold transition ${
                        inboxReadFilter === mode
                          ? "bg-[#4b1b63] text-white shadow-2xs"
                          : "bg-white text-[#716876] border border-[#e5dce6] hover:bg-[#f8f5f9]"
                      }`}
                    >
                      {mode === "ALL" ? "All" : mode === "UNREAD" ? "Unread" : "Read"} ({count})
                    </button>
                  );
                })}
              </div>

              {filteredInbox.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#716876]">
                  No messages found.
                </div>
              ) : (
                <div className="space-y-1.5 overflow-y-auto max-h-[550px] pr-1">
                  {filteredInbox.map((msg) => {
                    const isSelected = selectedInboxMsg?.id === msg.id;
                    const isUnread = !msg.isRead;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectInboxMsg(msg)}
                        className={`cursor-pointer rounded-[4px] border p-2.5 transition ${
                          isSelected
                            ? "border-[#4b1b63] bg-white shadow-xs"
                            : "border-[#e8e2e9] bg-white hover:border-[#cfc4d4]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isUnread && (
                              <span className="rounded-[3px] bg-[#4b1b63] px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                                New
                              </span>
                            )}
                            <span className={`text-xs text-[#171219] truncate ${isUnread ? "font-bold" : "font-semibold"}`}>
                              {msg.senderName}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8e8593]">
                            {new Date(msg.date).toLocaleDateString([], { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <div className={`text-[11px] truncate mt-0.5 ${isUnread ? "font-semibold text-[#4b1b63]" : "text-[#5e4b67]"}`}>
                          {msg.subject}
                        </div>
                        <div className="text-[11px] text-[#716876] truncate mt-1">{msg.body}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Message Detail Pane */}
            <div className="p-4 sm:p-5 flex flex-col justify-between bg-white">
              {selectedInboxMsg ? (
                <div className="space-y-4">
                  <div className="border-b border-[#f0ebf2] pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-[#171219]">{selectedInboxMsg.subject}</h2>
                          {!selectedInboxMsg.isRead && (
                            <span className="rounded-[3px] bg-[#4b1b63] px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                              Unread
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#716876]">
                          <span>From: <strong className="text-[#171219]">{selectedInboxMsg.senderName}</strong> &lt;{selectedInboxMsg.senderEmail}&gt;</span>
                          <span>•</span>
                          <span>Company: <strong className="text-[#171219]">{selectedInboxMsg.company}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReadStatus(selectedInboxMsg)}
                          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold"
                          title={selectedInboxMsg.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {selectedInboxMsg.isRead ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5 text-[#716876]" />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5 text-[#4b1b63]" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReply(selectedInboxMsg)}
                          className="button-primary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
                        >
                          <Reply className="h-3.5 w-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>

                    {selectedInboxMsg.phone && (
                      <div className="mt-1 text-xs text-[#716876]">
                        Phone / WhatsApp: <span className="font-medium text-[#171219]">{selectedInboxMsg.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-[4px] bg-[#faf8fb] border border-[#f0ebf2] p-3.5 text-xs leading-relaxed text-[#231b27] whitespace-pre-wrap font-sans">
                    {selectedInboxMsg.body}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-xs text-[#716876]">
                  Select a message from the list to view.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: COMPOSE */}
        {activeTab === "compose" && (
          <form onSubmit={handleSendEmail} className="p-4 sm:p-6 space-y-3.5 max-w-3xl">
            {composeStatus && (
              <div
                className={`flex items-center gap-2 rounded-[4px] border p-2.5 text-xs font-medium ${
                  composeStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {composeStatus.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span>{composeStatus.text}</span>
              </div>
            )}

            <div className="flex items-center gap-3 border-b border-[#f0ebf2] pb-2.5">
              <span className="w-16 text-xs font-bold text-[#716876]">From:</span>
              <span className="text-[11px] font-semibold text-[#171219] bg-[#f5eff8] px-2 py-0.5 rounded-[4px] border border-[#e8dcef]">
                support@kashtrix.com
              </span>
            </div>

            <div className="flex items-center gap-3 border-b border-[#f0ebf2] pb-2.5">
              <label className="w-16 text-xs font-bold text-[#716876]">To:</label>
              <input
                type="email"
                required
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                placeholder="recipient@example.com"
                className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            <div className="flex items-center gap-3 border-b border-[#f0ebf2] pb-2.5">
              <label className="w-16 text-xs font-bold text-[#716876]">CC:</label>
              <input
                type="email"
                value={composeCc}
                onChange={(e) => setComposeCc(e.target.value)}
                placeholder="Optional CC address"
                className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            <div className="flex items-center gap-3 border-b border-[#f0ebf2] pb-2.5">
              <label className="w-16 text-xs font-bold text-[#716876]">Subject:</label>
              <input
                type="text"
                required
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                placeholder="Enter subject line..."
                className="flex-1 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            {/* File Attachments Section */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#f0ebf2] pb-2.5">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileAttach}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="button-secondary-sm !min-h-0 !py-1 !px-2.5 !text-xs font-semibold"
              >
                <Paperclip className="h-3.5 w-3.5 text-[#6f2b8f]" />
                <span>Attach Files</span>
              </button>
              {attachments.length > 0 ? (
                <span className="text-[11px] font-semibold text-[#4b1b63]">
                  {attachments.length} file{attachments.length > 1 ? "s" : ""} attached
                </span>
              ) : (
                <span className="text-[11px] text-[#8e8593]">Attach documents, specs or media files</span>
              )}
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 pb-1">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-[4px] border border-[#dcd4e0] bg-[#faf8fb] px-2.5 py-1 text-xs text-[#171219]"
                  >
                    <Paperclip className="h-3 w-3 text-[#7b6f82]" />
                    <span className="max-w-[180px] truncate font-medium">{file.name}</span>
                    <span className="text-[10px] text-[#8e8593]">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="ml-1 text-[#8e8593] hover:text-red-600 transition"
                      title="Remove attachment"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <textarea
                required
                rows={8}
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                placeholder="Type your message here..."
                className="w-full resize-y rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-2 text-xs leading-relaxed text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-[#f0ebf2]">
              <button
                type="button"
                onClick={() => {
                  setComposeTo("");
                  setComposeCc("");
                  setComposeSubject("");
                  setComposeBody("");
                  setAttachments([]);
                }}
                className="button-secondary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={sending}
                className="button-primary-sm !min-h-0 !py-1.5 !px-4 !text-xs font-semibold disabled:opacity-50"
              >
                {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                <span>{sending ? "Delivering..." : "Send Email"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab Content: SENT */}
        {activeTab === "sent" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] min-h-[500px]">
            {/* Sent List */}
            <div className="border-r border-[#f0ebf2] p-3 space-y-2.5 bg-[#faf8fb]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8a7f91]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sent emails..."
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white pl-8 pr-3 py-1.5 text-xs text-[#171219] placeholder:text-xs placeholder:text-[#9c93a3] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>

              {filteredSent.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#716876]">
                  No sent messages found.
                </div>
              ) : (
                <div className="space-y-1.5 overflow-y-auto max-h-[550px] pr-1">
                  {filteredSent.map((msg) => {
                    const isSelected = selectedSentMsg?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedSentMsg(msg)}
                        className={`cursor-pointer rounded-[4px] border p-2.5 transition ${
                          isSelected
                            ? "border-[#4b1b63] bg-white shadow-xs"
                            : "border-[#e8e2e9] bg-white hover:border-[#cfc4d4]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#171219] truncate">To: {msg.to}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-[3px]">
                            {msg.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-[#4b1b63] truncate mt-0.5">{msg.subject}</div>
                        <div className="text-[11px] text-[#716876] truncate mt-1">{msg.body}</div>
                        <div className="text-[9px] text-[#8e8593] mt-1">
                          {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sent Detail Pane */}
            <div className="p-4 sm:p-5 flex flex-col justify-between bg-white">
              {selectedSentMsg ? (
                <div className="space-y-4">
                  <div className="border-b border-[#f0ebf2] pb-3">
                    <h2 className="text-sm font-bold text-[#171219]">{selectedSentMsg.subject}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#716876]">
                      <span>To: <strong className="text-[#171219]">{selectedSentMsg.to}</strong></span>
                      {selectedSentMsg.cc && <span>• CC: {selectedSentMsg.cc}</span>}
                      <span>•</span>
                      <span>From: {selectedSentMsg.sentBy}</span>
                    </div>
                    <div className="text-[11px] text-[#8e8593] mt-1">
                      Sent on {new Date(selectedSentMsg.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-[4px] bg-[#faf8fb] border border-[#f0ebf2] p-3.5 text-xs leading-relaxed text-[#231b27] whitespace-pre-wrap font-sans">
                    {selectedSentMsg.body}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-xs text-[#716876]">
                  Select a sent message to inspect details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
