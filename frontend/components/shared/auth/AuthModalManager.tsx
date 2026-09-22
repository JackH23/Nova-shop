"use client";

import LoginModal from "@/components/auth/modals/LoginModal";
import RegisterModal from "@/components/auth/modals/RegisterModal";
import ForgotPasswordModal from "@/components/auth/modals/ForgotPasswordModal";
import ResetPasswordModal from "@/components/auth/modals/ResetPasswordModal";
import VerifyEmailModal from "@/components/auth/modals/VerifyEmailModal";

import ConfirmModal from "@/components/common/ConfirmModal";

import type { useAuthModal } from "@/composables/useAuthModal";

type AuthModalManagerProps = {
  auth: ReturnType<typeof useAuthModal>;
};

export default function AuthModalManager({
  auth,
}: AuthModalManagerProps) {
  return (
    <>
      <LoginModal
        open={auth.authModal === "login"}
        onClose={auth.closeAuth}
        onOpenRegister={auth.openRegister}
        onOpenForgotPassword={auth.openForgotPassword}
        onLoginSuccess={auth.handleLoginSuccess}
      />

      <RegisterModal
        open={auth.authModal === "register"}
        onClose={auth.closeAuth}
        onOpenLogin={auth.openLogin}
        onOpenVerifyEmail={auth.openVerifyEmail}
      />

      <ForgotPasswordModal
        open={auth.authModal === "forgot-password"}
        onClose={auth.closeAuth}
        onOpenLogin={auth.openLogin}
      />

      <ResetPasswordModal
        open={auth.authModal === "reset-password"}
        onClose={auth.closeAuth}
        onOpenLogin={auth.openLogin}
      />

      <VerifyEmailModal
        open={auth.authModal === "verify-email"}
        email={auth.verifyEmail}
        onClose={auth.closeAuth}
        onOpenRegister={auth.openRegister}
        onOpenLogin={auth.openLogin}
      />

      <ConfirmModal
        open={auth.showLoginSuccess}
        title="Login Successful"
        message="You have logged in successfully."
        confirmText="Continue"
        singleButton
        variant="success"
        onCancel={auth.closeLoginSuccess}
        onConfirm={auth.closeLoginSuccess}
      />
    </>
  );
}