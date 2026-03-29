import { db } from "@/config/db";
import { appointmentsTable, doctorsTable } from "@/config/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { format } from "date-fns";
import { sendEmailViaBrevo } from "@/lib/brevoEmailService";
import { getPatientConfirmationHtml, getDoctorNotificationHtml } from "@/lib/emailTemplates";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { doctorId, sessionId, slotTime: slotTimeString } = body;
    const slotTime = new Date(slotTimeString);

    // --- Validation ---
    if (!doctorId || !sessionId || isNaN(slotTime.getTime())) {
      return NextResponse.json(
        { error: "Missing or invalid doctorId, sessionId, or slotTime" },
        { status: 400 }
      );
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const patientEmail = user.emailAddresses?.[0]?.emailAddress;
    const patientName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || (patientEmail ? patientEmail.split("@")[0] : "Patient");

    console.log("📧 [APPOINTMENT] Patient details:", {
      userId,
      patientName,
      patientEmail,
      emailCount: user.emailAddresses?.length || 0,
    });

    if (!patientEmail) {
      return NextResponse.json({ error: "Patient email not found" }, { status: 400 });
    }

    const [doctor] = await db.select().from(doctorsTable).where(eq(doctorsTable.id, doctorId));

    if (!doctor || !doctor.email) {
      return NextResponse.json({ error: "Doctor not found or missing email" }, { status: 404 });
    }

    // Check if the slot is already booked
    const existingAppointment = await db.select().from(appointmentsTable).where(
        and(
            eq(appointmentsTable.doctorId, doctorId),
            eq(appointmentsTable.slotTime, slotTime)
        )
    ).limit(1);

    if (existingAppointment.length > 0) {
        return NextResponse.json({ error: "This time slot is no longer available." }, { status: 409 });
    }
    
    // ✅ 1. Generate a unique Jitsi Meet link
    const meetId = randomUUID();
    const meetLink = `https://meet.jit.si/${meetId}`;

    // 2. Save appointment to DB with the new link
    await db.insert(appointmentsTable).values({
      userId,
      doctorId,
      sessionId: Number(sessionId),
      date: slotTime,
      slotTime,
      patientName,
      patientEmail,
      status: "confirmed",
      videoLink: meetLink,
    });

    // 3. Format the date for display in emails
    const formattedDate = format(slotTime, "eeee, MMMM dd, yyyy 'at' hh:mm a");

    // 4. Generate HTML email content
    const patientHtml = getPatientConfirmationHtml({
      patientName,
      doctorName: doctor.name,
      appointmentDate: formattedDate,
      meetLink,
    });

    const doctorHtml = getDoctorNotificationHtml({
      doctorName: doctor.name,
      patientName,
      appointmentDate: formattedDate,
      meetLink,
    });

    // 5. Send BOTH emails via Brevo
    const emailResults = await Promise.allSettled([
      sendEmailViaBrevo({
        to: [{ email: patientEmail, name: patientName }],
        subject: "✅ Your Appointment is Confirmed!",
        htmlContent: patientHtml,
      }),
      sendEmailViaBrevo({
        to: [{ email: doctor.email, name: doctor.name }],
        subject: `📅 New Appointment with ${patientName}`,
        htmlContent: doctorHtml,
      }),
    ]);

    // Extract results
    const patientEmailStatus = emailResults[0];
    const doctorEmailStatus = emailResults[1];

    const patientData = patientEmailStatus.status === "fulfilled" ? patientEmailStatus.value : null;
    const doctorData = doctorEmailStatus.status === "fulfilled" ? doctorEmailStatus.value : null;

    console.log("📧 [APPOINTMENT_EMAIL_RESULTS - BREVO]", {
      patientEmail: {
        to: patientEmail,
        status: patientEmailStatus.status,
        sent: patientData?.success || false,
        error: patientData?.error || (patientEmailStatus.status === "rejected" ? patientEmailStatus.reason : null),
        id: patientData?.messageId || null,
      },
      doctorEmail: {
        to: doctor.email,
        status: doctorEmailStatus.status,
        sent: doctorData?.success || false,
        error: doctorData?.error || (doctorEmailStatus.status === "rejected" ? doctorEmailStatus.reason : null),
        id: doctorData?.messageId || null,
      },
      timestamp: new Date().toISOString(),
    });

    const patientEmailSent = patientData?.success || false;
    const doctorEmailSent = doctorData?.success || false;

    // Return success even if emails fail (appointment is created)
    return NextResponse.json({ 
      success: true, 
      meetLink,
      emailsSent: {
        patient: patientEmailSent,
        doctor: doctorEmailSent,
      },
      appointment: {
        id: "booking_created",
        patientEmail,
        doctorEmail: doctor.email,
      }
    });
  } catch (err: any) {
    console.error("[BOOK_APPOINTMENT_ERROR]", err.message || err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
