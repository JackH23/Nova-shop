"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";

import {
  verifyEmailReducer,
  initialVerifyEmailState,
} from "@/reducers/verifyEmailReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useVerifyEmail(email: string) {
  const router = useRouter();

  const [state, dispatch] = useReducer(
    verifyEmailReducer,
    initialVerifyEmailState,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: "SET_ERROR", value: "" });

    const codeError = validation.required(state.code, "Verification code");

    if (codeError) {
      dispatch({
        type: "SET_ERROR",
        value: codeError,
      });

      return;
    }

    dispatch({ type: "SET_LOADING", value: true });

    try {
      await authService.verifyEmail({
        email: email.trim(),
        code: state.code.trim(),
      });

      router.push("/login");
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Email verification failed",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  };

  const handleResendCode = async () => {
    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    if (!email.trim()) {
      dispatch({
        type: "SET_ERROR",
        value: "Email is required",
      });

      return;
    }

    try {
      await authService.resendVerificationCode({
        email: email.trim(),
      });

      console.log("Verification code resent successfully");
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to resend verification code",
      });
    }
  };

  return {
    state,
    dispatch,
    handleSubmit,
    handleResendCode,
  };
}
