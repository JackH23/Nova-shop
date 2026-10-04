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
      <div className="rounded-lg border border-slate-200 bg-white p-5 transition-colors dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Payment Method
        </h2>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          No payment information.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <CreditCard
          size={15}
          className="text-slate-600 dark:text-slate-400"
        />

        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Payment Method
        </h2>
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <p>
          <span className="font-medium text-slate-900 dark:text-slate-200">
            Method:
          </span>{" "}
          {payment.payment_method}
        </p>

        <p>
          <span className="font-medium text-slate-900 dark:text-slate-200">
            Status:
          </span>{" "}
          {payment.status}
        </p>

        <p>
          <span className="font-medium text-slate-900 dark:text-slate-200">
            Amount:
          </span>{" "}
          ${Number(payment.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}