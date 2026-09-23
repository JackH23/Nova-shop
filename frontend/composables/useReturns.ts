"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { ReturnRequest } from "@/lib/returns";
import { returnService } from "@/services/returnService";

export function useReturns() {
  const [returns, setReturns] = useState<
    ReturnRequest[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const getReturns = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await returnService.getReturns();

        setReturns(response.returns);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load returns",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getReturns();
  }, [getReturns]);

  return {
    returns,
    loading,
    error,
    getReturns,
  };
}