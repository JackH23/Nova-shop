const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Delivery = sequelize.define(
  "Delivery",
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

    delivery_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "PENDING",
    },

    tracking_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    estimated_delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    delivered_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "deliveries",
    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = Delivery;