"use client";

import { useCallback, useEffect, useReducer } from "react";
import type { CreatePaymentMethodData } from "@/lib/paymentMethod";
import { paymentMethodService } from "@/services/paymentMethodService";

import {
  initialPaymentMethodState,
  paymentMethodReducer,
} from "@/reducers/paymentMethodReducer";

export function usePaymentMethods() {
  const [state, dispatch] = useReducer(
    paymentMethodReducer,
    initialPaymentMethodState,
  );

  // Get payment methods
  const getPaymentMethods = useCallback(
    async (page: number = 1, limit: number = 4) => {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      try {
        const response = await paymentMethodService.getPaymentMethods(
          page,
          limit,
        );

        dispatch({
          type: "SET_PAYMENT_METHODS",
          value: response.paymentMethods,
        });

        dispatch({
          type: "SET_TOTAL",
          value: response.total,
        });

        dispatch({
          type: "SET_PAGINATION",
          value: {
            page: response.page,
            limit: response.limit,
            totalPages: response.totalPages,
          },
        });
      } catch (error) {
        console.error("Get payment methods error:", error);

        dispatch({
          type: "SET_ERROR",
          value: "Failed to load payment methods",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    },
    [],
  );

  // Create payment method
  const createPaymentMethod = async (data: CreatePaymentMethodData) => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: "" });

    try {
      const response = await paymentMethodService.createPaymentMethod(data);

      dispatch({
        type: "ADD_PAYMENT_METHOD",
        value: response.paymentMethod,
      });

      return response.paymentMethod;
    } catch (error) {
      console.error("Create payment method error:", error);

      dispatch({
        type: "SET_ERROR",
        value: "Failed to create payment method",
      });

      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  // Load payment methods
  useEffect(() => {
    getPaymentMethods();
  }, [getPaymentMethods]);

  return {
    paymentMethods: state.paymentMethods,
    paymentMethod: state.paymentMethod,

    total: state.total,
    page: state.page,
    limit: state.limit,
    totalPages: state.totalPages,

    loading: state.loading,
    error: state.error,

    getPaymentMethods,
    createPaymentMethod,
  };
}
