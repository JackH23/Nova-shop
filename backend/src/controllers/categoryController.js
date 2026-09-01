const Category = require("../models/Category");

const getCategories = async (req, res) => {
    try {
        // Get all categories from database
        const categories = await Category.findAll({
            order: [["name", "ASC"]],
        });

        return res.status(200).json({
            message: "Categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.error("Get categories error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = {
    getCategories,
};