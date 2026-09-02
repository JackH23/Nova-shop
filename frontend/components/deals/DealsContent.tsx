import DealsHero from "./DealsHero";
import PageContainer from "@/components/common/PageContainer";

export default function DealsContent() {
  return (
    <PageContainer>
      <div>
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900">Deals</span>
        </div>

        {/* Page heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Deals</h1>

          <p className="mt-2 text-sm text-slate-500">
            Save more on products you love.
          </p>
        </div>

        {/* Page heading */}
        <DealsHero />
      </div>
    </PageContainer>
  );
}
