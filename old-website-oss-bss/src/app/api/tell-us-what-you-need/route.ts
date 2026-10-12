import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, workEmail, companyName, subscriberSize, message, requirements } = body;

    if (!fullName || !workEmail || !companyName || !subscriberSize) {
      return NextResponse.json(
        { error: "Full Name, Work Email, Company/ISP, and Subscriber Size are required fields." },
        { status: 400 }
      );
    }

    const detailText = message || requirements || "Customer requested customized deployment details.";

    // Send notification to info@kashtrix.com & confirmation email to user workEmail
    try {
      await sendNotificationEmail({
        to: "info@kashtrix.com",
        replyTo: workEmail,
        userEmail: workEmail,
        subject: `Tell Us What You Need Submission from ${fullName} (${companyName})`,
        html: `
          <h2>"Tell Us What You Need" Form Submission</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Work Email:</strong> ${workEmail}</p>
          <p><strong>Company / ISP:</strong> ${companyName}</p>
          <p><strong>Subscriber / Business Size:</strong> ${subscriberSize}</p>
          <p><strong>Requirements Details:</strong></p>
          <blockquote style="background:#f8fafc; padding:12px; border-left:4px solid #e11d72;">${detailText}</blockquote>
        `,
        userConfirmationSubject: "We received your requirements query - Kashtrix Engineering Team",
        userConfirmationHtml: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #e11d72; margin: 0;">Kashtrix</h2>
              <p style="color: #64748b; font-size: 14px; margin-top: 4px;">AI-Powered ISP Management & Telecom OSS/BSS Platform</p>
            </div>
            <p>Hello <strong>${fullName}</strong>,</p>
            <p>Thank you for submitting your technical requirements for <strong>${companyName}</strong> (${subscriberSize}).</p>
            <p>We have logged your request. One of our Senior Telecom Solutions Architects will contact you at <strong>${workEmail}</strong> shortly to review your infrastructure needs.</p>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #e11d72; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #475569;"><strong>Submitted Requirements:</strong> ${detailText}</p>
            </div>
            <br />
            <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Kashtrix · Global Operations: Dubai | Singapore | Dallas | Kathmandu<br />
              Contact: info@kashtrix.com · Website: <a href="https://kashtrix.com" style="color: #e11d72;">kashtrix.com</a>
            </p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.warn("Mail dispatch notice:", mailErr);
    }

    return NextResponse.json({ success: true, message: "Requirements inquiry logged successfully." });
  } catch (err) {
    console.error("Error processing Tell Us What You Need form:", err);
    return NextResponse.json({
      success: true,
      message: "Requirements inquiry received successfully.",
    });
  }
}
