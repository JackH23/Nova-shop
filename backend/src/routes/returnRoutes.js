const express = require("express");

const {
  createReturn,
  getReturns,
  getReturnById,
} = require("../controllers/returnController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create return request
router.post(
  "/",
  authMiddleware,
  createReturn
);

// Get all return requests for logged-in user
router.get(
  "/",
  authMiddleware,
  getReturns
);

// Get one return request
router.get(
  "/:id",
  authMiddleware,
  getReturnById
);

module.exports = router;