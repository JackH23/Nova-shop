"use client";

import { useEffect, useState } from "react";
import {
  useCart,
  type CartItem,
} from "@/composables/useCart";
import { useCartToast } from "@/composables/useCartToast";

export function useCartContent() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  const {
    addedProducts,
    handleProductRemoved,
    removeToast,
  } = useCartToast();

  // Increase quantity
  const handleIncrease = (item: CartItem) => {
    updateQuantity(
      item.product.id,
      item.color,
      item.quantity + 1,
    );
  };

  // Decrease quantity
  const handleDecrease = (item: CartItem) => {
    updateQuantity(
      item.product.id,
      item.color,
      item.quantity - 1,
    );
  };

  // Remove product
  const handleRemove = (item: CartItem) => {
    handleProductRemoved(item.product);

    removeFromCart(
      item.product.id,
      item.color,
    );
  };

  // Load and listen for cart changes
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );

      setCart(storedCart);
    };

    loadCart();

    window.addEventListener(
      "cart-updated",
      loadCart,
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        loadCart,
      );
    };
  }, []);

  return {
    cart,
    addedProducts,
    handleIncrease,
    handleDecrease,
    handleRemove,
    removeToast,
  };
}