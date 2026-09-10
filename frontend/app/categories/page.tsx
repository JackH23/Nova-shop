"use client";

import { useProductFilters } from "@/composables/useProductFilters";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";
import { useSearchParams } from "next/navigation";
import { useCategories } from "@/composables/useCategories";

export default function CategoriesPage() {
  const searchParams = useSearchParams();

  const categoryIdFromUrl = searchParams.get("category_id");

  const initialCategoryId = categoryIdFromUrl
    ? Number(categoryIdFromUrl)
    : null;

  const { addedProducts, handleProductAdded, removeToast } = useCartToast();

  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    inStock,
    onSale,
    setInStock,
    setOnSale,
    categoryId,
    setCategoryId,
  } = useProductFilters(initialCategoryId);

  const { categories } = useCategories();

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

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
