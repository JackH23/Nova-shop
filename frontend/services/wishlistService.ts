import { apiRequest } from "@/lib/api";

import type {
  WishlistResponse,
  AddToWishlistData,
  AddToWishlistResponse,
  RemoveFromWishlistResponse,
} from "@/lib/wishlist";

export const wishlistService = {
  // GET logged-in user's wishlist
  getWishlist: (
    page: number = 1,
    limit: number = 12,
  ): Promise<WishlistResponse> => {
    return apiRequest(`/wishlist?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },

  // Add product to wishlist
  addToWishlist: (data: AddToWishlistData): Promise<AddToWishlistResponse> => {
    return apiRequest("/wishlist", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Remove product from wishlist
  removeFromWishlist: (
    productId: number,
  ): Promise<RemoveFromWishlistResponse> => {
    return apiRequest(`/wishlist/${productId}`, {
      method: "DELETE",
    });
  },
};
