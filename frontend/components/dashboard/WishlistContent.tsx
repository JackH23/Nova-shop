"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProductCard from "@/components/products/ProductCard";
import { useWishlist } from "@/composables/useWishlist";
import Pagination from "@/components/common/Pagination";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";

export default function WishlistContent() {
  const { addedProducts, handleProductAdded, removeToast } = useCartToast();

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

  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
          <DashboardSidebar />

          <div className="min-w-0">
            {/* Header */}
            <h1 className="text-3xl font-bold text-slate-950">Your Wishlist</h1>

            <p className="mt-2 text-sm text-slate-500">
              {total} {total === 1 ? "item" : "items"} saved for later.
            </p>

            <div className="mt-4 border-t border-slate-200" />

            {/* Loading */}
            {loading && (
              <div className="py-10 text-center text-sm text-slate-500">
                Loading wishlist...
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="py-10 text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Empty wishlist */}
            {!loading && !error && wishlist.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-500">
                  Your wishlist is empty.
                </p>
              </div>
            )}

            {/* Wishlist products */}
            {!loading && !error && wishlist.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {wishlist.map((item) => (
                  <ProductCard
                    onProductAdded={handleProductAdded}
                    key={item.id}
                    product={item.product}
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
                onPageChange={setCurrentPage}
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
