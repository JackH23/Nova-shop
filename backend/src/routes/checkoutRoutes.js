const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCheckout,
  placeOrder,
} = require("../controllers/checkoutController");

const router = express.Router();

// Load checkout data
router.get("/", authMiddleware, getCheckout);

// Place order
router.post("/", authMiddleware, placeOrder);

module.exports = router;