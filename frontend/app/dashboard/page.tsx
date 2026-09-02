import HeroBanner from "@/components/home/HeroBanner";
import ShopCategories from "@/components/home/ShopCategories";
import PageContainer from "@/components/common/PageContainer";

export default function DashboardPage() {
  return (
    <PageContainer>
      <HeroBanner />
      <ShopCategories />
    </PageContainer>
  );
}