const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                is_active: true,
            },
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            message: "Products fetched successfully",
            products,
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