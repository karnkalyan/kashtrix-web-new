"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Mail,
  Server,
  Lock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";

export default function EmailSetupPage() {
  const [formData, setFormData] = useState({
    smtpHost: "s11638.sgp1.stableserver.net",
    smtpPort: 465,
    smtpSecure: true,
    smtpUser: "support@kashtrix.com",
    smtpPassword: "••••••••••••••••",
    fromEmail: "support@kashtrix.com",
    fromName: "Kashtrix Broadcast Systems",
    notificationRecipient: "support@kashtrix.com",
    autoReplyEnabled: true,
    autoReplySubject: "Thank you for contacting Kashtrix — We received your inquiry",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [testResult, setTestResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/email-settings");
      const data = await res.json();
      if (data.ok && data.settings) {
        setFormData({
          smtpHost: data.settings.smtpHost,
          smtpPort: data.settings.smtpPort,
          smtpSecure: Boolean(data.settings.smtpSecure),
          smtpUser: data.settings.smtpUser,
          smtpPassword: data.settings.smtpPassword || "••••••••••••••••",
          fromEmail: data.settings.fromEmail,
          fromName: data.settings.fromName,
          notificationRecipient: data.settings.notificationRecipient,
          autoReplyEnabled: Boolean(data.settings.autoReplyEnabled),
          autoReplySubject: data.settings.autoReplySubject,
        });
      }
    } catch (err) {
      console.error("Failed to load email settings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/email-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setStatusMsg({ type: "success", text: "Email configuration saved successfully." });
        if (data.settings?.smtpPassword) {
          setFormData((prev) => ({ ...prev, smtpPassword: data.settings.smtpPassword }));
        }
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update configuration" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Network error while saving settings" });
    } finally {
      setSaving(false);
    }
  }

  async function sendTestEmail() {
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/admin/email-settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testRecipient: formData.notificationRecipient }),
      });
      const data = await res.json();
      if (data.ok) {
        setTestResult({
          type: "success",
          text: `Success: ${data.message}`,
        });
      } else {
        setTestResult({
          type: "error",
          text: `SMTP Error: ${data.error}`,
        });
      }
    } catch (err: any) {
      setTestResult({
        type: "error",
        text: `Diagnostic dispatch failed: ${err.message}`,
      });
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#171219] tracking-tight">
            Email & SMTP Setup
          </h1>
          <p className="mt-1 text-xs text-[#716876]">
            Configure outbound mail routing for customer inquiries and automated confirmation replies.
          </p>
        </div>

        <button
          onClick={loadSettings}
          disabled={loading}
          className="button-secondary-sm !min-h-0 !py-1.5 !px-2.5 !text-xs font-semibold disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Reload</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2 rounded-[5px] border p-3 text-xs font-medium ${
            statusMsg.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[5px] border border-[#e8e2e9] bg-white p-5 shadow-[0_2px_8px_rgba(20,8,30,0.03)]">
          <div className="border-b border-[#f0ebf2] pb-3">
            <h2 className="text-sm font-bold text-[#171219] flex items-center gap-2">
              <Server className="h-4 w-4 text-[#4b1b63]" />
              <span>Outbound SMTP Server Configuration</span>
            </h2>
            <p className="text-xs text-[#716876] mt-0.5">
              Active configuration for dispatching inquiries to support@kashtrix.com
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                SMTP Host
              </label>
              <input
                type="text"
                required
                value={formData.smtpHost}
                onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                placeholder="s11638.sgp1.stableserver.net"
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1">Port</label>
                <input
                  type="number"
                  required
                  value={formData.smtpPort}
                  onChange={(e) => setFormData({ ...formData, smtpPort: parseInt(e.target.value, 10) || 465 })}
                  placeholder="465"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1">Security</label>
                <label className="flex items-center gap-2 rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.smtpSecure}
                    onChange={(e) => setFormData({ ...formData, smtpSecure: e.target.checked })}
                    className="accent-[#4b1b63] h-3.5 w-3.5"
                  />
                  <span className="font-medium text-xs">SSL / TLS</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                SMTP Username
              </label>
              <input
                type="email"
                required
                value={formData.smtpUser}
                onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                placeholder="support@kashtrix.com"
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                SMTP Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.smtpPassword}
                  onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                  placeholder="••••••••••••••••"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 pr-9 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2 text-[#716876] hover:text-[#171219] transition"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0ebf2] pt-3">
            <h3 className="text-sm font-bold text-[#171219] mb-2.5">Notification Routing</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                  Recipient Email (Admin Notification)
                </label>
                <input
                  type="email"
                  required
                  value={formData.notificationRecipient}
                  onChange={(e) => setFormData({ ...formData, notificationRecipient: e.target.value })}
                  placeholder="support@kashtrix.com"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4a4250] block mb-1">
                  Sender Display Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fromName}
                  onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                  placeholder="Kashtrix Broadcast Systems"
                  className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63]"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0ebf2] pt-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#171219]">Customer Confirmation Auto-Reply</h3>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[#4b1b63] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.autoReplyEnabled}
                  onChange={(e) => setFormData({ ...formData, autoReplyEnabled: e.target.checked })}
                  className="accent-[#4b1b63] h-3.5 w-3.5"
                />
                <span>Enable Auto-Reply</span>
              </label>
            </div>

            <div>
              <input
                type="text"
                disabled={!formData.autoReplyEnabled}
                value={formData.autoReplySubject}
                onChange={(e) => setFormData({ ...formData, autoReplySubject: e.target.value })}
                className="w-full rounded-[4px] border border-[#dcd4e0] bg-white px-3 py-1.5 text-xs text-[#171219] placeholder-[#8a7f91] outline-none transition focus:border-[#4b1b63] focus:ring-1 focus:ring-[#4b1b63] disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-[#f0ebf2]">
            <button
              type="submit"
              disabled={saving}
              className="button-primary-sm !min-h-0 !py-1.5 !px-3.5 !text-xs font-semibold disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Lock className="h-3.5 w-3.5" />}
              <span>Save Configuration</span>
            </button>
          </div>
        </form>

        {/* Side Panel: Diagnostic Testing */}
        <div className="space-y-4">
          <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-3">
            <h3 className="text-sm font-bold text-[#171219] flex items-center gap-2">
              <Send className="h-3.5 w-3.5 text-emerald-600" />
              <span>Diagnostic Test Email</span>
            </h3>
            <p className="text-xs text-[#716876]">
              Sends a live test dispatch to <span className="font-semibold text-[#171219]">{formData.notificationRecipient}</span> to verify relay connectivity.
            </p>

            <button
              onClick={sendTestEmail}
              disabled={testing}
              className="w-full button-secondary-sm !min-h-0 !py-1.5 !px-3 !text-xs font-semibold disabled:opacity-50"
            >
              {testing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              <span>{testing ? "Testing..." : "Send Test Email"}</span>
            </button>

            {testResult && (
              <div
                className={`rounded-[4px] p-2.5 text-xs border ${
                  testResult.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {testResult.text}
              </div>
            )}
          </div>

          <div className="rounded-[5px] border border-[#e8e2e9] bg-white p-4 shadow-[0_2px_8px_rgba(20,8,30,0.03)] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#171219]">
              <Info className="h-3.5 w-3.5 text-[#4b1b63]" />
              <span>Active Mail Server Settings</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#716876]">
              <div className="flex justify-between border-b border-[#f4eff6] pb-1">
                <span>Account:</span>
                <span className="font-mono text-[#171219]">support@kashtrix.com</span>
              </div>
              <div className="flex justify-between border-b border-[#f4eff6] pb-1">
                <span>Host:</span>
                <span className="font-mono text-[#171219]">s11638.sgp1.stableserver.net</span>
              </div>
              <div className="flex justify-between border-b border-[#f4eff6] pb-1">
                <span>Port:</span>
                <span className="font-mono text-emerald-700">465 (SSL)</span>
              </div>
              <div className="flex justify-between">
                <span>Alternative:</span>
                <span className="font-mono text-[#171219]">mail.kashtrix.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
