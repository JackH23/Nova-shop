"use client";

import AddToCartModal from "@/components/cart/AddToCartModal";
import { useProductFilters } from "@/composables/useProductFilters";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";
import { useCartToast } from "@/composables/useCartToast";

export default function ProductsPage() {
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
          {/* Left filters */}
          <CategoryFilters
            activeCategoryId={categoryId}
            onCategoryChange={setCategoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            showAvailability={false}
          />

          {/* Right product list */}
          <ProductList
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryId={categoryId}
            onProductAdded={handleProductAdded}
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
    </>
  );
}
