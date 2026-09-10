const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductImage = sequelize.define(
    "ProductImage",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        image_url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },

        sort_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "product_images",
        timestamps: false,
    }
);

module.exports = ProductImage;