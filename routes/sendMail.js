const express = require('express');
const emailUtil = require('../handlers/emailUtils');

const sendMail = express.Router();


const { sendEmail } = emailUtil;
sendMail.post('/mail', async (req, res, next) => {
  const { recipient, message } = req.body;
  try {
    await sendEmail(recipient, message);
    res.json({ message: 'Your query has been sent' });
    await next();
  } catch (e) {
    await next(e);
  }
});
module.exports = sendMail;
