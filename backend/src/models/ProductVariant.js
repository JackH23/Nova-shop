const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductImage = require("./ProductImage");

const ProductVariant = sequelize.define(
  "ProductVariant",
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

    color_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    color_hex: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    stock: {
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
    tableName: "product_variants",
    timestamps: false,
  }
);

ProductVariant.hasMany(ProductImage, {
  foreignKey: "variant_id",
  as: "images",
});

module.exports = ProductVariant;