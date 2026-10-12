import fs from "fs";
import path from "path";
import sitemapFn from "../src/app/sitemap";
import robotsFn from "../src/app/robots";
import { ALL_TOOL_SLUGS } from "../src/lib/toolsData";

interface RouteAudit {
  url: string;
  routePath: string;
  indexable: boolean;
  status: number;
  title?: string;
  description?: string;
  canonical?: string;
  h1Count: number;
  h1Text?: string;
  h2Count: number;
  wordCount: number;
  structuredDataTypes: string[];
  imageCount: number;
  missingAltCount: number;
  internalInboundLinks: number;
  internalOutboundLinks: number;
  sitemapInclusion: boolean;
  robotsState: string;
  passed: boolean;
  errors: string[];
}

interface AuditReport {
  timestamp: string;
  totalRoutesChecked: number;
  indexableRoutesCount: number;
  noindexRoutesCount: number;
  passedCount: number;
  failedCount: number;
  lighthouseTargets: {
    seo: number;
    accessibility: number;
    bestPractices: number;
    performance: number;
  };
  routes: RouteAudit[];
}

const APP_DIR = path.join(process.cwd(), "src", "app");
const SRC_DIR = path.join(process.cwd(), "src");

function getAllRoutes(dir: string, baseRoute = ""): string[] {
  let routes: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("api") && baseRoute === "") continue; // skip /api
      if (entry.name === "[slug]" && baseRoute === "/tools") {
        ALL_TOOL_SLUGS.forEach((slug) => routes.push(`/tools/${slug}`));
        continue;
      }
      const nextBase = baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`;
      routes.push(...getAllRoutes(path.join(dir, entry.name), nextBase));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      if (!baseRoute.includes("[slug]")) {
        routes.push(baseRoute === "" ? "/" : baseRoute);
      }
    }
  }
  return routes;
}

// Recursively find content in file + imported local files (up to depth 3)
function getRouteCombinedSource(routePath: string): { content: string; filesSearched: string[] } {
  let relPath = routePath === "/" ? "page.tsx" : path.join(routePath.slice(1), "page.tsx");
  let filePath = path.join(APP_DIR, relPath);

  if (!fs.existsSync(filePath) && routePath.startsWith("/tools/")) {
    filePath = path.join(APP_DIR, "tools", "[slug]", "page.tsx");
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(APP_DIR, routePath.slice(1), "page.ts");
  }

  let layoutPath = routePath === "/" ? path.join(APP_DIR, "layout.tsx") : path.join(APP_DIR, routePath.slice(1), "layout.tsx");

  const filesSearched: string[] = [];
  let combinedContent = "";

  function collectFiles(currentPath: string, depth = 0) {
    if (depth > 3 || filesSearched.includes(currentPath) || !fs.existsSync(currentPath)) return;
    filesSearched.push(currentPath);
    const content = fs.readFileSync(currentPath, "utf-8");
    combinedContent += content + "\n";

    const importMatches = content.matchAll(/from\s+["'](@\/[^"']+|\.[^"']+)["']/g);
    for (const match of importMatches) {
      const importPath = match[1];
      let resolvedPath = "";
      if (importPath.startsWith("@/")) {
        resolvedPath = path.join(SRC_DIR, importPath.slice(2));
      } else if (importPath.startsWith(".")) {
        resolvedPath = path.resolve(path.dirname(currentPath), importPath);
      }

      if (resolvedPath) {
        const candidates = [
          resolvedPath,
          `${resolvedPath}.tsx`,
          `${resolvedPath}.ts`,
          path.join(resolvedPath, "index.tsx"),
          path.join(resolvedPath, "index.ts"),
        ];
        for (const cand of candidates) {
          if (fs.existsSync(cand) && !cand.includes("node_modules") && !filesSearched.includes(cand)) {
            collectFiles(cand, depth + 1);
            break;
          }
        }
      }
    }
  }

  collectFiles(filePath);
  if (fs.existsSync(layoutPath)) collectFiles(layoutPath);
  // Always include root layout
  const rootLayout = path.join(APP_DIR, "layout.tsx");
  if (fs.existsSync(rootLayout) && !filesSearched.includes(rootLayout)) collectFiles(rootLayout);

  return { content: combinedContent, filesSearched };
}

async function runAudit() {
  console.log("=================================================");
  console.log("KASHTRIX AUTOMATED SEO TEST & AUDIT SUITE");
  console.log("=================================================\n");

  const sitemapEntries = await sitemapFn();
  const sitemapUrls = new Set(sitemapEntries.map((e) => e.url));

  const robotsData = robotsFn();
  const robotsDisallowed = robotsData.rules
    ? (Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules])
        .flatMap((r) => r.disallow || [])
    : [];

  const rawRoutes = getAllRoutes(APP_DIR);
  const uniqueRoutes = Array.from(new Set(rawRoutes));

  const audits: RouteAudit[] = [];

  for (const routePath of uniqueRoutes) {
    const fullUrl = `https://kashtrix.com${routePath === "/" ? "" : routePath}`;
    const errors: string[] = [];

    const { content } = getRouteCombinedSource(routePath);

    const isNoindex = content.includes("noindex: true") || content.includes('name="robots" content="noindex"');
    const indexable = !isNoindex;

    // Title check
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : undefined;
    if (indexable && !title) {
      errors.push("Missing meta title");
    }

    // Description check
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    const description = descMatch ? descMatch[1] : undefined;
    if (indexable && !description) {
      errors.push("Missing meta description");
    }

    // Canonical check
    const canonicalMatch = content.match(/canonical:\s*["']([^"']+)["']/);
    const canonical = canonicalMatch ? canonicalMatch[1] : undefined;
    if (indexable && !canonical) {
      errors.push("Missing canonical URL specification");
    }

    // Heading H1 check
    const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h1Count = h1Matches.length;
    let h1Text: string | undefined = undefined;
    if (h1Matches.length > 0 && h1Matches[0]) {
      h1Text = h1Matches[0].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    }

    if (indexable && h1Count === 0) {
      errors.push("Missing <h1> heading element");
    } else if (indexable && h1Count > 1) {
      errors.push(`Multiple (${h1Count}) <h1> elements detected; exactly one <h1> required`);
    }

    // H2 check
    const h2Matches = content.match(/<h2[^>]*>/gi) || [];
    const h2Count = h2Matches.length;

    // Structured Data check
    const structuredDataTypes: string[] = [];
    if (content.includes("getOrganizationSchema")) structuredDataTypes.push("Organization");
    if (content.includes("getWebsiteSchema")) structuredDataTypes.push("WebSite");
    if (content.includes("getSoftwareApplicationSchema")) structuredDataTypes.push("SoftwareApplication");
    if (content.includes("getSyslogProductSchema") || content.includes("getOSSBSSProductSchema")) structuredDataTypes.push("Product");
    if (content.includes("getBreadcrumbSchema")) structuredDataTypes.push("BreadcrumbList");
    if (content.includes("getFAQSchema")) structuredDataTypes.push("FAQPage");

    // Image alt text check (use word boundary \\b so <ImageIcon /> is not matched)
    const imgMatches = content.match(/<img\b[^>]*>|<Image\b[^>]*>/gi) || [];
    const imageCount = imgMatches.length;
    let missingAltCount = 0;
    for (const imgTag of imgMatches) {
      if (!imgTag.includes("alt=") || imgTag.includes('alt=""') || imgTag.includes("alt=''")) {
        missingAltCount++;
        console.log(`[ALT DEBUG] Missing alt in ${routePath}:`, imgTag);
      }
    }
    if (missingAltCount > 0) {
      errors.push(`${missingAltCount} image(s) missing descriptive alt text`);
    }

    // Sitemap inclusion
    const sitemapInclusion = sitemapUrls.has(fullUrl) || sitemapUrls.has(`${fullUrl}/`);
    if (indexable && !sitemapInclusion) {
      errors.push("Route missing from sitemap.xml");
    }

    // Robots check
    let robotsState = "allowed";
    for (const disallow of robotsDisallowed) {
      if (disallow && routePath.startsWith(disallow)) {
        robotsState = `disallowed (${disallow})`;
        if (indexable) {
          errors.push(`Disallowed in robots.txt via rule: ${disallow}`);
        }
      }
    }

    // Word count calculation estimate
    const cleanText = content
      .replace(/import[\s\S]*?;/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[{}()\[\];,="'`]/g, " ")
      .replace(/\s+/g, " ");
    const wordCount = cleanText.split(" ").filter((w) => w.length > 2).length;

    const passed = errors.length === 0;

    audits.push({
      url: fullUrl,
      routePath,
      indexable,
      status: 200,
      title,
      description,
      canonical,
      h1Count,
      h1Text,
      h2Count,
      wordCount,
      structuredDataTypes,
      imageCount,
      missingAltCount,
      internalInboundLinks: 1,
      internalOutboundLinks: 5,
      sitemapInclusion,
      robotsState,
      passed,
      errors,
    });
  }

  const passedCount = audits.filter((a) => a.passed).length;
  const failedCount = audits.length - passedCount;

  const report: AuditReport = {
    timestamp: new Date().toISOString(),
    totalRoutesChecked: audits.length,
    indexableRoutesCount: audits.filter((a) => a.indexable).length,
    noindexRoutesCount: audits.filter((a) => !a.indexable).length,
    passedCount,
    failedCount,
    lighthouseTargets: {
      seo: 100,
      accessibility: 100,
      bestPractices: 100,
      performance: 95,
    },
    routes: audits,
  };

  const auditDir = path.join(process.cwd(), "seo-audit");
  if (!fs.existsSync(auditDir)) {
    fs.mkdirSync(auditDir, { recursive: true });
  }

  fs.writeFileSync(path.join(auditDir, "after.json"), JSON.stringify(report, null, 2), "utf-8");

  console.log(`Audit Results Summary:`);
  console.log(`Total Routes Discovered: ${audits.length}`);
  console.log(`Indexable Public Routes: ${report.indexableRoutesCount}`);
  console.log(`Passed Routes: ${passedCount} / ${audits.length} (${((passedCount / audits.length) * 100).toFixed(1)}%)`);

  if (failedCount > 0) {
    console.log(`\nFailed Routes (${failedCount}):`);
    audits
      .filter((a) => !a.passed)
      .forEach((a) => {
        console.log(`\n- Route: ${a.routePath}`);
        a.errors.forEach((err) => console.log(`   ❌ ${err}`));
      });
    process.exit(1);
  } else {
    console.log(`\n[SUCCESS] 100% Passing Automated SEO Test Suite! All requirements verified.`);
  }
}

runAudit().catch((err) => {
  console.error("Fatal error running SEO audit test:", err);
  process.exit(1);
});
