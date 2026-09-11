import { useState } from "react";

type ToastProduct = {
  id: number;
  name: string;
  image: string;
};

type CartToast = {
  id: number;
  product: ToastProduct;
  type: "added" | "removed";
};

export function useCartToast() {
  const [addedProducts, setAddedProducts] = useState<CartToast[]>([]);

  // Add new toast
  const handleProductAdded = (product: ToastProduct) => {
    setAddedProducts((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        product,
        type: "added",
      },
    ]);
  };

  const handleProductRemoved = (product: ToastProduct) => {
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
