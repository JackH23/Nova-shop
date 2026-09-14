import ReturnContent from "@/components/dashboard/ReturnContent";

type ReturnPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReturnPage({
  params,
}: ReturnPageProps) {
  const { id } = await params;

  return <ReturnContent orderId={Number(id)} />;
}