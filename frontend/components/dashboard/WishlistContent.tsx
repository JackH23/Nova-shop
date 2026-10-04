"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/composables/useWishlist";
import { usePaginationScroll } from "@/composables/usePaginationScroll";
import Pagination from "@/components/common/Pagination";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function WishlistContent() {
  const {
    addedProducts,
    handleProductAdded,
    removeToast,
  } = useCartToast();

  const {
    wishlist,
    total,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    removeFromWishlist,
  } = useWishlist();

  const {
    targetRef: wishlistGridRef,
    handlePageChange,
  } = usePaginationScroll(setCurrentPage);

  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
          <DashboardSidebar />

          <div className="min-w-0">
            {/* Header */}
            <PageHeader
              title="Your Wishlist"
              breadcrumb="Home / Dashboard / Wishlist"
              description={`${total} ${
                total === 1 ? "item" : "items"
              } saved for later.`}
            />

            {/* Loading */}
            {loading && (
              <div className="mt-8">
                <LoadingState message="Loading wishlist..." />
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="mt-8">
                <ErrorState message={error} />
              </div>
            )}

            {/* Empty wishlist */}
            {!loading && !error && wishlist.length === 0 && (
              <div className="mt-8">
                <EmptyState
                  title="Your wishlist is empty"
                  description="Save products you like and they will appear here."
                  actionText="Start Shopping"
                  actionHref="/products"
                />
              </div>
            )}

            {/* Wishlist products */}
            {!loading && !error && wishlist.length > 0 && (
              <div
                ref={wishlistGridRef}
                className="mt-6 scroll-mt-28 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
              >
                {wishlist.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item.product}
                    onProductAdded={handleProductAdded}
                    isWishlisted={true}
                    onRemoveWishlist={removeFromWishlist}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </PageContainer>

      {addedProducts.map((toast, index) => (
        <AddToCartModal
          key={toast.id}
          product={toast.product}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
}