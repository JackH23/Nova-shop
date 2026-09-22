"use client";

import { useCallback, useEffect, useReducer } from "react";
import { dashboardService } from "@/services/dashboardService";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import {
  dashboardReducer,
  initialDashboardState,
} from "@/reducers/dashboardReducer";

export function useDashboard() {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  const { openLogin } = useAuth();

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

      console.error("Failed to fetch dashboard summary:", error);

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to load dashboard",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [openLogin]);

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
