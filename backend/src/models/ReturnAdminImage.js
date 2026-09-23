const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReturnAdminImage = sequelize.define(
  "ReturnAdminImage",
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

    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    tableName: "return_admin_images",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = ReturnAdminImage;