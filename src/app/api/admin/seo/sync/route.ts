import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAGE_CATALOG } from "@/lib/meta";

export async function POST() {
  try {
    let synced = 0;
    for (const item of DEFAULT_PAGE_CATALOG) {
      await prisma.pageMeta.upsert({
        where: { path: item.path },
        create: {
          path: item.path,
          title: item.title,
          description: item.description,
          keywords: item.keywords,
          ogTitle: item.ogTitle || item.title,
          ogDesc: item.ogDesc || item.description,
          ogImage: item.ogImage || "/og.svg",
          canonical: item.canonical || `https://kashtrix.com${item.path}`,
          noIndex: item.noIndex || false,
          schemaType: item.schemaType || "WebPage",
        },
        update: {}, // Keep existing custom changes untouched
      });
      synced++;
    }

    return NextResponse.json({
      ok: true,
      message: `Successfully synchronized ${synced} catalog pages.`,
      synced,
    });
  } catch (error: any) {
    console.error("Failed to sync SEO catalog:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to sync SEO catalog" },
      { status: 500 }
    );
  }
}
