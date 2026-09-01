"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );

      setCart(storedCart);

      const totalQuantity = storedCart.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      setCartCount(totalQuantity);
    };

    // Load count when component first mounts
    updateCartCount();

    // Listen when cart changes
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  const addToCart = (product: Product, quantity: number, color: string) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.color === color,
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

  const updateQuantity = (
    productId: number,
    color: string,
    quantity: number,
  ) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = cart.map((item) =>
      item.product.id === productId && item.color === color
        ? {
            ...item,
            quantity: Math.max(1, quantity),
          }
        : item,
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeFromCart = (productId: number, color: string) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = cart.filter(
      (item) => !(item.product.id === productId && item.color === color),
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cart-updated"));
  };

  return {
    cart,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
