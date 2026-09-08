import { usePagination } from "@/composables/usePagination";
import type { Product } from "@/lib/products";

type UseProductListProps = {
  products: Product[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  category?: string;
};

export function useProductList({
  products,
  minPrice = 0,
  maxPrice = 500,
  inStock = false,
  onSale = false,
  category = "all",
}: UseProductListProps) {
  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= minPrice &&
      product.price <= maxPrice;

    const matchesInStock =
      !inStock || product.stock > 0;

    const matchesOnSale =
      !onSale || (product.discount ?? 0) > 0;

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return (
      matchesPrice &&
      matchesInStock &&
      matchesOnSale &&
      matchesCategory
    );
  });

  const pagination = usePagination(filteredProducts);

  return {
    filteredProducts,
    ...pagination,
  };
}