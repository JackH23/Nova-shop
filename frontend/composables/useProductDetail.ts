"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import type { Product } from "@/lib/products";

export function useProductDetail(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await productService.getProductById(id);

        setProduct(response.product);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to get product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}