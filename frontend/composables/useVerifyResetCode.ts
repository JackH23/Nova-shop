"use client";

import { useReducer } from "react";

import {
  verifyResetCodeReducer,
  initialVerifyResetCodeState,
} from "@/reducers/verifyResetCodeReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useVerifyResetCode(
  email: string,
  onSuccess?: () => void,
) {
  const [state, dispatch] = useReducer(
    verifyResetCodeReducer,
    initialVerifyResetCodeState,
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    const codeError = validation.required(
      state.code,
      "Verification code",
    );

    if (codeError) {
      dispatch({
        type: "SET_ERROR",
        value: codeError,
      });

      return;
    }

    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    try {
      await authService.verifyResetCode({
        email: email.trim(),
        code: state.code.trim(),
      });

      // Verification succeeded.
      // Open ResetPasswordModal instead of navigating to a page.
      onSuccess?.();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Reset code verification failed",
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

    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    try {
      await authService.forgotPassword({
        email: email.trim(),
      });

      console.log("Reset code resent successfully");
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to resend reset code",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
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