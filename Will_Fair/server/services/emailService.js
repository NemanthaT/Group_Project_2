import nodemailer from 'nodemailer';

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error.message);
  } else {
    console.log('Email server is ready to send messages');
  }
});

/**
 * Send email using Gmail SMTP
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise} - Nodemailer send result
 */
async function sendEmail({ to, subject, text = '', html = '' }) {
  if (!to || !subject) {
    throw new Error('Email requires "to" and "subject" fields');
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'WillFair <no-reply@example.com>',
    to,
    subject,
    text,
    html: html || text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      to,
      subject,
      messageId: info.messageId
    });
    return info;
  } catch (error) {
    console.error('Email send error:', {
      to,
      subject,
      error: error.message
    });
    throw error;
  }
}

export { sendEmail };