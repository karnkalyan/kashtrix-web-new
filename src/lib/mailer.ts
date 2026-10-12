import nodemailer from "nodemailer";
import { prisma } from "./prisma";

interface SendInquiryEmailsParams {
  name: string;
  company: string;
  email: string;
  phone?: string;
  product: string;
  message: string;
  consent: boolean;
  mode?: string;
}

export async function sendInquiryEmails(params: SendInquiryEmailsParams) {
  // 1. Fetch current email settings from DB or fallback
  let settings = await prisma.emailSetting.findFirst({ where: { id: 1 } });
  if (!settings) {
    settings = {
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
      updatedAt: new Date(),
    };
  }

  // 2. Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure, // true for port 465
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const results = {
    notificationSent: false,
    autoReplySent: false,
    notificationError: null as string | null,
    autoReplyError: null as string | null,
  };

  // 3. Email to Kashtrix Admin / Support team (replyTo customer email)
  try {
    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #4b1b63; border-radius: 8px; background: #ffffff;">
        <div style="border-bottom: 2px solid #6f2b8f; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #4b1b63; margin: 0; font-size: 22px;">New Enterprise Evaluation Inquiry</h2>
          <p style="color: #6d6670; margin: 4px 0 0 0; font-size: 13px;">Received via Kashtrix Modern Portal (${params.mode || "contact"})</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #171219;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; width: 35%; font-weight: bold; color: #4b1b63;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2;">${escapeHtml(params.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #4b1b63;">Company:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2;">${escapeHtml(params.company)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #4b1b63;">Work Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2;"><a href="mailto:${escapeHtml(params.email)}" style="color: #6f2b8f; font-weight: bold;">${escapeHtml(params.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #4b1b63;">Phone / WhatsApp:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2;">${escapeHtml(params.phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #4b1b63;">Evaluating Solution:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #171219;">${escapeHtml(params.product)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2; font-weight: bold; color: #4b1b63;">Consent Confirmed:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0eaf2;">${params.consent ? "Yes" : "No"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <h4 style="color: #4b1b63; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Project Context & Architecture Scope:</h4>
          <div style="background: #faf7fb; border: 1px solid #e8e2e9; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #2e2632; white-space: pre-wrap;">
${escapeHtml(params.message)}
          </div>
        </div>

        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #8d8590; text-align: center;">
          Direct customer reply configured. Hit "Reply" to respond straight to <a href="mailto:${escapeHtml(params.email)}">${escapeHtml(params.email)}</a>.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: settings.notificationRecipient,
      replyTo: `"${params.name}" <${params.email}>`,
      subject: `[Kashtrix Inquiry] ${params.product} — ${params.name} (${params.company})`,
      text: `New Inquiry from ${params.name} (${params.company})\n\nEmail: ${params.email}\nPhone: ${params.phone || "N/A"}\nEvaluating: ${params.product}\n\nProject Context:\n${params.message}`,
      html: adminHtml,
    });
    results.notificationSent = true;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Failed to send admin notification email:", errorMsg);
    results.notificationError = errorMsg;
  }

  // 4. Automated branded confirmation email to customer
  if (settings.autoReplyEnabled && params.email) {
    try {
      const customerHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #e7e2e8; border-radius: 8px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #6f2b8f;">
            <h1 style="color: #4b1b63; margin: 0; font-size: 24px; letter-spacing: -0.02em;">KASHTRIX</h1>
            <p style="color: #6f2b8f; margin: 4px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Broadcast Playout · StreamOps · Studio · OSS/BSS</p>
          </div>

          <p style="font-size: 15px; color: #171219; line-height: 1.6;">Dear ${escapeHtml(params.name)},</p>

          <p style="font-size: 14px; color: #49434c; line-height: 1.6;">
            Thank you for reaching out to Kashtrix regarding <strong>${escapeHtml(params.product)}</strong>.
            We have safely received your deployment requirements and project context.
          </p>

          <div style="background: #fbf9fb; border-left: 3px solid #6f2b8f; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #5a525d; border-radius: 0 4px 4px 0;">
            <strong style="color: #4b1b63;">Summary of your request:</strong><br />
            <strong>Company:</strong> ${escapeHtml(params.company)}<br />
            <strong>Evaluating:</strong> ${escapeHtml(params.product)}<br />
            <strong>Contact:</strong> ${escapeHtml(params.email)}${params.phone ? ` · ${escapeHtml(params.phone)}` : ""}
          </div>

          <p style="font-size: 14px; color: #49434c; line-height: 1.6;">
            Our engineering and solution architecture team is reviewing your project specifics. We will respond directly to this email address within 1 business day with architecture guidance, license options, or demo credentials.
          </p>

          <p style="font-size: 14px; color: #49434c; line-height: 1.6;">
            If you have urgent transmission or high-availability requirements, feel free to reply directly to this email or contact us at <a href="mailto:support@kashtrix.com" style="color: #6f2b8f; font-weight: 600;">support@kashtrix.com</a>.
          </p>

          <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #f0eaf2; font-size: 12px; color: #8e8593; text-align: center;">
            <p style="margin: 0;">© 2026 Kashtrix. All rights reserved.</p>
            <p style="margin: 4px 0 0 0;"><a href="https://kashtrix.com" style="color: #6f2b8f; text-decoration: none;">kashtrix.com</a> · Support: <a href="mailto:support@kashtrix.com" style="color: #6f2b8f;">support@kashtrix.com</a></p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"${settings.fromName}" <${settings.fromEmail}>`,
        to: params.email,
        replyTo: settings.fromEmail,
        subject: settings.autoReplySubject,
        text: `Dear ${params.name},\n\nThank you for reaching out to Kashtrix regarding ${params.product}. We have received your inquiry for ${params.company} and our solution team will reply within 1 business day.\n\nBest regards,\nKashtrix Broadcast Systems\nsupport@kashtrix.com\nhttps://kashtrix.com`,
        html: customerHtml,
      });
      results.autoReplySent = true;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Failed to send customer auto-reply email:", errorMsg);
      results.autoReplyError = errorMsg;
    }
  }

  return results;
}

