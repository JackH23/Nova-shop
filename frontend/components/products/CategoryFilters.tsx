"use client";

import Link from "next/link";
import DealsFilters from "@/components/deals/DealsFilters";
import NewArrivalsFilters from "@/components/deals/NewArrivalsFilters";

type CategoryFiltersProps = {
  activeCategory?: string;
  variant?: "default" | "deals" | "new-arrivals";
};

const categories = [
  {
    label: "All",
    value: "all",
    href: "/categories",
  },
  {
    label: "Electronics",
    value: "electronics",
    href: "/categories/electronics",
  },
  {
    label: "Clothing",
    value: "clothing",
    href: "/categories/clothing",
  },
  {
    label: "Home & Garden",
    value: "home-garden",
    href: "/categories/home-garden",
  },
];

export default function CategoryFilters({
  activeCategory = "all",
  variant = "default",
}: CategoryFiltersProps) {
  
  if (variant === "deals") {
    return <DealsFilters />;
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
          <h3 className="text-xs font-semibold text-slate-900">Category</h3>

          <div className="mt-3 space-y-3">
            {categories.map((category) => (
              <Link
                key={category.value}
                href={category.href}
                className="flex items-center gap-2 text-xs text-slate-600"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                    activeCategory === category.value
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {activeCategory === category.value && (
                    <span className="text-[10px]">✓</span>
                  )}
                </span>

                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900">Price Range</h3>

          <input
            type="range"
            min="0"
            max="500"
            defaultValue="250"
            className="mt-4 w-full accent-indigo-600"
          />

          <div className="mt-2 flex justify-between">
            <span className="rounded border border-slate-200 px-2 py-1 text-[10px]">
              $0
            </span>

            <span className="rounded border border-slate-200 px-2 py-1 text-[10px]">
              $500+
            </span>
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Availability */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900">Availability</h3>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              defaultChecked
              className="accent-indigo-600"
            />
            In Stock
          </label>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <input type="checkbox" className="accent-indigo-600" />
            On Sale
          </label>
        </div>
      </div>
    </aside>
  );
}
