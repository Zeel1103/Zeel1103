import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  from?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email via Resend (verified senders only)
 * Add sender emails in Resend dashboard first
 */
export async function sendEmailViaResend({
  to,
  subject,
  react,
  from = 'onboarding@resend.dev',
}: SendEmailParams): Promise<EmailResult> {
  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      react: react as React.ReactElement,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      messageId: result.data?.id || `${Date.now()}`,
    };
  } catch (error: any) {
    console.error('[RESEND_ERROR]', {
      to,
      subject,
      error: error.message || error,
    });

    return {
      success: false,
      error: error.message || 'Failed to send email',
    };
  }
}

/**
 * Send email to multiple recipients
 */
export async function sendEmailToMultipleRecipients(
  recipients: string[],
  subject: string,
  react: React.ReactElement,
  from?: string,
): Promise<EmailResult> {
  return sendEmailViaResend({
    to: recipients,
    subject,
    react,
    from,
  });
}
