"use client";

import { useEffect, useState } from "react";
import { cartService } from "@/services/cartService";
import type { CartItem } from "@/lib/cart";
import { hasAuthToken } from "@/lib/api";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      // Guest user
      if (!hasAuthToken()) {
        setCart([]);
        setCartCount(0);
        return;
      }

      try {
        const response = await cartService.getCart();

        const items = response.cart?.items ?? [];

        setCart(items);

        // IMPORTANT:
        // Use totalQuantity from backend because items are paginated
        setCartCount(
          Number(response.cart?.totalQuantity ?? 0),
        );
      } catch (error) {
        console.error(
          "Failed to fetch cart:",
          error,
        );

        setCart([]);
        setCartCount(0);
      }
    };

    // Initial fetch
    getCart();

    // Listen for cart changes
    const handleCartUpdated = () => {
      getCart();
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdated,
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdated,
      );
    };
  }, []);

  return {
    cart,
    cartCount,
  };
}