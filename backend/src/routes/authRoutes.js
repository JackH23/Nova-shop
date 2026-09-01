const express = require("express");
const {
    register,
    login,
    googleLogin,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    verifyResetCode,
    resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
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