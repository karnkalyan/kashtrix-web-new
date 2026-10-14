"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck } from "lucide-react";

const modules = ["OSS/BSS Core", "Network Automation", "Hardware Automation", "AI Agents", "Voice Automation", "Billing & CRM"];

export function PricingInquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("sending");
    const selected = formData.getAll("modules").join(", ") || "To be discussed";
    const message = [
      `Pricing requirements`,
      `Company size / subscribers: ${formData.get("subscribers")}`,
      `Modules: ${selected}`,
      `Timeline: ${formData.get("timeline")}`,
      `Requirements: ${formData.get("requirements")}`,
    ].join("\n");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"), email: formData.get("email"),
          company: formData.get("company"), department: "Pricing & Business Requirements", message,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  return (
    <section className="section-art section-art-shapes1 bg-[var(--page-bg)] py-16 text-[var(--text-primary)] md:py-24">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-7 lg:col-span-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.14em] text-[var(--text-accent)]">Pricing designed around your operation</span>
            <h1 className="mt-4 font-sora text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">Let’s build the right commercial plan.</h1>
            <p className="mt-5 leading-7 text-[var(--text-secondary)]">Every network has a different subscriber base, device estate, integration scope and rollout plan. Share your requirements and we’ll prepare a clear, relevant proposal—without forcing you into an unsuitable package.</p>
          </div>
          <div className="grid gap-3">
            {["A requirements review with a telecom solutions architect", "A tailored scope and deployment recommendation", "A commercial proposal sent to your work email"].map((text) => (
              <div key={text} className="flex gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-4 text-sm text-[var(--text-primary)] shadow-xs"><CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--text-accent)]" />{text}</div>
            ))}
          </div>
          <div className="rounded-2xl bg-[#2B0D3A] p-6 text-white dark:bg-[var(--surface-purple)] border dark:border-[var(--border-default)]">
            <h2 className="font-sora text-lg font-semibold">Prefer a direct conversation?</h2>
            <p className="mt-2 text-sm text-[#E8DFF0]">Our business team can discuss procurement, rollout phases and technical fit.</p>
            <div className="mt-5 text-sm"><a className="flex items-center gap-2 hover:text-[#F9A8D4]" href="mailto:info@kashtrix.com"><Mail className="h-4 w-4 text-[var(--text-accent)]" /> info@kashtrix.com</a></div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 shadow-2xl shadow-[#2B0D3A]/10 sm:p-8">
            {status === "sent" ? (
              <div className="py-16 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-[var(--text-accent)]" /><h2 className="mt-5 font-sora text-2xl font-bold text-[var(--text-primary)]">Thank you—your requirements are with us.</h2><p className="mx-auto mt-3 max-w-md text-sm text-[var(--text-secondary)]">We’ll review the details and get in touch by email with the next steps and any focused questions.</p></div>
            ) : (
              <form action={submit} className="space-y-5">
                <div><h2 className="font-sora text-2xl font-bold text-[var(--text-primary)]">Tell us what you need</h2><p className="mt-1 text-sm text-[var(--text-secondary)]">Fields marked * are required.</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="fullName" label="Full name *" placeholder="Your name" required />
                  <Field name="email" label="Work email *" placeholder="you@company.com" type="email" required />
                  <Field name="company" label="Company / ISP *" placeholder="Company name" required />
                  <Select name="subscribers" label="Subscriber / business size *" options={["Under 5,000", "5,000–25,000", "25,000–100,000", "100,000+", "Enterprise / other"]} />
                </div>
                <fieldset><legend className="mb-2 text-xs font-bold text-[var(--text-primary)]">What are you exploring?</legend><div className="grid gap-2 sm:grid-cols-2">{modules.map((module) => <label key={module} className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] p-3 text-xs text-[var(--text-primary)]"><input type="checkbox" name="modules" value={module} className="accent-[#E11D72]" />{module}</label>)}</div></fieldset>
                <Select name="timeline" label="Target timeline *" options={["As soon as possible", "Within 3 months", "3–6 months", "6–12 months", "Researching options"]} />
                <label className="block text-xs font-bold text-[var(--text-primary)]">Requirements *<textarea required name="requirements" rows={5} placeholder="Tell us about your current systems, devices, integrations, operational challenges and desired outcomes…" className="mt-1.5 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] px-4 py-3 font-normal text-[var(--text-primary)] outline-none focus:border-[var(--focus-border)]" /></label>
                {status === "error" && <p className="text-sm text-[var(--text-accent)]">We couldn’t submit the form. Please retry or email info@kashtrix.com.</p>}
                <button disabled={status === "sending"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B0D3A] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#4A1B7A] dark:bg-[var(--brand-violet)] dark:hover:bg-[var(--brand-pink)] disabled:opacity-60"><Send className="h-4 w-4" />{status === "sending" ? "Sending…" : "Send pricing requirements"}</button>
                <p className="flex items-center justify-center gap-2 text-center text-[11px] text-[var(--text-secondary)]"><ShieldCheck className="h-4 w-4" />Your details are used only to respond to this business inquiry.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="text-xs font-bold text-[var(--text-primary)]">{label}<input {...props} className="mt-1.5 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] px-4 py-3 font-normal text-[var(--text-primary)] outline-none focus:border-[var(--focus-border)]" /></label>; }
function Select({ name, label, options }: { name: string; label: string; options: string[] }) { return <label className="block text-xs font-bold text-[var(--text-primary)]">{label}<select required name={name} className="mt-1.5 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] px-4 py-3 font-normal text-[var(--text-primary)] outline-none focus:border-[var(--focus-border)]">{options.map(o => <option key={o}>{o}</option>)}</select></label>; }
