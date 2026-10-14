import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInquiryEmails } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || body.fullName || "Website Visitor";
    const email = body.email || "";
    const company = body.company || "Independent Operator";
    const phone = body.phone || null;
    const product = body.product || body.department || "Telecom OSS/BSS & Broadcast Inquiry";
    const message = body.message || body.requirements || "General inquiry";

    if (!String(email).trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: String(name).trim(),
        company: String(company).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        product: String(product).trim(),
        message: String(message).trim(),
        consent: true,
        mode: "contact",
        status: "NEW",
      },
    });

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

      await prisma.contactInquiry.update({
        where: { id: inquiry.id },
        data: {
          notifiedAdmin: emailResult.notificationSent,
          autoReplied: emailResult.autoReplySent,
        },
      });
    } catch (e) {
      console.error("Email notification error:", e);
    }

    return NextResponse.json({
      ok: true,
      message: "Inquiry received and recorded successfully.",
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
