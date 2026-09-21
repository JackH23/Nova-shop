const ProductReview = require("../models/ProductReview");
const Product = require("../models/Product");
const User = require("../models/User");

// ========================================
// Create Review
// ========================================

const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Validate comment
    if (!comment || !comment.trim()) {
      return res.status(400).json({
        message: "Review comment is required",
      });
    }

    // Check product
    const product = await Product.findOne({
      where: {
        id: productId,
        is_active: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check existing review
    const existingReview = await ProductReview.findOne({
      where: {
        product_id: productId,
        user_id: userId,
      },
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this product",
      });
    }

    // Create review
    const review = await ProductReview.create({
      product_id: productId,
      user_id: userId,
      rating,
      title: title?.trim() || null,
      comment: comment.trim(),

      // We'll verify the purchase in the next step
      order_id: null,
      is_verified_purchase: false,

      is_active: true,
    });

    return res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ========================================
// Get Product Reviews
// ========================================

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.findAll({
      where: {
        product_id: productId,
        is_active: true,
      },

      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],

      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      message: "Product reviews fetched successfully",
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get product reviews error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
};