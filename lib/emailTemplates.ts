/**
 * HTML Email Templates for Brevo
 * Beautiful, responsive email templates for appointment confirmations
 */

/**
 * Patient Confirmation Email Template
 */
export function getPatientConfirmationHtml({
  patientName,
  doctorName,
  appointmentDate,
  meetLink,
}: {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  meetLink: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981, #059669); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                ✅ Appointment Confirmed!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px;">
                Your booking has been successfully scheduled
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi <strong>${patientName}</strong>,
              </p>
              <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                Your appointment has been successfully booked. Here are your appointment details:
              </p>

              <!-- Appointment Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">👨‍⚕️ Doctor</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">${doctorName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 8px; border-top: 1px solid #e5e7eb;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">📅 Date & Time</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">${appointmentDate}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 0; border-top: 1px solid #e5e7eb;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">🎥 Consultation Type</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">Video Call</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Join Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${meetLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 40px; border-radius: 12px; letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                      🎥 Join Video Consultation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 0 0 8px; text-align: center;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #3b82f6; font-size: 13px; word-break: break-all; text-align: center; margin: 0 0 20px;">
                <a href="${meetLink}" style="color: #3b82f6; text-decoration: underline;">${meetLink}</a>
              </p>

              <!-- Reminder -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fffbeb; border-radius: 8px; border: 1px solid #fde68a;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
                      ⏰ <strong>Reminder:</strong> Please join 5 minutes before your scheduled appointment time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2026 Ai-with-healthcare. All rights reserved.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 8px 0 0;">
                This is an automated confirmation email. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Doctor Notification Email Template
 */
export function getDoctorNotificationHtml({
  doctorName,
  patientName,
  appointmentDate,
  meetLink,
}: {
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  meetLink: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Scheduled</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                📅 New Appointment Scheduled
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px;">
                A patient has booked an appointment with you
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hello Dr. <strong>${doctorName}</strong>,
              </p>
              <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
                A new appointment has been booked with you. Here are the details:
              </p>

              <!-- Appointment Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">👤 Patient Name</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">${patientName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 8px; border-top: 1px solid #e5e7eb;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">📅 Date & Time</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">${appointmentDate}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 0; border-top: 1px solid #e5e7eb;">
                          <span style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">🎥 Consultation Type</span>
                          <p style="color: #111827; font-size: 17px; font-weight: 600; margin: 4px 0 0;">Video Call</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Join Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${meetLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 40px; border-radius: 12px; letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);">
                      🎥 Join Video Consultation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 0 0 8px; text-align: center;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #3b82f6; font-size: 13px; word-break: break-all; text-align: center; margin: 0 0 20px;">
                <a href="${meetLink}" style="color: #3b82f6; text-decoration: underline;">${meetLink}</a>
              </p>

              <!-- Reminder -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 500;">
                      ⏰ <strong>Reminder:</strong> Please be ready 5 minutes before the scheduled appointment time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2026 Ai-with-healthcare. All rights reserved.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 8px 0 0;">
                This is an automated notification email. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
