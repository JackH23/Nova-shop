"use client";

import { useCallback, useReducer } from "react";
import { returnService } from "@/services/returnService";
import {
  returnReducer,
  initialReturnState,
} from "@/reducers/returnReducer";
import type { CreateReturnData } from "@/lib/returns";

export function useReturn() {
  const [state, dispatch] = useReducer(
    returnReducer,
    initialReturnState,
  );

  const createReturn = useCallback(
    async (data: CreateReturnData) => {
      try {
        dispatch({
          type: "SET_LOADING",
          value: true,
        });

        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        const response = await returnService.createReturn(data);

        dispatch({
          type: "SET_RETURN",
          value: response.return,
        });

        return response;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to submit return request";

        dispatch({
          type: "SET_ERROR",
          value: message,
        });

        throw error;
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    },
    [],
  );

  return {
    returnRequest: state.returnRequest,
    loading: state.loading,
    error: state.error,
    createReturn,
  };
}