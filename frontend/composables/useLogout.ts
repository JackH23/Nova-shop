"use client";

import { useState } from "react";

export function useLogout(onSuccess?: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => {
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    setShowConfirm(false);

    onSuccess?.();
  };

  return {
    logout,
    showConfirm,
    openConfirm,
    closeConfirm,
  };
}
