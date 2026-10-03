"use client";

import { useCallback, useState } from "react";

export type AuthModalType =
  | "login"
  | "register"
  | "forgot-password"
  | "verify-reset-code"
  | "reset-password"
  | "verify-email"
  | null;

type UseAuthModalOptions = {
  onLoginSuccess?: () => void | Promise<void>;
};

export function useAuthModal(
  options: UseAuthModalOptions = {},
) {
  const { onLoginSuccess } = options;

  const [authModal, setAuthModal] =
    useState<AuthModalType>(null);

  // Registration verification email
  const [verifyEmail, setVerifyEmail] = useState("");

  // Forgot-password email
  const [resetEmail, setResetEmail] = useState("");

  const [showLoginSuccess, setShowLoginSuccess] =
    useState(false);

  const openAuth = useCallback(
    (modal: AuthModalType) => {
      setAuthModal(modal);
    },
    [],
  );

  const closeAuth = useCallback(() => {
    setAuthModal(null);
  }, []);

  const openLogin = useCallback(() => {
    setAuthModal("login");
  }, []);

  const openRegister = useCallback(() => {
    setAuthModal("register");
  }, []);

  const openForgotPassword = useCallback(() => {
    setAuthModal("forgot-password");
  }, []);

  // Forgot password -> Verify reset code
  const openVerifyResetCode = useCallback(
    (email: string) => {
      setResetEmail(email);
      setAuthModal("verify-reset-code");
    },
    [],
  );

  // Verify reset code -> Reset password
  const openResetPassword = useCallback(() => {
    setAuthModal("reset-password");
  }, []);

  // Register -> Verify email
  const openVerifyEmail = useCallback(
    (email: string) => {
      setVerifyEmail(email);
      setAuthModal("verify-email");
    },
    [],
  );

  const handleLoginSuccess = useCallback(async () => {
    await onLoginSuccess?.();

    setAuthModal(null);
    setShowLoginSuccess(true);
  }, [onLoginSuccess]);

  const closeLoginSuccess = useCallback(() => {
    setShowLoginSuccess(false);
  }, []);

  return {
    authModal,

    // Emails
    verifyEmail,
    resetEmail,

    showLoginSuccess,

    openAuth,
    closeAuth,

    openLogin,
    openRegister,
    openForgotPassword,
    openVerifyResetCode,
    openResetPassword,
    openVerifyEmail,

    handleLoginSuccess,
    closeLoginSuccess,
  };
}