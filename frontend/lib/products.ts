import { productService } from "@/services/productService";

export type Product = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  original_price: string;
  rating: string;
  stock: number;
  image: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_on_sale: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  discount?: number;
};

export type ProductsResponse = {
  message: string;
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
};

export async function getProducts(
  page = 1,
  limit = 9
): Promise<ProductsResponse> {
  return productService.getProducts(page, limit);
}