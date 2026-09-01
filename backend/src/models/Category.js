const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        slug: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "categories",
        timestamps: true,

        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Category;