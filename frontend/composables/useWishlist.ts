"use client";

import { useCallback, useEffect, useReducer } from "react";
import { wishlistService } from "@/services/wishlistService";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import {
  initialWishlistState,
  wishlistReducer,
} from "@/reducers/wishlistReducer";
import { usePagination } from "@/composables/usePagination";

export function useWishlist() {
  const [state, dispatch] = useReducer(wishlistReducer, initialWishlistState);

  const { currentPage, setCurrentPage } = usePagination();
  const { openLogin } = useAuth();

  // ========================================
  // Get wishlist
  // ========================================
  const getWishlist = useCallback(async () => {
    dispatch({
      type: "SET_LOADING",
      value: true,
    });

    dispatch({
      type: "SET_ERROR",
      value: "",
    });

    try {
      const response = await wishlistService.getWishlist(currentPage);

      dispatch({
        type: "SET_WISHLIST",
        value: response.wishlist,
      });

      dispatch({
        type: "SET_TOTAL",
        value: response.total,
      });

      dispatch({
        type: "SET_PAGINATION",
        value: {
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Authentication required."
      ) {
        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        openLogin();
        return;
      }

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to load wishlist",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [currentPage, openLogin]);

  // ========================================
  // Add product to wishlist
  // ========================================
  const addToWishlist = useCallback(
    async (productId: number) => {
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      try {
        await wishlistService.addToWishlist({
          product_id: productId,
        });

        // Reload because POST response currently
        // doesn't contain the full product object.
        await getWishlist();

        return true;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Authentication required."
        ) {
          dispatch({
            type: "SET_ERROR",
            value: "",
          });

          openLogin();
          return false;
        }

        dispatch({
          type: "SET_ERROR",
          value:
            error instanceof Error
              ? error.message
              : "Failed to add product to wishlist",
        });

        return false;
      }
    },
    [getWishlist, openLogin],
  );

  // ========================================
  // Remove product from wishlist
  // ========================================
  const removeFromWishlist = useCallback(
    async (productId: number) => {
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      try {
        await wishlistService.removeFromWishlist(productId);

        dispatch({
          type: "REMOVE_WISHLIST_ITEM",
          value: productId,
        });

        return true;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Authentication required."
        ) {
          dispatch({
            type: "SET_ERROR",
            value: "",
          });

          openLogin();
          return false;
        }

        dispatch({
          type: "SET_ERROR",
          value:
            error instanceof Error
              ? error.message
              : "Failed to remove product from wishlist",
        });

        return false;
      }
    },
    [openLogin],
  );

  // ========================================
  // Load wishlist when page opens
  // ========================================
  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return {
    wishlist: state.wishlist,
    total: state.total,
    loading: state.loading,
    error: state.error,

    currentPage,
    setCurrentPage,
    totalPages: state.totalPages,

    getWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}
