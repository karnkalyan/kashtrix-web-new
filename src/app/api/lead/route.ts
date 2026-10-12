import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInquiryEmails } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, product, message, consent, mode } = body;

    if (!String(name || "").trim()) {
      return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
    }
    if (!String(company || "").trim()) {
      return NextResponse.json({ ok: false, error: "Company is required" }, { status: 400 });
    }
    if (!String(email || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ ok: false, error: "A valid work email is required" }, { status: 400 });
    }
    if (!String(message || "").trim()) {
      return NextResponse.json({ ok: false, error: "Project context message is required" }, { status: 400 });
    }

    const cleanProduct = String(product || "Broadcast Playout Suite").trim();
    const cleanConsent = Boolean(consent);
    const cleanMode = String(mode || "contact").trim();

    // 1. Store in MySQL via Prisma ORM
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: String(name).trim(),
        company: String(company).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        product: cleanProduct,
        message: String(message).trim(),
        consent: cleanConsent,
        mode: cleanMode,
        status: "NEW",
      },
    });

    // 2. Dispatch email notifications asynchronously (non-blocking for UI, updating DB afterwards)
    try {
      const emailResult = await sendInquiryEmails({
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        phone: inquiry.phone || undefined,
        product: inquiry.product,
        message: inquiry.message,
        consent: inquiry.consent,
        mode: inquiry.mode,
      });

      // Update delivery telemetry in database
      await prisma.contactInquiry.update({
        where: { id: inquiry.id },
        data: {
          notifiedAdmin: emailResult.notificationSent,
          autoReplied: emailResult.autoReplySent,
        },
      });
    } catch (mailErr) {
      console.error("Email dispatch warning:", mailErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Inquiry received and recorded successfully.",
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process inquiry. Please try again." },
      { status: 500 }
    );
  }
}
