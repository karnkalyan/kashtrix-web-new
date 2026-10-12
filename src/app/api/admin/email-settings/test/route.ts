import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testRecipient } = body;

    const settings = await prisma.emailSetting.findFirst({ where: { id: 1 } });
    if (!settings) {
      return NextResponse.json({ ok: false, error: "Email configuration not found" }, { status: 404 });
    }

    const recipient = testRecipient || settings.notificationRecipient || "support@kashtrix.com";

    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Send a test email
    const info = await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: recipient,
      subject: `[Kashtrix Admin] SMTP Diagnostic Test — ${new Date().toLocaleTimeString()}`,
      text: `This is a diagnostic verification email sent from Kashtrix Admin Panel to verify active SMTP relay.\n\nServer: ${settings.smtpHost}:${settings.smtpPort}\nAuthenticated User: ${settings.smtpUser}\nStatus: Active and operational.`,
      html: `
        <div style="font-family: sans-serif; max-width: 550px; padding: 24px; border: 1px solid #4b1b63; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #4b1b63; margin-top: 0;">Kashtrix SMTP Diagnostic Test</h2>
          <p style="color: #16a34a; font-weight: bold; font-size: 15px;">✓ Connection & Authentication Successful</p>
          <p style="color: #4b5563; font-size: 14px;">This diagnostic message confirms that your Kashtrix Nodemailer transporter is correctly communicating with your mail server.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; font-size: 13px; font-family: monospace; color: #334155;">
            <div><strong>Host:</strong> ${settings.smtpHost}</div>
            <div><strong>Port:</strong> ${settings.smtpPort} (SSL: ${settings.smtpSecure ? "Enabled" : "Disabled"})</div>
            <div><strong>Sender:</strong> ${settings.smtpUser}</div>
            <div><strong>Timestamp:</strong> ${new Date().toISOString()}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: `Test email successfully dispatched to ${recipient}`,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("SMTP Test Failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed to establish SMTP connection or deliver test email.",
      },
      { status: 500 }
    );
  }
}
