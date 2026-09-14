const sequelize = require("../config/database");

const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Return = require("../models/Return");
const ReturnItem = require("../models/ReturnItem");

// Create return request
const createReturn = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;

    const { order_id, reason, note, items } = req.body;

    // Validate request
    if (!order_id || !reason || !items?.length) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Order, reason and return items are required",
      });
    }

    // Find customer's order
    const order = await Order.findOne({
      where: {
        id: order_id,
        user_id: userId,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
      transaction,
    });

    if (!order) {
      await transaction.rollback();

      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only delivered orders can be returned
    if (order.status !== "DELIVERED") {
      await transaction.rollback();

      return res.status(400).json({
        message: "Only delivered orders can be returned",
      });
    }

    let refundAmount = 0;

    const returnItemsData = [];

    // Validate every selected item
    for (const item of items) {
      const orderItem = order.items.find(
        (orderItem) => orderItem.id === Number(item.order_item_id),
      );

      if (!orderItem) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Order item ${item.order_item_id} not found`,
        });
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > orderItem.quantity
      ) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Invalid return quantity for ${orderItem.product_name}`,
        });
      }

      const itemRefundAmount = Number(orderItem.unit_price) * quantity;

      refundAmount += itemRefundAmount;

      returnItemsData.push({
        order_item_id: orderItem.id,
        quantity,
        refund_amount: itemRefundAmount,
      });
    }

    // Create return
    const returnRequest = await Return.create(
      {
        order_id,
        user_id: userId,
        status: "REQUESTED",
        reason,
        note: note || null,
        refund_amount: refundAmount,
      },
      {
        transaction,
      },
    );

    // Create return items
    await ReturnItem.bulkCreate(
      returnItemsData.map((item) => ({
        return_id: returnRequest.id,
        ...item,
      })),
      {
        transaction,
      },
    );
    await transaction.commit();

    const createdReturn = await Return.findByPk(returnRequest.id, {
      include: [
        {
          model: ReturnItem,
          as: "items",
          include: [
            {
              model: OrderItem,
              as: "order_item",
            },
          ],
        },
      ],
    });

    return res.status(201).json({
      message: "Return request created successfully",
      return: createdReturn,
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Create return error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get logged-in customer's returns
const getReturns = async (req, res) => {
  try {
    const returns = await Return.findAll({
      where: {
        user_id: req.user.id,
      },

      include: [
        {
          model: ReturnItem,
          as: "items",
          include: [
            {
              model: OrderItem,
              as: "order_item",
            },
          ],
        },
      ],

      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      message: "Returns fetched successfully",
      returns,
    });
  } catch (error) {
    console.error("Get returns error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get one return
const getReturnById = async (req, res) => {
  try {
    const returnRequest = await Return.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },

      include: [
        {
          model: ReturnItem,
          as: "items",
          include: [
            {
              model: OrderItem,
              as: "order_item",
            },
          ],
        },
      ],
    });

    if (!returnRequest) {
      return res.status(404).json({
        message: "Return request not found",
      });
    }

    return res.status(200).json({
      message: "Return fetched successfully",
      return: returnRequest,
    });
  } catch (error) {
    console.error("Get return error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createReturn,
  getReturns,
  getReturnById,
};
