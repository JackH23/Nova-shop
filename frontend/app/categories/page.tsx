"use client";

import { Suspense, useState } from "react";
import { useProductFilters } from "@/composables/useProductFilters";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";
import AddToCartModal from "@/components/cart/AddToCartModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useCartToast } from "@/composables/useCartToast";
import { useCategories } from "@/composables/useCategories";

function CategoriesContent() {
  const [cartError, setCartError] = useState("");

  const {
    categoryId,
    setCategoryId,
    selectedCategory,
  } = useCategories();

  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    inStock,
    onSale,
    setInStock,
    setOnSale,
  } = useProductFilters();

  const {
    addedProducts,
    handleProductAdded,
    removeToast,
  } = useCartToast();

  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-10 md:flex-row">
          <CategoryFilters
            activeCategoryId={categoryId}
            onCategoryChange={setCategoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            inStock={inStock}
            onSale={onSale}
            onInStockChange={setInStock}
            onOnSaleChange={setOnSale}
          />

          <ProductList
            categoryId={categoryId}
            categoryName={selectedCategory?.name}
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStock={inStock}
            onSale={onSale}
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

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
