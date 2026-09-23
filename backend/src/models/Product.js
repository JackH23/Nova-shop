const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductImage = require("./ProductImage");
const ProductVariant = require("./ProductVariant");

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

    product_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    brand: {
      type: DataTypes.STRING(150),
      allowNull: true,
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

    sku: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tags: {
      type: DataTypes.JSON,
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

    reviews_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    free_standard_shipping: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    free_shipping_text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    shipping_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    track_quantity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    continue_selling_out_of_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    online_store_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  },
);

Product.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "variants",
});

module.exports = Product;
