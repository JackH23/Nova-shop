import { Suspense } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import ShopCategories from "@/components/home/ShopCategories";
import PageContainer from "@/components/common/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <HeroBanner />
      <Suspense fallback={<div>Loading categories...</div>}>
        <ShopCategories />
      </Suspense>
    </PageContainer>
  );
}
