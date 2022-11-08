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
        
          service: 'gmail',
          port: 25,
          auth: {
            user: 'harshj.mobio@gmail.com',
            pass: 'xuvuwiqezlshpnup',
          },
          tls: { rejectUnauthorized: false },
          secure: false

        },
        settings: {
          defaultFrom: 'harshj.mobio@gmail.com',
          defaultReplyTo: 'harshj.mobio@gmail.com',
        },
      }
    },
  });
};