"use client";

import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import { useProductFilters } from "@/composables/useProductFilters";

export default function NewArrivalsPage() {
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
          inStock={inStock}
          onSale={onSale}
          onInStockChange={setInStock}
          onOnSaleChange={setOnSale}
          onCategoryChange={setCategory}
        />

        {/* Right */}
        <ProductList
          minPrice={minPrice}
          maxPrice={maxPrice}
          category={category}
          inStock={inStock}
          onSale={onSale}
        />
      </div>
    </PageContainer>
  );
}
