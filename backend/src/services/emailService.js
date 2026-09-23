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

      <p>
        If you didn't create a NovaShop account,
        you can ignore this email.
      </p>
    `,
  });
};

// Admin notification after customer places an order
const sendAdminOrderNotification = async ({
  order,
  payment,
  customer,
}) => {
  await transporter.sendMail({
    from: `"NovaShop" <${process.env.EMAIL_USER}>`,

    to: process.env.ADMIN_EMAIL,

    subject: `New Order - ${order.order_no}`,

    html: `
      <h2>New Order Received</h2>

      <p>
        <strong>Order Number:</strong>
        ${order.order_no}
      </p>

      <p>
        <strong>Customer:</strong>
        ${customer.fullName}
      </p>

      <p>
        <strong>Customer Email:</strong>
        ${customer.email}
      </p>

      <p>
        <strong>Total:</strong>
        $${Number(order.total_amount).toFixed(2)}
      </p>

      <p>
        <strong>Payment Method:</strong>
        ${payment.payment_method}
      </p>

      <p>
        <strong>Payment Status:</strong>
        ${payment.status}
      </p>

      <p>
        <strong>Transaction ID:</strong>
        ${payment.transaction_id ?? "N/A"}
      </p>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendAdminOrderNotification,
};