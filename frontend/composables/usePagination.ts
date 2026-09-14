"use client";

import { useState } from "react";

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] =
    useState(initialPage);

  const resetPage = () => {
    setCurrentPage(initialPage);
  };

  return {
    currentPage,
    setCurrentPage,
    resetPage,
  };
}