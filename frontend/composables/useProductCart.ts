"use client";

import { useReducer, useState } from "react";
import axios from "axios";

import type { Product, ProductVariant } from "@/lib/products";
import { cartService } from "@/services/cartService";
import { cartReducer, initialCartState } from "@/reducers/cartReducer";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";

export function useProductCart(
  product: Product,
  selectedVariant: ProductVariant | null,
  onProductAdded?: (product: Product) => void,
) {
  const [quantity, setQuantity] = useState(1);

  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const { openLogin } = useAuth();

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = async () => {
    if (product.variants?.length && !selectedVariant) {
      dispatch({
        type: "SET_ERROR",
        value: "Please select a color",
      });

      return null;
    }

    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await cartService.addToCart(
        product.id,
        selectedVariant?.id ?? null,
        quantity,
      );

      dispatch({
        type: "SET_CART_ITEM",
        value: response.cartItem,
      });

      // Notify Navbar that cart data changed
      window.dispatchEvent(new Event("cart-updated"));

      onProductAdded?.(product);

      return response;
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);

      if (
        error instanceof Error &&
        error.message === "Authentication required."
      ) {
        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        openLogin();

        return null;
      }

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to add product to cart",
      });

      return null;
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  };

  return {
    quantity,
    decreaseQuantity,
    increaseQuantity,
    handleAddToCart,

    cartItem: state.cartItem,
    loading: state.loading,
    error: state.error,
  };
}
