import { apiRequest } from "@/lib/api";

export const cartService = {
  // Add product to cart
  addToCart: (
    productId: number,
    variantId: number | null,
    quantity: number,
  ) => {
    return apiRequest("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        variant_id: variantId,
        quantity,
      }),
    });
  },

  // Get cart
  getCart: (page = 1, limit = 5) => {
    return apiRequest(`/cart?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },

  // Remove cart item
  removeCartItem: (cartItemId: number) => {
    return apiRequest(`/cart/items/${cartItemId}`, {
      method: "DELETE",
    });
  },

  // Update cart item quantity
  updateCartItem: (cartItemId: number, quantity: number) => {
    return apiRequest(`/cart/items/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity,
      }),
    });
  },
};
