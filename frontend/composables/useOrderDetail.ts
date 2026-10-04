"use client";

import {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { dashboardService } from "@/services/dashboardService";

import {
  dashboardReducer,
  initialDashboardState,
} from "@/reducers/dashboardReducer";

import type {
  DashboardOrderPagination,
} from "@/lib/dashboard";

export function useOrderDetail(
  orderId: number | null,
  page: number = 1,
  limit: number = 5,
) {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialDashboardState,
  );

  const [
    pagination,
    setPagination,
  ] = useState<DashboardOrderPagination | null>(
    null,
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
        await dashboardService.getOrderById(
          orderId,
          page,
          limit,
        );

      dispatch({
        type: "SET_ORDER",
        value: response.order,
      });

      setPagination(
        response.pagination,
      );
    } catch (error) {
      console.error(
        "Failed to fetch order:",
        error,
      );

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
  }, [
    orderId,
    page,
    limit,
  ]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return {
    order: state.order,
    pagination,
    loading: state.loading,
    error: state.error,
    getOrder,
  };
}