"use client";

import ProductDetail from "./ProductDetail";
import { useProductDetail } from "@/composables/useProductDetail";

type ProductDetailClientProps = {
  productId: number;
};

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const {
    product,
    loading,
    error,
  } = useProductDetail(productId);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} />;
}