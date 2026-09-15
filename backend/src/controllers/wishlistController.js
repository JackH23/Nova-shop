const WishlistItem = require("../models/WishlistItem");
const Product = require("../models/Product");

// Get wishlist for logged-in user
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 12, 1);
    const offset = (page - 1) * limit;

    const { count, rows } = await WishlistItem.findAndCountAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Product,
          as: "product",
          required: true,
        },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
      distinct: true,
    });

    return res.status(200).json({
      message: "Wishlist retrieved successfully",
      wishlist: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Get wishlist error:", error);

    return res.status(500).json({
      message: "Failed to get wishlist",
      error: error.message,
    });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({
        message: "product_id is required",
      });
    }

    // Check product
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check duplicate
    const existingItem = await WishlistItem.findOne({
      where: {
        user_id: userId,
        product_id,
      },
    });

    if (existingItem) {
      return res.status(409).json({
        message: "Product is already in wishlist",
      });
    }

    const wishlistItem = await WishlistItem.create({
      user_id: userId,
      product_id,
    });

    return res.status(201).json({
      message: "Product added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    return res.status(500).json({
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const wishlistItem = await WishlistItem.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (!wishlistItem) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    await wishlistItem.destroy();

    return res.status(200).json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    return res.status(500).json({
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
