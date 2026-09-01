import { getProductsByCategory } from "@/lib/products";
import CategoryProductList from "@/components/products/CategoryProductList";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const categoryProducts = getProductsByCategory(category);

  return (
    <CategoryProductList
      category={category}
      products={categoryProducts}
    />
  );
}