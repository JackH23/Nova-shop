"use client";

import { usePagination } from "@/composables/usePagination";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";
import CategoryFilters from "./CategoryFilters";
import Pagination from "@/components/common/Pagination";
import ProductSort from "./ProductSort";

type CategoryProductListProps = {
  category: string;
  products: Product[];
};

export default function CategoryProductList({
  category,
  products,
}: CategoryProductListProps) {
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    itemsPerPage: productsPerPage,
    paginatedItems: paginatedProducts,
  } = usePagination(products);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 lg:px-10">
      {/* Breadcrumb */}
      <p className="text-xs text-slate-400">
        Home / Categories / {categoryName}
      </p>

      {/* Category heading */}
      <div className="mt-3">
        <h1 className="text-3xl font-bold text-slate-950">{categoryName}</h1>

        <p className="mt-2 text-sm text-slate-500">
          Explore our latest {categoryName.toLowerCase()} products.
        </p>
      </div>

      {/* Product count */}
      <p className="mt-8 text-sm text-slate-600">
        Showing {products.length} products
      </p>

      {/* Filter + Product content */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        {/* Left filter */}
        <CategoryFilters activeCategory={category} />

        {/* Right product content */}
        <div className="min-w-0 flex-1">
          {/* Product count + Sort */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {products.length === 0
                ? "Showing 0 products"
                : `Showing ${startIndex + 1}-${Math.min(
                    startIndex + productsPerPage,
                    products.length,
                  )} of ${products.length} products`}
            </p>

            {/* Sort */}
            <ProductSort />
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
