"use client";

import { Suspense, useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useProductFilters } from "@/composables/useProductFilters";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";
import { useCategories } from "@/composables/useCategories";

function NewArrivalsContent() {
  const [cartError, setCartError] = useState("");

  const {
    addedProducts,
    handleProductAdded,
    removeToast,
  } = useCartToast();

  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    minRating,
    setMinRating,
  } = useProductFilters();

  const {
    categoryId,
    setCategoryId,
    selectedCategory,
  } = useCategories();

  return (
    <>
      <PageContainer>
        <h1 className="text-3xl font-bold text-slate-950">
          New Arrivals
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Discover the latest products added to NovaShop.
        </p>

        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          <CategoryFilters
            activeCategoryId={categoryId}
            onCategoryChange={setCategoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            showAvailability={false}
            showRating={true}
            minRating={minRating}
            onRatingChange={setMinRating}
          />

          <ProductList
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryId={categoryId}
            categoryName={selectedCategory?.name}
            newArrivals={true}
            minRating={minRating}
            onProductAdded={handleProductAdded}
            onCartError={setCartError}
          />
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

      <ConfirmModal
        open={!!cartError}
        title="Unable to Add to Cart"
        message={cartError}
        confirmText="OK"
        cancelText="Close"
        onConfirm={() => setCartError("")}
        onCancel={() => setCartError("")}
      />
    </>
  );
}

export default function NewArrivalsPage() {
  return (
    <Suspense fallback={<div>Loading new arrivals...</div>}>
      <NewArrivalsContent />
    </Suspense>
  );
}
