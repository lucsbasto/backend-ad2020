const nodemailer = require('nodemailer');
const { MAIL_USER, MAIL_PASSWORD } = require('../environments/environment');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
module.exports = { transporter };
