const express = require("express");

const {
  getDashboardSummary,
  getOrders,
  getOrderById,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Dashboard overview
router.get(
  "/summary",
  authMiddleware,
  getDashboardSummary
);

// Get all orders for logged-in user
router.get(
  "/orders",
  authMiddleware,
  getOrders
);

// Get one order by ID
router.get(
  "/orders/:id",
  authMiddleware,
  getOrderById
);

module.exports = router;