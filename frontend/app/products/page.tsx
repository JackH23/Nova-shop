import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";

export default function ProductsPage() {
  return (
    <section className="px-4 py-10 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row">
        {/* Left filters */}
        <CategoryFilters />

        {/* Right product list */}
        <ProductList />
      </div>
    </section>
  );
}