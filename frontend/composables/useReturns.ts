"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { ReturnRequest } from "@/lib/returns";
import { returnService } from "@/services/returnService";

const RETURNS_PER_PAGE = 6;

export function useReturns() {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get returns
  const getReturns = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await returnService.getReturns(
        currentPage,
        RETURNS_PER_PAGE,
      );

      setReturns(response.returns);

      // Pagination response
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load returns";

      setError(message);
      setReturns([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getReturns();
  }, [getReturns]);

  return {
    returns,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    total,

    // State
    loading,
    error,

    // Actions
    getReturns,
  };
}