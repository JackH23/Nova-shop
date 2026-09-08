import DealsHero from "./DealsHero";
import PageContainer from "@/components/common/PageContainer";
import CategoryFilters from "@/components/products/CategoryFilters";
import ProductList from "@/components/products/ProductList";

export default function DealsContent() {
  return (
    <PageContainer>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <span>Home</span>
        <span>/</span>
        <span className="text-slate-900">Deals</span>
      </div>

      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Deals
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Save more on products you love.
        </p>
      </div>

      {/* Deals hero */}
      <DealsHero />

      {/* Filters + Product list */}
      <div className="mt-10 flex flex-col gap-10 md:flex-row">
        {/* Left */}
        <CategoryFilters variant="deals" />

        {/* Right */}
        <ProductList />
      </div>
    </PageContainer>
  );
}