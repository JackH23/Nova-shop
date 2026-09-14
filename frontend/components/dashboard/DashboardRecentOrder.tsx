"use client";

import Link from "next/link";
import type { DashboardOrder } from "@/lib/dashboard";

type DashboardRecentOrderProps = {
  order: DashboardOrder | null;
};

export default function DashboardRecentOrder({
  order: recentOrder,
}: DashboardRecentOrderProps) {
  if (!recentOrder) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          No recent order found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Order
        </h2>

        <Link
          href="/dashboard/orders"
          className="text-xs font-medium text-indigo-600 hover:underline"
        >
          View All Orders
        </Link>
      </div>

      {/* Order */}
      <div className="mt-4 rounded-md border border-slate-200 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500">
              Order #{recentOrder.order_no}
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-900">
              {recentOrder.items[0]?.product_name ?? "Order"}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {recentOrder.items.length} item(s)
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-900">
              ${Number(recentOrder.total_amount).toFixed(2)}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-medium text-amber-700">
            {recentOrder.status}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs text-slate-500">
            Ordered on{" "}
            {new Date(
              recentOrder.created_at,
            ).toLocaleDateString()}
          </p>
        </div>

        <Link
          href={`/dashboard/orders/${recentOrder.id}`}
          className="mt-4 inline-block text-xs font-medium text-indigo-600 hover:underline"
        >
          View Order
        </Link>
      </div>
    </div>
  );
}