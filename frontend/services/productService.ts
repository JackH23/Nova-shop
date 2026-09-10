import { apiRequest } from "@/lib/api";

export const productService = {
  getProducts: (
    page = 1,
    limit = 9,
    categoryId?: number
  ) => {
    let url = `/products?page=${page}&limit=${limit}`;

    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }

    return apiRequest(url, {
      method: "GET",
    });
  },
};