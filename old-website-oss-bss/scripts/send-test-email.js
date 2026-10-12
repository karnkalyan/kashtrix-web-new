const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendTestEmail() {
  const host = process.env.SMTP_HOST || "mail.simulcast.com.np";
  const user = process.env.SMTP_USER || "support@simulcast.com.np";
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "support@simulcast.com.np";
  const recipients = ["info@kashtrix.com", "karnkalyan@gmail.com"];

  // Test Port 465 (SSL) and Port 587 (TLS)
  const portsToTest = [
    { port: 465, secure: true },
    { port: 587, secure: false },
    { port: 25, secure: false },
  ];

  let transporter = null;
  let successfulPort = null;

  for (const config of portsToTest) {
    console.log(`Connecting to SMTP server ${host}:${config.port} (secure: ${config.secure}) as ${user}...`);
    const testTransporter = nodemailer.createTransport({
      host: host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      await testTransporter.verify();
      console.log(`✓ SMTP Connection verified successfully on port ${config.port}!`);
      transporter = testTransporter;
      successfulPort = config.port;
      break;
    } catch (err) {
      console.log(`Port ${config.port} failed:`, err.message);
    }
  }

  if (!transporter) {
    console.error("❌ Failed to authenticate on all ports (465, 587, 25).");
    process.exit(1);
  }

  for (const recipient of recipients) {
    try {
      console.log(`Sending test email from ${from} to ${recipient}...`);

      const info = await transporter.sendMail({
        from: `"Kashtrix" <${from}>`,
        to: recipient,
        replyTo: from,
        subject: "Kashtrix - Email Integration Test Verified",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
            <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #e11d72; padding-bottom: 16px;">
              <h1 style="color: #e11d72; margin: 0; font-size: 24px;">Kashtrix</h1>
              <p style="color: #64748b; font-size: 14px; margin-top: 4px;">AI-Powered ISP Management & Telecom OSS/BSS Platform</p>
            </div>

            <h2 style="color: #0f172a; font-size: 18px;">Email System Verification</h2>

            <p>Hello,</p>

            <p>This test email was successfully dispatched from <strong>${from}</strong> via SMTP server <code>${host}:${successfulPort}</code>.</p>

            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Status:</strong> Delivered Successfully</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #334155;"><strong>Sender:</strong> ${from}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #334155;"><strong>Recipient:</strong> ${recipient}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #334155;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            </div>

            <p>All forms on <a href="https://kashtrix.com" style="color: #e11d72; font-weight: bold;">kashtrix.com</a> (Contact, Custom Demo Requests, Tell Us What You Need) will automatically route notifications to <strong>info@kashtrix.com</strong> and send confirmation receipts to users.</p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

            <p style="font-size: 11px; color: #94a3b8; text-align: center;">
              Kashtrix · Global Operations: Dubai | Singapore | Dallas | Kathmandu<br />
              Email: info@kashtrix.com · Web: kashtrix.com
            </p>
          </div>
        `,
      });

      console.log(`==================================================`);
      console.log(`✓ TEST EMAIL SENT TO ${recipient}!`);
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
      console.log(`==================================================`);
    } catch (err) {
      console.error(`❌ Failed to send test email to ${recipient}:`, err.message);
    }
  }
}

sendTestEmail();
