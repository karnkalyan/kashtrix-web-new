"use client";

import React, { useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { GlobalNetworkGlobe } from "@/components/visual/GlobalNetworkGlobe";
import { Mail, Globe, CheckCircle2, Send, FileText, Download, Eye, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      department: "Technical Sales & Architecture",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        alert("Failed to submit inquiry. Please try again or email support@kashtrix.com.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="pt-16 pb-20 bg-[var(--surface-1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)]">
              Connect With Our Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Talk to Our Experts.
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Reach out to our global team of telecom solutions architects, NOC engineers, and executive advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Column 1: Contact Information */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] space-y-4">
                <h3 className="text-base font-bold font-sora text-[var(--text-primary)]">Direct Engineering Lines</h3>
                <div className="space-y-3 text-xs text-[var(--text-primary)]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[var(--text-accent)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--text-primary)]">Business &amp; Product Inquiries:</strong>
                      <a href="mailto:info@kashtrix.com">info@kashtrix.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[var(--text-link)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--text-primary)]">Global Presence:</strong>
                      <span>Dubai · Singapore · Dallas · Kathmandu</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[var(--text-link)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[var(--text-primary)]">NOC Escalation Support:</strong>
                      <span>24/7/365 High-Availability Center</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Form */}
            <div className="lg:col-span-8 p-8 rounded-3xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[var(--text-accent)] mx-auto" />
                  <h3 className="text-2xl font-bold font-sora text-[var(--text-primary)]">Inquiry Logged to Database!</h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                    Thank you for reaching out. A Senior Telecom Solutions Architect will review your inquiry and respond to your email within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Full Name *</label>
                      <input
                        {...register("fullName")}
                        placeholder="Alex Rivera"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                      {errors.fullName && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.fullName.message}</span>}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Work Email *</label>
                      <input
                        {...register("email")}
                        placeholder="alex@telecomisp.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                      {errors.email && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Company / ISP Name</label>
                      <input
                        {...register("company")}
                        placeholder="Acme Fiber Networks"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Inquiry Department</label>
                      <select
                        {...register("department")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-semibold"
                      >
                        <option>Technical Sales &amp; Architecture</option>
                        <option>Partner &amp; Hardware Vendor Program</option>
                        <option>Billing &amp; Revenue Assurance Audit</option>
                        <option>NOC Escalation &amp; Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">How can our architects assist? *</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Please describe your active subscriber circuits, network vendor hardware, or current billing pain points..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                    {errors.message && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.message.message}</span>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-3 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {submitting ? <span>Sending to Database...</span> : <><Send className="w-3.5 h-3.5" /> Submit Custom Inquiry</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Documentation PDF Download & Preview Section */}
          <div className="mb-16 rounded-3xl border border-[var(--border-brand)] bg-[var(--surface-purple)] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-1)] text-[var(--text-link)] border border-[var(--border-default)]">
                  <FileText className="w-3.5 h-3.5 text-[#E11D72]" /> Technical Architecture &amp; Capability Guide
                </div>
                <h2 className="font-sora text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Kashtrix Enterprise Telecom OS Documentation
                </h2>
                <p className="font-inter text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Download or preview the official 36.6 MB Kashtrix technical documentation — featuring full system architecture, multi-vendor GPON OLT provisioning, FreeRADIUS schemas, Syslog CGNAT compliance, and AI agent endpoints.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <span className="text-xs font-bold text-[var(--text-primary)] bg-[var(--surface-1)] px-3 py-1 rounded-lg border border-[var(--border-default)]">
                    PDF Document · 36.6 MB
                  </span>
                  <span className="text-xs font-bold text-emerald-500 bg-[var(--surface-1)] px-3 py-1 rounded-lg border border-[var(--border-default)]">
                    ✓ Full Production Specification
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setShowPdfPreview(!showPdfPreview)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-strong)] text-[var(--text-primary)] font-sora font-bold text-xs hover:border-[#E11D72] transition-all cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4 text-[#E11D72]" />
                  <span>{showPdfPreview ? "Hide PDF Viewer" : "Preview PDF Document"}</span>
                </button>

                <a
                  href="/documentation.pdf"
                  download="Kashtrix-Enterprise-Telecom-OS-Documentation.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E11D72] hover:bg-[#FF2E93] text-white font-sora font-bold text-xs transition-all shadow-lg shadow-[#E11D72]/25 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF (36.6 MB)</span>
                </a>
              </div>
            </div>

            {/* Embedded PDF Viewer Frame */}
            {showPdfPreview && (
              <div className="mt-8 pt-8 border-t border-[var(--border-default)] animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 text-xs font-bold text-[var(--text-secondary)] font-mono">
                  <span>Interactive PDF Document Viewer: Documentation (36.6 MB)</span>
                  <a
                    href="/documentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E11D72] text-white font-sora font-semibold text-xs shadow-md hover:bg-[#FF2E93] transition-all"
                  >
                    Open PDF in Fullscreen Tab <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="w-full h-[700px] rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[#11071F] shadow-2xl relative">
                  <object
                    data="/documentation.pdf#toolbar=1&view=FitH"
                    type="application/pdf"
                    className="w-full h-full rounded-2xl"
                  >
                    <div className="p-8 sm:p-12 text-center space-y-4 bg-[var(--surface-2)] h-full flex flex-col items-center justify-center">
                      <FileText className="w-16 h-16 text-[#E11D72] mx-auto" />
                      <h4 className="text-xl font-bold font-sora text-[var(--text-primary)]">
                        Kashtrix Technical Architecture Documentation
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                        Your browser plugin or mobile view restricts inline PDF rendering. Open the full 36.6 MB document directly in a browser tab or download it to your device.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                          href="/documentation.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-[#E11D72] text-white text-xs font-bold font-sora shadow-md hover:bg-[#FF2E93] transition-all"
                        >
                          Open PDF in New Tab
                        </a>
                        <a
                          href="/documentation.pdf"
                          download="Kashtrix-Enterprise-Telecom-OS-Documentation.pdf"
                          className="px-6 py-3 rounded-xl bg-[var(--surface-1)] border border-[var(--border-strong)] text-xs font-bold font-sora text-[var(--text-primary)] hover:border-[#E11D72] transition-all"
                        >
                          Download PDF (36.6 MB)
                        </a>
                      </div>
                    </div>
                  </object>
                </div>
              </div>
            )}
          </div>

          {/* Regional Globe Section */}
          <div className="mt-16 pt-16 border-t border-[var(--border-default)]">
            <h3 className="text-xl font-bold font-sora text-[var(--text-primary)] text-center mb-8">
              Interactive Worldwide Support Footprint
            </h3>
            <GlobalNetworkGlobe />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

