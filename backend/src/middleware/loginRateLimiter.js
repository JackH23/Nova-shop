const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  // 15-minute window
  windowMs: 15 * 60 * 1000,

  // Maximum 5 attempts per IP
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    message:
      "Too many login attempts. Please try again in 15 minutes.",
  },
});

module.exports = loginRateLimiter;