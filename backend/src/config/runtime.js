let workerEnv = null;

function setWorkerEnv(env) {
  workerEnv = env;

  process.env.NODE_ENV = "production";
  process.env.CLOUDFLARE_WORKER = "true";

  const passthrough = [
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "EMAIL_USER",
    "EMAIL_APP_PASSWORD",
    "STRIPE_SECRET_KEY",
    "GOOGLE_CLIENT_ID",
    "FRONTEND_URL",
    "R2_PUBLIC_URL",
  ];

  for (const key of passthrough) {
    if (env[key] !== undefined) {
      process.env[key] = String(env[key]);
    }
  }
}

function getWorkerEnv() {
  return workerEnv;
}

module.exports = {
  setWorkerEnv,
  getWorkerEnv,
};
