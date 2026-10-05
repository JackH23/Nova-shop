import { Suspense } from "react";
import DealsContent from "@/components/deals/DealsContent";
import LoadingState from "@/components/common/LoadingState";

export default function DealsPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading deals..." />}>
      <DealsContent />
    </Suspense>
  );
}