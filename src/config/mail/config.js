import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASSWORD } from '../environments/environment';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
