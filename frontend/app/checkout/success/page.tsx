"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderDetail } from "@/composables/useOrderDetail";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  const { order, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
        Loading order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-red-600 dark:bg-slate-950 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
        Order not found
      </div>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-slate-50 px-4 py-12 transition-colors dark:bg-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
        {/* Success icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/15">
          <Check
            className="text-indigo-600 dark:text-indigo-400"
            size={28}
          />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
          Thank you for your order!
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your order has been placed successfully and is being processed.
        </p>

        {/* Order number */}
        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Order Number
            </span>

            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {order.order_no}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="flex h-11 items-center justify-center rounded-md border border-indigo-600 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
          >
            Track Order
          </Link>

          <Link
            href="/products"
            className="flex h-11 items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
          Loading order...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}