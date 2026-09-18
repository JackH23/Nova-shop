"use client";

import ProductImage from "@/components/products/ProductImage";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useProductCart } from "@/composables/useProductCart";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  onProductAdded?: (product: Product) => void;
  onAddWishlist?: (productId: number) => void;
  onRemoveWishlist?: (productId: number) => void;
  isWishlisted?: boolean;
  removingWishlist?: boolean;
};

export default function ProductCard({
  product,
  onProductAdded,
  onAddWishlist,
  onRemoveWishlist,
  isWishlisted = false,
  removingWishlist = false,
}: ProductCardProps) {
  const { handleAddToCart, loading } = useProductCart(
    product,
    null,
    onProductAdded,
  );

  const { id, name, description, price, original_price, image } = product;

  const priceNumber = Number(price);
  const originalPriceNumber = Number(original_price);

  const discount =
    originalPriceNumber > priceNumber
      ? Math.round(
          ((originalPriceNumber - priceNumber) / originalPriceNumber) * 100,
        )
      : 0;
  return (
    <div className="group overflow-hidden bg-white">
      {/* Product image */}
      <Link href={`/products/${id}`}>
        <div className="relative h-[220px] cursor-pointer overflow-hidden rounded-md bg-[#f5f5f5]">
          <ProductImage
            image={image}
            name={name}
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          {discount && (
            <span className="absolute right-2 top-2 rounded bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
              -{discount}%
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (isWishlisted && onRemoveWishlist) {
                onRemoveWishlist(id);
              } else if (onAddWishlist) {
                onAddWishlist(id);
              }
            }}
            disabled={removingWishlist}
            className="absolute left-2 top-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={
              onRemoveWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              size={16}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
              }
            />
          </button>
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
            ${priceNumber.toFixed(2)}
          </span>

          {product.variants?.length ? (
            <Link
              href={`/products/${product.id}`}
              className="rounded bg-[#3324d8] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#271bb7]"
            >
              Select Options
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={loading}
              className="cursor-pointer rounded bg-[#3324d8] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding..." : "🛒 Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
