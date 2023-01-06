import nodemailer from 'nodemailer';
import Config from './index';

let transporter = nodemailer.createTransport({
  host: Config.SMTP_MAIL_HOST,
  port: Config.SMTP_MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: Config.SMTP_MAIL_USERNAME, // generated ethereal user
    pass: Config.SMTP_MAIL_PASSWORD, // generated ethereal password
  },
});

export default transporter;
