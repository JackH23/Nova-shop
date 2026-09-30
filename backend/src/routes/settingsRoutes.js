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

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", authMiddleware, getAccountSettings);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile-image", authMiddleware, upload.single("profileImage"), updateProfileImage);
router.put("/password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteAccount);

module.exports = router;
