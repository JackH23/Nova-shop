import ReturnDetail from "@/components/dashboard/returns/ReturnDetail";

type ReturnDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReturnDetailPage({
  params,
}: ReturnDetailPageProps) {
  const { id } = await params;

  return (
    <ReturnDetail
      returnId={Number(id)}
    />
  );
}