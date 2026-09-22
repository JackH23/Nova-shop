"use client";

import { useCallback, useEffect, useReducer } from "react";
import { dashboardService } from "@/services/dashboardService";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import {
  dashboardReducer,
  initialDashboardState,
} from "@/reducers/dashboardReducer";
import { usePagination } from "@/composables/usePagination";

export function useOrders() {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  const { currentPage, setCurrentPage } = usePagination();
  const { openLogin } = useAuth();

  const limit = 5;

  const getOrders = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await dashboardService.getOrders(currentPage, limit);

      dispatch({
        type: "SET_ORDERS",
        value: {
          orders: response.orders,
          total: response.total,
          totalPages: response.totalPages,
          page: response.page,
          limit: response.limit,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Authentication required."
      ) {
        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        openLogin();
        return;
      }

      console.error("Failed to fetch orders:", error);

      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Failed to load orders",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [currentPage, openLogin]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return {
    orders: state.orders,

    currentPage,
    setCurrentPage,
    totalPages: state.totalPages,

    loading: state.loading,
    error: state.error,
    getOrders,
  };
}
