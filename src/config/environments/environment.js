require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});

export const PORT = process.env.PORT || 3333;

export const DATABASE_URL = process.env.DATABASE_URL || null;

export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
