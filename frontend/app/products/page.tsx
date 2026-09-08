"use client";

import { useProductFilters } from "@/composables/useProductFilters";

import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";

export default function ProductsPage() {
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

  return (
    <PageContainer>
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Left filters */}
        <CategoryFilters
          activeCategory="all"
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          inStock={inStock}
          onSale={onSale}
          onInStockChange={setInStock}
          onOnSaleChange={setOnSale}
        />

        {/* Right product list */}
        <ProductList
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStock={inStock}
          onSale={onSale}
        />
      </div>
    </PageContainer>
  );
}