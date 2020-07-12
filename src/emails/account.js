const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'anujs787@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome ${name}`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'anujs787@gmail.com',
    subject: 'Thanks for using our service!',
    text: `Hey ${name}, thanks for using our service. May we know the reason why are you leaving us?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
