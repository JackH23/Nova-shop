require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Load Sequelize associations
require("./models/associations");

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
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());

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
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

module.exports = app;