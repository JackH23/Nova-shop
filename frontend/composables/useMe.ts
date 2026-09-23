"use client";

import { useCallback, useEffect, useReducer } from "react";

import { authService } from "@/services/authService";
import { meReducer, initialMeState } from "@/reducers/meReducer";

let meRequest: Promise<any> | null = null;

export function useMe() {
  const [state, dispatch] = useReducer(meReducer, initialMeState);

  const refreshUser = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    const refreshToken = localStorage.getItem("refreshToken");

    // No authentication at all
    if (!accessToken && !refreshToken) {
      dispatch({
        type: "SET_USER",
        value: null,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
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

    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    try {
      // apiRequest handles:
      //
      // access token valid
      // → /me succeeds
      //
      // access token expired
      // → 401
      // → refresh token
      // → new access token
      // → retry /me
      //
      // refresh token expired
      // → clear tokens
      // → throw error

      if (!meRequest) {
        meRequest = authService.getMe().finally(() => {
          meRequest = null;
        });
      }

      const response = await meRequest;

      console.log("GET ME RESPONSE:", response);

      dispatch({
        type: "SET_USER",
        value: response.user,
      });
    } catch (error) {
      // apiRequest clears tokens when
      // refresh token is expired/invalid.

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

  // Check user when Navbar/page first loads
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Listen for login/logout changes
  useEffect(() => {
    const handleAuthChange = () => {
      refreshUser();
    };

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, [refreshUser]);

  return {
    ...state,
    refreshUser,
  };
}
