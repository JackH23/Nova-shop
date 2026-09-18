import { apiRequest } from "@/lib/api";
import type { ProductsResponse, ProductResponse } from "@/lib/products";

export const productService = {
  getProducts: ({
    page = 1,
    limit = 15,
    categoryId,
    minPrice,
    maxPrice,
    onSale,
    newArrivals,
    inStock,
    discount,
    rating,
    sortBy,
    search,
  }: {
    page?: number;
    limit?: number;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    onSale?: boolean;
    newArrivals?: boolean;
    inStock?: boolean;
    discount?: number;
    rating?: number;
    sortBy?: string;
    search?: string;
  } = {}) => {
    let url = `/products?page=${page}&limit=${limit}`;

    // Category filter
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }

    // Minimum price filter
    if (minPrice !== undefined) {
      url += `&min_price=${minPrice}`;
    }

    // Maximum price filter
    if (maxPrice !== undefined) {
      url += `&max_price=${maxPrice}`;
    }

    // Deals filter
    if (onSale) {
      url += `&on_sale=true`;
    }

    // New arrivals filter
    if (newArrivals) {
      url += `&new_arrivals=true`;
    }

    // In stock filter
    if (inStock) {
      url += `&in_stock=true`;
    }

    // Discount filter
    if (discount !== undefined && discount > 0) {
      url += `&discount=${discount}`;
    }

    // Rating filter
    if (rating !== undefined && rating > 0) {
      url += `&rating=${rating}`;
    }

    // Product sorting
    if (sortBy) {
      url += `&sort=${sortBy}`;
    }

    // Search product
    if (search?.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    return apiRequest<ProductsResponse>(url, {
      method: "GET",
    });
  },

  // Get product by ID
  getProductById: (id: number) => {
    return apiRequest<ProductResponse>(`/products/${id}`, {
      method: "GET",
    });
  },
};
