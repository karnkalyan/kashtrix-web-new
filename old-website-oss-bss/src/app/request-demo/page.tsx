"use client";

import React, { useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoRequestSchema, type DemoRequestFormValues } from "@/lib/validation";
import { Sparkles, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES_LIST = [
  "Unified OSS Core (Radius, BNG, OLT)",
  "Unified BSS Core (Billing, CRM, Payments)",
  "Autonomous AI Agents Grid (8 Agents)",
  "Multi-Vendor Hardware Orchestration",
  "AI Voice Calls & Payment Reminders",
  "Field Operations & GPS Work Orders",
  "Inventory Lifecycle & Serial Tracking",
];

export default function RequestDemoPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<DemoRequestFormValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      companyName: "",
      phoneNumber: "",
      country: "United States",
      providerType: "ISP / Fiber Provider",
      subscriberRange: "10,000 - 50,000 circuits",
      interestedModules: ["Unified OSS Core (Radius, BNG, OLT)", "Unified BSS Core (Billing, CRM, Payments)"],
      message: "",
    },
  });

  const selectedModules = useWatch({ control, name: "interestedModules" }) || [];

  const toggleModule = (mod: string) => {
    if (selectedModules.includes(mod)) {
      setValue(
        "interestedModules",
        selectedModules.filter((m) => m !== mod)
      );
    } else {
      setValue("interestedModules", [...selectedModules, mod]);
    }
  };

  const onSubmit = async (data: DemoRequestFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        alert("Something went wrong saving request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving demo request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <div className="pt-16 pb-20 bg-[var(--surface-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-pink)] text-[var(--text-accent)]">
              <Sparkles className="w-3.5 h-3.5" /> Live Sandbox Simulation
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sora text-[var(--text-primary)] tracking-tight">
              Request Your Custom Kashtrix Demo
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our engineering team builds custom sandboxes tailored to your subscriber count and network hardware so you can test real PPPoE sessions and OLT commands safely.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-2xl text-[var(--text-primary)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[var(--text-accent)] mx-auto" />
                <h3 className="text-2xl font-bold font-sora text-[var(--text-primary)]">Custom Demo Request Stored in Database!</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  Our Senior Telecom Solutions Architect will review your hardware specifications and email you within 2 hours to coordinate your custom live sandbox.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Full Name *</label>
                    <input
                      {...register("fullName")}
                      placeholder="Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                    {errors.fullName && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.fullName.message}</span>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Work Email *</label>
                    <input
                      {...register("workEmail")}
                      placeholder="alex@fibertelecom.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                    {errors.workEmail && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.workEmail.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Company / ISP Name *</label>
                    <input
                      {...register("companyName")}
                      placeholder="Acme Fiber Networks"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                    {errors.companyName && <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.companyName.message}</span>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Phone Number</label>
                    <input
                      {...register("phoneNumber")}
                      placeholder="+1 (555) 019-8900"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Country</label>
                    <select
                      {...register("country")}
                      className="w-full px-3.5 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-semibold"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Japan</option>
                      <option>Singapore</option>
                      <option>Germany</option>
                      <option>Brazil</option>
                      <option>United Arab Emirates</option>
                      <option>South Africa</option>
                      <option>Other Global Region</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Provider Type</label>
                    <select
                      {...register("providerType")}
                      className="w-full px-3.5 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-semibold"
                    >
                      <option>ISP / Fiber Provider (FTTH)</option>
                      <option>Wireless Operator (WISP)</option>
                      <option>Cable Operator (DOCSIS)</option>
                      <option>VoIP / SIP Carrier</option>
                      <option>Managed IT Provider (MSP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Subscriber Circuits</label>
                    <select
                      {...register("subscriberRange")}
                      className="w-full px-3.5 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-semibold"
                    >
                      <option>Under 10,000 circuits</option>
                      <option>10,000 - 50,000 circuits</option>
                      <option>50,000 - 250,000 circuits</option>
                      <option>250,000+ Tier-1 Carrier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-2">Interested Modules (Select All That Apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)]">
                    {MODULES_LIST.map((mod) => {
                      const checked = selectedModules.includes(mod);
                      return (
                        <div
                          key={mod}
                          onClick={() => toggleModule(mod)}
                          className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-lg text-xs cursor-pointer transition-all border",
                            checked
                              ? "bg-[#2B0D3A] text-white border-[var(--border-brand)] shadow-2xs dark:bg-[var(--surface-purple)]"
                              : "bg-[var(--surface-1)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[#9B82B5]"
                          )}
                        >
                          <input type="checkbox" checked={checked} onChange={() => {}} className="w-4 h-4 accent-[#E11D72]" />
                          <span>{mod}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Current Hardware &amp; Operational Goals</label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Tell us about your Cisco routers, Huawei MA5800 OLTs, or current billing software..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border-default)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--text-link)]" /> SOC 2 Zero-Trust Protected Architecture
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {submitting ? <span>Storing in Database...</span> : <><Send className="w-4 h-4" /> Request Custom Demo</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
