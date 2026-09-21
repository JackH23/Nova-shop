"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import type { ReviewFormData } from "@/components/products/reviews/ReviewForm";
import { useProductReviews } from "@/composables/useProductReviews";
import { useNotifyModal } from "@/composables/useNotifyModal";
import { useMe } from "@/composables/useMe";

export type ProductTabType = "specifications" | "reviews" | "shipping";

export function useProductTabs(product: Product) {
  const { user } = useMe();

  const { reviews, loading, submitting, error, createReview } =
    useProductReviews(product.id);

  const hasSpecifications = (product.specifications?.length ?? 0) > 0;

  const hasReviews = product.reviews_enabled;

  const hasUserReviewed = reviews.some((review) => review.user_id === user?.id);

  const hasShipping =
    Boolean(product.shipping_description) ||
    Boolean(product.free_standard_shipping && product.free_shipping_text);

  const getInitialTab = (): ProductTabType => {
    if (hasSpecifications) {
      return "specifications";
    }

    if (hasReviews) {
      return "reviews";
    }

    return "shipping";
  };

  const [activeTab, setActiveTab] = useState<ProductTabType>(getInitialTab);

  const { notification, notifySuccess, notifyError, closeNotification } =
    useNotifyModal();

  useEffect(() => {
    if (error) {
      notifyError("Unable to Submit Review", error);
    }
  }, [error, notifyError]);

  const handleSubmitReview = async (data: ReviewFormData) => {
    const success = await createReview(data);

    if (success) {
      notifySuccess(
        "Review Submitted",
        "Thank you! Your review has been submitted successfully.",
      );
    }
  };

  const hasAnyTab = hasSpecifications || hasReviews || hasShipping;

  return {
    // Tabs
    activeTab,
    setActiveTab,

    hasSpecifications,
    hasReviews,
    hasShipping,
    hasAnyTab,

    // Reviews
    reviews,
    loading,
    submitting,
    hasUserReviewed,
    handleSubmitReview,

    // Notification
    notification,
    closeNotification,
  };
}
