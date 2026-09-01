"use client";

import { useProductCart } from "@/composables/useProductCart";
import type { Product } from "@/lib/products";

type ProductInfoProps = {
  product: Product;
};

const colors = [
  {
    id: "white",
    name: "Matte White",
    className: "bg-white",
  },
  {
    id: "black",
    name: "Black",
    className: "bg-slate-900",
  },
  {
    id: "sand",
    name: "Sand",
    className: "bg-stone-300",
  },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  const {
    quantity,
    selectedColor,
    setSelectedColor,
    decreaseQuantity,
    increaseQuantity,
    handleAddToCart,
  } = useProductCart(product);

  const selectedColorName =
    colors.find((color) => color.id === selectedColor)?.name ?? "Matte White";

  return (
    <div className="flex flex-col">
      {/* Badge + Rating */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-indigo-600 px-2.5 py-1 font-medium text-white">
          New Release
        </span>

        <span className="font-medium text-slate-800">⭐ 4.8</span>

        <span className="text-slate-500">(124 Reviews)</span>
      </div>

      {/* Product name */}
      <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-3 text-xl font-semibold text-slate-950">
        ${product.price.toFixed(2)}
      </p>

      {/* Description */}
      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
        {product.description}
      </p>

      <div className="my-6 border-t border-slate-200" />

      {/* Color selection */}
      <div>
        <p className="text-sm text-slate-700">
          Color: <span className="font-medium">{selectedColorName}</span>
        </p>

        <div className="mt-3 flex gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.name}
              aria-label={`Select ${color.name}`}
              onClick={() => setSelectedColor(color.id)}
              className={`h-7 w-7 rounded-full border border-slate-300 ${color.className} ${
                selectedColor === color.id
                  ? "ring-2 ring-indigo-600 ring-offset-2"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

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
          className="h-11 flex-1 rounded-md bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>

      {/* Shipping */}
      <p className="mt-4 text-xs text-slate-600">
        🚚 Free standard shipping on orders over $100
      </p>
    </div>
  );
}
