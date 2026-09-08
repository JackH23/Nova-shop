import { useState } from "react";
import type { Product } from "@/lib/products";

type CartToast = {
  id: number;
  product: Product;
  type: "added" | "removed";
};

export function useCartToast() {
  const [addedProducts, setAddedProducts] = useState<CartToast[]>([]);

  // Add new toast
  const handleProductAdded = (product: Product) => {
    setAddedProducts((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        product,
        type: "added",
      },
    ]);
  };

  const handleProductRemoved = (product: Product) => {
    setAddedProducts((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        product,
        type: "removed",
      },
    ]);
  };

  // Remove toast
  const removeToast = (id: number) => {
    setAddedProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    addedProducts,
    handleProductAdded,
    handleProductRemoved,
    removeToast,
  };
}
