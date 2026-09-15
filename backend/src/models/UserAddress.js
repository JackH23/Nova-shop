const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserAddress = sequelize.define(
  "UserAddress",
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

    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    address_line2: {
      type: DataTypes.STRING(255),
      allowNull: true,
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

    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "user_addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = UserAddress;