"use client";

import { useProductList } from "@/composables/useProductList";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";
import Pagination from "@/components/common/Pagination";
import ProductSort from "./ProductSort";

type CategoryProductListProps = {
  category: string;
  products: Product[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  onProductAdded?: (product: Product) => void;
};

export default function CategoryProductList({
  category,
  minPrice = 0,
  maxPrice = 500,
  inStock = false,
  onSale = false,
  onProductAdded,
}: CategoryProductListProps) {
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const {
    filteredProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    sortBy,
    setSortBy,
  } = useProductList({
    minPrice,
    maxPrice,
    inStock,
    onSale,
    search: categoryName,
  });

  return (
    <div className="min-w-0 flex-1">
      {/* Breadcrumb */}
      <p className="text-xs text-slate-400">
        Home / Categories / {categoryName}
      </p>

      {/* Category heading */}
      <div className="mt-3">
        <h1 className="text-3xl font-bold text-slate-950">{categoryName}</h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore our latest {categoryName.toLowerCase()} products.
        </p>
      </div>

      {/* Product count */}
      <p className="mt-8 text-sm text-slate-600">
        Showing {filteredProducts.length} products
      </p>

      {/* Product content */}
      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {filteredProducts.length} products
          </p>

          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductAdded={onProductAdded}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
