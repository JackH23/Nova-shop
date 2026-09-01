import { notFound } from "next/navigation";

import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/lib/products";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  // Find product using the id from the URL
  const product = getProductById(Number(id));

  // Product does not exist
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}