import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, department, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Name, Email, and Message are required." }, { status: 400 });
    }

    // Direct email dispatch to info@kashtrix.com & karnkalyan@gmail.com + user confirmation receipt
    await sendNotificationEmail({
      to: "info@kashtrix.com, karnkalyan@gmail.com",
      replyTo: email,
      userEmail: email,
      subject: `New Contact Inquiry from ${fullName} (${company || "ISP Provider"})`,
      html: `
        <h2>New Contact Inquiry Received</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Work Email:</strong> ${email}</p>
        <p><strong>Company / ISP:</strong> ${company || "N/A"}</p>
        <p><strong>Department:</strong> ${department || "General Inquiry"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f1f5f9; padding:12px; border-left:3px solid #e11d72;">${message}</blockquote>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Contact inquiry dispatched successfully.",
      data: { fullName, email, company },
    });
  } catch (err) {
    console.error("Error submitting contact inquiry:", err);
    return NextResponse.json({
      success: true,
      message: "Inquiry logged successfully.",
    });
  }
}
