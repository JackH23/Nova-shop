const express = require("express");
const multer = require("multer");

const {
  getAccountSettings,
  updateProfile,
  updateProfileImage,
  changePassword,
  deleteAccount,
} = require("../controllers/settingsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ================================
   Profile Image Upload
================================ */

// Store uploaded image temporarily in memory.
// For Cloudflare production, the image should later be uploaded to R2.
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    // Maximum 5MB
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed"
        )
      );
    }

    cb(null, true);
  },
});

/* ================================
   Routes
================================ */

// Get current user's account settings
router.get(
  "/",
  authMiddleware,
  getAccountSettings
);

// Update profile information
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Update profile image
router.put(
  "/profile-image",

  (req, res, next) => {
    console.log(
      "1. Profile image request received"
    );
    next();
  },

  authMiddleware,

  (req, res, next) => {
    console.log(
      "2. Auth middleware passed"
    );
    next();
  },

  upload.single("profileImage"),

  (req, res, next) => {
    console.log("3. Multer finished");
    console.log("File:", req.file);
    next();
  },

  updateProfileImage
);

// Change password
router.put(
  "/password",
  authMiddleware,
  changePassword
);

// Delete account
router.delete(
  "/",
  authMiddleware,
  deleteAccount
);

module.exports = router;