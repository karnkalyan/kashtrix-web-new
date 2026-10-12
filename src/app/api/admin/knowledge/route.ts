import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }

    const items = await prisma.aiKnowledge.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, items });
  } catch (error) {
    console.error("Failed to fetch knowledge items:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch knowledge items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, content, isActive } = body;

    if (!title || !content) {
      return NextResponse.json({ ok: false, error: "Title and content are required" }, { status: 400 });
    }

    const created = await prisma.aiKnowledge.create({
      data: {
        title: String(title).trim(),
        category: String(category || "General").trim(),
        content: String(content).trim(),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ ok: true, item: created });
  } catch (error) {
    console.error("Failed to create knowledge item:", error);
    return NextResponse.json({ ok: false, error: "Failed to create knowledge item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, content, isActive } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });
    }

    const updated = await prisma.aiKnowledge.update({
      where: { id: Number(id) },
      data: {
        ...(title ? { title: String(title).trim() } : {}),
        ...(category ? { category: String(category).trim() } : {}),
        ...(content ? { content: String(content).trim() } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      },
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    console.error("Failed to update knowledge item:", error);
    return NextResponse.json({ ok: false, error: "Failed to update knowledge item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.aiKnowledge.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ ok: true, message: "Knowledge item deleted" });
  } catch (error) {
    console.error("Failed to delete knowledge item:", error);
    return NextResponse.json({ ok: false, error: "Failed to delete knowledge item" }, { status: 500 });
  }
}
