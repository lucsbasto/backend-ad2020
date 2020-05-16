const { transporter } = require('../config/mail/config');
const { MAIL_USER } = require('../config/environments/environment');

class EmailService {
  async send(name, email, friend) {
    const mailOptions = {
      from: MAIL_USER,
      to: email,
      subject: 'Amigo secreto',
      html: `
      <h3>Olá, ${name}.</h3>

      <p>Seu amigo secreto é: <b>${friend}</b></p>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new EmailService();
