import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Wrench, ArrowRight, HelpCircle, CheckCircle2, Calculator, BookOpen, Layers,
  ChevronRight
} from "lucide-react";
import { ISPToolsHub } from "@/components/tools/ISPToolsHub";
import { TOOLS_DETAIL_MAP, ALL_TOOL_SLUGS } from "@/data/toolsData";
import { getPageMetadata } from "@/lib/meta";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { InlineCTA } from "@/components/InlineCTA";

export async function generateStaticParams() {
  return ALL_TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_DETAIL_MAP[slug];
  if (!tool) return {};

  return getPageMetadata(`/tools/${tool.slug}`, {
    title: tool.title,
    description: tool.description,
    keywords: `${tool.name}, ${tool.category}, ${tool.tag}, ISP engineering calculator, Kashtrix tools`,
    canonical: `https://kashtrix.com/tools/${tool.slug}`,
  });
}

export default async function IndividualToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = TOOLS_DETAIL_MAP[slug];

  if (!tool) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Free ISP Tools", href: "/tools" },
    { name: tool.name, href: `/tools/${tool.slug}` },
  ]);

  const faqSchema = getFAQSchema(tool.faqs);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    description: tool.description,
    url: `https://kashtrix.com/tools/${tool.slug}`,
    operatingSystem: "Web-based",
  };

  const otherTools = Object.values(TOOLS_DETAIL_MAP)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Header Hero */}
      <section className="pt-20 pb-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
        <div className="container-shell max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6 font-mono">
            <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/tools" className="hover:text-[var(--text-primary)]">Free ISP Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--text-primary)] font-semibold">{tool.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface-purple)] text-[var(--text-link)] border border-[var(--border-default)]">
              {tool.category} · {tool.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            {tool.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {tool.description}
          </p>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-2)]/50">
        <div className="container-shell max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-link)]">
                <BookOpen className="w-4 h-4" /> Technical Explainer
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {tool.explainerHeading}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {tool.explainerText}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-[5px] border border-[var(--border-brand)] bg-[var(--surface-purple)] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <CheckCircle2 className="w-5 h-5 text-[#d63474]" /> Why This Matters For ISPs &amp; WISPs
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {tool.whyItMatters}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-12 border-b border-[var(--border-default)]">
        <div className="container-shell max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-[#d63474]" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Interactive {tool.name} Workspace
            </h2>
          </div>

          <ISPToolsHub initialToolId={tool.toolId} />
        </div>
      </section>

      {/* Worked Example Section */}
      <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-1)]">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-link)]">
            <Layers className="w-4 h-4" /> Worked Engineering Example
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Real-World Calculation Walkthrough
          </h2>

          <div className="p-6 sm:p-8 rounded-[5px] border border-[var(--border-default)] bg-[var(--surface-2)] space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">Scenario</span>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{tool.workedExample.scenario}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[var(--border-default)]">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] font-mono">Input Parameters</h4>
                <div className="space-y-2">
                  {Object.entries(tool.workedExample.inputs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs p-2.5 rounded-[4px] bg-[var(--surface-1)] border border-[var(--border-default)]">
                      <span className="text-[var(--text-secondary)]">{key}</span>
                      <span className="font-bold text-[var(--text-primary)] font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d63474] font-mono">Calculation Output</h4>
                <div className="space-y-2">
                  {Object.entries(tool.workedExample.results).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs p-2.5 rounded-[4px] bg-[var(--surface-purple)] border border-[var(--border-brand)]">
                      <span className="text-[var(--text-primary)] font-semibold">{key}</span>
                      <span className="font-bold text-[#d63474] font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-default)] text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)] block mb-1">Engineering Analysis:</strong>
              {tool.workedExample.explanation}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 border-b border-[var(--border-default)] bg-[var(--surface-2)]/40">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-link)]">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {tool.name} Engineering FAQs
          </h2>

          <div className="space-y-4 max-w-4xl">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-[5px] border border-[var(--border-default)] bg-[var(--surface-1)] space-y-2">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12 bg-[var(--surface-1)]">
        <div className="container-shell max-w-7xl mx-auto px-4 space-y-6">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Explore More Free ISP Engineering Tools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="p-5 rounded-[5px] border border-[var(--border-default)] bg-[var(--surface-2)] hover:border-[#6f2b8f] hover:shadow-sm transition-all space-y-2 group block"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-link)] block">
                  {t.category}
                </span>
                <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#4b1b63] dark:group-hover:text-[#c084fc] transition-colors">
                  {t.name}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                  {t.description}
                </p>
                <div className="pt-2 text-xs font-semibold text-[var(--text-link)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InlineCTA
        eyebrow={`${tool.name} in Production`}
        title={`Automate ${tool.name} calculations inside Kashtrix OSS/BSS.`}
        text="Eliminate manual calculations. Kashtrix correlates optical attenuation, RADIUS rate limits, and IP address pools automatically across your network hardware."
        accent="#4b1b63"
      />
    </main>
  );
}
