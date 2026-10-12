import nodemailer from "nodemailer";

interface EmailOptions {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
  userEmail?: string;
  userConfirmationSubject?: string;
  userConfirmationHtml?: string;
}

export async function sendNotificationEmail(options: EmailOptions) {
  const {
    to = "info@kashtrix.com, karnkalyan@gmail.com",
    subject,
    html,
    replyTo,
    userEmail,
    userConfirmationSubject,
    userConfirmationHtml,
  } = options;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM || "info@kashtrix.com";

  const adminRecipients = "info@kashtrix.com, karnkalyan@gmail.com";

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
      });

      // 1. Send notification to Kashtrix team (info@kashtrix.com & karnkalyan@gmail.com)
      const adminMailInfo = await transporter.sendMail({
        from: `"Kashtrix" <${fromEmail}>`,
        to: adminRecipients,
        replyTo: replyTo || userEmail || "info@kashtrix.com",
        subject: `[Kashtrix Website] ${subject}`,
        html,
      });

      console.log("Admin notification email sent:", adminMailInfo.messageId);

      // 2. Send confirmation receipt to user work email if provided
      if (userEmail) {
        const confirmSubject = userConfirmationSubject || "We received your inquiry - Kashtrix Engineering Team";
        const confirmHtml = userConfirmationHtml || `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #e11d72; margin: 0;">Kashtrix</h2>
              <p style="color: #64748b; font-size: 14px; margin-top: 4px;">AI-Powered ISP Management & Telecom OSS/BSS Platform</p>
            </div>
            <p>Hello,</p>
            <p>Thank you for contacting <strong>Kashtrix</strong>. We have successfully received your inquiry and our Senior Telecom Solutions Architects are reviewing your details.</p>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #e11d72; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Query Summary:</strong> ${subject}</p>
            </div>
            <p>A team member will reach out to your work email (<strong>${userEmail}</strong>) shortly with technical specifications or live sandbox details.</p>
            <br />
            <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Kashtrix · Global Operations: Dubai | Singapore | Dallas | Kathmandu<br />
              Contact: info@kashtrix.com · Website: <a href="https://kashtrix.com" style="color: #e11d72;">kashtrix.com</a>
            </p>
          </div>
        `;

        const userMailInfo = await transporter.sendMail({
          from: `"Kashtrix" <${fromEmail}>`,
          to: userEmail,
          replyTo: "info@kashtrix.com",
          subject: confirmSubject,
          html: confirmHtml,
        });

        console.log("User confirmation email sent:", userMailInfo.messageId);
      }

      return { success: true, sent: true };
    } catch (err) {
      console.error("Nodemailer error:", err);
      return { success: true, sent: false, error: String(err) };
    }
  } else {
    // Development / Log mode when SMTP environment variables are not set
    console.log("=== [EMAIL DISPATCH LOGGED (Simulated Mode)] ===");
    console.log("RECIPIENTS:", adminRecipients);
    console.log("USER CONFIRMATION TO:", userEmail || "N/A");
    console.log("SUBJECT:", subject);
    console.log("=====================================================");

    return { success: true, sent: false, simulated: true };
  }
}
