const rateLimit = require("express-rate-limit");

function getClientIp(req) {
  const cloudflareIp = req.headers["cf-connecting-ip"];

  if (typeof cloudflareIp === "string" && cloudflareIp.trim()) {
    return cloudflareIp.trim();
  }

  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
}

const loginRateLimiter = rateLimit({
  // 15-minute window
  windowMs: 15 * 60 * 1000,

  // Maximum 5 attempts per IP
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  // Cloudflare Workers does not always expose the client address through
  // Express in the same way as a traditional Node server. Use Cloudflare's
  // client-IP header first so express-rate-limit does not fail while
  // generating its default IP key.
  keyGenerator: (req) => getClientIp(req),

  handler: (req, res) => {
    const resetTime = req.rateLimit.resetTime;

    let retryAfterSeconds = 15 * 60;

    if (resetTime) {
      retryAfterSeconds = Math.max(
        1,
        Math.ceil(
          (resetTime.getTime() - Date.now()) / 1000,
        ),
      );
    }

    const minutes = Math.floor(
      retryAfterSeconds / 60,
    );

    const seconds =
      retryAfterSeconds % 60;

    return res.status(429).json({
      message: "Too many login attempts.",
      retryAfterSeconds,
      retryAfterMinutes: Math.ceil(
        retryAfterSeconds / 60,
      ),
      retryAfterText: `${minutes}m ${seconds}s`,
    });
  },
});

module.exports = loginRateLimiter;
