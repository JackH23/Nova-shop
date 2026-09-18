"use client";

import { useEffect, useReducer, useState } from "react";
import { productService } from "@/services/productService";
import { productReducer, initialProductState } from "@/reducers/productReducer";
import { usePagination } from "@/composables/usePagination";

type UseProductListProps = {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  newArrivals?: boolean;
  categoryId?: number | null;
  minDiscount?: number;
  minRating?: number;
  search?: string;
};

export function useProductList({
  minPrice,
  maxPrice,
  inStock = false,
  onSale = false,
  newArrivals = false,
  categoryId = null,
  minDiscount = 0,
  minRating = 0,
  search = "",
}: UseProductListProps) {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  const { currentPage, setCurrentPage, resetPage } = usePagination();

  const [sortBy, setSortBy] = useState("newest");

  // Reset to page 1 when any filter changes
  useEffect(() => {
    resetPage();
  }, [
    categoryId,
    minPrice,
    maxPrice,
    onSale,
    newArrivals,
    inStock,
    minDiscount,
    minRating,
    sortBy,
    search,
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      try {
        const response = await productService.getProducts({
          page: currentPage,
          categoryId: categoryId ?? undefined,
          minPrice: minPrice === 0 && maxPrice === 500 ? undefined : minPrice,
          maxPrice: minPrice === 0 && maxPrice === 500 ? undefined : maxPrice,
          onSale,
          newArrivals,
          inStock,
          discount: minDiscount,
          rating: minRating,
          sortBy,
          search,
        });

        console.log("PRODUCT LIST RESPONSE:", {
          total: response.total,
          products: response.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        });

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
            error instanceof Error ? error.message : "Failed to get products",
        });
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    };

    fetchProducts();
  }, [
    currentPage,
    categoryId,
    minPrice,
    maxPrice,
    onSale,
    newArrivals,
    inStock,
    minDiscount,
    minRating,
    search,
    sortBy,
  ]);

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
