const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const { sendVerificationEmail } = require("../services/emailService");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, acceptTerms } =
      req.body;

    // Check required fields
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // User must accept terms and policy
    if (acceptTerms !== true) {
      return res.status(400).json({
        message: "You must accept the terms and policy",
      });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Verification code expires in 10 minutes
    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiresAt,
      termsAcceptedAt: new Date(),
    });

    await sendVerificationEmail(user.email, verificationCode);

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
      requiresVerification: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email },
    });

    // User does not exist
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // Access token expires in 1 minute
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );

    // Refresh token lives longer
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: rememberMe === true ? "30d" : "1d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", {
      name: error?.name,
      message: error?.message,
      original: error?.original?.message,
      parent: error?.parent?.message,
      code: error?.original?.code || error?.parent?.code,
      stack: error?.stack,
    });

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if user still exists
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Generate a new 1-minute access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findByPk(
      req.user.id,
      {
        attributes: [
          "id",
          "fullName",
          "email",
          "profileImage",
          "isVerified",
        ],
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error,
    );

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Check required fields
    if (!email || !code) {
      return res.status(400).json({
        message: "Email and verification code are required",
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Already verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // Check verification code
    if (user.verificationCode !== String(code)) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    // Check expiration
    if (
      !user.verificationCodeExpiresAt ||
      new Date() > user.verificationCodeExpiresAt
    ) {
      return res.status(400).json({
        message: "Verification code has expired",
      });
    }

    // Mark account as verified
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify email error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Already verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // Generate new 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // New code expires in 10 minutes
    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Replace old verification code
    user.verificationCode = verificationCode;
    user.verificationCodeExpiresAt = verificationCodeExpiresAt;

    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    return res.status(200).json({
      message: "Verification code resent successfully",
    });
  } catch (error) {
    console.error("Resend verification code error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Code expires in 10 minutes
    const resetCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save reset code
    user.resetCode = resetCode;
    user.resetCodeExpiresAt = resetCodeExpiresAt;

    await user.save();

    console.log("Password reset code:", resetCode);

    return res.status(200).json({
      message: "Password reset code generated successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Check required fields
    if (!email || !code) {
      return res.status(400).json({
        message: "Email and reset code are required",
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check reset code
    if (!user.resetCode || user.resetCode !== String(code)) {
      return res.status(400).json({
        message: "Invalid reset code",
      });
    }

    // Check expiration
    if (!user.resetCodeExpiresAt || new Date() > user.resetCodeExpiresAt) {
      return res.status(400).json({
        message: "Reset code has expired",
      });
    }

    return res.status(200).json({
      message: "Reset code verified successfully",
    });
  } catch (error) {
    console.error("Verify reset code error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, password, confirmPassword } = req.body;

    // Check required fields
    if (!email || !code || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check reset code again
    if (!user.resetCode || user.resetCode !== String(code)) {
      return res.status(400).json({
        message: "Invalid reset code",
      });
    }

    // Check reset code expiration again
    if (!user.resetCodeExpiresAt || new Date() > user.resetCodeExpiresAt) {
      return res.status(400).json({
        message: "Reset code has expired",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Reset code can only be used once
    user.resetCode = null;
    user.resetCodeExpiresAt = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential, rememberMe } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    // Verify the credential with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(401).json({
        message: "Invalid Google account",
      });
    }

    const {
      sub: googleId,
      email,
      name,
      email_verified: emailVerified,
    } = payload;

    if (!emailVerified) {
      return res.status(401).json({
        message: "Google email is not verified",
      });
    }

    // Find account using email
    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      // First Google login = create account
      user = await User.create({
        fullName: name || email,
        email,
        password: null,
        googleId,
        authProvider: "google",
        isVerified: true,
      });
    } else if (!user.googleId) {
      // Existing account with the same verified email:
      // link Google to the existing account.
      user.googleId = googleId;

      // Keep "local" if the account already has a password.
      if (!user.password) {
        user.authProvider = "google";
      }

      user.isVerified = true;

      await user.save();
    } else if (user.googleId !== googleId) {
      return res.status(409).json({
        message: "This email is already linked to another Google account",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: rememberMe === true ? "30d" : "1d",
      },
    );

    return res.status(200).json({
      message: "Google login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  me,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  googleLogin,
};
