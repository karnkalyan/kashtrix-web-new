"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

export function LeadForm({ mode = "demo" }: { mode?: "demo" | "contact" }) {
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setState("sending");const form=new FormData(e.currentTarget);const data=Object.fromEntries(form.entries());try{const r=await fetch("/api/lead",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...data,mode})});if(!r.ok)throw new Error();setState("sent");e.currentTarget.reset();}catch{setState("error")}}
  if(state==="sent")return <div className="border border-emerald-200 bg-emerald-50 p-8"><CheckCircle2 className="h-7 w-7 text-emerald-600"/><h2 className="mt-5 text-2xl font-semibold tracking-[-.03em]">Request received.</h2><p className="mt-3 text-sm leading-6 text-emerald-900/70">Thanks. Your message is ready for the Kashtrix team to review.</p><button onClick={()=>setState("idle")} className="mt-6 text-sm font-semibold text-emerald-800">Send another message</button></div>;
  return <form onSubmit={submit} className="swipe-card border border-[#e4dfe5] bg-white dark:border-white/10 dark:bg-[#170724] p-6 shadow-[0_18px_55px_rgba(38,18,44,.07)] sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2"><Field name="name" label="Name" required/><Field name="company" label="Company" required/><Field name="email" label="Work email" type="email" required/><Field name="phone" label="Phone / WhatsApp"/></div>
    <label className="mt-5 block"><span className="text-xs font-semibold text-[#4d4650] dark:text-[#bdaec4]">What are you evaluating?</span><select name="product" className="mt-2 w-full border border-[#e3dee5] bg-white dark:border-white/10 dark:bg-[#1a082b] dark:text-white px-4 py-3 text-sm outline-none focus:border-[#6f2b8f]"><option>Broadcast Playout Suite</option><option>Kashtrix Studio</option><option>StreamOps</option><option>Telecom OSS/BSS</option><option>Multiple Kashtrix products</option><option>Other / integration project</option></select></label>
    <label className="mt-5 block"><span className="text-xs font-semibold text-[#4d4650] dark:text-[#bdaec4]">Project context</span><textarea name="message" required rows={6} placeholder="Channels, protocols, vendors, users, storage, scale, current stack, timeline…" className="mt-2 w-full resize-y border border-[#e3dee5] bg-white dark:border-white/10 dark:bg-[#1a082b] dark:text-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#6f2b8f]"/></label>
    <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-[#786f7b] dark:text-[#a090ab]"><input name="consent" type="checkbox" required className="mt-1"/>I agree that Kashtrix may use this information to respond to my request.</label>
    {state==="error"&&<p className="mt-4 text-sm font-semibold text-red-600">The form could not be sent. Please try again.</p>}
    <button disabled={state==="sending"} className="button-primary mt-6 w-full disabled:opacity-60">{state==="sending"?<LoaderCircle className="h-4 w-4 animate-spin"/>:<ArrowRight className="h-4 w-4"/>}{mode==="demo"?"Request enterprise demo":"Send message"}</button>
  </form>
}
function Field({name,label,type="text",required=false}:{name:string;label:string;type?:string;required?:boolean}){return <label className="block"><span className="text-xs font-semibold text-[#4d4650] dark:text-[#bdaec4]">{label}</span><input name={name} type={type} required={required} className="mt-2 w-full border border-[#e3dee5] bg-white dark:border-white/10 dark:bg-[#1a082b] dark:text-white px-4 py-3 text-sm outline-none focus:border-[#6f2b8f]"/></label>}
