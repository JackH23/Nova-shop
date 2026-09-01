const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    register,
    login,
    googleLogin,
    me,
    verifyEmail,
    resendVerificationCode,
    refreshToken,
    forgotPassword,
    verifyResetCode,
    resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/me", authMiddleware, me);
router.post("/google", googleLogin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post(
    "/resend-verification-code",
    resendVerificationCode
);

module.exports = router;