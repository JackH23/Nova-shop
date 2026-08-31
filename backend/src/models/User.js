const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Check whether email has been verified
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        // Store the 6-digit verification code
        verificationCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // Store when the verification code expires
        verificationCodeExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        // Store password reset code
        resetCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // Store when password reset code expires
        resetCodeExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;