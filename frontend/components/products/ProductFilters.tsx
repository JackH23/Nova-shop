import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    href: "/categories/electronics",
  },
  {
    name: "Clothing",
    href: "/categories/clothing",
  },
  {
    name: "Home & Garden",
    href: "/categories/home-garden",
  },
];

export default function ProductFilters() {
  return (
    <aside className="w-full md:w-[200px] md:shrink-0">
      {/* Filter title */}
      <h2 className="mb-5 text-sm font-bold text-slate-950">
        Filters
      </h2>

      {/* Category filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-slate-900">
          Category
        </h3>

        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-[#3324d8]"
            >
              <span className="h-3.5 w-3.5 rounded-sm border border-slate-400" />

              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-200" />

      {/* Price filter */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-slate-900">
          Price Range
        </h3>

        <input
          type="range"
          min="0"
          max="500"
          defaultValue="350"
          className="w-full cursor-pointer accent-[#3324d8]"
        />

        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>
    </aside>
  );
}