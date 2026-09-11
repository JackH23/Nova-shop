"use client";

import { useCallback, useEffect, useReducer } from "react";

import { checkoutService } from "@/services/checkoutService";

import {
  checkoutReducer,
  initialCheckoutState,
} from "@/reducers/checkoutReducer";

export function useCheckout() {
  const [state, dispatch] = useReducer(
    checkoutReducer,
    initialCheckoutState,
  );

  // Get checkout
  const getCheckout = useCallback(async () => {
    try {
      // Start loading
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      // Clear previous error
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      // Call API
      const response = await checkoutService.getCheckout();

      // Save API response to reducer
      dispatch({
        type: "SET_CHECKOUT",
        value: response.checkout,
      });
    } catch (error) {
      console.error("Failed to fetch checkout:", error);

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to load checkout",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, []);

  // Load checkout when component opens
  useEffect(() => {
    getCheckout();
  }, [getCheckout]);

  return {
    checkout: state.checkout,
    loading: state.loading,
    error: state.error,

    getCheckout,
  };
}