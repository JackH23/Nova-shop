import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";
import PageContainer from "@/components/common/PageContainer";

export default function ProductsPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Left filters */}
        <CategoryFilters />

        {/* Right product list */}
        <ProductList />
      </div>
    </PageContainer>
  );
}