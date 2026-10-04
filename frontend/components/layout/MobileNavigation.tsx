"use client";

import Link from "next/link";
import { Search } from "lucide-react";

type SearchProduct = {
  id: number;
  name: string;
  price: string | number;
  image?: string | null;
};

type MobileNavigationProps = {
  open: boolean;
  search: string;
  searching: boolean;
  searchResults: SearchProduct[];
  onSearchChange: (value: string) => void;
  onClose: () => void;
};

export default function MobileNavigation({
  open,
  search,
  searching,
  searchResults,
  onSearchChange,
  onClose,
}: MobileNavigationProps) {
  if (!open) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-[60] max-h-[calc(100vh-90px)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden dark:border-slate-800 dark:bg-slate-950">
      {/* Search */}
      <div className="relative mb-4">
        <div className="flex h-11 w-full items-center rounded-full bg-[#f4f5f7] px-4 dark:bg-slate-800">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Search results */}
        {search.trim() && (
          <div className="mt-2 max-h-[320px] w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {searching ? (
              <p className="p-4 text-sm text-slate-500 dark:text-slate-400">
                Searching...
              </p>
            ) : searchResults.length > 0 ? (
              searchResults.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  prefetch={false}
                  onClick={onClose}
                  className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                  <img
                    src={
                      product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${product.image}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>

                    <p className="text-xs font-semibold text-[#3324d8]">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-4 text-sm text-slate-500 dark:text-slate-400">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col">
        <Link
          href="/products"
          prefetch={false}
          onClick={onClose}
          className="border-b border-slate-100 py-3 text-sm dark:border-slate-800"
        >
          Shop
        </Link>

        <Link
          href="/categories"
          prefetch={false}
          onClick={onClose}
          className="border-b border-slate-100 py-3 text-sm dark:border-slate-800"
        >
          Categories
        </Link>

        <Link
          href="/deals"
          prefetch={false}
          onClick={onClose}
          className="border-b border-slate-100 py-3 text-sm dark:border-slate-800"
        >
          Deals
        </Link>

        <Link
          href="/new-arrivals"
          prefetch={false}
          onClick={onClose}
          className="py-3 text-sm"
        >
          New Arrivals
        </Link>
      </nav>
    </div>
  );
}