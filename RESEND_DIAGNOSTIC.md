# 🔍 Email Sending Diagnostic Guide

## Current Issue
Emails are returning with an error even though the promise is "fulfilled". This means Resend API is rejecting the request.

**Log Output Shows:**
```
patientEmail: { status: 'fulfilled', result: { data: null, error: [Object] } }
doctorEmail: { status: 'fulfilled', result: { data: null, error: [Object] } }
```

## Step 1: Check the Detailed Error Message

Run the test endpoint and check the console logs:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"patientEmail": "jaguwalazeel@gmail.com", "doctorEmail": "vikram@gmail.com"}'
```

**Look in your server terminal for:**
```
📧 [TEST_EMAIL_RESULTS] {
  patientEmail: {
    error: {
      message: "..."  <-- THIS IS THE KEY ERROR MESSAGE
    }
  }
}
```

Copy the exact error message and check against these common Resend errors:

## Common Resend Errors & Solutions

### ❌ Error: "Invalid 'from' address" or "Sender address not verified"
**Cause:** Using `onboarding@resend.dev` with unverified audience for this account

**Solution:** 
1. Go https://resend.com/emails
2. Verify that personal email addresses are whitelisted
3. OR add your custom domain and verify it

### ❌ Error: "Invalid email address" 
**Cause:** Email format is wrong or contains invalid characters

**Solution:**
- Verify patient email: should be valid format like `name@domain.com`
- Verify doctor email in database: `SELECT email FROM doctors;`

### ❌ Error: "Invalid API key" or "Unauthorized"
**Cause:** RESEND_API_KEY in `.env` is wrong or expired

**Solution:**
1. Go to https://resend.com/api-keys
2. Get your current API key
3. Update in `.env`: `RESEND_API_KEY=re_xxxxx`
4. Restart server: `npm run dev`

### ❌ Error: "From domain not verified"
**Cause:** You're using a custom domain that isn't verified yet

**Solution:**
1. Use `onboarding@resend.dev` temporarily
2. OR verify your custom domain in Resend dashboard

## Step 2: Validate Email Addresses

### Check Patient Email
```sql
-- via database console or Clerk dashboard
-- Make sure the user has a valid email address
SELECT email FROM users WHERE id = 'your_clerk_id';
```

### Check Doctor Email
```sql
SELECT id, name, email FROM doctors;
-- This should return emails like: vikram@gmail.com
```

## Step 3: Test with Resend Test Address

Try sending to Resend's test address first:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"patientEmail": "delivered@resend.dev", "doctorEmail": "delivered@resend.dev"}'
```

If this works, the problem is with the other email addresses.

## Step 4: Check Resend Account Settings

1. Go https://resend.com/settings
2. Check:
   - [ ] API key is valid and not expired
   - [ ] Domain is verified (if using custom domain)
   - [ ] Email addresses are whitelisted (if using sandbox mode)
   - [ ] Plan allows sending to external addresses

## Most Likely Issue for You

Based on your setup, the most common issue is:

**Using `onboarding@resend.dev` sender but trying to email addresses that aren't whitelisted**

### Quick Fix:
#### Option 1: Add Email Addresses to Whitelist
1. Go https://resend.com/settings/domains
2. Click "onboarding@resend.dev"
3. Add `jaguwalazeel@gmail.com` and `vikram@gmail.com` to whitelist
4. Try again

#### Option 2: Setup Custom Domain (Recommended)
1. Go https://resend.com/domains
2. Add your domain
3. Verify DNS records
4. Use your custom domain in `from` field:
   ```typescript
   from: "Booking Confirmation <noreply@yourdomain.com>"
   ```

#### Option 3: Use Different Sender
Try this in `/api/test-email` and `/api/appointments/create`:
```typescript
// Instead of:
from: "Booking Confirmation <onboarding@resend.dev>",

// Try:
from: "onboarding@resend.dev", // Use just the email
```

## Debug Commands

### Check if Resend API is responding:
```bash
curl -X GET https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json"
```

### Send a test email directly via Resend:
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "delivered@resend.dev",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

## Next Steps

1. **Check the error message** in your server logs under `[TEST_EMAIL_RESULTS]`
2. **Match it to the list above** to find the solution
3. **Apply the fix** based on the error type
4. **Test again** using `/api/test-email` endpoint
5. **Book an appointment** to verify it works end-to-end

---

**Once you know the error message, share it and I can help you fix it!** 📧
