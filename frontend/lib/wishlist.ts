import type { Product } from "@/lib/products";

export type WishlistItem = {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  product: Product;
};

export type WishlistResponse = {
  message: string;
  total: number;
  wishlist: WishlistItem[];
  page: number;
  limit: number;
  totalPages: number;
};

export type AddToWishlistData = {
  product_id: number;
};

export type AddToWishlistResponse = {
  message: string;
  wishlistItem: {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
  };
};

export type RemoveFromWishlistResponse = {
  message: string;
};