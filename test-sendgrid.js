const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY || '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';

console.log('Testing SendGrid API Key...');
console.log('API Key:', apiKey.substring(0, 10) + '...');

sgMail.setApiKey(apiKey);

// Test 1: Check API key validity
(async () => {
  try {
    const response = await sgMail.send({
      to: '22se02ce010@ppsu.ac.in',
      from: '22se02ce010@ppsu.ac.in',
      subject: 'Test Email',
      html: '<h1>Hello</h1>',
    });

    console.log('✅ Email sent successfully!');
    console.log('Response:', response);
  } catch (error) {
    console.error('❌ SendGrid Error:');
    console.error('Status:', error.status || error.code);
    console.error('Message:', error.message);
    console.error('Response:', error.response?.body || error.response || error);
  }
})();
