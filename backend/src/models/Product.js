const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        original_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        rating: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: false,
            defaultValue: 0,
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        is_on_sale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        is_featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        is_new_arrival: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "products",

        timestamps: true,

        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Product;