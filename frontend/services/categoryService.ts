import { apiRequest } from "@/lib/api";

export const categoryService = {
  getCategories: () => {
    return apiRequest("/categories", {
      method: "GET",
    });
  },
};