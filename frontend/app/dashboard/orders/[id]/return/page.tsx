import ReturnContent from "@/components/dashboard/ReturnContent";
import PageContainer from "@/components/common/PageContainer";

type ReturnPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReturnPage({ params }: ReturnPageProps) {
  const { id } = await params;

  return (
    <PageContainer>
      <ReturnContent orderId={Number(id)} />
    </PageContainer>
  );
}
