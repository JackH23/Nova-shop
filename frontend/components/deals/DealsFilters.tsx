"use client";

const dealCategories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty",
];

const discounts = [
  "10% or more",
  "20% or more",
  "30% or more",
  "50% or more",
];

export default function DealsFilters() {
  return (
    <aside className="w-full shrink-0 md:w-[220px]">
      <div className="rounded-md border border-slate-200 bg-white p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-950">
            Filters
          </h2>

          <button
            type="button"
            className="text-[10px] text-indigo-600 hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* Category */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold text-slate-900">
            Category
          </h3>

          <div className="mt-3 space-y-2">
            {dealCategories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
              >
                <input
                  type="checkbox"
                  defaultChecked={category === "Fashion"}
                  className="accent-indigo-600"
                />

                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900">
            Price Range
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="h-9 min-w-0 flex-1 rounded border border-slate-300 px-2 text-xs outline-none focus:border-indigo-600"
            />

            <span className="text-slate-400">-</span>

            <input
              type="number"
              placeholder="Max"
              className="h-9 min-w-0 flex-1 rounded border border-slate-300 px-2 text-xs outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Discount */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900">
            Discount
          </h3>

          <div className="mt-3 space-y-2">
            {discounts.map((discount) => (
              <label
                key={discount}
                className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
              >
                <input
                  type="radio"
                  name="discount"
                  defaultChecked={discount === "20% or more"}
                  className="accent-indigo-600"
                />

                {discount}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}