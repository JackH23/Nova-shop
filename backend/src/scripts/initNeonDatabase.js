const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env.production.local");
const result = dotenv.config({ path: envPath, override: true });

if (result.error) {
  console.error("Could not load .env.production.local");
  console.error(result.error.message);
  process.exit(1);
}

process.env.NODE_ENV = "production";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing from .env.production.local");
  process.exit(1);
}

// Load the configured Sequelize instance and all model associations only after
// the production environment has been established.
const sequelize = require("../config/database");
require("../models/associations");

async function initNeonDatabase() {
  try {
    console.log("Connecting to Neon PostgreSQL...");
    await sequelize.authenticate();
    console.log("Neon PostgreSQL connected successfully");

    console.log("Synchronizing Sequelize models...");
    await sequelize.sync();
    console.log("Neon database tables synchronized successfully");
  } catch (error) {
    console.error("Neon database initialization failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await sequelize.close().catch(() => {});
  }
}

initNeonDatabase();
