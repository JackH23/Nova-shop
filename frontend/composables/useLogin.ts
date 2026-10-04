"use client";

import { useReducer } from "react";

import { loginReducer, initialLoginState } from "@/reducers/loginReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useLogin(onSuccess?: () => void) {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: "SET_ERROR", value: "" });

    const emailError = validation.email(state.email);
    const passwordError = validation.password(state.password);

    const validationError = emailError || passwordError;

    if (validationError) {
      dispatch({
        type: "SET_ERROR",
        value: validationError,
      });
      return;
    }

    dispatch({ type: "SET_LOADING", value: true });

    try {
      const response = await authService.login({
        email: state.email.trim(),
        password: state.password,
      });

      localStorage.setItem("accessToken", response.accessToken);

      localStorage.setItem("refreshToken", response.refreshToken);

      // Clean old session tokens
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      // Tell Navbar/useMe that user has logged in
      window.dispatchEvent(new Event("auth-changed"));

      onSuccess?.();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Login failed",
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
