import { apiRequest } from "@/lib/api";

export const productService = {
  getProducts: (page = 1, limit = 9) => {
    return apiRequest(`/products?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },
};