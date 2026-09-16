require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Load Sequelize associations
require("./models/associations");

const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const returnRoutes = require("./routes/returnRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();

app.use(cors());

// Debug incoming requests
app.use((req, res, next) => {
  console.log("\n========== REQUEST ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Content-Length:", req.headers["content-length"]);
  console.log("=============================\n");

  next();
});

app.use(express.json());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");

    await sequelize.sync();
    console.log("Database tables synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
};

startServer();