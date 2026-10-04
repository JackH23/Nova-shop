"use client";

import { useProductList } from "@/composables/useProductList";
import { useWishlist } from "@/composables/useWishlist";
import ProductCard from "./ProductCard";
import Pagination from "@/components/common/Pagination";
import type { Product } from "@/lib/products";
import ProductSort from "./ProductSort";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import { usePaginationScroll } from "@/composables/usePaginationScroll";

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

  const {
    targetRef: productGridRef,
    handlePageChange,
  } = usePaginationScroll(setCurrentPage);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="flex-1">
        <LoadingState message="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Top section */}
      <PageHeader
        title={categoryName ?? "Shop Products"}
        breadcrumb="Home / Shop"
      >
        <ProductSort
          value={sortBy}
          onChange={setSortBy}
        />
      </PageHeader>

      {/* Empty state / Product cards */}
      {paginatedProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try changing your filters or selecting another category."
        />
      ) : (
        <>
          {/* Product cards */}
          <div
            ref={productGridRef}
            className="scroll-mt-28 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
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
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
