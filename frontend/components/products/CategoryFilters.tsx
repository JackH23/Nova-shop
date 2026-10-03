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

  const ratings = [
    { label: "4.5 & Up", value: 4.5, stars: "★★★★★" },
    { label: "4 & Up", value: 4, stars: "★★★★☆" },
    { label: "3 & Up", value: 3, stars: "★★★☆☆" },
    { label: "2 & Up", value: 2, stars: "★★☆☆☆" },
  ];

  // if (variant === "deals") {
  //   return (
  //     <DealsFilters
  //       categoryId={activeCategoryId}
  //       onCategoryChange={onCategoryChange}
  //       minPrice={minPrice}
  //       maxPrice={maxPrice}
  //       onMinPriceChange={onMinPriceChange}
  //       onMaxPriceChange={onMaxPriceChange}
  //     />
  //   );
  // }

  // if (variant === "new-arrivals") {
  //   return <NewArrivalsFilters />;
  // }

  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <div className="rounded-md border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
            Filters
          </h2>

          <button
            type="button"
            onClick={() => {
              onCategoryChange?.(null);

              onMinPriceChange?.(0);
              onMaxPriceChange?.(500);

              onInStockChange?.(false);
              onOnSaleChange?.(false);

              onDiscountChange?.(0);
              onRatingChange?.(0);
            }}
            className="text-[10px] text-slate-500 hover:text-indigo-600 cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Category */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Category</h3>

          <div className="mt-3 space-y-3">
            {/* All */}
            <button
              type="button"
              className="flex w-full items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
              onClick={() => onCategoryChange?.(null)}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                  activeCategoryId === null
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                }`}
              >
                {activeCategoryId === null && (
                  <span className="text-[10px]">✓</span>
                )}
              </span>
              All
            </button>

            {/* Loading */}
            {loading && (
              <p className="text-xs text-slate-400">Loading categories...</p>
            )}

            {/* Error */}
            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* API Categories */}
            {!loading &&
              categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="flex w-full items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                  onClick={() => onCategoryChange?.(category.id)}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      activeCategoryId === category.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                    }`}
                  >
                    {activeCategoryId === category.id && (
                      <span className="text-[10px]">✓</span>
                    )}
                  </span>

                  {category.name}
                </button>
              ))}
          </div>
        </div>

        <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Price Range</h3>

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
            <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              ${minPrice}
            </span>

            <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              ${maxPrice}
            </span>
          </div>
        </div>

        {/* Availability */}
        {showAvailability && (
          <>
            <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Availability
              </h3>

              {/* In Stock */}
              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    onInStockChange?.(checked);

                    if (checked) {
                      onOnSaleChange?.(false);
                    }
                  }}
                  className="accent-indigo-600"
                />
                In Stock
              </label>

              {/* On Sale */}
              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    onOnSaleChange?.(checked);

                    if (checked) {
                      onInStockChange?.(false);
                    }
                  }}
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
            <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Discount</h3>

              <div className="mt-3 space-y-3">
                {discounts.map((discount) => (
                  <label
                    key={discount.value}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
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
            <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Rating</h3>

              <div className="mt-3 space-y-3">
                {ratings.map((rating) => (
                  <label
                    key={rating.value}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating.value}
                      onChange={() => onRatingChange?.(rating.value)}
                      className="accent-indigo-600"
                    />

                    <span className="text-amber-500">
                      {rating.stars}
                    </span>

                    <span>{rating.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
