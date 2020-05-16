require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});

const PORT = process.env.PORT || 3333;

const DATABASE_URL = process.env.DATABASE_URL || null;

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

module.exports = { PORT, DATABASE_URL, MAIL_PASSWORD, MAIL_USER };
