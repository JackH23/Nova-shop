"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { ReturnRequest } from "@/lib/returns";
import { returnService } from "@/services/returnService";

export function useReturnDetail(
  returnId: number,
) {
  const [
    returnRequest,
    setReturnRequest,
  ] = useState<ReturnRequest | null>(
    null,
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const getReturnDetail =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await returnService.getReturnById(
            returnId,
          );

        console.log(
          "Return detail response:",
          response,
        );

        setReturnRequest(
          response.return,
        );
      } catch (error) {
        console.error(
          "Get return detail error:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load return",
        );
      } finally {
        setLoading(false);
      }
    }, [returnId]);

  useEffect(() => {
    if (!returnId) {
      return;
    }

    getReturnDetail();
  }, [
    returnId,
    getReturnDetail,
  ]);

  return {
    returnRequest,
    loading,
    error,
    getReturnDetail,
  };
}