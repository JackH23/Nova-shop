const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("node:crypto");

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
// Only remove images managed by this profile upload endpoint.
async function removeProfileImage(req, image) {
  const match = /^\/uploads\/profiles\/([a-zA-Z0-9_.-]+)$/.exec(image || "");
  if (!match || match[1] === "undefined") return;
  if (process.env.CLOUDFLARE_WORKER === "true") {
    if (!req.workerEnv?.UPLOADS) throw new Error("UPLOADS R2 binding is required");
    await req.workerEnv.UPLOADS.delete("profiles/" + match[1]);
  } else {
    const filename = path.join(__dirname, "../../uploads/profiles", match[1]);
    await fs.promises.rm(filename, { force: true });
  }
}

const updateProfileImage = async (req, res) => {
  let newImage;
  let saved = false;
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ message: "Profile image is required" });
    }
    const extensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
    const extension = extensions[req.file.mimetype];
    if (!extension || req.file.buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "Use JPG, PNG or WEBP up to 5MB" });
    }
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const oldImage = user.profileImage;
    const filename = user.id + "-" + randomUUID() + "." + extension;
    newImage = "/uploads/profiles/" + filename;

    if (process.env.CLOUDFLARE_WORKER === "true") {
      const bucket = req.workerEnv?.UPLOADS;
      if (!bucket) throw new Error("UPLOADS R2 binding is required");
      await bucket.put("profiles/" + filename, req.file.buffer, {
        httpMetadata: { contentType: req.file.mimetype },
      });
    } else {
      const directory = path.join(__dirname, "../../uploads/profiles");
      await fs.promises.mkdir(directory, { recursive: true });
      await fs.promises.writeFile(path.join(directory, filename), req.file.buffer);
    }

    user.profileImage = newImage;
    await user.save();
    saved = true;
    // Cleanup failure must not turn a successful update into a failed upload.
    await removeProfileImage(req, oldImage).catch(error => {
      console.error("Old profile image cleanup failed:", error.message);
    });
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
    console.error("Update profile image error:", error.name, error.message);
    if (newImage && !saved) {
      await removeProfileImage(req, newImage).catch(cleanupError => {
        console.error("Failed upload cleanup error:", cleanupError.message);
      });
    }
    return res.status(500).json({ message: "Failed to update profile image" });
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

    const oldImage = user.profileImage;
    await user.destroy();
    await removeProfileImage(req, oldImage).catch(error => {
      console.error("Deleted account image cleanup failed:", error.message);
    });

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