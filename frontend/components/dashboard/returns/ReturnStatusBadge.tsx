import type { ReturnStatus } from "@/lib/returns";

type ReturnStatusBadgeProps = {
  status: ReturnStatus;
};

export default function ReturnStatusBadge({
  status,
}: ReturnStatusBadgeProps) {
  const styles: Record<
    ReturnStatus,
    string
  > = {
    REQUESTED:
      "bg-amber-50 text-amber-700",
    APPROVED:
      "bg-blue-50 text-blue-700",
    REJECTED:
      "bg-red-50 text-red-700",
    REFUNDED:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}