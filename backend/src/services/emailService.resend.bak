const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "NovaShop <onboarding@resend.dev>";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is required to send email");
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error?.message ||
      `Resend request failed with status ${response.status}`;

    throw new Error(`Resend email failed: ${message}`);
  }

  return result;
}

const sendVerificationEmail = async (email, code) => {
  const safeCode = escapeHtml(code);

  return sendEmail({
    to: email,
    subject: "Verify your NovaShop account",
    html: `
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <h1>${safeCode}</h1>
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
  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required for order notifications");
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Order - ${order.order_no}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Order Number:</strong> ${escapeHtml(order.order_no)}</p>
      <p><strong>Customer:</strong> ${escapeHtml(customer.fullName)}</p>
      <p><strong>Customer Email:</strong> ${escapeHtml(customer.email)}</p>
      <p><strong>Total:</strong> $${Number(order.total_amount).toFixed(2)}</p>
      <p><strong>Payment Method:</strong> ${escapeHtml(payment.payment_method)}</p>
      <p><strong>Payment Status:</strong> ${escapeHtml(payment.status)}</p>
      <p><strong>Transaction ID:</strong> ${escapeHtml(payment.transaction_id ?? "N/A")}</p>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendAdminOrderNotification,
};
