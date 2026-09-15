const express = require("express");

const {
  getAddresses,
  getDefaultAddress,
  createAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} = require("../controllers/addressController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all addresses for logged-in user
router.get(
  "/",
  authMiddleware,
  getAddresses
);

// Get default address for logged-in user
router.get(
  "/default",
  authMiddleware,
  getDefaultAddress
);

// Create new address
router.post(
  "/",
  authMiddleware,
  createAddress
);

// Update address
router.put(
  "/:addressId",
  authMiddleware,
  updateAddress
);

// Remove address
router.delete(
  "/:addressId",
  authMiddleware,
  removeAddress
);

// Set address as default
router.patch(
  "/:addressId/default",
  authMiddleware,
  setDefaultAddress
);

module.exports = router;