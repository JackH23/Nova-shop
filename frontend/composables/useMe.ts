"use client";

import { useCallback, useEffect, useReducer } from "react";
import { authService } from "@/services/authService";
import { meReducer, initialMeState } from "@/reducers/meReducer";

let meRequest: Promise<any> | null = null;

export function useMe() {
  const [state, dispatch] = useReducer(meReducer, initialMeState);

  const refreshUser = useCallback(async () => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (!token) {
      dispatch({
        type: "SET_USER",
        value: null,
      });

      dispatch({
        type: "SET_LOADING",
        value: false,
      });

      return;
    }

    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    try {
      if (!meRequest) {
        meRequest = authService.getMe().finally(() => {
          meRequest = null;
        });
      }

      const response = await meRequest;

      dispatch({
        type: "SET_USER",
        value: response.user,
      });
    } catch (error) {
      dispatch({
        type: "SET_USER",
        value: null,
      });

      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Failed to get user",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return {
    ...state,
    refreshUser,
  };
}
