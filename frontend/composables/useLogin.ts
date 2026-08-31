"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";

import {
  loginReducer,
  initialLoginState,
} from "@/reducers/loginReducer";

import { authService } from "@/services/authService";
import { validation } from "@/validations/validation";

export function useLogin() {
  const router = useRouter();

  const [state, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    dispatch({ type: "SET_ERROR", value: "" });

    const emailError = validation.email(state.email);
    const passwordError = validation.password(state.password);

    const validationError =
      emailError || passwordError;

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

      localStorage.setItem("token", response.token);

      router.push("/");
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Login failed",
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