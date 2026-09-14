"use client";

import { useRouter } from "next/navigation";
import { cartService } from "@/services/cartService";
import type { DashboardOrder } from "@/lib/dashboard";

type OrderSummaryProps = {
  order: DashboardOrder;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  const router = useRouter();

  const handleBuyAgain = async () => {
    try {
      await Promise.all(
        order.items.map((item) =>
          cartService.addToCart(
            item.product_id,
            item.variant_id,
            item.quantity,
          ),
        ),
      );

      // Notify Navbar that cart changed
      window.dispatchEvent(new Event("cart-updated"));

      router.push("/cart");
    } catch (error) {
      console.error("Failed to buy again:", error);
    }
  };

  const handleReturnItem = () => {
    router.push(`/dashboard/orders/${order.id}/return`);
  };

  return (
    <div className="h-fit rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">Order Summary</h2>

      <div className="mt-5 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Subtotal ({order.items.length} items)
          </span>

          <span className="text-slate-900">
            ${Number(order.subtotal).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>

          <span className="text-slate-900">
            ${Number(order.shipping_fee).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Tax</span>

          <span className="text-slate-900">
            ${Number(order.tax).toFixed(2)}
          </span>
        </div>

        {Number(order.discount_amount) > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-500">Discount</span>

            <span className="text-indigo-600">
              -${Number(order.discount_amount).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="my-5 border-t border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-950">Total</span>

        <span className="text-base font-bold text-slate-950">
          ${Number(order.total_amount).toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={handleBuyAgain}
        className="mt-5 w-full cursor-pointer rounded-md bg-[#3324d8] py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
      >
        Buy Again
      </button>

      {order.status === "DELIVERED" && (
        <button
          type="button"
          onClick={handleReturnItem}
          className="mt-2 w-full cursor-pointer rounded-md border border-slate-200 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Return Item
        </button>
      )}
    </div>
  );
}
