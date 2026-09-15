const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const User = require("../models/User");

/**
 * GET /api/settings
 * Get logged-in user's account settings
 */
const getAccountSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: [
        "id",
        "fullName",
        "email",
        "profileImage",
        "authProvider",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Account settings fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get account settings error:", error);

    return res.status(500).json({
      message: "Failed to fetch account settings",
    });
  }
};

/**
 * PUT /api/settings/profile
 * Update full name and email
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullName, email } = req.body;

    if (!fullName?.trim()) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if another user already uses this email
    const existingUser = await User.findOne({
      where: {
        email: normalizedEmail,
        id: {
          [Op.ne]: userId,
        },
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email address is already in use",
      });
    }

    user.fullName = fullName.trim();
    user.email = normalizedEmail;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

/**
 * PUT /api/settings/profile-image
 * Update profile image
 */
const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      // Delete newly uploaded image if user doesn't exist
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).json({
        message: "User not found",
      });
    }

    /**
     * Delete old profile image
     */
    if (user.profileImage) {
      const oldImagePath = path.join(
        process.cwd(),
        user.profileImage.replace(/^\/+/, "")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    /**
     * Store relative image path in database
     *
     * Example:
     * /uploads/profiles/1757939000000-12345.jpg
     */
    const profileImage =
      `/uploads/profiles/${req.file.filename}`;

    user.profileImage = profileImage;

    await user.save();

    return res.status(200).json({
      message: "Profile image updated successfully",

      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile image error:", error);

    // Remove uploaded image if DB update fails
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Failed to update profile image",
    });
  }
};

/**
 * PUT /api/settings/password
 * Change password
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Google account may not have a local password
    if (!user.password) {
      return res.status(400).json({
        message: "This account does not have a local password",
      });
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      message: "Failed to change password",
    });
  }
};

/**
 * DELETE /api/settings
 * Delete account
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /**
     * Delete profile image before deleting user
     */
    if (user.profileImage) {
      const imagePath = path.join(
        process.cwd(),
        user.profileImage.replace(/^\/+/, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await user.destroy();

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

module.exports = {
  getAccountSettings,
  updateProfile,
  updateProfileImage,
  changePassword,
  deleteAccount,
};