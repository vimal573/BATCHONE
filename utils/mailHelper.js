import transporter from '../config/transporter.config';
import Config from '../config/index';

const mailHelper = async options => {
  const message = {
    from: Config.SMTP_MAIL_SENDER_MAIL, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  await transporter.sendMail(message);
};

export default mailHelper;
