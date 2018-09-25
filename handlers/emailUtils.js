const emailConfig = require('../emailConfig')();
const mailgun = require('mailgun-js')(emailConfig);

exports.sendEmail = (recipient, message, attachment) => {
  Promise((resolve, reject) => {
    const data = {
      from: 'Dogukan Aydogdu <me@dogukanaydogdu.com>',
      to: recipient,
      subject: message.subject,
      text: message.text,
      inline: attachment,
      html: message.html,
    };

    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};
