import { apiRequest } from "@/lib/api";

export const productService = {
  getProducts: (
    page = 1,
    limit = 9,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    onSale?: boolean,
    newArrivals?: boolean,
    inStock?: boolean,
    discount?: number,
    rating?: number,
    sortBy?: string
  ) => {
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

    return apiRequest(url, {
      method: "GET",
    });
  },
};