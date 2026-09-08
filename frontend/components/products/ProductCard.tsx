"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductCart } from "@/composables/useProductCart";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  onProductAdded?: (product: Product) => void;
};

export default function ProductCard({
  product,
  onProductAdded,
}: ProductCardProps) {
  const { handleAdd } = useProductCart(product, onProductAdded);

  const { id, name, description, price, image, discount } = product;
  return (
    <div className="group overflow-hidden bg-white">
      {/* Product image */}
      <Link href={`/products/${id}`}>
        <div className="relative h-[220px] cursor-pointer overflow-hidden rounded-md bg-[#f5f5f5]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          {discount && (
            <span className="absolute right-2 top-2 rounded bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Product information */}
      <div className="pt-3">
        <Link href={`/products/${id}`}>
          <h3 className="truncate text-sm font-semibold text-slate-950 transition hover:text-[#3324d8]">
            {name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 min-h-[36px] text-xs leading-[18px] text-slate-500">
          {description}
        </p>

        {/* Price + Add */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-950">
            ${price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={handleAdd}
            className="rounded bg-[#3324d8] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#271bb7]"
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}
