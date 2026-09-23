"use client";

import { useState } from "react";
import { authService } from "@/services/authService";

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async (
    credential: string,
    rememberMe = false,
  ) => {
    setError("");
    setLoading(true);

    try {
      const response =
        await authService.googleLogin({
          credential,
          rememberMe,
        });

      // Always store authentication tokens
      // in localStorage
      localStorage.setItem(
        "accessToken",
        response.accessToken,
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken,
      );

      // Clean old sessionStorage tokens
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      // Clean old token implementation
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Tell Navbar/useMe that login changed
      window.dispatchEvent(
        new Event("auth-changed"),
      );

      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Google login failed",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleGoogleLogin,
  };
}