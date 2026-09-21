"use client";

import type { Product } from "@/lib/products";
import ReviewList from "./reviews/ReviewList";
import ReviewForm from "./reviews/ReviewForm";
import NotifyModal from "@/components/common/NotifyModal";
import { useProductTabs } from "@/composables/useProductTabs";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const {
    activeTab,
    setActiveTab,
    hasSpecifications,
    hasReviews,
    hasShipping,
    hasAnyTab,
    reviews,
    loading,
    submitting,
    hasUserReviewed,
    handleSubmitReview,
    notification,
    closeNotification,
  } = useProductTabs(product);

  if (!hasAnyTab) {
    return null;
  }

  return (
    <div className="mt-14">
      {/* Tab buttons */}
      <div className="flex gap-8 border-b border-slate-200">
        {hasSpecifications && (
          <button
            type="button"
            onClick={() => setActiveTab("specifications")}
            className={`pb-3 text-sm transition ${
              activeTab === "specifications"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Specifications
          </button>
        )}

        {hasReviews && (
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm transition ${
              activeTab === "reviews"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Reviews
          </button>
        )}

        {hasShipping && (
          <button
            type="button"
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 text-sm transition ${
              activeTab === "shipping"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Shipping
          </button>
        )}
      </div>

      {/* Specifications */}
      {activeTab === "specifications" && hasSpecifications && (
        <div className="grid gap-x-12 gap-y-6 py-7 sm:grid-cols-2">
          {product.specifications?.map((specification) => (
            <div
              key={specification.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-slate-500">{specification.name}</span>

              <span className="font-medium text-slate-900">
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && hasReviews && (
        <div className="space-y-8 py-7">
          {/* Existing reviews */}
          {loading ? (
            <p className="text-sm text-slate-500">Loading reviews...</p>
          ) : (
            <ReviewList reviews={reviews} />
          )}

          {/* Create review */}
          {!hasUserReviewed && (
            <ReviewForm
              onSubmit={handleSubmitReview}
              loading={submitting}
            />
          )}
        </div>
      )}

      {/* Shipping */}
      {activeTab === "shipping" && hasShipping && (
        <div className="space-y-3 py-7">
          {product.free_standard_shipping && product.free_shipping_text && (
            <p className="text-sm font-medium text-slate-900">
              {product.free_shipping_text}
            </p>
          )}

          {product.shipping_description && (
            <p className="text-sm leading-6 text-slate-600">
              {product.shipping_description}
            </p>
          )}
        </div>
      )}

      <NotifyModal notification={notification} onClose={closeNotification} />
    </div>
  );
}
