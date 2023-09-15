import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// For use with Gmail
const gmailTransporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USERNAME,
    pass: process.env.GOOGLE_APP_KEY,
  },
});

const zohoTransporter = createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USERNAME,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export default { zohoTransporter, gmailTransporter };
