import { ShoppingBag, Wallet } from "lucide-react";

type DashboardStatsProps = {
  totalOrders: number;
  ordersThisMonth: number;
  totalSpending: number;
};

export default function DashboardStats({
  totalOrders,
  ordersThisMonth,
  totalSpending,
}: DashboardStatsProps) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {/* Total Orders */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {totalOrders}
            </p>

            <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
              ↗ +{ordersThisMonth} this month
            </p>
          </div>

          <ShoppingBag
            size={28}
            className="text-indigo-100 dark:text-indigo-400/40"
          />
        </div>
      </div>

      {/* Total Spending */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Total Spending
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              ${totalSpending.toLocaleString()}
            </p>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Lifetime value
            </p>
          </div>

          <Wallet
            size={28}
            className="text-indigo-100 dark:text-indigo-400/40"
          />
        </div>
      </div>

      {/* Premium */}
      <div className="rounded-lg bg-indigo-600 p-5 text-white shadow-sm dark:bg-indigo-600">
        <h2 className="font-semibold">
          NovaShop Premium
        </h2>

        <p className="mt-3 text-sm text-indigo-100">
          You are earning 2x points on every purchase.
        </p>

        <button
          type="button"
          className="mt-4 cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          View Benefits
        </button>
      </div>
    </div>
  );
}