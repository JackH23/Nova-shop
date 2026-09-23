"use client";

import { useState } from "react";
import AddToCartModal from "@/components/cart/AddToCartModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useProductFilters } from "@/composables/useProductFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";
import { useCartToast } from "@/composables/useCartToast";

export default function ProductsPage() {
  const [cartError, setCartError] = useState("");

  const {
    addedProducts,
    handleProductAdded,
    removeToast,
  } = useCartToast();

  const {
    minPrice,
    maxPrice,
    categoryId,
    setMinPrice,
    setMaxPrice,
    setCategoryId,
  } = useProductFilters();

  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-10 md:flex-row">
          <ProductList
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryId={categoryId}
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