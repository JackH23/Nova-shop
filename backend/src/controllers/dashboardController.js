const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Delivery = require("../models/Delivery");
const Payment = require("../models/Payment");

// Get order detail for dashboard
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id: id,
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
  getOrderById,
};