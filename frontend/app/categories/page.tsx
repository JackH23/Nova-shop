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
    inStock,
    onSale,
    setInStock,
    setOnSale,
    category,
    setCategory,
  } = useProductFilters();

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        <CategoryFilters
          activeCategory={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          inStock={inStock}
          onSale={onSale}
          onInStockChange={setInStock}
          onOnSaleChange={setOnSale}
          onCategoryChange={setCategory}
        />

        <CategoryProductList
          category={category}
          products={products}
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStock={inStock}
          onSale={onSale}
        />
      </div>
    </PageContainer>
  );
}