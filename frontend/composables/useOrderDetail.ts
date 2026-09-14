"use client";

import { useCallback, useEffect, useState } from "react";
import {
  checkoutService,
  type PlacedOrder,
} from "@/services/checkoutService";

export function useOrderDetail(orderId: number | null) {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getOrder = useCallback(async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError("");

      const response = await checkoutService.getOrderById(orderId);

      setOrder(response.order);
    } catch (error) {
      console.error("Failed to fetch order:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load order",
      );
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return {
    order,
    loading,
    error,
    getOrder,
  };
}