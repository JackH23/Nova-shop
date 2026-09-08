"use client";

const categories = [
  "Electronics",
  "Apparel",
  "Home & Kitchen",
  "Accessories",
];

const prices = [
  "Under $50",
  "$50 to $100",
  "$100 to $200",
  "Over $200",
];

const ratings = [
  {
    label: "4 & Up",
    stars: 5,
  },
  {
    label: "3 & Up",
    stars: 4,
  },
];

export default function NewArrivalsFilters() {
  return (
    <aside className="w-full shrink-0 md:w-[180px]">
      {/* Category */}
      <div>
        <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold text-slate-950">
          Category
        </h3>

        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 accent-indigo-600"
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-7">
        <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold text-slate-950">
          Price
        </h3>

        <div className="mt-3 space-y-2">
          {prices.map((price) => (
            <label
              key={price}
              className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
            >
              <input
                type="radio"
                name="new-arrival-price"
                className="h-3.5 w-3.5 border-slate-300 accent-indigo-600"
              />

              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-7">
        <h3 className="border-b border-slate-200 pb-2 text-sm font-semibold text-slate-950">
          Rating
        </h3>

        <div className="mt-3 space-y-2">
          {ratings.map((rating) => (
            <label
              key={rating.label}
              className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 accent-indigo-600"
              />

              <span className="flex items-center gap-1">
                <span className="tracking-tight text-amber-500">
                  {"★".repeat(rating.stars)}
                </span>

                <span>{rating.label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}