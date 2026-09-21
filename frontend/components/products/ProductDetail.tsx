"use client";

import { useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import PageContainer from "@/components/common/PageContainer";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartToast } from "@/composables/useCartToast";

import type { Product, ProductVariant } from "@/lib/products";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const variants = product.variants ?? [];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const { addedProducts, handleProductAdded, removeToast } = useCartToast();

  const selectedVariantImage = selectedVariant?.images?.[0]?.image_url ?? null;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant((current) =>
      current?.id === variant.id ? null : variant,
    );
  };

  return (
    <>
      <PageContainer>
        {/* Back to products */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#3324d8]"
        >
          ← Back to Products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery
            image={product.image}
            images={product.images ?? []}
            variantImage={selectedVariantImage}
            name={product.name}
          />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            onProductAdded={handleProductAdded}
          />
        </div>

        <ProductTabs />
      </PageContainer>

      {addedProducts.map((toast, index) => (
        <AddToCartModal
          key={toast.id}
          product={toast.product}
          index={index}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
}
