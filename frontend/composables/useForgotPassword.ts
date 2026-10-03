"use client";

import { useReducer } from "react";

import {
  forgotPasswordReducer,
  initialForgotPasswordState,
} from "@/reducers/forgotPasswordReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useForgotPassword(
  onSuccess?: (email: string) => void,
) {
  const [state, dispatch] = useReducer(
    forgotPasswordReducer,
    initialForgotPasswordState,
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    const email = state.email.trim();

    const emailError = validation.email(email);

    if (emailError) {
      dispatch({
        type: "SET_ERROR",
        value: emailError,
      });

      return;
    }

    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    try {
      await authService.forgotPassword({
        email,
      });

      // Do not navigate to /verify-reset-code.
      // Tell the parent that sending the code succeeded.
      onSuccess?.(email);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to send reset code",
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