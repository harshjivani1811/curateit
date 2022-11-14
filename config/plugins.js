module.exports = ({ env }) => ({
  "request-id": {
    enabled: true,
    config: {
      correlationIdHeader: "X-Amzn-Trace-Id",
    },
  },
});

module.exports = ({ env }) => {
  return ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          // service: 'gmail',
          host: 'smtp.zoho.eu',
          port: 587,
          secure: false,
          auth: { 
            user: 'noreply@curateit.com',
            pass: 'vf1UH8CNSGTU',
          },
          tls: { rejectUnauthorized: false },

        },
        settings: {
          defaultFrom: 'noreply@curateit.com',
          defaultReplyTo: 'noreply@curateit.com',
        },
      }
    },
  });
};
