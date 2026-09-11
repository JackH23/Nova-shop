const { Op, literal } = require("sequelize");
const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
const ProductVariant = require("../models/ProductVariant");

const getProducts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 8, 1);
    const offset = (page - 1) * limit;

    const {
      category_id,
      min_price,
      max_price,
      on_sale,
      new_arrivals,
      in_stock,
      discount,
      rating,
      sort,
    } = req.query;

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

    // Deals filter
    if (on_sale === "true") {
      where.is_on_sale = true;
    }

    // New arrivals filter
    if (new_arrivals === "true") {
      where.is_new_arrival = true;
    }

    // In stock filter
    if (in_stock === "true") {
      where.stock = {
        [Op.gt]: 0,
      };
    }

    // Discount filter
    if (discount) {
      const discountValue = Number(discount);
      const allowedDiscounts = [10, 20, 30, 50];

      if (allowedDiscounts.includes(discountValue)) {
        where[Op.and] = [
          literal(`
            original_price IS NOT NULL
            AND original_price > 0
            AND original_price > price
            AND ((original_price - price) / original_price * 100) >= ${discountValue}
          `),
        ];
      }
    }

    // Rating filter
    if (rating) {
      const ratingValue = Number(rating);
      const allowedRatings = [3, 4];

      if (allowedRatings.includes(ratingValue)) {
        where.rating = {
          [Op.gte]: ratingValue,
        };
      }
    }

        // Product sorting
    let order = [["created_at", "DESC"]];

    switch (sort) {
      case "low-high":
        order = [["price", "ASC"]];
        break;

      case "high-low":
        order = [["price", "DESC"]];
        break;

      case "featured":
        order = [
          ["is_featured", "DESC"],
          ["created_at", "DESC"],
        ];
        break;

      default:
        order = [["created_at", "DESC"]];
        break;
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order,
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

      include: [
        {
          model: ProductVariant,
          as: "variants",
          attributes: [
            "id",
            "color_name",
            "color_hex",
            "stock",
          ],
          required: false,

          include: [
            {
              model: ProductImage,
              as: "images",
              attributes: [
                "id",
                "image_url",
                "sort_order",
              ],
              required: false,
            },
          ],
        },
      ],

      order: [
        [
          { model: ProductVariant, as: "variants" },
          { model: ProductImage, as: "images" },
          "sort_order",
          "ASC",
        ],
      ],
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
