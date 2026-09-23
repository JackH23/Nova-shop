const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  // 15-minute window
  windowMs: 15 * 60 * 1000,

  // Maximum 5 attempts per IP
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,

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