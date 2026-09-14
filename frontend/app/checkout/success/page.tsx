"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useOrderDetail } from "@/composables/useOrderDetail";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderIdParam = searchParams.get("orderId");

  const orderId = orderIdParam ? Number(orderIdParam) : null;

  const { order, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return <div>Loading order...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        {/* Success icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
          <Check className="text-indigo-600" size={28} />
        </div>

        {/* Message */}
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Thank you for your order!
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Your order has been placed successfully and is being processed.
        </p>

        {/* Order information */}
        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500">Order Number</span>

            <span className="text-sm font-semibold text-indigo-600">
              {order.order_no}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="flex h-11 items-center justify-center rounded-md border border-indigo-600 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
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
