const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");
const sequelize = require("../config/database");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const ShippingAddress = require("../models/ShippingAddress");
const Delivery = require("../models/Delivery");
const Payment = require("../models/Payment");

const crypto = require("crypto");

const getCheckout = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Find user's cart
    const cart = await Cart.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // 2. Get ALL cart items
    // No pagination here because checkout needs every item
    const cartItems = await CartItem.findAll({
      where: {
        cart_id: cart.id,
      },

      order: [["created_at", "DESC"]],

      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "image", "stock", "is_active"],
        },
        {
          model: ProductVariant,
          as: "variant",
          attributes: ["id", "color_name", "color_hex", "stock"],
          required: false,
        },
      ],
    });

    // 3. Check empty cart
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    let subtotal = 0;
    let totalQuantity = 0;

    // 4. Validate items + calculate subtotal
    const items = [];

    for (const item of cartItems) {
      if (!item.product) {
        return res.status(400).json({
          message: `Product ${item.product_id} no longer exists`,
        });
      }

      if (!item.product.is_active) {
        return res.status(400).json({
          message: `${item.product.name} is no longer available`,
        });
      }

      const availableStock = item.variant
        ? Number(item.variant.stock)
        : Number(item.product.stock);

      const quantity = Number(item.quantity);

      if (quantity > availableStock) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}`,
          product_id: item.product_id,
          availableStock,
          requestedQuantity: quantity,
        });
      }

      const unitPrice = Number(item.product.price);
      const lineTotal = unitPrice * quantity;

      subtotal += lineTotal;
      totalQuantity += quantity;

      items.push({
        cartItemId: item.id,

        productId: item.product_id,
        variantId: item.variant_id,

        productName: item.product.name,
        image: item.product.image,

        variant: item.variant
          ? {
              id: item.variant.id,
              colorName: item.variant.color_name,
              colorHex: item.variant.color_hex,
            }
          : null,

        quantity,
        availableStock,

        unitPrice: Number(unitPrice.toFixed(2)),
        lineTotal: Number(lineTotal.toFixed(2)),
      });
    }

    // 5. Calculate checkout amounts
    const taxRate = 0.08;
    const tax = subtotal * taxRate;

    // Delivery is selected in the next step
    const shippingFee = 0;

    const total = subtotal + tax + shippingFee;

    // 6. Response
    return res.status(200).json({
      message: "Checkout fetched successfully",

      checkout: {
        cartId: cart.id,

        items,

        totalQuantity,

        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        shippingFee: Number(shippingFee.toFixed(2)),
        total: Number(total.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Get checkout error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;

    const { shipping, deliveryMethod, paymentMethod } = req.body;

    // 1. Validate shipping information
    if (
      !shipping ||
      !shipping.email ||
      !shipping.firstName ||
      !shipping.lastName ||
      !shipping.address ||
      !shipping.city
    ) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Shipping information is incomplete",
      });
    }

    // 2. Validate delivery method
    const deliveryOptions = {
      STANDARD: 5,
      EXPRESS: 15,
    };

    if (!deliveryOptions[deliveryMethod]) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Invalid delivery method",
      });
    }

    // 3. Validate payment method
    const allowedPaymentMethods = ["CREDIT_CARD", "PAYPAL"];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    // 4. Find user's cart
    const cart = await Cart.findOne({
      where: {
        user_id: userId,
      },
      transaction,
    });

    if (!cart) {
      await transaction.rollback();

      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // 5. Get all cart items
    const cartItems = await CartItem.findAll({
      where: {
        cart_id: cart.id,
      },

      include: [
        {
          model: Product,
          as: "product",
        },
        {
          model: ProductVariant,
          as: "variant",
          required: false,
        },
      ],

      transaction,
    });

    if (cartItems.length === 0) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    let subtotal = 0;

    const validatedItems = [];

    // 6. Re-check product + stock
    for (const item of cartItems) {
      if (!item.product) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Product ${item.product_id} no longer exists`,
        });
      }

      if (!item.product.is_active) {
        await transaction.rollback();

        return res.status(400).json({
          message: `${item.product.name} is no longer available`,
        });
      }

      const quantity = Number(item.quantity);

      const availableStock = item.variant
        ? Number(item.variant.stock)
        : Number(item.product.stock);

      if (quantity > availableStock) {
        await transaction.rollback();

        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}`,
          productId: item.product_id,
          availableStock,
          requestedQuantity: quantity,
        });
      }

      const unitPrice = Number(item.product.price);

      const lineTotal = unitPrice * quantity;

      subtotal += lineTotal;

      validatedItems.push({
        item,
        quantity,
        unitPrice,
        lineTotal,
      });
    }

    // 7. Calculate totals on backend
    const taxRate = 0.08;

    const tax = subtotal * taxRate;

    const shippingFee = deliveryOptions[deliveryMethod];

    const discountAmount = 0;

    const totalAmount = subtotal + tax + shippingFee - discountAmount;

    // 8. Generate order number
    const orderNo = `ORD-${Date.now()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    // 9. Create order
    const order = await Order.create(
      {
        user_id: userId,
        order_no: orderNo,

        subtotal: Number(subtotal.toFixed(2)),
        shipping_fee: Number(shippingFee.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        discount_amount: Number(discountAmount.toFixed(2)),
        total_amount: Number(totalAmount.toFixed(2)),

        status: "PENDING",
      },
      {
        transaction,
      },
    );

    // 10. Create order items
    for (const validatedItem of validatedItems) {
      const { item, quantity, unitPrice, lineTotal } = validatedItem;

      await OrderItem.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id || null,

          product_name: item.product.name,

          unit_price: Number(unitPrice.toFixed(2)),
          quantity,
          line_total: Number(lineTotal.toFixed(2)),
        },
        {
          transaction,
        },
      );

      // 11. Reduce stock
      if (item.variant) {
        await ProductVariant.decrement(
          {
            stock: quantity,
          },
          {
            where: {
              id: item.variant.id,
            },
            transaction,
          },
        );
      } else {
        await Product.decrement(
          {
            stock: quantity,
          },
          {
            where: {
              id: item.product.id,
            },
            transaction,
          },
        );
      }
    }

    // 12. Save shipping address
    await ShippingAddress.create(
      {
        order_id: order.id,

        email: shipping.email,
        first_name: shipping.firstName,
        last_name: shipping.lastName,

        address: shipping.address,
        city: shipping.city,

        state_province: shipping.stateProvince || null,

        postal_code: shipping.postalCode || null,
      },
      {
        transaction,
      },
    );

    // 13. Create delivery
    await Delivery.create(
      {
        order_id: order.id,

        delivery_method: deliveryMethod,

        delivery_fee: Number(shippingFee.toFixed(2)),

        status: "PENDING",

        tracking_number: null,
        estimated_delivery_date: null,
        delivered_at: null,
      },
      {
        transaction,
      },
    );

    // 14. Create payment
    await Payment.create(
      {
        order_id: order.id,

        payment_method: paymentMethod,

        amount: Number(totalAmount.toFixed(2)),

        status: "PENDING",

        transaction_id: null,
        paid_at: null,
      },
      {
        transaction,
      },
    );

    // 15. Clear cart items
    await CartItem.destroy({
      where: {
        cart_id: cart.id,
      },
      transaction,
    });

    // 16. Everything succeeded
    await transaction.commit();

    return res.status(201).json({
      message: "Order placed successfully",

      order: {
        id: order.id,
        orderNo: order.order_no,

        subtotal: Number(subtotal.toFixed(2)),
        shippingFee: Number(shippingFee.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        discountAmount: Number(discountAmount.toFixed(2)),
        total: Number(totalAmount.toFixed(2)),

        status: order.status,
      },
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Place order error:", error);

    return res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};

module.exports = {
  getCheckout,
  placeOrder,
};
