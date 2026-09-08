import { usePagination } from "@/composables/usePagination";
import type { Product } from "@/lib/products";

type UseProductListProps = {
  products: Product[];
  minPrice?: number;
  maxPrice?: number;
};

export function useProductList({
  products,
  minPrice = 0,
  maxPrice = 500,
}: UseProductListProps) {
  const filteredProducts = products.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  const pagination = usePagination(filteredProducts);

  return {
    filteredProducts,
    ...pagination,
  };
}