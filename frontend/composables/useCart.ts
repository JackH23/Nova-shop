"use client";

import { useEffect, useState } from "react";
import { cartService } from "@/services/cartService";
import type { CartItem } from "@/lib/cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await cartService.getCart();

        const items = response.cart.items;

        setCart(items);

        const totalQuantity = items.reduce(
          (total: number, item: CartItem) => total + item.quantity,
          0,
        );

        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Failed to fetch cart:", error);

        setCart([]);
        setCartCount(0);
      }
    };

    getCart();

    window.addEventListener("cart-updated", getCart);

    return () => {
      window.removeEventListener("cart-updated", getCart);
    };
  }, []);

  return {
    cart,
    cartCount,
  };
}
