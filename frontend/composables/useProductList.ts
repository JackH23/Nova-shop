import { useState } from "react";
import { usePagination } from "@/composables/usePagination";
import type { Product } from "@/lib/products";

type UseProductListProps = {
  products: Product[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  category?: string;
  minDiscount?: number;
  minRating?: number;
};

export function useProductList({
  products,
  minPrice = 0,
  maxPrice = 500,
  inStock = false,
  onSale = false,
  category = "all",
  minDiscount = 0,
  minRating = 0,
}: UseProductListProps) {
  const [sortBy, setSortBy] = useState("featured");
  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    const matchesInStock = !inStock || product.stock > 0;

    const matchesOnSale = !onSale || (product.discount ?? 0) > 0;

    const matchesCategory = category === "all" || product.category === category;

    const matchesDiscount =
      minDiscount === 0 || (product.discount ?? 0) >= minDiscount;

    const matchesRating = minRating === 0 || (product.rating ?? 0) >= minRating;

    return (
      matchesPrice &&
      matchesInStock &&
      matchesOnSale &&
      matchesCategory &&
      matchesDiscount &&
      matchesRating
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-high") {
      return a.price - b.price;
    }

    if (sortBy === "high-low") {
      return b.price - a.price;
    }

    return 0;
  });

  const pagination = usePagination(sortedProducts);

  return {
    filteredProducts,
    sortBy,
    setSortBy,
    ...pagination,
  };
}
