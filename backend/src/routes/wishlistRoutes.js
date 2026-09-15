const express = require("express");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get wishlist for logged-in user
router.get(
  "/",
  authMiddleware,
  getWishlist
);

// Add product to wishlist
router.post(
  "/",
  authMiddleware,
  addToWishlist
);

// Remove product from wishlist
router.delete(
  "/:productId",
  authMiddleware,
  removeFromWishlist
);

module.exports = router;