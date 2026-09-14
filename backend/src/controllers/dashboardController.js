const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Delivery = require("../models/Delivery");
const Payment = require("../models/Payment");

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

// Get one order detail
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
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
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get dashboard order error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
};
