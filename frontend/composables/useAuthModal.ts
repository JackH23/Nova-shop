"use client";

import { useCallback, useState } from "react";

export type AuthModalType =
  | "login"
  | "register"
  | "forgot-password"
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

  const [verifyEmail, setVerifyEmail] = useState("");

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

  const openResetPassword = useCallback(() => {
    setAuthModal("reset-password");
  }, []);

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
    verifyEmail,
    showLoginSuccess,

    openAuth,
    closeAuth,

    openLogin,
    openRegister,
    openForgotPassword,
    openResetPassword,
    openVerifyEmail,

    handleLoginSuccess,
    closeLoginSuccess,
  };
}