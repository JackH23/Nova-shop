import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";

export default function NewArrivalsPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-slate-950">New Arrivals</h1>

      <p className="mt-2 text-sm text-slate-500">
        Discover the latest products added to NovaShop.
      </p>

      {/* Filters + Product list */}
      <div className="mt-10 flex flex-col gap-10 md:flex-row">
        {/* Left */}
        <CategoryFilters variant="new-arrivals" />

        {/* Right */}
        <ProductList />
      </div>
    </PageContainer>
  );
}
