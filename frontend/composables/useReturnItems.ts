"use client";

import { useOrderDetail } from "@/composables/useOrderDetail";
import { usePagination } from "@/composables/usePagination";
import { usePaginationScroll } from "@/composables/usePaginationScroll";

const ITEMS_PER_PAGE = 5;

export function useReturnItems(orderId: number) {
  const {
    currentPage,
    setCurrentPage,
    resetPage,
  } = usePagination();

  const {
    order,
    pagination,
    loading,
    error,
  } = useOrderDetail(
    orderId,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const {
    targetRef: itemListRef,
    handlePageChange,
  } = usePaginationScroll(
    setCurrentPage,
  );

  return {
    order,

    // Backend already returns only the current page items
    paginatedItems: order?.items ?? [],

    currentPage,
    totalPages: pagination?.totalPages ?? 1,
    totalItems: pagination?.totalItems ?? 0,

    loading,
    error,

    itemListRef,
    handlePageChange,
    resetPage,
  };
}