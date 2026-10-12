import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { email: { contains: search } },
        { product: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const inquiries = await prisma.contactInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      total: await prisma.contactInquiry.count(),
      new: await prisma.contactInquiry.count({ where: { status: "NEW" } }),
      inReview: await prisma.contactInquiry.count({ where: { status: "IN_REVIEW" } }),
      contacted: await prisma.contactInquiry.count({ where: { status: "CONTACTED" } }),
      resolved: await prisma.contactInquiry.count({ where: { status: "RESOLVED" } }),
    };

    return NextResponse.json({ ok: true, inquiries, stats });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, isRead } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const updated = await prisma.contactInquiry.update({
      where: { id: Number(id) },
      data: {
        ...(status ? { status } : {}),
        ...(typeof isRead === "boolean" ? { isRead } : {}),
      },
    });

    return NextResponse.json({ ok: true, inquiry: updated });
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return NextResponse.json({ ok: false, error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.contactInquiry.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ ok: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json({ ok: false, error: "Failed to delete inquiry" }, { status: 500 });
  }
}
