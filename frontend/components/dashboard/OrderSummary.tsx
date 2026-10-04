"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useOrderSummary } from "@/composables/useOrderSummary";
import type { DashboardOrder } from "@/lib/dashboard";

type OrderSummaryProps = {
  order: DashboardOrder;
};

export default function OrderSummary({
  order,
}: OrderSummaryProps) {
  const {
    buyAgainError,
    buyAgainLoading,
    canReturn,
    returnButtonText,
    handleBuyAgain,
    handleBuyAgainErrorConfirm,
    handleCloseBuyAgainError,
    handleReturnItem,
  } = useOrderSummary(order);

  return (
    <>
      <div className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Order Summary
        </h2>

        <div className="mt-5 space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Subtotal ({order.items.length} items)
            </span>

            <span className="text-slate-900 dark:text-slate-100">
              ${Number(order.subtotal).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Shipping
            </span>

            <span className="text-slate-900 dark:text-slate-100">
              ${Number(order.shipping_fee).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Tax
            </span>

            <span className="text-slate-900 dark:text-slate-100">
              ${Number(order.tax).toFixed(2)}
            </span>
          </div>

          {Number(order.discount_amount) > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Discount
              </span>

              <span className="text-indigo-600 dark:text-indigo-400">
                -$
                {Number(
                  order.discount_amount,
                ).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-950 dark:text-white">
            Total
          </span>

          <span className="text-base font-bold text-slate-950 dark:text-white">
            ${Number(order.total_amount).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleBuyAgain}
          disabled={buyAgainLoading}
          className="mt-5 w-full cursor-pointer rounded-md bg-[#3324d8] py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buyAgainLoading
            ? "Adding to Cart..."
            : "Buy Again"}
        </button>

        {order.status === "DELIVERED" && (
          <button
            type="button"
            onClick={handleReturnItem}
            disabled={!canReturn}
            className="
              mt-2 w-full rounded-md border border-slate-200 py-2.5
              text-xs font-medium text-slate-700 transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-400
              disabled:hover:bg-slate-100
              dark:border-slate-700
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:disabled:bg-slate-800
              dark:disabled:text-slate-500
              dark:disabled:hover:bg-slate-800
            "
          >
            {returnButtonText}
          </button>
        )}
      </div>

      <ConfirmModal
        open={!!buyAgainError}
        title="Unable to Buy Again"
        message={buyAgainError}
        confirmText="OK"
        cancelText="Close"
        onConfirm={handleBuyAgainErrorConfirm}
        onCancel={handleCloseBuyAgainError}
      />
    </>
  );
}