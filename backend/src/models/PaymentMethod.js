const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PaymentMethod = sequelize.define(
  "PaymentMethod",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "Visa",
        "Mastercard",
        "Amex",
        "Discover"
      ),
      allowNull: false,
    },

    last_four: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },

    cardholder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    expiry_month: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },

    expiry_year: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },

    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "payment_methods",
    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = PaymentMethod;