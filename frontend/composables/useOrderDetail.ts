"use client";

import { useCallback, useEffect, useReducer } from "react";
import { dashboardService } from "@/services/dashboardService";
import {
  dashboardReducer,
  initialDashboardState,
} from "@/reducers/dashboardReducer";

export function useOrderDetail(orderId: number | null) {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialDashboardState,
  );

  const getOrder = useCallback(async () => {
    if (!orderId) return;

    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response =
        await dashboardService.getOrderById(orderId);

      dispatch({
        type: "SET_ORDER",
        value: response.order,
      });
    } catch (error) {
      console.error("Failed to fetch order:", error);

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to load order",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [orderId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return {
    order: state.order,
    loading: state.loading,
    error: state.error,
    getOrder,
  };
}