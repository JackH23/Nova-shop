"use client";

import { useState } from "react";
import DealsHero from "./DealsHero";
import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useProductFilters } from "@/composables/useProductFilters";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";
import { useCategories } from "@/composables/useCategories";

export default function DealsContent() {
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
    minDiscount,
    setMinDiscount,
  } = useProductFilters();

  const {
    categoryId,
    setCategoryId,
    selectedCategory,
  } = useCategories();

  return (
    <>
      <PageContainer>
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900">Deals</span>
        </div>

        {/* Page heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Deals
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Save more on products you love.
          </p>
        </div>

        {/* Deals hero */}
        <DealsHero />

        {/* Filters + Product list */}
        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          {/* Left */}
          <CategoryFilters
            activeCategoryId={categoryId}
            onCategoryChange={setCategoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            showAvailability={false}
            showDiscount={true}
            minDiscount={minDiscount}
            onDiscountChange={setMinDiscount}
          />

          {/* Right */}
          <ProductList
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryId={categoryId}
            categoryName={selectedCategory?.name}
            onSale={true}
            minDiscount={minDiscount}
            onProductAdded={handleProductAdded}
            onCartError={setCartError}
          />
        </div>
      </PageContainer>

      {/* Add success modal */}
      {addedProducts.map((toast, index) => (
        <AddToCartModal
          key={toast.id}
          product={toast.product}
          index={index}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Add error modal */}
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