"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function WebsiteContactPage() {
  const [formData, setFormData] = useState({
    primaryEmail: "support@kashtrix.com",
    salesEmail: "support@kashtrix.com",
    supportEmail: "support@kashtrix.com",
    phone: "+977 1 4500000",
    whatsapp: "+977 9800000000",
    address: "Kashtrix Broadcast Systems HQ",
    websiteUrl: "https://kashtrix.com",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact-settings");
      const data = await res.json();
      if (data.ok && data.contact) {
        setFormData({
          primaryEmail: data.contact.primaryEmail || "support@kashtrix.com",
          salesEmail: data.contact.salesEmail || "support@kashtrix.com",
          supportEmail: data.contact.supportEmail || "support@kashtrix.com",
          phone: data.contact.phone || "+977 1 4500000",
          whatsapp: data.contact.whatsapp || "+977 9800000000",
          address: data.contact.address || "Kashtrix Broadcast Systems HQ",
          websiteUrl: data.contact.websiteUrl || "https://kashtrix.com",
        });
      }
    } catch (err) {
      console.error("Failed to load contact settings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/contact-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setStatusMsg({ type: "success", text: "Website contact details updated successfully." });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update contact info" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Website Contacts
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Update public support addresses, phone lines, and physical office references across the portal.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Reload</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2 rounded-[4px] border p-2.5 text-xs font-medium ${
            statusMsg.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[5px] border border-[#e8e2e9] bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Primary Support Email
            </label>
            <input
              type="email"
              required
              value={formData.primaryEmail}
              onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Technical Sales Email
            </label>
            <input
              type="email"
              required
              value={formData.salesEmail}
              onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Direct Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              WhatsApp Support Line
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Headquarters / Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4a4250] block mb-1">
              Official Website URL
            </label>
            <input
              type="text"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-3 border-t border-[#f0ebf2]">
          <button
            type="submit"
            disabled={saving}
            className="button-primary-sm !min-h-0 !py-1.5 !px-3.5 !text-xs font-semibold disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            <span>Save Contact Info</span>
          </button>
        </div>
      </form>
    </div>
  );
}
