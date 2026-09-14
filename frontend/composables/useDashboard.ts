"use client";

import { useCallback, useEffect, useReducer } from "react";
import { dashboardService } from "@/services/dashboardService";
import {
  dashboardReducer,
  initialDashboardState,
} from "@/reducers/dashboardReducer";

export function useDashboard() {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    initialDashboardState,
  );

  const getDashboardSummary = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await dashboardService.getSummary();

      dispatch({
        type: "SET_SUMMARY",
        value: response.dashboard,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to load dashboard",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, []);

  useEffect(() => {
    getDashboardSummary();
  }, [getDashboardSummary]);

  return {
    summary: state.summary,
    loading: state.loading,
    error: state.error,
    getDashboardSummary,
  };
}