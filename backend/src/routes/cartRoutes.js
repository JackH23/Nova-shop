const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

// Add item to cart
router.post("/items", authMiddleware, addToCart);

// Update cart item
router.put("/items/:id", authMiddleware, updateCartItem);

// Remove cart item
router.delete("/items/:id", authMiddleware, removeCartItem);

module.exports = router;