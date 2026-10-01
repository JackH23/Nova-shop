const nodemailer = require("nodemailer");

async function getTransporter() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_APP_PASSWORD are required");
  }

  let host = "smtp.gmail.com";

  if (process.env.CLOUDFLARE_WORKER === "true") {
    const dns = require("node:dns").promises;
    const addresses = await dns.resolve4(host);

    if (!addresses.length) {
      throw new Error("Gmail SMTP DNS returned no IPv4 address");
    }

    host = addresses[0];
  }

  return nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    tls: {
      servername: "smtp.gmail.com",
    },
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(options) {
  const transporter = await getTransporter();

  try {
    return await transporter.sendMail({
      from: `"NovaShop" <${process.env.EMAIL_USER.trim()}>`,
      ...options,
    });
  } finally {
    transporter.close();
  }
}

const sendVerificationEmail = async (email, code) => {
  return sendEmail({
    to: email,
    subject: "Verify your NovaShop account",
    html: `
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <h1>${escapeHtml(code)}</h1>
      <p>This code expires in 10 minutes.</p>
      <p>
        If you didn't create a NovaShop account,
        you can ignore this email.
      </p>
    `,
  });
};

const sendAdminOrderNotification = async ({
  order,
  payment,
  customer,
}) => {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required for order notifications");
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Order - ${order.order_no}`,
    html: `
      <h2>New Order Received</h2>
      <p>
        <strong>Order Number:</strong>
        ${escapeHtml(order.order_no)}
      </p>
      <p>
        <strong>Customer:</strong>
        ${escapeHtml(customer.fullName)}
      </p>
      <p>
        <strong>Customer Email:</strong>
        ${escapeHtml(customer.email)}
      </p>
      <p>
        <strong>Total:</strong>
        $${Number(order.total_amount).toFixed(2)}
      </p>
      <p>
        <strong>Payment Method:</strong>
        ${escapeHtml(payment.payment_method)}
      </p>
      <p>
        <strong>Payment Status:</strong>
        ${escapeHtml(payment.status)}
      </p>
      <p>
        <strong>Transaction ID:</strong>
        ${escapeHtml(payment.transaction_id ?? "N/A")}
      </p>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendAdminOrderNotification,
};