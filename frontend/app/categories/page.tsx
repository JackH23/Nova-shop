import CategoryProductList from "@/components/products/CategoryProductList";
import { products } from "@/lib/products";

export default function CategoriesPage() {
  return (
    <CategoryProductList
      category="all"
      products={products}
    />
  );
}