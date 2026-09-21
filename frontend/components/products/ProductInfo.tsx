"use client";

import { useProductCart } from "@/composables/useProductCart";
import type { Product, ProductVariant } from "@/lib/products";

type ProductInfoProps = {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  onProductAdded?: (product: Product) => void;
};

export default function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
  onProductAdded,
}: ProductInfoProps) {
  const {
    quantity,
    decreaseQuantity,
    increaseQuantity,
    handleAddToCart,
    loading,
    error,
  } = useProductCart(product, selectedVariant, onProductAdded);

  return (
    <div className="flex flex-col">
      {/* Badge + Rating */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-indigo-600 px-2.5 py-1 font-medium text-white">
          New Release
        </span>

        <span className="font-medium text-slate-800">
          ⭐ {Number(product.rating).toFixed(1)}
        </span>

        <span className="text-slate-500">(124 Reviews)</span>
      </div>

      {/* Product name */}
      <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-3 text-xl font-semibold text-slate-950">
        ${Number(product.price).toFixed(2)}
      </p>

      {/* Description */}
      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
        {product.description}
      </p>

      <div className="my-6 border-t border-slate-200" />

      {/* Color selection */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="text-sm text-slate-700">
            Color:{" "}
            <span className="font-medium">
              {selectedVariant?.color_name ?? "Select color"}
            </span>
          </p>

          <div className="mt-3 flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                title={variant.color_name}
                aria-label={`Select ${variant.color_name}`}
                onClick={() => onVariantChange(variant)}
                style={{
                  backgroundColor: variant.color_hex ?? "#ffffff",
                }}
                className={`h-7 w-7 rounded-full border border-slate-300 ${
                  selectedVariant?.id === variant.id
                    ? "ring-2 ring-indigo-600 ring-offset-2"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {/* Quantity */}
        <div className="flex h-11 items-center rounded-md border border-slate-300 bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-full px-4 text-lg text-slate-700 transition hover:bg-slate-50"
          >
            −
          </button>

          <span className="min-w-8 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="h-full px-4 text-lg text-slate-700 transition hover:bg-slate-50"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading}
          className="h-11 flex-1 cursor-pointer rounded-md bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Shipping */}
      {product.free_standard_shipping && product.free_shipping_text && (
        <p className="mt-4 text-xs text-slate-600">
          🚚 {product.free_shipping_text}
        </p>
      )}
    </div>
  );
}
