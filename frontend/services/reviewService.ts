import { apiRequest } from "@/lib/api";

export type CreateReviewData = {
  rating: number;
  title?: string;
  comment: string;
};

export const reviewService = {
  // Get reviews for a product
  getProductReviews: (productId: number) => {
    return apiRequest(`/reviews/products/${productId}`, {
      method: "GET",
    });
  },

  // Create product review
  createReview: (
    productId: number,
    data: CreateReviewData,
  ) => {
    return apiRequest(`/reviews/products/${productId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};