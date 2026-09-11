"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { useCartToast } from "@/composables/useCartToast";
import { cartService } from "@/services/cartService";
import { cartReducer, initialCartState } from "@/reducers/cartReducer";
import type { CartItem } from "@/lib/cart";

export function useCartContent() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { addedProducts, handleProductRemoved, removeToast } = useCartToast();

  // Get cart
  const getCart = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await cartService.getCart(currentPage, itemsPerPage);

      dispatch({
        type: "SET_CART",
        value: response.cart,
      });

      dispatch({
        type: "SET_PAGINATION",
        value: response.pagination,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value: error instanceof Error ? error.message : "Failed to fetch cart",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [currentPage]);

  // Increase quantity
  const handleIncrease = (item: CartItem) => {
    console.log("increase", item);
  };

  // Decrease quantity
  const handleDecrease = (item: CartItem) => {
    console.log("decrease", item);
  };

  // Remove product
  const handleRemove = async (item: CartItem) => {
    try {
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      await cartService.removeCartItem(item.id);

      // Show removed success toast
      handleProductRemoved(item.product);

      // Refresh cart page
      await getCart();

      // Refresh Navbar cart count
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to remove cart item",
      });
    }
  };

  // Fetch cart when page loads
  useEffect(() => {
    getCart();
  }, [getCart]);

  return {
    cart: state.cart?.items ?? [],
    loading: state.loading,
    error: state.error,

    currentPage,
    setCurrentPage,
    totalPages: state.pagination.totalPages,

    addedProducts,
    handleIncrease,
    handleDecrease,
    handleRemove,
    removeToast,

    getCart,
  };
}
