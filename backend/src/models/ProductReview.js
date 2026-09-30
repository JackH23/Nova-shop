const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductReview = sequelize.define(
  "ProductReview",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    is_verified_purchase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "product_reviews",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = ProductReview;