"use client";

import { useState } from "react";

export function usePagination<T>(
  items: T[],
  itemsPerPage = 9,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    items.length / itemsPerPage,
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedItems = items.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    paginatedItems,
  };
}