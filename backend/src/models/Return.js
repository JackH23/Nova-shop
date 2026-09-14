const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Return = sequelize.define(
  "Return",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "REQUESTED",
        "APPROVED",
        "REJECTED",
        "REFUNDED"
      ),
      allowNull: false,
      defaultValue: "REQUESTED",
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    refund_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "returns",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Return;