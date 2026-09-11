const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");
const ProductVariant = require("./ProductVariant");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart_items",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",

    indexes: [
      {
        name: "unique_cart_product_variant",
        unique: true,
        fields: ["cart_id", "product_id", "variant_id"],
      },
    ],
  },
);

CartItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

CartItem.belongsTo(ProductVariant, {
  foreignKey: "variant_id",
  as: "variant",
});

module.exports = CartItem;
