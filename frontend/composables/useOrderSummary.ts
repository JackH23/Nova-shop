"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/cartService";
import type { DashboardOrder } from "@/lib/dashboard";

export function useOrderSummary(order: DashboardOrder) {
  const router = useRouter();

  const [buyAgainError, setBuyAgainError] = useState("");
  const [buyAgainLoading, setBuyAgainLoading] = useState(false);

  const canReturn =
    order.status === "DELIVERED" &&
    !order.has_return_request;

  const returnButtonText = order.has_return_request
    ? "Already Returned"
    : "Return Item";

  const handleBuyAgainErrorConfirm = () => {
    setBuyAgainError("");

    window.dispatchEvent(new Event("cart-updated"));

    router.push("/cart");
  };

  const handleBuyAgain = async () => {
    if (buyAgainLoading) return;

    try {
      setBuyAgainLoading(true);

      await Promise.all(
        order.items.map((item) =>
          cartService.addToCart(
            item.product_id,
            item.variant_id,
            item.quantity,
          ),
        ),
      );

      window.dispatchEvent(new Event("cart-updated"));

      router.push("/cart");
    } catch (error: unknown) {
      console.error(
        "Failed to buy again:",
        error,
      );

      window.dispatchEvent(
        new Event("cart-updated"),
      );

      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }
            ).response?.data?.message
          : undefined;

      setBuyAgainError(
        message ||
          (error instanceof Error
            ? error.message
            : "Unable to add these items to your cart."),
      );
    } finally {
      setBuyAgainLoading(false);
    }
  };

  const handleReturnItem = () => {
    if (!canReturn) return;

    router.push(
      `/dashboard/orders/${order.id}/return`,
    );
  };

  const handleCloseBuyAgainError = () => {
    setBuyAgainError("");
  };

  return {
    buyAgainError,
    buyAgainLoading,

    canReturn,
    returnButtonText,

    handleBuyAgain,
    handleBuyAgainErrorConfirm,
    handleCloseBuyAgainError,
    handleReturnItem,
  };
}