const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "avocarbon-com.mail.protection.outlook.com",
  port: 25,
  secure: false,
  auth: {
    user: "administration.STS@avocarbon.com",
    pass: "shnlgdyfbcztbhxn",
  },
});

const sendReportEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: '"Reports" <administration.STS@avocarbon.com>',
    to,
    subject,
    html
  });
};

module.exports = { sendReportEmail };
