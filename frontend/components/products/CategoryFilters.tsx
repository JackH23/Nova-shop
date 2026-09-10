"use client";

import Link from "next/link";
import DealsFilters from "@/components/deals/DealsFilters";
import NewArrivalsFilters from "@/components/deals/NewArrivalsFilters";
import { useCategories } from "@/composables/useCategories";

type CategoryFiltersProps = {
  activeCategoryId?: number | null;
  showAvailability?: boolean;
  showPriceRange?: boolean;
  variant?: "default" | "deals" | "new-arrivals";
  maxPrice?: number;
  onMaxPriceChange?: (price: number) => void;
  minPrice?: number;
  onMinPriceChange?: (price: number) => void;
  inStock?: boolean;
  onSale?: boolean;
  onInStockChange?: (checked: boolean) => void;
  onOnSaleChange?: (checked: boolean) => void;
  onCategoryChange?: (categoryId: number | null) => void;
  showDiscount?: boolean;
  minDiscount?: number;
  onDiscountChange?: (discount: number) => void;
  showRating?: boolean;
  minRating?: number;
  onRatingChange?: (rating: number) => void;
};

const discounts = [
  { label: "10% or more", value: 10 },
  { label: "20% or more", value: 20 },
  { label: "30% or more", value: 30 },
  { label: "50% or more", value: 50 },
];

export default function CategoryFilters({
  activeCategoryId = null,
  onCategoryChange,
  variant = "default",
  minPrice = 0,
  maxPrice = 500,
  onMinPriceChange,
  onMaxPriceChange,
  inStock,
  onSale,
  onInStockChange,
  onOnSaleChange,
  showAvailability = true,
  showDiscount = false,
  minDiscount = 0,
  onDiscountChange,

  showRating = false,
  minRating = 0,
  onRatingChange,
}: CategoryFiltersProps) {
  const { categories, loading, error } = useCategories();

  if (variant === "deals") {
    return (
      <DealsFilters
        category={activeCategory}
        onCategoryChange={onCategoryChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
      />
    );
  }

  if (variant === "new-arrivals") {
    return <NewArrivalsFilters />;
  }

  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <div className="rounded-md border border-slate-200 bg-white p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-950">Filters</h2>

          <Link
            href="/categories"
            className="text-[10px] text-slate-500 hover:text-indigo-600"
          >
            Clear All
          </Link>
        </div>

        {/* Category */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-slate-900">
            Category
          </h3>

          <div className="mt-3 space-y-3">
            {/* All */}
            <Link
              href="/categories"
              className="flex items-center gap-2 text-xs text-slate-600"
              onClick={(e) => {
                if (onCategoryChange) {
                  e.preventDefault();
                  onCategoryChange(null);
                }
              }}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                  activeCategoryId === null
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {activeCategoryId === null && (
                  <span className="text-[10px]">✓</span>
                )}
              </span>

              All
            </Link>

            {/* Loading */}
            {loading && (
              <p className="text-xs text-slate-400">
                Loading categories...
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}

            {/* API Categories */}
            {!loading &&
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories?category_id=${category.id}`}
                  className="flex items-center gap-2 text-xs text-slate-600"
                  onClick={(e) => {
                    if (onCategoryChange) {
                      e.preventDefault();
                      onCategoryChange(category.id);
                    }
                  }}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      activeCategoryId === category.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {activeCategoryId === category.id && (
                      <span className="text-[10px]">✓</span>
                    )}
                  </span>

                  {category.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900">Price Range</h3>

          <div className="mt-4 space-y-2">
            {/* Minimum price */}
            <input
              type="range"
              min="0"
              max="500"
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value <= maxPrice) {
                  onMinPriceChange?.(value);
                }
              }}
              className="w-full accent-indigo-600"
            />

            {/* Maximum price */}
            <input
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value >= minPrice) {
                  onMaxPriceChange?.(value);
                }
              }}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="mt-2 flex justify-between">
            <span className="rounded border border-slate-200 px-2 py-1 text-[10px]">
              ${minPrice}
            </span>

            <span className="rounded border border-slate-200 px-2 py-1 text-[10px]">
              ${maxPrice}
            </span>
          </div>
        </div>

        {/* Availability */}
        {showAvailability && (
          <>
            <div className="my-5 border-t border-slate-200" />
            <div>
              <h3 className="text-xs font-semibold text-slate-900">
                Availability
              </h3>

              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => onInStockChange?.(e.target.checked)}
                  className="accent-indigo-600"
                />
                In Stock
              </label>

              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => onOnSaleChange?.(e.target.checked)}
                  className="accent-indigo-600"
                />
                On Sale
              </label>
            </div>
          </>
        )}

        {/* Discount */}
        {showDiscount && (
          <>
            <div className="my-5 border-t border-slate-200" />

            <div>
              <h3 className="text-xs font-semibold text-slate-900">Discount</h3>

              <div className="mt-3 space-y-3">
                {discounts.map((discount) => (
                  <label
                    key={discount.value}
                    className="flex items-center gap-2 text-xs text-slate-600"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={minDiscount === discount.value}
                      onChange={() => onDiscountChange?.(discount.value)}
                      className="accent-indigo-600"
                    />

                    {discount.label}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Rating */}
        {showRating && (
          <>
            <div className="my-5 border-t border-slate-200" />

            <div>
              <h3 className="text-xs font-semibold text-slate-900">Rating</h3>

              <div className="mt-3 space-y-3">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={minRating === 4}
                    onChange={() => onRatingChange?.(minRating === 4 ? 0 : 4)}
                    className="accent-indigo-600"
                  />

                  <span className="text-amber-500">★★★★★</span>
                  <span>4 & Up</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={minRating === 3}
                    onChange={() => onRatingChange?.(minRating === 3 ? 0 : 3)}
                    className="accent-indigo-600"
                  />

                  <span className="text-amber-500">★★★★☆</span>
                  <span>3 & Up</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
