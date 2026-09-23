const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 5, 1);
    const offset = (page - 1) * limit;

    let cart = await Cart.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
      });
    }

    const { count, rows: cartItems } = await CartItem.findAndCountAll({
      where: {
        cart_id: cart.id,
      },

      limit,
      offset,

      order: [["created_at", "DESC"]],

      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "image", "stock"],
        },

        {
          model: ProductVariant,
          as: "variant",
          attributes: ["id", "color_name", "color_hex", "stock"],
        },
      ],
    });

    const allCartItems = await CartItem.findAll({
      where: {
        cart_id: cart.id,
      },
      attributes: ["quantity"],
    });

    const totalQuantity = allCartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return res.status(200).json({
      message: "Cart fetched successfully",

      cart: {
        id: cart.id,
        user_id: cart.user_id,
        items: cartItems,
        totalQuantity,
      },

      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, variant_id, quantity = 1 } = req.body;

    const requestedQuantity = Number(quantity);

    // Product ID is required
    if (!product_id) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // Quantity must be at least 1
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Find the product
    const product = await Product.findOne({
      where: {
        id: product_id,
        is_active: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let variant = null;

    if (variant_id) {
      variant = await ProductVariant.findOne({
        where: {
          id: variant_id,
          product_id: product_id,
        },
      });

      if (!variant) {
        return res.status(404).json({
          message: "Product variant not found",
        });
      }
    }

    const availableStock = Number(variant ? variant.stock : product.stock);

    if (requestedQuantity > availableStock) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`,
        productId: product.id,
        variantId: variant?.id ?? null,
        availableStock,
        requestedQuantity,
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({
      where: {
        user_id: userId,
      },
    });

    // Create cart if user doesn't have one
    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
      });
    }

    // Check if product is already in the cart
    let cartItem = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: product_id,
        variant_id: variant_id,
      },
    });

    if (cartItem) {
      const currentQuantity = Number(cartItem.quantity);

      const newQuantity =
        currentQuantity + requestedQuantity;

      if (newQuantity > availableStock) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
          productId: product.id,
          variantId: variant?.id ?? null,
          availableStock,
          currentCartQuantity: currentQuantity,
          requestedQuantity,
          requestedTotalQuantity: newQuantity,
        });
      }

      cartItem.quantity = newQuantity;
      await cartItem.save();
    } else {
      // Product doesn't exist in cart → create new item
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: product_id,
        variant_id: variant_id,
        quantity: requestedQuantity,
      });
    }

    return res.status(200).json({
      message: "Product added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Find user's cart
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

    // Find item inside this user's cart
    const cartItem = await CartItem.findOne({
      where: {
        id: id,
        cart_id: cart.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    // Find variant to check stock
    const product = await Product.findByPk(cartItem.product_id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let availableStock = product.stock;

    if (cartItem.variant_id) {
      const variant = await ProductVariant.findOne({
        where: {
          id: cartItem.variant_id,
          product_id: cartItem.product_id,
        },
      });

      if (!variant) {
        return res.status(404).json({
          message: "Product variant not found",
        });
      }

      availableStock = variant.stock;
    }

    if (Number(quantity) > Number(availableStock)) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`,
        productId: product.id,
        variantId: cartItem.variant_id ?? null,
        availableStock: Number(availableStock),
        requestedQuantity: Number(quantity),
      });
    }

    // Update quantity
    cartItem.quantity = quantity;

    await cartItem.save();

    return res.status(200).json({
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Update cart item error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Find user's cart
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

    // Find item inside this user's cart
    const cartItem = await CartItem.findOne({
      where: {
        id: id,
        cart_id: cart.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    // Delete cart item
    await cartItem.destroy();

    return res.status(200).json({
      message: "Cart item removed successfully",
    });
  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
