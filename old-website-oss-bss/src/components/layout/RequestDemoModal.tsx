"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Sparkles, Send, ShieldCheck, PhoneCall } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoRequestSchema, type DemoRequestFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODULES_LIST = [
  "Unified OSS Core (Radius, BNG, OLT)",
  "Unified BSS Core (Billing, CRM, Payments)",
  "Autonomous AI Agents Grid (8 Agents)",
  "Multi-Vendor Hardware Orchestration",
  "AI Voice Calls & Payment Reminders",
  "Field Operations & GPS Work Orders",
  "Inventory Lifecycle & Serial Tracking",
];

export const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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
        alert("Something went wrong saving your request. Please try again or email info@kashtrix.com.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving demo request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[var(--page-bg)]/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] shadow-2xl text-[var(--text-primary)] overflow-hidden my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2B0D3A] to-[#4A1B7A] text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--text-accent)]" />
                <div>
                  <h3 className="text-base font-bold font-sora">Request Custom Kashtrix Platform Demo</h3>
                  <p className="text-[11px] text-[#E8DFF0]">
                    Live simulation tailored to your subscriber count &amp; network vendor hardware.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setSubmitted(false);
                }}
                className="p-1.5 rounded-lg text-white hover:bg-white/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--surface-purple)] text-[var(--text-accent)] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold font-sora text-[var(--text-primary)]">
                    Demo Request Received &amp; Logged to Database!
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    Our Senior Telecom Solutions Architect will review your hardware requirements and contact your work email within 2 hours to coordinate your custom live sandbox.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        onClose();
                        setSubmitted(false);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all"
                    >
                      Return to Website
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                        Full Name <span className="text-[var(--text-accent)]">*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder="Alex Rivera"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.fullName.message}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                        Work Email <span className="text-[var(--text-accent)]">*</span>
                      </label>
                      <input
                        {...register("workEmail")}
                        placeholder="alex@fibertelecom.com"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                      {errors.workEmail && (
                        <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.workEmail.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                        Company / ISP Name <span className="text-[var(--text-accent)]">*</span>
                      </label>
                      <input
                        {...register("companyName")}
                        placeholder="Acme Fiber Networks"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                      {errors.companyName && (
                        <span className="text-[10px] text-[var(--text-accent)] mt-1 block">{errors.companyName.message}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Phone Number (Optional)</label>
                      <input
                        {...register("phoneNumber")}
                        placeholder="+1 (555) 019-8900"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">Country</label>
                      <select
                        {...register("country")}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-medium"
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
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-medium"
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
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs font-medium"
                      >
                        <option>Under 10,000 circuits</option>
                        <option>10,000 - 50,000 circuits</option>
                        <option>50,000 - 250,000 circuits</option>
                        <option>250,000+ Tier-1 Carrier</option>
                      </select>
                    </div>
                  </div>

                  {/* Modules of Interest Checkbox Grid */}
                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1.5">
                      Interested Modules (Select All That Apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)]">
                      {MODULES_LIST.map((mod) => {
                        const checked = selectedModules.includes(mod);
                        return (
                          <div
                            key={mod}
                            onClick={() => toggleModule(mod)}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-md text-xs cursor-pointer transition-colors border",
                              checked
                                ? "bg-[#2B0D3A] text-white border-[var(--border-brand)] dark:bg-[var(--surface-purple)]"
                                : "bg-[var(--surface-1)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[#9B82B5]"
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="w-3.5 h-3.5 accent-[#E11D72]"
                            />
                            <span className="line-clamp-1">{mod}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                      Current Hardware / Challenges (Optional)
                    </label>
                    <textarea
                      {...register("message")}
                      rows={2}
                      placeholder="E.g. We use Cisco ASR 9000 & MA5800 OLTs and want to automate billing rating and PPPoE session disconnects."
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] text-xs focus:outline-none focus:border-[var(--focus-border)]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-[var(--border-default)]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                      <ShieldCheck className="w-4 h-4 text-[var(--text-link)]" /> SOC 2 Zero-Trust Protected
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#2B0D3A] text-white font-sora font-bold text-xs hover:bg-[#4A1B7A] transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting to Database...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Submit Demo Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
