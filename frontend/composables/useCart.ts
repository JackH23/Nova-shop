"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
};

export function useCart() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (
    product: Product,
    quantity: number,
    color: string,
  ) => {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    const existingItem = cart.find(
      (item) =>
        item.product.id === product.id &&
        item.color === color,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        product,
        quantity,
        color,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    setCartCount(totalQuantity);

    window.dispatchEvent(new Event("cart-updated"));
  };

  return {
    cartCount,
    addToCart,
  };
}