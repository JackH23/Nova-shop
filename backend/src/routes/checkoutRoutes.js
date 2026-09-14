const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCheckout,
  placeOrder,
  getOrderById,
} = require("../controllers/checkoutController");

const router = express.Router();

// Load checkout data
router.get("/", authMiddleware, getCheckout);

// Place order
router.post("/order", authMiddleware, placeOrder);

// Get order by ID
router.get("/order/:id", authMiddleware, getOrderById);

module.exports = router;