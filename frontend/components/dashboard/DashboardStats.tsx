import { ShoppingBag, Wallet } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {/* Total Orders */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600">
              24
            </p>

            <p className="mt-3 text-xs text-emerald-600">
              ↗ +3 this month
            </p>
          </div>

          <ShoppingBag
            size={28}
            className="text-indigo-100"
          />
        </div>
      </div>

      {/* Total Spending */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Total Spending
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600">
              $1,240
            </p>

            <p className="mt-3 text-xs text-slate-500">
              Lifetime value
            </p>
          </div>

          <Wallet
            size={28}
            className="text-indigo-100"
          />
        </div>
      </div>

      {/* Premium */}
      <div className="rounded-lg bg-indigo-600 p-5 text-white shadow-sm">
        <h2 className="font-semibold">
          NovaShop Premium
        </h2>

        <p className="mt-3 text-sm text-indigo-100">
          You are earning 2x points on every purchase.
        </p>

        <button
          type="button"
          className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-indigo-600"
        >
          View Benefits
        </button>
      </div>
    </div>
  );
}