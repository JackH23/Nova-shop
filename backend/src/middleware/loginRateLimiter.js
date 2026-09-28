const attempts = new Map();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const loginRateLimiter = (req, res, next) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.ip ||
    "unknown";

  const now = Date.now();

  let record = attempts.get(ip);

  if (!record || now >= record.resetAt) {
    record = {
      count: 0,
      resetAt: now + WINDOW_MS,
    };
  }

  record.count += 1;
  attempts.set(ip, record);

  if (record.count > MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((record.resetAt - now) / 1000),
    );

    const minutes = Math.floor(retryAfterSeconds / 60);
    const seconds = retryAfterSeconds % 60;

    res.setHeader("Retry-After", retryAfterSeconds);

    return res.status(429).json({
      message: "Too many login attempts.",
      retryAfterSeconds,
      retryAfterMinutes: Math.ceil(retryAfterSeconds / 60),
      retryAfterText: `${minutes}m ${seconds}s`,
    });
  }

  next();
};

module.exports = loginRateLimiter;