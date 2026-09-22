"use client";

import { useCallback, useEffect, useReducer } from "react";
import type {
  CreatePaymentMethodData,
  UpdatePaymentMethodData,
} from "@/lib/paymentMethod";
import { paymentMethodService } from "@/services/paymentMethodService";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";

import {
  initialPaymentMethodState,
  paymentMethodReducer,
} from "@/reducers/paymentMethodReducer";

export function usePaymentMethods() {
  const [state, dispatch] = useReducer(
    paymentMethodReducer,
    initialPaymentMethodState,
  );

  const { openLogin } = useAuth();

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
    [openLogin],
  );

  // Create payment method
  const createPaymentMethod = async (data: CreatePaymentMethodData) => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: "" });

    try {
      const response = await paymentMethodService.createPaymentMethod(data);

      // Don't manually add it to the current page.
      // Refetch so backend pagination keeps the limit at 4.
      await getPaymentMethods(state.page, state.limit);

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

  // Update payment method
  const updatePaymentMethod = async (
    paymentMethodId: number,
    data: UpdatePaymentMethodData,
  ) => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: "" });

    try {
      const response = await paymentMethodService.updatePaymentMethod(
        paymentMethodId,
        data,
      );

      dispatch({
        type: "UPDATE_PAYMENT_METHOD",
        value: response.paymentMethod,
      });

      return response.paymentMethod;
    } catch (error) {
      console.error("Update payment method error:", error);

      dispatch({
        type: "SET_ERROR",
        value: "Failed to update payment method",
      });

      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  // Remove payment method
  const removePaymentMethod = async (paymentMethodId: number) => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: "" });

    try {
      await paymentMethodService.removePaymentMethod(paymentMethodId);

      dispatch({
        type: "REMOVE_PAYMENT_METHOD",
        value: paymentMethodId,
      });

      // If this was the last item on the current page,
      // go back to the previous page.
      if (state.paymentMethods.length === 1 && state.page > 1) {
        await getPaymentMethods(state.page - 1, state.limit);
      } else {
        await getPaymentMethods(state.page, state.limit);
      }
    } catch (error) {
      console.error("Remove payment method error:", error);

      dispatch({
        type: "SET_ERROR",
        value: "Failed to remove payment method",
      });

      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId: number) => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: "" });

    try {
      const response =
        await paymentMethodService.setDefaultPaymentMethod(paymentMethodId);

      dispatch({
        type: "SET_DEFAULT_PAYMENT_METHOD",
        value: response.paymentMethod,
      });

      return response.paymentMethod;
    } catch (error) {
      console.error("Set default payment method error:", error);

      dispatch({
        type: "SET_ERROR",
        value: "Failed to set default payment method",
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
    updatePaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  };
}
