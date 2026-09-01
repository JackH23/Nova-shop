"use client";

import { useState } from "react";
import { useCart } from "@/composables/useCart";
import type { Product } from "@/lib/products";

export function useProductCart(product: Product) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("white");

  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedColor,
    );
  };

  return {
    quantity,
    selectedColor,
    setSelectedColor,
    decreaseQuantity,
    increaseQuantity,
    handleAddToCart,
  };
}