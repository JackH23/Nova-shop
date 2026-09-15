const PaymentMethod = require("../models/PaymentMethod");

// Get all payment methods for logged-in user
const getPaymentMethods = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 4, 1);

    const offset = (page - 1) * limit;

    const { count, rows } = await PaymentMethod.findAndCountAll({
      where: {
        user_id: userId,
      },

      order: [
        ["is_default", "DESC"],
        ["created_at", "DESC"],
      ],

      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      message: "Payment methods fetched successfully",
      paymentMethods: rows,
      total: count,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Get payment methods error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get default payment method
const getDefaultPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;

    const paymentMethod = await PaymentMethod.findOne({
      where: {
        user_id: userId,
        is_default: true,
      },
    });

    return res.status(200).json({
      message: "Default payment method fetched successfully",
      paymentMethod,
    });
  } catch (error) {
    console.error("Get default payment method error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Create payment method
const createPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      type,
      last_four,
      cardholder_name,
      expiry_month,
      expiry_year,
      is_default,
    } = req.body;

    if (
      !type ||
      !last_four ||
      !cardholder_name ||
      !expiry_month ||
      !expiry_year
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Validate last four digits
    if (!/^\d{4}$/.test(String(last_four))) {
      return res.status(400).json({
        message: "Last four must contain exactly 4 digits",
      });
    }

    // Validate month
    const month = Number(expiry_month);

    if (!/^\d{1,2}$/.test(String(expiry_month)) || month < 1 || month > 12) {
      return res.status(400).json({
        message: "Invalid expiry month",
      });
    }

    const paymentMethodCount = await PaymentMethod.count({
      where: {
        user_id: userId,
      },
    });

    // First payment method automatically becomes default
    const shouldBeDefault = paymentMethodCount === 0 || is_default === true;

    // Remove old default
    if (shouldBeDefault && paymentMethodCount > 0) {
      await PaymentMethod.update(
        {
          is_default: false,
        },
        {
          where: {
            user_id: userId,
          },
        },
      );
    }

    const newPaymentMethod = await PaymentMethod.create({
      user_id: userId,
      type,
      last_four: String(last_four),
      cardholder_name,
      expiry_month: String(expiry_month).padStart(2, "0"),
      expiry_year: String(expiry_year),
      is_default: shouldBeDefault,
    });

    return res.status(201).json({
      message: "Payment method created successfully",
      paymentMethod: newPaymentMethod,
    });
  } catch (error) {
    console.error("Create payment method error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethodId } = req.params;

    const paymentMethod = await PaymentMethod.findOne({
      where: {
        id: paymentMethodId,
        user_id: userId,
      },
    });

    if (!paymentMethod) {
      return res.status(404).json({
        message: "Payment method not found",
      });
    }

    const { type, last_four, cardholder_name, expiry_month, expiry_year } =
      req.body;

    if (last_four !== undefined && !/^\d{4}$/.test(String(last_four))) {
      return res.status(400).json({
        message: "Last four must contain exactly 4 digits",
      });
    }

    if (expiry_month !== undefined) {
      const month = Number(expiry_month);

      if (!/^\d{1,2}$/.test(String(expiry_month)) || month < 1 || month > 12) {
        return res.status(400).json({
          message: "Invalid expiry month",
        });
      }
    }

    await paymentMethod.update({
      type: type ?? paymentMethod.type,

      last_four:
        last_four !== undefined ? String(last_four) : paymentMethod.last_four,

      cardholder_name: cardholder_name ?? paymentMethod.cardholder_name,

      expiry_month:
        expiry_month !== undefined
          ? String(expiry_month).padStart(2, "0")
          : paymentMethod.expiry_month,

      expiry_year:
        expiry_year !== undefined
          ? String(expiry_year)
          : paymentMethod.expiry_year,
    });

    return res.status(200).json({
      message: "Payment method updated successfully",
      paymentMethod,
    });
  } catch (error) {
    console.error("Update payment method error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Remove payment method
const removePaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethodId } = req.params;

    const paymentMethod = await PaymentMethod.findOne({
      where: {
        id: paymentMethodId,
        user_id: userId,
      },
    });

    if (!paymentMethod) {
      return res.status(404).json({
        message: "Payment method not found",
      });
    }

    const wasDefault = paymentMethod.is_default;

    await paymentMethod.destroy();

    // If default was removed,
    // automatically make another payment method default
    if (wasDefault) {
      const nextPaymentMethod = await PaymentMethod.findOne({
        where: {
          user_id: userId,
        },
        order: [["created_at", "DESC"]],
      });

      if (nextPaymentMethod) {
        await nextPaymentMethod.update({
          is_default: true,
        });
      }
    }

    return res.status(200).json({
      message: "Payment method removed successfully",
    });
  } catch (error) {
    console.error("Remove payment method error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Set payment method as default
const setDefaultPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethodId } = req.params;

    // Check payment method belongs to user
    const paymentMethod = await PaymentMethod.findOne({
      where: {
        id: paymentMethodId,
        user_id: userId,
      },
    });

    if (!paymentMethod) {
      return res.status(404).json({
        message: "Payment method not found",
      });
    }

    // Remove current default
    await PaymentMethod.update(
      {
        is_default: false,
      },
      {
        where: {
          user_id: userId,
        },
      },
    );

    // Set selected payment method as default
    await PaymentMethod.update(
      {
        is_default: true,
      },
      {
        where: {
          id: paymentMethodId,
          user_id: userId,
        },
      },
    );

    // Fetch fresh data
    const updatedPaymentMethod = await PaymentMethod.findOne({
      where: {
        id: paymentMethodId,
        user_id: userId,
      },
    });

    return res.status(200).json({
      message: "Default payment method updated successfully",
      paymentMethod: updatedPaymentMethod,
    });
  } catch (error) {
    console.error("Set default payment method error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getPaymentMethods,
  getDefaultPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
};
