const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"NovaShop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your NovaShop account",

    html: `
      <h2>Verify your email</h2>

      <p>Your verification code is:</p>

      <h1>${code}</h1>

      <p>This code expires in 10 minutes.</p>

      <p>If you didn't create a NovaShop account, you can ignore this email.</p>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
};