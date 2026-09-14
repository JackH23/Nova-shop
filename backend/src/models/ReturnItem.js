const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReturnItem = sequelize.define(
  "ReturnItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    return_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    refund_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "return_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ReturnItem;