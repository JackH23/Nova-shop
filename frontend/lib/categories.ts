import { categoryService } from "@/services/categoryService";

export type Category = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type CategoriesResponse = {
  message: string;
  categories: Category[];
};

export async function getCategories(): Promise<CategoriesResponse> {
  return categoryService.getCategories();
}