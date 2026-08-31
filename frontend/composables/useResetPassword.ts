"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";

import {
  resetPasswordReducer,
  initialResetPasswordState,
} from "@/reducers/resetPasswordReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useResetPassword(
  email: string,
  code: string,
) {
  const router = useRouter();

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

      router.push("/login");
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