"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

type TabType = "specifications" | "reviews" | "shipping";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const hasSpecifications =
    (product.specifications?.length ?? 0) > 0;

  const hasReviews = product.reviews_enabled;

  const hasShipping =
    Boolean(product.shipping_description) ||
    Boolean(
      product.free_standard_shipping &&
        product.free_shipping_text,
    );

  const [activeTab, setActiveTab] = useState<TabType>(
    hasSpecifications
      ? "specifications"
      : hasReviews
        ? "reviews"
        : "shipping",
  );

  if (!hasSpecifications && !hasReviews && !hasShipping) {
    return null;
  }

  return (
    <div className="mt-14">
      {/* Tab buttons */}
      <div className="flex gap-8 border-b border-slate-200">
        {hasSpecifications && (
          <button
            type="button"
            onClick={() => setActiveTab("specifications")}
            className={`pb-3 text-sm transition ${
              activeTab === "specifications"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Specifications
          </button>
        )}

        {hasReviews && (
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm transition ${
              activeTab === "reviews"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Reviews
          </button>
        )}

        {hasShipping && (
          <button
            type="button"
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 text-sm transition ${
              activeTab === "shipping"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Shipping
          </button>
        )}
      </div>

      {/* Specifications */}
      {activeTab === "specifications" && hasSpecifications && (
        <div className="grid gap-x-12 gap-y-6 py-7 sm:grid-cols-2">
          {product.specifications?.map((specification) => (
            <div
              key={specification.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-slate-500">{specification.name}</span>

              <span className="font-medium text-slate-900">
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && hasReviews && (
        <div className="py-7">
          <p className="text-sm text-slate-600">
            Product reviews will appear here.
          </p>
        </div>
      )}

      {/* Shipping */}
      {activeTab === "shipping" && hasShipping && (
        <div className="space-y-3 py-7">
          {product.free_standard_shipping && product.free_shipping_text && (
            <p className="text-sm font-medium text-slate-900">
              {product.free_shipping_text}
            </p>
          )}

          {product.shipping_description && (
            <p className="text-sm leading-6 text-slate-600">
              {product.shipping_description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
