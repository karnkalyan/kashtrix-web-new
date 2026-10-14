import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAGE_CATALOG } from "@/lib/meta";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim();
    const category = searchParams.get("category");

    // If database has 0 records, automatically seed it with default catalog
    const count = await prisma.pageMeta.count();
    if (count === 0) {
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
          update: {},
        });
      }
    }

    let records = await prisma.pageMeta.findMany({
      orderBy: { path: "asc" },
    });

    // Attach category from default catalog if available
    const catalogMap = new Map(DEFAULT_PAGE_CATALOG.map((c) => [c.path, c.category]));
    let items = records.map((r: any) => ({
      ...r,
      category: catalogMap.get(r.path) || "Other",
    }));

    if (category && category !== "All") {
      items = items.filter((i: any) => i.category === category);
    }

    if (search) {
      items = items.filter(
        (i: any) =>
          i.path.toLowerCase().includes(search) ||
          i.title.toLowerCase().includes(search) ||
          i.description.toLowerCase().includes(search) ||
          i.keywords.toLowerCase().includes(search)
      );
    }

    const total = records.length;
    const indexed = records.filter((r: any) => !r.noIndex).length;
    const noIndexed = records.filter((r: any) => r.noIndex).length;

    return NextResponse.json({
      ok: true,
      items,
      stats: {
        total,
        indexed,
        noIndexed,
      },
    });
  } catch (error: any) {
    console.error("Failed to load page meta:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load page metadata" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      path,
      title,
      description,
      keywords,
      ogTitle,
      ogDesc,
      ogImage,
      canonical,
      noIndex,
      schemaType,
    } = body;

    if (!String(path || "").trim()) {
      return NextResponse.json({ ok: false, error: "Page path is required" }, { status: 400 });
    }
    if (!String(title || "").trim()) {
      return NextResponse.json({ ok: false, error: "Meta title is required" }, { status: 400 });
    }
    if (!String(description || "").trim()) {
      return NextResponse.json({ ok: false, error: "Meta description is required" }, { status: 400 });
    }

    const normalizedPath = String(path).trim().startsWith("/")
      ? String(path).trim()
      : `/${String(path).trim()}`;

    const upserted = await prisma.pageMeta.upsert({
      where: { path: normalizedPath },
      create: {
        path: normalizedPath,
        title: String(title).trim(),
        description: String(description).trim(),
        keywords: String(keywords || "").trim(),
        ogTitle: ogTitle ? String(ogTitle).trim() : null,
        ogDesc: ogDesc ? String(ogDesc).trim() : null,
        ogImage: ogImage ? String(ogImage).trim() : "/og.svg",
        canonical: canonical ? String(canonical).trim() : `https://kashtrix.com${normalizedPath}`,
        noIndex: Boolean(noIndex),
        schemaType: String(schemaType || "WebPage").trim(),
      },
      update: {
        title: String(title).trim(),
        description: String(description).trim(),
        keywords: String(keywords || "").trim(),
        ogTitle: ogTitle ? String(ogTitle).trim() : null,
        ogDesc: ogDesc ? String(ogDesc).trim() : null,
        ogImage: ogImage ? String(ogImage).trim() : "/og.svg",
        canonical: canonical ? String(canonical).trim() : `https://kashtrix.com${normalizedPath}`,
        noIndex: Boolean(noIndex),
        schemaType: String(schemaType || "WebPage").trim(),
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Page metadata saved successfully",
      item: upserted,
    });
  } catch (error: any) {
    console.error("Failed to save page meta:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save page metadata" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const path = searchParams.get("path");

    if (id) {
      await prisma.pageMeta.delete({ where: { id: parseInt(id, 10) } });
    } else if (path) {
      await prisma.pageMeta.delete({ where: { path } });
    } else {
      return NextResponse.json({ ok: false, error: "ID or Path required" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: "Page metadata deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete page meta:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete page metadata" },
      { status: 500 }
    );
  }
}
