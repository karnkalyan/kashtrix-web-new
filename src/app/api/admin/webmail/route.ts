import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const pAny = prisma as any;
    if (!pAny.sentEmail) {
      console.log("pAny.sentEmail missing, trying SentEmail or raw query");
    }
    const inquiries: any[] = await (pAny.contactInquiry?.findMany ? pAny.contactInquiry.findMany({ orderBy: { createdAt: "desc" } }) : (pAny.ContactInquiry?.findMany ? pAny.ContactInquiry.findMany({ orderBy: { createdAt: "desc" } }) : []));
    
    let sentEmails: any[] = [];
    if (pAny.sentEmail?.findMany) {
      sentEmails = await pAny.sentEmail.findMany({ orderBy: { createdAt: "desc" } });
    } else if (pAny.SentEmail?.findMany) {
      sentEmails = await pAny.SentEmail.findMany({ orderBy: { createdAt: "desc" } });
    } else {
      try {
        const raw = await prisma.$queryRawUnsafe(`SELECT * FROM SentEmail ORDER BY createdAt DESC`);
        sentEmails = Array.isArray(raw) ? raw : [];
      } catch {
        sentEmails = [];
      }
    }

    const emailSettings = await (pAny.emailSetting?.findFirst ? pAny.emailSetting.findFirst({ where: { id: 1 } }) : (pAny.EmailSetting?.findFirst ? pAny.EmailSetting.findFirst({ where: { id: 1 } }) : null));

    // Format inbox messages from inquiries
    const inbox = inquiries.map((inq: any) => ({
      id: inq.id,
      from: `${inq.name} <${inq.email}>`,
      senderName: inq.name,
      senderEmail: inq.email,
      company: inq.company,
      phone: inq.phone,
      subject: `[Inquiry] ${inq.product} — ${inq.company}`,
      body: inq.message,
      product: inq.product,
      date: inq.createdAt,
      status: inq.status,
      isRead: Boolean(inq.isRead),
      autoReplied: inq.autoReplied,
      notifiedAdmin: inq.notifiedAdmin,
    }));

    return NextResponse.json({
      ok: true,
      inbox,
      sent: sentEmails,
      account: {
        email: emailSettings?.fromEmail || "support@kashtrix.com",
        name: emailSettings?.fromName || "Kashtrix Broadcast Systems",
        host: emailSettings?.smtpHost || "s11638.sgp1.stableserver.net",
      },
    });
  } catch (error: any) {
    console.error("Webmail fetch error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to fetch webmail data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, cc, subject, message, attachments } = body;

    const cleanTo = String(to || "").trim();
    const cleanSubject = String(subject || "").trim();
    const cleanMessage = String(message || "").trim();
    const cleanCc = cc ? String(cc).trim() : null;

    if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
      return NextResponse.json({ ok: false, error: "A valid recipient email address is required" }, { status: 400 });
    }
    if (!cleanSubject) {
      return NextResponse.json({ ok: false, error: "Subject line is required" }, { status: 400 });
    }
    if (!cleanMessage) {
      return NextResponse.json({ ok: false, error: "Message body is required" }, { status: 400 });
    }

    // Process attachments if provided
    const mailAttachments: any[] = [];
    if (Array.isArray(attachments)) {
      for (const att of attachments) {
        if (att && att.name && att.content) {
          mailAttachments.push({
            filename: att.name,
            content: Buffer.from(att.content, "base64"),
            contentType: att.type || undefined,
          });
        }
      }
    }

    // Load active SMTP configuration
    let settings = await prisma.emailSetting.findFirst({ where: { id: 1 } });
    const smtpHost = settings?.smtpHost || process.env.SMTP_HOST || "s11638.sgp1.stableserver.net";
    const smtpPort = settings?.smtpPort || parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = settings?.smtpSecure ?? true;
    const smtpUser = settings?.smtpUser || process.env.SMTP_USER || "support@kashtrix.com";
    const smtpPass = settings?.smtpPassword || process.env.SMTP_PASS || "@@support@@kashtrix";
    const fromName = settings?.fromName || "Kashtrix Broadcast Systems";
    const fromEmail = settings?.fromEmail || "support@kashtrix.com";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: cleanTo,
      ...(cleanCc ? { cc: cleanCc } : {}),
      subject: cleanSubject,
      text: cleanMessage,
      attachments: mailAttachments.length > 0 ? mailAttachments : undefined,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e5dce6; border-radius: 6px; background: #ffffff;">
          <div style="border-bottom: 2px solid #4b1b63; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #4b1b63; margin: 0; font-size: 20px;">Kashtrix Broadcast Systems</h2>
          </div>
          <div style="font-size: 14px; line-height: 1.6; color: #231b27; white-space: pre-wrap;">
${escapeHtml(cleanMessage)}
          </div>
          ${
            mailAttachments.length > 0
              ? `<div style="margin-top: 20px; padding: 10px 14px; background: #faf8fb; border-radius: 4px; font-size: 12px; color: #554d58;">
                  <strong>Attachments (${mailAttachments.length}):</strong> ${mailAttachments.map((a) => a.filename).join(", ")}
                </div>`
              : ""
          }
          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #f0ebf2; font-size: 12px; color: #8d8590;">
            Sent from Kashtrix Admin Webmail Desk (${fromEmail})
          </div>
        </div>
      `,
    });

    // Log to SentEmail database table
    const pAny = prisma as any;
    let sentRecord: any = null;
    try {
      if (pAny.sentEmail?.create) {
        sentRecord = await pAny.sentEmail.create({
          data: {
            to: cleanTo,
            cc: cleanCc,
            subject: cleanSubject,
            body: cleanMessage,
            sentBy: fromEmail,
            messageId: info.messageId || null,
            status: "DELIVERED",
          },
        });
      } else if (pAny.SentEmail?.create) {
        sentRecord = await pAny.SentEmail.create({
          data: {
            to: cleanTo,
            cc: cleanCc,
            subject: cleanSubject,
            body: cleanMessage,
            sentBy: fromEmail,
            messageId: info.messageId || null,
            status: "DELIVERED",
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO SentEmail (\`to\`, \`cc\`, \`subject\`, \`body\`, \`sentBy\`, \`messageId\`, \`status\`, \`createdAt\`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
          cleanTo,
          cleanCc,
          cleanSubject,
          cleanMessage,
          fromEmail,
          info.messageId || null,
          "DELIVERED"
        );
        sentRecord = {
          to: cleanTo,
          cc: cleanCc,
          subject: cleanSubject,
          body: cleanMessage,
          sentBy: fromEmail,
          status: "DELIVERED",
          createdAt: new Date().toISOString(),
        };
      }
    } catch (saveErr) {
      console.warn("Could not save to sentEmail table:", saveErr);
    }

    return NextResponse.json({
      ok: true,
      message: `Email successfully delivered to ${cleanTo}`,
      sentEmail: sentRecord,
    });
  } catch (error: any) {
    console.error("Webmail dispatch error:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to dispatch email via SMTP server" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isRead, status } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const pAny = prisma as any;
    const updateData: any = {};
    if (typeof isRead === "boolean") updateData.isRead = isRead;
    if (status) updateData.status = status;

    if (pAny.contactInquiry?.update) {
      await pAny.contactInquiry.update({
        where: { id: Number(id) },
        data: updateData,
      });
    } else if (pAny.ContactInquiry?.update) {
      await pAny.ContactInquiry.update({
        where: { id: Number(id) },
        data: updateData,
      });
    } else {
      if (typeof isRead === "boolean") {
        await prisma.$executeRawUnsafe(
          `UPDATE ContactInquiry SET isRead = ?, updatedAt = NOW() WHERE id = ?`,
          isRead ? 1 : 0,
          Number(id)
        );
      }
      if (status) {
        await prisma.$executeRawUnsafe(
          `UPDATE ContactInquiry SET status = ?, updatedAt = NOW() WHERE id = ?`,
          status,
          Number(id)
        );
      }
    }

    return NextResponse.json({ ok: true, id, isRead, status });
  } catch (err: any) {
    console.error("Webmail update error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Failed to update inquiry" }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
