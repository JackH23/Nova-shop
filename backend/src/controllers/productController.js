const { Op } = require("sequelize");
const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 8, 1);
    const offset = (page - 1) * limit;

    const { category_id, min_price, max_price } = req.query;

    const where = {
      is_active: true,
    };

    // Category filter
    if (category_id) {
      where.category_id = Number(category_id);
    }

    // Price range filter
    if (min_price || max_price) {
      where.price = {};

      if (min_price) {
        where.price[Op.gte] = Number(min_price);
      }

      if (max_price) {
        where.price[Op.lte] = Number(max_price);
      }
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      total: count,
      totalPages: Math.ceil(count / limit),
      page,
      limit,
    });
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id: id,
        is_active: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Get product detail error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
