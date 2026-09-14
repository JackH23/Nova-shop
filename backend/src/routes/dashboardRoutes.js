const express = require("express");

const {
  getOrderById,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/orders/:id",
  authMiddleware,
  getOrderById,
);

module.exports = router;