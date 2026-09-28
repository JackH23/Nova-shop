const nodemailer = require("nodemailer");
const { Resend } = require("resend");

// Gmail / Nodemailer
// Used for customer verification emails
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Resend
// Used for admin order notifications
const resend = new Resend(process.env.RESEND_API_KEY);

// Customer verification email
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
// Uses Resend instead of Gmail
const sendAdminOrderNotification = async ({
  order,
  payment,
  customer,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "NovaShop <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL],

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

    if (error) {
      console.error("Resend admin notification failed:", error);

      return {
        success: false,
        error,
      };
    }

    console.log("Admin notification sent with Resend:", data?.id);

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    console.error("Resend admin notification failed:", error);

    return {
      success: false,
      error,
    };
  }
};

module.exports = {
  sendVerificationEmail,
  sendAdminOrderNotification,
};