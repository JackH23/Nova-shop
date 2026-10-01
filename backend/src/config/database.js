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

// Models retain their definitions and associations on this Sequelize instance.
// Only the connection manager is request-scoped; model queries and transactions
// resolve it through AsyncLocalStorage, including concurrent Express requests.
if (isCloudflareWorker) {
  const { AsyncLocalStorage } = require("node:async_hooks");
  const requests = new AsyncLocalStorage();
  const definitionManager = sequelize.connectionManager;

  Object.defineProperty(sequelize, "connectionManager", {
    configurable: true,
    get() {
      return requests.getStore()?.database.connectionManager ?? definitionManager;
    },
  });

  sequelize.withRequestDatabase = (next) => {
    const database = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: {},
      pool: { max: 5, min: 0, acquire: 30000, idle: 1000, evict: 1000, maxUses: 1 },
      logging: false,
    });

    // Log connection failures as one event instead of a split stack trace.
    const manager = database.connectionManager;
    const acquire = manager.getConnection.bind(manager);
    manager.getConnection = async (...args) => {
      try {
        return await acquire(...args);
      } catch (error) {
        console.error("Database connection error details:", JSON.stringify({
          name: error.name,
          message: error.message,
          code: error.original?.code ?? error.parent?.code,
          cause: error.original?.message ?? error.parent?.message,
        }));
        throw error;
      }
    };

    return requests.run({ database }, () => next(database));
  };
}

module.exports = sequelize;
