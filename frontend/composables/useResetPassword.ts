"use client";

import { useReducer } from "react";

import {
  resetPasswordReducer,
  initialResetPasswordState,
} from "@/reducers/resetPasswordReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useResetPassword(
  email: string,
  code: string,
  onSuccess?: () => void,
) {
  const [state, dispatch] = useReducer(
    resetPasswordReducer,
    initialResetPasswordState,
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    const passwordError = validation.password(
      state.password,
    );

    const confirmPasswordError =
      validation.confirmPassword(
        state.password,
        state.confirmPassword,
      );

    const validationError =
      passwordError || confirmPasswordError;

    if (validationError) {
      dispatch({
        type: "SET_ERROR",
        value: validationError,
      });

      return;
    }

    if (!email.trim() || !code.trim()) {
      dispatch({
        type: "SET_ERROR",
        value: "Reset password session is invalid. Please request a new code.",
      });

      return;
    }

    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    try {
      await authService.resetPassword({
        email: email.trim(),
        code: code.trim(),
        password: state.password,
        confirmPassword: state.confirmPassword,
      });

      // Password reset successful.
      // Open LoginModal instead of navigating to /login.
      onSuccess?.();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Password reset failed",
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
  };
}