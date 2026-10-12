import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.emailSetting.findFirst({ where: { id: 1 } });
    if (!settings) {
      settings = await prisma.emailSetting.create({
        data: {
          id: 1,
          smtpHost: process.env.SMTP_HOST || "s11638.sgp1.stableserver.net",
          smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
          smtpSecure: true,
          smtpUser: process.env.SMTP_USER || "support@kashtrix.com",
          smtpPassword: process.env.SMTP_PASS || "@@support@@kashtrix",
          fromEmail: "support@kashtrix.com",
          fromName: "Kashtrix Broadcast Systems",
          notificationRecipient: "support@kashtrix.com",
          autoReplyEnabled: true,
          autoReplySubject: "Thank you for contacting Kashtrix — We received your inquiry",
        },
      });
    }

    // CRITICAL: NEVER expose real password in response!
    const safeSettings = {
      ...settings,
      smtpPassword: settings.smtpPassword ? "••••••••••••••••" : "",
      hasPassword: Boolean(settings.smtpPassword),
    };

    return NextResponse.json({ ok: true, settings: safeSettings });
  } catch (error) {
    console.error("Failed to fetch email settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to load email configuration" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      smtpHost,
      smtpPort,
      smtpSecure,
      smtpUser,
      smtpPassword,
      fromEmail,
      fromName,
      notificationRecipient,
      autoReplyEnabled,
      autoReplySubject,
    } = body;

    const current = await prisma.emailSetting.findFirst({ where: { id: 1 } });

    // If password provided and not the masked placeholder, update it. Otherwise keep existing password.
    let passwordToSave = current?.smtpPassword || "@@support@@kashtrix";
    if (smtpPassword && !smtpPassword.includes("•")) {
      passwordToSave = smtpPassword.trim();
    }

    const updated = await prisma.emailSetting.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        smtpHost: smtpHost || "s11638.sgp1.stableserver.net",
        smtpPort: Number(smtpPort) || 465,
        smtpSecure: Boolean(smtpSecure),
        smtpUser: smtpUser || "support@kashtrix.com",
        smtpPassword: passwordToSave,
        fromEmail: fromEmail || "support@kashtrix.com",
        fromName: fromName || "Kashtrix Broadcast Systems",
        notificationRecipient: notificationRecipient || "support@kashtrix.com",
        autoReplyEnabled: Boolean(autoReplyEnabled),
        autoReplySubject: autoReplySubject || "Thank you for contacting Kashtrix — We received your inquiry",
      },
      update: {
        smtpHost: smtpHost || "s11638.sgp1.stableserver.net",
        smtpPort: Number(smtpPort) || 465,
        smtpSecure: Boolean(smtpSecure),
        smtpUser: smtpUser || "support@kashtrix.com",
        smtpPassword: passwordToSave,
        fromEmail: fromEmail || "support@kashtrix.com",
        fromName: fromName || "Kashtrix Broadcast Systems",
        notificationRecipient: notificationRecipient || "support@kashtrix.com",
        autoReplyEnabled: Boolean(autoReplyEnabled),
        autoReplySubject: autoReplySubject || "Thank you for contacting Kashtrix — We received your inquiry",
      },
    });

    const safeSettings = {
      ...updated,
      smtpPassword: updated.smtpPassword ? "••••••••••••••••" : "",
      hasPassword: Boolean(updated.smtpPassword),
    };

    return NextResponse.json({ ok: true, message: "Email configuration updated successfully", settings: safeSettings });
  } catch (error) {
    console.error("Failed to update email settings:", error);
    return NextResponse.json({ ok: false, error: "Failed to update email configuration" }, { status: 500 });
  }
}
