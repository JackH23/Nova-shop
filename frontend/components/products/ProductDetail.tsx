import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

import type { Product } from "@/lib/products";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back to products */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#3324d8]"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery image={product.image} name={product.name} />

        <ProductInfo product={product} />
      </div>

      <ProductTabs />
    </section>
  );
}
