"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { validation } from "@/validations/validation";

import {
  registerReducer,
  initialRegisterState,
} from "@/reducers/registerReducer";

import { authService } from "@/services/authService";

export function useRegister(
  onSuccess?: (email: string) => void
) {
  const router = useRouter();

  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: "SET_ERROR", value: "" });

    const fullNameError = validation.required(state.fullName, "Full name");

    const emailError = validation.email(state.email);

    const passwordError = validation.password(state.password);

    const confirmPasswordError = validation.confirmPassword(
      state.password,
      state.confirmPassword,
    );

    const termsError = !state.acceptTerms
      ? "You must accept the Terms of Service and Privacy Policy"
      : "";

    const validationError =
      fullNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      termsError;

    if (validationError) {
      dispatch({
        type: "SET_ERROR",
        value: validationError,
      });

      return;
    }

    dispatch({ type: "SET_LOADING", value: true });

    try {
      await authService.register({
        fullName: state.fullName.trim(),
        email: state.email.trim(),
        password: state.password,
        confirmPassword: state.confirmPassword,
        acceptTerms: state.acceptTerms,
      });

      onSuccess?.(state.email.trim());
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Registration failed",
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
