"use client";

import { useProductList } from "@/composables/useProductList";
import ProductCard from "./ProductCard";
import Pagination from "@/components/common/Pagination";
import { products } from "@/lib/products";
import ProductSort from "./ProductSort";

type ProductListProps = {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  category?: string;
};

export default function ProductList({
  minPrice = 0,
  maxPrice = 500,
  inStock = false,
  onSale = false,
  category = "all",
}: ProductListProps) {

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedProducts,
  } = useProductList({
    products,
    minPrice,
    maxPrice,
    inStock,
    onSale,
    category,
  });

  return (
    <div className="flex-1">
      {/* Top section */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          {/* Breadcrumb */}
          <p className="mb-1 text-[10px] text-slate-400">Home / Shop</p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-950">Shop Products</h1>
        </div>

        {/* Sort */}
        <ProductSort />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
