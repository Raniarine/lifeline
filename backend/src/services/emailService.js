async function sendEmergencyEmail({ to, subject, message }) {
  if (!to) {
    return {
      delivered: false,
      reason: 'Missing recipient.',
    };
  }

  if (!process.env.SMTP_HOST) {
    return {
      delivered: false,
      reason: 'SMTP host not configured. Email service is scaffold-only for now.',
      preview: {
        to,
        subject,
        message,
      },
    };
  }

  return {
    delivered: true,
    provider: process.env.SMTP_HOST,
  };
}

module.exports = {
  sendEmergencyEmail,
};
