import { NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/resendEmailService";
import PatientConfirmationEmail from "@/app/emails/PatientConfirmationEmail";
import DoctorNotificationEmail from "@/app/emails/DoctorNotificationEmail";

export async function POST(req: Request) {
  try {
    const { patientEmail, doctorEmail, testMode } = await req.json();

    if (!patientEmail || !doctorEmail) {
      return NextResponse.json(
        { error: "Missing patientEmail or doctorEmail" },
        { status: 400 }
      );
    }

    const testDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const testMeetLink = `https://meet.jit.si/test-${Date.now()}`;

    console.log("[TEST_EMAIL] Sending test emails...", {
      patientEmail,
      doctorEmail,
      timestamp: new Date().toISOString(),
    });

    // Send test emails via Resend
    const [patientResult, doctorResult] = await Promise.allSettled([
      sendEmailViaResend({
        to: patientEmail,
        subject: "🧪 TEST: Your Appointment is Confirmed!",
        react: PatientConfirmationEmail({
          patientName: "Test Patient",
          doctorName: "Test Doctor",
          appointmentDate: testDate,
          meetLink: testMeetLink,
        }),
      }),
      sendEmailViaResend({
        to: doctorEmail,
        subject: "🧪 TEST: New Appointment with Test Patient",
        react: DoctorNotificationEmail({
          doctorName: "Test Doctor",
          patientName: "Test Patient",
          appointmentDate: testDate,
          meetLink: testMeetLink,
        }),
      }),
    ]);

    // Extract results
    const patientData = patientResult.status === "fulfilled" ? patientResult.value : null;
    const doctorData = doctorResult.status === "fulfilled" ? doctorResult.value : null;

    const results = {
      patientEmail: {
        to: patientEmail,
        sent: patientData?.success || false,
        status: patientResult.status,
        id: patientData?.messageId || null,
        error: patientData?.error || (patientResult.status === "rejected" ? patientResult.reason : null),
      },
      doctorEmail: {
        to: doctorEmail,
        sent: doctorData?.success || false,
        status: doctorResult.status,
        id: doctorData?.messageId || null,
        error: doctorData?.error || (doctorResult.status === "rejected" ? doctorResult.reason : null),
      },
    };

    console.log("📧 [TEST_EMAIL_RESULTS]", results);

    // If both failed, return error
    if (!results.patientEmail.sent && !results.doctorEmail.sent) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send both emails",
          details: results,
        },
        { status: 500 }
      );
    }

    // If one failed, return warning
    if (!results.patientEmail.sent || !results.doctorEmail.sent) {
      return NextResponse.json({
        success: true,
        message: "Partially successful - one email failed",
        details: results,
      });
    }

    // Both successful
    return NextResponse.json({
      success: true,
      message: "Both test emails sent successfully!",
      details: results,
    });
  } catch (error: any) {
    console.error("[TEST_EMAIL_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
        details: error,
      },
      { status: 500 }
    );
  }
}
