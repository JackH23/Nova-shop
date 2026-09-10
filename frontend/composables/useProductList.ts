"use client";

import { useEffect, useReducer, useState } from "react";
import { productService } from "@/services/productService";
import {
  productReducer,
  initialProductState,
} from "@/reducers/productReducer";

type UseProductListProps = {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  category?: string;
  minDiscount?: number;
  minRating?: number;
};

export function useProductList({
  minPrice = 0,
  maxPrice = 500,
  inStock = false,
  onSale = false,
  category = "all",
  minDiscount = 0,
  minRating = 0,
}: UseProductListProps) {
  const [state, dispatch] = useReducer(
    productReducer,
    initialProductState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      try {
        const response = await productService.getProducts(
          currentPage,
          9
        );

        dispatch({
          type: "SET_PRODUCTS",
          products: response.products,
          total: response.total,
          totalPages: response.totalPages,
          page: response.page,
          limit: response.limit,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          value:
            error instanceof Error
              ? error.message
              : "Failed to get products",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    };

    fetchProducts();
  }, [currentPage]);

  return {
    filteredProducts: state.products,
    paginatedItems: state.products,

    currentPage,
    setCurrentPage,
    totalPages: state.totalPages,

    sortBy,
    setSortBy,

    loading: state.loading,
    error: state.error,
  };
}