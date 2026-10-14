"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export const TellUsWhatYouNeed: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    subscriberSize: "10,000 - 50,000 circuits",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.subscriberSize) {
      setErrorMsg("Please fill out all required fields marked with *.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tell-us-what-you-need", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          workEmail: "",
          companyName: "",
          subscriberSize: "10,000 - 50,000 circuits",
          message: "",
        });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit. Please try again or email info@kashtrix.com.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tell-us-what-you-need" className="w-full py-16 md:py-24 bg-[var(--surface-2)] border-t border-[var(--border-default)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left border-b border-[var(--border-default)] pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Customized Architecture Inquiry
            </span>
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Tell us what you need
            </h2>
            <p className="mt-2 font-inter text-xs sm:text-sm text-[var(--text-secondary)]">
              Specify your network scale, multi-vendor hardware, or custom OSS/BSS integration needs. Our engineering architects will analyze your requirements.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--surface-purple)] text-[var(--text-accent)] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold font-sora text-[var(--text-primary)]">
                Requirements Submitted Successfully!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                A notification email has been dispatched to <strong>info@kashtrix.com</strong> and a confirmation receipt has been sent to your work email.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#E11D72] text-white font-sora font-bold text-xs hover:bg-[#FF2E93] transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <p className="text-[11px] text-[var(--text-secondary)] italic">
                Fields marked <span className="text-[var(--text-accent)] font-bold">*</span> are required.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Full name <span className="text-[var(--text-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-border)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Work email <span className="text-[var(--text-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-border)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Company / ISP <span className="text-[var(--text-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-border)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Subscriber / business size <span className="text-[var(--text-accent)]">*</span>
                  </label>
                  <select
                    required
                    value={formData.subscriberSize}
                    onChange={(e) => setFormData({ ...formData, subscriberSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--focus-border)]"
                  >
                    <option value="Under 5,000 subscribers">Under 5,000 subscribers</option>
                    <option value="5,000 - 25,000 subscribers">5,000 - 25,000 subscribers</option>
                    <option value="25,000 - 100,000 subscribers">25,000 - 100,000 subscribers</option>
                    <option value="100,000+ Tier-1 / Enterprise">100,000+ Tier-1 / Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                  Tell us what you need / Technical Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current hardware (MikroTik, Nokia, Cisco, Huawei), billing migration objectives, RADIUS requirements, or syslog CGNAT needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-border)]"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-default)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--text-link)]" />
                  <span>Direct mail sent to <strong>info@kashtrix.com</strong> + confirmation email sent to you</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E11D72] text-white font-sora font-bold text-xs hover:bg-[#FF2E93] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching Email...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit Requirements Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
