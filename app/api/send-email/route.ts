import { NextResponse } from "next/server";
import { sendEmailViaBrevo } from "@/lib/brevoEmailService";
import { getPatientConfirmationHtml, getDoctorNotificationHtml } from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const { 
      doctorName, 
      doctorEmail,
      patientName, 
      patientEmail, 
      date, 
      slot, 
      meetLink 
    } = await req.json();

    // Validate required fields
    if (!doctorName || !doctorEmail || !patientName || !patientEmail || !date || !slot || !meetLink) {
      return NextResponse.json({ 
        error: "Missing required fields: doctorName, doctorEmail, patientName, patientEmail, date, slot, meetLink" 
      }, { status: 400 });
    }

    const appointmentDate = new Date(date).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Generate HTML email content
    const patientHtml = getPatientConfirmationHtml({
      patientName,
      doctorName,
      appointmentDate,
      meetLink,
    });

    const doctorHtml = getDoctorNotificationHtml({
      doctorName,
      patientName,
      appointmentDate,
      meetLink,
    });

    // Send emails to both patient and doctor via Brevo
    const [patientResult, doctorResult] = await Promise.allSettled([
      sendEmailViaBrevo({
        to: [{ email: patientEmail, name: patientName }],
        subject: "✅ Your Appointment is Confirmed!",
        htmlContent: patientHtml,
      }),
      sendEmailViaBrevo({
        to: [{ email: doctorEmail, name: doctorName }],
        subject: `📅 New Appointment with ${patientName}`,
        htmlContent: doctorHtml,
      }),
    ]);

    // Extract results
    const patientData = patientResult.status === "fulfilled" ? patientResult.value : null;
    const doctorData = doctorResult.status === "fulfilled" ? doctorResult.value : null;

    // Check if both emails sent successfully
    if (!patientData?.success || !doctorData?.success) {
      console.error("Email sending error:", { patientData, doctorData });
      return NextResponse.json({ 
        error: "Failed to send one or more emails",
        details: { patientData, doctorData }
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Emails sent successfully to both patient and doctor via Brevo",
      patientEmailId: patientData.messageId,
      doctorEmailId: doctorData.messageId
    });

  } catch (error: any) {
    console.error("[SEND_EMAIL_ERROR]", error);
    return NextResponse.json({ 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
