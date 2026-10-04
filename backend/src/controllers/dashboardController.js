const { Op } = require("sequelize");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const Delivery = require("../models/Delivery");
const Payment = require("../models/Payment");
const ShippingAddress = require("../models/ShippingAddress");
const Return = require("../models/Return");

// Get all orders for logged-in user
const getOrders = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 5, 1);

    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: {
        user_id: req.user.id,
      },

      include: [
        {
          model: OrderItem,
          as: "items",
          required: false,
        },
        {
          model: Delivery,
          as: "delivery",
          required: false,
        },
        {
          model: Payment,
          as: "payment",
          required: false,
        },
      ],

      distinct: true,

      order: [["created_at", "DESC"]],

      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders: rows,
      total: count,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Get dashboard orders error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Total orders
    const totalOrders = await Order.count({
      where: {
        user_id: userId,
      },
    });

    // Orders this month
    const ordersThisMonth = await Order.count({
      where: {
        user_id: userId,
        created_at: {
          [Op.gte]: startOfMonth,
          [Op.lt]: startOfNextMonth,
        },
      },
    });

    // Total spending
    const paidOrders = await Order.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Payment,
          as: "payment",
          required: true,
          where: {
            status: "PAID",
          },
          attributes: [],
        },
      ],
      attributes: ["total_amount"],
    });

    const totalSpending = paidOrders.reduce(
      (total, order) => total + Number(order.total_amount || 0),
      0,
    );

    // Recent order
    const recentOrder = await Order.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
          required: false,
          include: [
            {
              model: Product,
              as: "product",
              required: false,
              attributes: ["id", "image"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Shipping address from most recent order
    const defaultAddress = recentOrder
      ? await ShippingAddress.findOne({
          where: {
            order_id: recentOrder.id,
          },
        })
      : null;

    return res.status(200).json({
      message: "Dashboard summary fetched successfully",
      dashboard: {
        totalOrders,
        ordersThisMonth,
        totalSpending,
        recentOrder,
        defaultAddress,
      },
    });
  } catch (error) {
    console.error("Get dashboard summary error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get one order detail
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ========================================
    // Pagination
    // ========================================
    const page = Math.max(
      Number(req.query.page) || 1,
      1,
    );

    const limit = Math.max(
      Number(req.query.limit) || 5,
      1,
    );

    const offset = (page - 1) * limit;

    // ========================================
    // Get order
    // ========================================
    const order = await Order.findOne({
      where: {
        id,
        user_id: userId,
      },

      include: [
        {
          model: Delivery,
          as: "delivery",
          required: false,
        },
        {
          model: Payment,
          as: "payment",
          required: false,
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ========================================
    // Get paginated order items
    // ========================================
    const {
      count: totalItems,
      rows: items,
    } = await OrderItem.findAndCountAll({
      where: {
        order_id: order.id,
      },

      include: [
        {
          model: Product,
          as: "product",
          required: false,
          attributes: ["id", "image"],
        },
      ],

      order: [["id", "ASC"]],

      limit,
      offset,
    });

    const totalPages = Math.ceil(
      totalItems / limit,
    );

    // ========================================
    // Check existing return
    // ========================================
    const existingReturn =
      await Return.findOne({
        where: {
          order_id: order.id,
          user_id: userId,
        },

        attributes: [
          "id",
          "status",
        ],
      });

    const orderData = order.toJSON();

    // ========================================
    // Response
    // ========================================
    return res.status(200).json({
      message:
        "Order fetched successfully",

      order: {
        ...orderData,

        // Current page items only
        items,

        has_return_request:
          Boolean(existingReturn),

        return_request:
          existingReturn
            ? {
                id: existingReturn.id,
                status:
                  existingReturn.status,
              }
            : null,
      },

      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    console.error(
      "Get dashboard order error:",
      error,
    );

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getDashboardSummary,
  getOrders,
  getOrderById,
};
