/**
 * Brevo (formerly Sendinblue) Email Service
 * Sends transactional emails via Brevo's REST API
 */

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export interface BrevoEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  senderEmail?: string;
  senderName?: string;
}

export interface BrevoEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email via Brevo's Transactional Email API
 */
export async function sendEmailViaBrevo({
  to,
  subject,
  htmlContent,
  senderEmail,
  senderName,
}: BrevoEmailParams): Promise<BrevoEmailResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("[BREVO_ERROR] BREVO_API_KEY is not set in environment variables");
    return {
      success: false,
      error: "BREVO_API_KEY is not configured",
    };
  }

  const sender = {
    email: senderEmail || process.env.BREVO_SENDER_EMAIL || "jaguwalazeel@gmail.com",
    name: senderName || process.env.BREVO_SENDER_NAME || "Ai-with-healthcare confirm booking",
  };

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender,
        to: to.map((recipient) => ({
          email: recipient.email,
          name: recipient.name?.trim() || recipient.email.split("@")[0],
        })),
        subject,
        htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[BREVO_ERROR] API Response:", {
        status: response.status,
        data,
      });
      return {
        success: false,
        error: data.message || `Brevo API error: ${response.status}`,
      };
    }

    console.log("✅ [BREVO_SUCCESS] Email sent:", {
      to: to.map((r) => r.email),
      subject,
      messageId: data.messageId,
    });

    return {
      success: true,
      messageId: data.messageId || `brevo-${Date.now()}`,
    };
  } catch (error: any) {
    console.error("[BREVO_ERROR]", {
      to: to.map((r) => r.email),
      subject,
      error: error.message || error,
    });

    return {
      success: false,
      error: error.message || "Failed to send email via Brevo",
    };
  }
}

/**
 * Convenience function: Send email to a single recipient
 */
export async function sendBrevoEmailToOne({
  toEmail,
  toName,
  subject,
  htmlContent,
}: {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
}): Promise<BrevoEmailResult> {
  return sendEmailViaBrevo({
    to: [{ email: toEmail, name: toName }],
    subject,
    htmlContent,
  });
}
