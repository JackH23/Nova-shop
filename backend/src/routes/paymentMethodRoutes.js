const express = require("express");

const {
  getPaymentMethods,
  getDefaultPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
} = require("../controllers/paymentMethodController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all payment methods for logged-in user
router.get(
  "/",
  authMiddleware,
  getPaymentMethods
);

// Get default payment method
router.get(
  "/default",
  authMiddleware,
  getDefaultPaymentMethod
);

// Create new payment method
router.post(
  "/",
  authMiddleware,
  createPaymentMethod
);

// Update payment method
router.put(
  "/:paymentMethodId",
  authMiddleware,
  updatePaymentMethod
);

// Remove payment method
router.delete(
  "/:paymentMethodId",
  authMiddleware,
  removePaymentMethod
);

// Set payment method as default
router.patch(
  "/:paymentMethodId/default",
  authMiddleware,
  setDefaultPaymentMethod
);

module.exports = router;