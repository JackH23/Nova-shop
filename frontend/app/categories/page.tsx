"use client";

import { useProductFilters } from "@/composables/useProductFilters";
import CategoryFilters from "@/components/products/CategoryFilters";
import CategoryProductList from "@/components/products/CategoryProductList";
import PageContainer from "@/components/common/PageContainer";
import { products } from "@/lib/products";

export default function CategoriesPage() {
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useProductFilters();

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        <CategoryFilters
          activeCategory="all"
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />

        <CategoryProductList
          category="all"
          products={products}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </PageContainer>
  );
}