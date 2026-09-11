import { productService } from "@/services/productService";

export type ProductImage = {
  id: number;
  image_url: string;
  sort_order: number;
};

export type ProductVariant = {
  id: number;
  color_name: string;
  color_hex: string | null;
  stock: number;
  images: ProductImage[];
};

export type Product = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  original_price: string | null;
  rating: string;
  stock: number;

  // Main image
  image: string;

  // Product color variants
  variants?: ProductVariant[];

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

export type ProductResponse = {
  message: string;
  product: Product;
};

export async function getProducts(
  page = 1,
  limit = 9
): Promise<ProductsResponse> {
  return productService.getProducts(page, limit);
}

export async function getProductById(
  id: number
): Promise<ProductResponse> {
  return productService.getProductById(id);
}