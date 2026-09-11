const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ShippingAddress = sequelize.define(
  "ShippingAddress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    state_province: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "shipping_addresses",
    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = ShippingAddress;