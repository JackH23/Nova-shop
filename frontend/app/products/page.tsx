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

  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useProductFilters();

  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Left filters */}
          <CategoryFilters
            activeCategory="all"
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
