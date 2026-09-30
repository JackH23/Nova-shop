const { Sequelize } = require("sequelize");
const pg = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const isCloudflareWorker = process.env.CLOUDFLARE_WORKER === "true";
const databaseUrl = process.env.DATABASE_URL?.trim();

if (isProduction && !databaseUrl) {
  throw new Error("DATABASE_URL is required when NODE_ENV=production");
}

const sequelize = isProduction
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: isCloudflareWorker
        ? {}
        : {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
      ...(isCloudflareWorker
        ? {
            // Hyperdrive owns the persistent pool. Keep the Sequelize pool
            // small and short-lived inside each Worker isolate.
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 1000,
              evict: 1000,
              maxUses: 1,
            },
          }
        : {}),
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: "mysql",
        logging: false,
      },
    );

module.exports = sequelize;
