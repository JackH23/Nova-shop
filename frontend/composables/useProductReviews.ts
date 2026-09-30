"use client";

import { useCallback, useEffect, useState } from "react";
import {
  reviewService,
  type CreateReviewData,
} from "@/services/reviewService";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import type { ProductReview } from "@/lib/products";

type ProductReviewsResponse = {
  reviews?: ProductReview[];
};

export function useProductReviews(productId: number) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { openLogin } = useAuth();

  const getReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        (await reviewService.getProductReviews(productId)) as ProductReviewsResponse;

      setReviews(response.reviews ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load reviews",
      );
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const createReview = async (
    data: CreateReviewData,
  ): Promise<boolean> => {
    try {
      setSubmitting(true);
      setError(null);

      await reviewService.createReview(
        productId,
        data,
      );

      await getReviews();

      return true;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Authentication required."
      ) {
        setError(null);

        openLogin();

        return false;
      }

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create review",
      );

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return {
    reviews,
    loading,
    submitting,
    error,
    getReviews,
    createReview,
  };
}
