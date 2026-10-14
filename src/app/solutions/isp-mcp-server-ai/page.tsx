import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { Bot, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "ISP MCP Server for AI Integration | Kashtrix",
  description: "Connect AI language models to ISP operations with the Kashtrix Model Context Protocol (MCP) server. Enable AI agents to query subscriber data, network telemetry and billing context through standardized telecom APIs.",
  keywords: ["ISP MCP server", "telecom Model Context Protocol", "ISP AI integration", "MCP server telecom", "AI telecom API", "LLM ISP integration"],
  canonical: "https://kashtrix.com/solutions/isp-mcp-server-ai",
});

const FAQS = [
  { question: "What is the Model Context Protocol (MCP)?", answer: "MCP is a standardized protocol for connecting AI language models to external data sources and tools. The Kashtrix MCP server exposes ISP operational data — subscriber profiles, network telemetry, billing status, RADIUS sessions — to compatible AI models, enabling them to understand and act on telecom context." },
  { question: "What ISP data can AI models access through the MCP server?", answer: "The Kashtrix MCP server provides structured access to subscriber profiles, service plans, billing status, RADIUS session data, network topology, device health, optical power levels, syslog events, support tickets and inventory records — all through governed API endpoints with role-based permissions." },
  { question: "Is the MCP server secure?", answer: "Yes. The MCP server enforces role-based access controls, API key authentication, request rate limiting and full audit logging. Sensitive operations require explicit approval workflows before execution." },
];

export default function MCPServerPage() {
  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Solutions", href: "/solutions" }, { name: "ISP MCP Server AI", href: "/solutions/isp-mcp-server-ai" }]);
  const faqSchema = getFAQSchema(FAQS);
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <section className="pt-20 pb-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6"><Link href="/" className="hover:text-[var(--text-primary)]">Home</Link><span>/</span><Link href="/integrations" className="hover:text-[var(--text-primary)]">Integrations</Link><span>/</span><span className="text-[var(--text-primary)] font-semibold">MCP Server</span></nav>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] mb-4"><Bot className="w-3.5 h-3.5" /> Model Context Protocol</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sora tracking-tight">ISP MCP Server for AI Integration</h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">The Kashtrix MCP server bridges AI language models with live ISP operational data. Enable AI agents to query subscriber accounts, check network health, inspect billing status and execute governed operations through a standardized telecom context layer.</p>
          <div className="mt-8 flex gap-3"><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-6 py-3 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request MCP Demo <ArrowRight className="w-4 h-4" /></Link></div>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold font-sora">Why ISPs Need an MCP Server</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Generic AI models lack telecom context. They cannot answer questions about subscriber RADIUS sessions, OLT port utilization, billing aging or fiber topology without structured access to ISP operational data. The Kashtrix MCP server solves this by providing a governed, standardized interface between AI models and the ISP&apos;s operational systems — turning every AI interaction into a context-aware telecom conversation.</p>
        </div></section>
        <section className="py-16 border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Exposed Telecom Context</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Subscriber profiles & service plans", "RADIUS session state & authentication history", "Billing status, invoices & payment history", "Network device health & optical power levels", "Support ticket history & resolution context", "Inventory & CPE deployment records", "Syslog event streams & CGNAT mappings", "Fiber topology & GIS coordinates"].map((item) => (
              <div key={item} className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] text-sm font-medium">{item}</div>
            ))}
          </div>
        </div></section>
        <section className="py-16 bg-[var(--surface-1)] border-b border-[var(--border-default)]"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl font-bold font-sora">Frequently Asked Questions</h2>
          {FAQS.map((faq) => (<div key={faq.question} className="space-y-2 pb-6 border-b border-[var(--border-default)] last:border-0"><h3 className="text-sm font-bold">{faq.question}</h3><p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p></div>))}
        </div></section>
        <section className="py-20 text-center"><div className="max-w-2xl mx-auto px-4 space-y-4"><h2 className="text-2xl font-bold font-sora">Connect AI to Your ISP</h2><p className="text-sm text-[var(--text-secondary)]">See how the Kashtrix MCP server enables intelligent AI operations for telecom.</p><Link href="/request-demo" className="inline-flex items-center gap-2 rounded-xl bg-[#E11D72] px-8 py-3.5 font-sora text-sm font-semibold text-white shadow-lg shadow-[#E11D72]/25 hover:-translate-y-0.5 transition-all">Request Demo <ArrowRight className="w-4 h-4" /></Link></div></section>
      </main>
    </SiteShell>
  );
}
