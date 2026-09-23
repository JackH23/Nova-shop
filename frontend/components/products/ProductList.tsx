"use client";

import { useProductList } from "@/composables/useProductList";
import { useWishlist } from "@/composables/useWishlist";
import ProductCard from "./ProductCard";
import Pagination from "@/components/common/Pagination";
import type { Product } from "@/lib/products";
import ProductSort from "./ProductSort";

type ProductListProps = {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  newArrivals?: boolean;
  categoryId?: number | null;
  categoryName?: string;
  minDiscount?: number;
  minRating?: number;
  onProductAdded?: (product: Product) => void;
  onCartError?: (message: string) => void;
};

export default function ProductList({
  minPrice,
  maxPrice,
  inStock = false,
  onSale = false,
  newArrivals = false,
  categoryId = null,
  categoryName,
  minDiscount = 0,
  minRating = 0,
  onProductAdded,
  onCartError,
}: ProductListProps) {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    sortBy,
    setSortBy,
    loading,
    error,
  } = useProductList({
    minPrice,
    maxPrice,
    inStock,
    onSale,
    newArrivals,
    categoryId,
    minDiscount,
    minRating,
  });

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (loading) {
    return <div className="flex-1">Loading products...</div>;
  }

  if (error) {
    return <div className="flex-1">{error}</div>;
  }

  return (
    <div className="flex-1">
      {/* Top section */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          {/* Breadcrumb */}
          <p className="mb-1 text-[10px] text-slate-400">Home / Shop</p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-950">
            {categoryName ?? "Shop Products"}
          </h1>
        </div>

        {/* Sort */}
        <ProductSort value={sortBy} onChange={setSortBy} />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductAdded={onProductAdded}
            onCartError={onCartError}
            isWishlisted={wishlist.some(
              (item) => item.product_id === product.id,
            )}
            onAddWishlist={addToWishlist}
            onRemoveWishlist={removeFromWishlist}
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
