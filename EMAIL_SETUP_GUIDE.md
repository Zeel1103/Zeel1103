# Email Sending Setup - SendGrid Integration Guide

## ✅ Changes Made

### 1. **Migrated from Resend to SendGrid**
   - **Old Provider**: Resend (limited to verified email on free tier)
   - **New Provider**: SendGrid (100 emails/day free, sends to any recipient)
   - **Benefit**: Now sends emails to ALL users without domain purchase requirement

### 2. **Created `/lib/sendgridEmailService.ts`**
   - Utility functions to render React email components to HTML
   - Handles SendGrid API communication
   - Returns standardized success/error responses
   - Includes error logging for debugging

### 3. **Updated Email Routes**
   - `/api/send-email/route.ts` - Now uses SendGrid
   - `/api/appointments/create/route.ts` - Now uses SendGrid
   - `/api/test-email/route.ts` - Now uses SendGrid

## 🚀 Setup Instructions

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com
2. Sign up for a free account
3. Verify your email address
4. Accept the terms

### Step 2: Get Your API Key
1. Log in to SendGrid dashboard
2. Go to **Settings → API Keys** (left sidebar)
3. Click **Create API Key**
4. Name it: `ai-medical-voice-agent`
5. Select **Full Access**
6. Click **Create & Edit**
7. Copy the API key (shown only once!)

### Step 3: Add to Environment Variables
1. Open your `.env.local` file
2. Add this line:
```
SENDGRID_API_KEY=SG.your_api_key_here
```
3. Save the file
4. Restart your development server

### Step 4: Verify Sender Email (Optional but Recommended)
By default, SendGrid testing mode allows sending from `noreply@medicalvoiceagent.com`. To send from a custom domain:

1. Go to **Settings → Sender Authentication** in SendGrid dashboard
2. Click **Verify a Domain** or **Verify an Email**
3. Follow the verification steps
4. Update the `from` addresses in the email routes to use your verified sender

## 🧪 Testing Email Sending

### Test 1: Using the Test Endpoint
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "patientEmail": "your-email@example.com",
    "doctorEmail": "another-email@example.com"
  }'
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Both test emails sent successfully!",
  "details": {
    "patientEmail": {
      "sent": true,
      "status": "fulfilled",
      "id": "email-msg-id-123"
    },
    "doctorEmail": {
      "sent": true,
      "status": "fulfilled",
      "id": "email-msg-id-456"
    }
  }
}
```

### Test 2: Check Environment Variables
Verify your `.env.local` has:
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

### Test 3: Book an Appointment
1. Log in to your dashboard
2. Click "Book Appointment"
3. Select a doctor, date, and time slot
4. Click "Confirm Booking"
5. Check both email inboxes (patient and doctor) for confirmation emails

**Check Server Logs:**
```
📧 [APPOINTMENT_EMAIL_RESULTS] {
  patientEmail: {
    to: "patient@example.com",
    status: "fulfilled",
    sent: true
  },
  doctorEmail: {
    to: "doctor@example.com",
    status: "fulfilled",
    sent: true
  }
}
```

## 🔍 Troubleshooting

### Problem: "SENDGRID_API_KEY is undefined"

**Solution:**
1. Make sure you added `SENDGRID_API_KEY` to `.env.local` (not `.env`)
2. **Restart your dev server** - environment variables are loaded once on startup
3. Check that the API key is correct (should start with `SG.`)

### Problem: "Error: Invalid API key"

**Solution:**
1. Go to SendGrid dashboard
2. Go to **Settings → API Keys**
3. Check that the key hasn't been revoked
4. Create a new API key if needed
5. Update `.env.local` with the new key

### Problem: "Email send returned an error"

**Check the server logs for detailed error message:**
```
[SENDGRID_ERROR] {
  error: "Full error message from SendGrid"
}
```

**Common SendGrid Errors:**
- **"Unauthorized"** - Invalid API key
- **"Bad Request"** - Missing email or invalid email format
- **"Invalid from email"** - Sender email not verified

### Problem: "Emails show as sent but not received"

**Check SendGrid Activity:**
1. Log in to SendGrid dashboard
2. Go to **Metrics → Activity** (left sidebar)
3. Look for your test emails
4. Check the status - likely "Dropped" or "Bounce"

**Possible causes:**
1. **Email address is invalid** - Check format (must be valid email)
2. **Recipient email is on suppression list** - It was previously bounced
3. **Email landed in SPAM** - Check spam folder in recipient inbox

### Problem: "Daily email limit reached (100 emails)"

SendGrid free tier allows 100 emails per day. If you need more:
- Upgrade to a paid plan
- Or use a different email service (Mailgun: 35k emails/month free)

## 📊 Free Tier Limits

- **SendGrid Free**: 100 emails/day
- **Mailgun Free**: 35,000 emails/month (~1,167 per day)
- **Brevo Free**: 300 emails/day

If you need higher limits, consider switching to Mailgun.

## 📝 Files Modified/Created

1. ✅ `/lib/sendgridEmailService.ts` - New utility service
2. ✅ `/app/api/send-email/route.ts` - Updated to use SendGrid
3. ✅ `/app/api/appointments/create/route.ts` - Updated to use SendGrid
4. ✅ `/app/api/test-email/route.ts` - Updated to use SendGrid
5. ✅ `/app/emails/PatientConfirmationEmail.tsx` - No changes needed
6. ✅ `/app/emails/DoctorNotificationEmail.tsx` - No changes needed

## 🎯 What Should Happen Now

When a patient books an appointment:
1. ✅ Appointment is saved to database
2. ✅ Unique Jitsi Meet link is generated
3. ✅ Email sent to patient with confirmation and meet link
4. ✅ Email sent to doctor with booking details and meet link
5. ✅ Both emails include appointment date, time, and video call link
6. ✅ **Works for ANY email address** (no domain purchase needed)

## ✨ Key Improvement

**Before (Resend):** Could only send to verified email address without purchasing a domain  
**After (SendGrid):** Can send to any email address, 100 emails/day on free tier

## Need More Help?

Check the server console for email logs:
- `[APPOINTMENT_EMAIL_RESULTS]` - Shows appointment email status
- `[TEST_EMAIL_RESULTS]` - Shows test email status
- `[SENDGRID_ERROR]` - Shows sendGrid-specific errors

If you still have issues:
1. Check `.env.local` has `SENDGRID_API_KEY`
2. Verify the API key is valid in SendGrid dashboard
3. Check SendGrid activity logs for delivery status
4. Provide the full error message from server logs
