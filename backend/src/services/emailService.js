const nodemailer = require("nodemailer");

async function getTransporter() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_APP_PASSWORD are required");
  }

  const host = "smtp.gmail.com";
  const port = 587;

  console.log("SMTP connection target:", {
    worker: process.env.CLOUDFLARE_WORKER,
    host,
    port,
  });

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    requireTLS: true,
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


async function sendWithGmailApi(options) {
  const names = ["EMAIL_USER", "GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REFRESH_TOKEN"];
  const settings = Object.fromEntries(names.map(name => [name, process.env[name]?.trim()]));
  for (const name of names) {
    if (!settings[name]) throw new Error(name + " is required for Gmail API");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: settings.GMAIL_CLIENT_ID,
      client_secret: settings.GMAIL_CLIENT_SECRET,
      refresh_token: settings.GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(15000),
  });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) {
    throw new Error("Gmail OAuth token refresh failed: " + (token.error || tokenResponse.status));
  }

  // Nodemailer only builds the MIME message here; it opens no SMTP connection.
  const composer = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "windows",
  });
  const message = await composer.sendMail({
    ...options,
    from: { name: "NovaShop", address: settings.EMAIL_USER },
  });
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token.access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: message.message.toString("base64url") }),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Gmail API send failed: " + response.status + " " + (result.error?.status || ""));
  }
  console.log("Gmail API: email accepted");
  return result;
}

async function sendEmail(options) {
  if (process.env.CLOUDFLARE_WORKER === "true") {
    return sendWithGmailApi(options);
  }

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

const sendAdminOrderNotification = async ({ order, payment, customer }) => {
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
