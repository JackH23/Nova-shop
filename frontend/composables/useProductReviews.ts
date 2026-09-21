"use client";

import { useCallback, useEffect, useState } from "react";
import {
  reviewService,
  type CreateReviewData,
} from "@/services/reviewService";

export type ProductReview = {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  title: string | null;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
  user?: {
    id: number;
    fullName: string;
  };
};

export function useProductReviews(productId: number) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await reviewService.getProductReviews(productId);

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

  const createReview = async (data: CreateReviewData) => {
    try {
      setSubmitting(true);
      setError(null);

      await reviewService.createReview(productId, data);

      await getReviews();

      return true;
    } catch (error) {
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