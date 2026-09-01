const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

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

        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cart.id,
            },
        });

        return res.status(200).json({
            message: "Cart fetched successfully",
            cart: {
                id: cart.id,
                user_id: cart.user_id,
                items: cartItems,
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
        const { product_id, quantity = 1 } = req.body;

        // Product ID is required
        if (!product_id) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        // Quantity must be at least 1
        if (quantity < 1) {
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

        // Check available stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Not enough stock",
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
            },
        });

        if (cartItem) {
            // Product already exists → increase quantity
            const newQuantity = cartItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: "Not enough stock",
                });
            }

            cartItem.quantity = newQuantity;
            await cartItem.save();
        } else {
            // Product doesn't exist in cart → create new item
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_id: product_id,
                quantity: quantity,
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

        // Find product to check stock
        const product = await Product.findByPk(cartItem.product_id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Make sure requested quantity is available
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Not enough stock",
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

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
};