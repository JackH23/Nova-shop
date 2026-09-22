const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCheckout,
  placeOrder,
  getOrderById,
  createPayment,
} = require("../controllers/checkoutController");

const router = express.Router();

// Load checkout data
router.get("/", authMiddleware, getCheckout);

// Place order
router.post("/order", authMiddleware, placeOrder);

// Get order by ID
router.get("/order/:id", authMiddleware, getOrderById);

// Create Stripe payment
router.post("/create-payment", authMiddleware, createPayment);

module.exports = router;