export interface StaffLiveChatAlertParams {
  sessionId: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  transcript: Array<{ sender: string; text: string }>;
  reason?: string;
}

export async function sendStaffLiveChatAlert(params: StaffLiveChatAlertParams) {
  try {
    let settings = await prisma.emailSetting.findFirst({ where: { id: 1 } });
    if (!settings) {
      settings = {
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
        autoReplySubject: "Thank you for contacting Kashtrix",
        updatedAt: new Date(),
      };
    }

    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPassword,
      },
      tls: { rejectUnauthorized: false },
    });

    const transcriptHtml = params.transcript
      .slice(-10)
      .map((m) => `<strong>[${escapeHtml(m.sender.toUpperCase())}]:</strong> ${escapeHtml(m.text)}`)
      .join("<br/><br/>");

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 2px solid #ec1778; border-radius: 8px; background: #ffffff;">
        <div style="border-bottom: 2px solid #4b1b63; padding-bottom: 12px; margin-bottom: 20px;">
          <span style="background: #ec1778; color: #fff; padding: 3px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; text-transform: uppercase;">Urgent Live Chat Request</span>
          <h2 style="color: #4b1b63; margin: 8px 0 0 0; font-size: 20px;">Customer Requested Live Staff Support</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #171219;">
          <tr><td style="padding: 6px 0; width: 35%; font-weight: bold; color: #4b1b63;">Customer Name:</td><td>${escapeHtml(params.userName || "Anonymous Guest")}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #4b1b63;">Work Email:</td><td>${escapeHtml(params.userEmail || "Not provided")}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #4b1b63;">Phone / WhatsApp:</td><td>${escapeHtml(params.userPhone || "Not provided")}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #4b1b63;">Session ID:</td><td><code>${escapeHtml(params.sessionId)}</code></td></tr>
        </table>

        <div style="margin-top: 20px; background: #faf8fb; border: 1px solid #e8e2e9; padding: 14px; border-radius: 6px; font-size: 13px; line-height: 1.5; color: #231b27;">
          <div style="font-weight: bold; color: #4b1b63; margin-bottom: 8px;">Recent Chat Transcript:</div>
          ${transcriptHtml || "<em>No messages yet</em>"}
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="http://localhost:3000/admin/chat" style="display: inline-block; background: #4b1b63; color: #ffffff; padding: 10px 20px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 4px;">
            Open Live Chat Console in Admin Panel →
          </a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: "support@kashtrix.com",
      subject: `[LIVE CHAT ALERT] ${params.userName || "Customer"} requested live support (${params.sessionId.slice(0, 8)})`,
      html: emailHtml,
    });
  } catch (err) {
    console.error("Failed to send staff live chat alert email:", err);
  }
}

function escapeHtml(str: string): string {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
