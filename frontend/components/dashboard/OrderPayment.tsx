import type { DashboardPayment } from "@/lib/dashboard";
import { CreditCard } from "lucide-react";

type OrderPaymentProps = {
  payment: DashboardPayment | null;
};

export default function OrderPayment({
  payment,
}: OrderPaymentProps) {
  if (!payment) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">
          Payment Method
        </h2>

        <p className="mt-4 text-xs text-slate-500">
          No payment information.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <CreditCard size={15} />

        <h2 className="text-sm font-semibold text-slate-900">
          Payment Method
        </h2>
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-600">
        <p>
          <span className="font-medium text-slate-900">
            Method:
          </span>{" "}
          {payment.payment_method}
        </p>

        <p>
          <span className="font-medium text-slate-900">
            Status:
          </span>{" "}
          {payment.status}
        </p>

        <p>
          <span className="font-medium text-slate-900">
            Amount:
          </span>{" "}
          ${Number(payment.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}