const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");

const router = express.Router();

// Get reviews for a product
router.get("/products/:productId", getProductReviews);

// Create review for a product
router.post(
  "/products/:productId",
  authMiddleware,
  createReview,
);

module.exports = router;