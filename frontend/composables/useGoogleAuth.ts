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
        localStorage.setItem("token", response.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", response.token);
        localStorage.removeItem("token");
      }

      router.push("/");
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