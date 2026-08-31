"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";

import {
  forgotPasswordReducer,
  initialForgotPasswordState,
} from "@/reducers/forgotPasswordReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useForgotPassword() {
  const router = useRouter();

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

    const emailError = validation.email(state.email);

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
        email: state.email.trim(),
      });

      router.push(
        `/verify-reset-code?email=${encodeURIComponent(state.email.trim())}`,
      );
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