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
import AsyncState from "@/components/common/AsyncState";

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

            {/* Wishlist products */}
            <AsyncState
              loading={loading}
              loadingMessage="Loading wishlist..."
              error={error}
              isEmpty={wishlist.length === 0}
              emptyTitle="Your wishlist is empty"
              emptyDescription="Save products you like and they will appear here."
              emptyActionText="Start Shopping"
              emptyActionHref="/products"
            >
              <>
                {/* Wishlist products */}
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            </AsyncState>
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