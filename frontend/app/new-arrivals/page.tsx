"use client";

import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import { useProductFilters } from "@/composables/useProductFilters";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";

export default function NewArrivalsPage() {
  const { addedProducts, handleProductAdded, removeToast } = useCartToast();
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    category,
    setCategory,
    minRating,
    setMinRating,
  } = useProductFilters();

  return (
    <>
      <PageContainer>
        <h1 className="text-3xl font-bold text-slate-950">New Arrivals</h1>

        <p className="mt-2 text-sm text-slate-500">
          Discover the latest products added to NovaShop.
        </p>

        {/* Filters + Product list */}
        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          {/* Left */}
          <CategoryFilters
            activeCategory={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onCategoryChange={setCategory}
            showAvailability={false}
            showRating={true}
            minRating={minRating}
            onRatingChange={setMinRating}
          />

          {/* Right */}
          <ProductList
            minPrice={minPrice}
            maxPrice={maxPrice}
            category={category}
            minRating={minRating}
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
