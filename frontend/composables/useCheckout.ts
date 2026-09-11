"use client";

import { useCallback, useEffect, useReducer } from "react";

import {
  checkoutService,
  type PlaceOrderRequest,
} from "@/services/checkoutService";

import {
  checkoutReducer,
  initialCheckoutState,
} from "@/reducers/checkoutReducer";

export function useCheckout() {
  const [state, dispatch] = useReducer(checkoutReducer, initialCheckoutState);

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
          error instanceof Error ? error.message : "Failed to load checkout",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, []);

  // Place order
  const placeOrder = useCallback(async (data: PlaceOrderRequest) => {
    try {
      // Start placing order
      dispatch({
        type: "SET_PLACING_ORDER",
        value: true,
      });

      // Clear previous error
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      // Call API
      const response = await checkoutService.placeOrder(data);

      // Save placed order
      dispatch({
        type: "SET_PLACED_ORDER",
        value: response.order,
      });

      return response;
    } catch (error) {
      console.error("Failed to place order:", error);

      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Failed to place order",
      });

      throw error;
    } finally {
      dispatch({
        type: "SET_PLACING_ORDER",
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
    placedOrder: state.placedOrder,

    loading: state.loading,
    placingOrder: state.placingOrder,
    error: state.error,

    getCheckout,
    placeOrder,
  };
}
