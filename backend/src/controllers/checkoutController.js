const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");

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
          attributes: [
            "id",
            "name",
            "price",
            "image",
            "stock",
            "is_active",
          ],
        },
        {
          model: ProductVariant,
          as: "variant",
          attributes: [
            "id",
            "color_name",
            "color_hex",
            "stock",
          ],
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
  return res.status(501).json({
    message: "Place order is not implemented yet",
  });
};

module.exports = {
  getCheckout,
  placeOrder,
};