import { Suspense } from "react";
import DealsContent from "@/components/deals/DealsContent";

export default function DealsPage() {
  return (
    <Suspense fallback={<div>Loading deals...</div>}>
      <DealsContent />
    </Suspense>
  );
}
