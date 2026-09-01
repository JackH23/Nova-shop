"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export function useGoogleAuth() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async (
    credential: string,
    rememberMe = false
  ) => {
    setError("");
    setLoading(true);

    try {
      const response = await authService.googleLogin({
        credential,
        rememberMe,
      });

      if (rememberMe) {
        localStorage.setItem(
          "accessToken",
          response.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          response.refreshToken
        );

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      } else {
        sessionStorage.setItem(
          "accessToken",
          response.accessToken
        );
        sessionStorage.setItem(
          "refreshToken",
          response.refreshToken
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      // Remove old token key from previous implementation
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Google login failed"
      );
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