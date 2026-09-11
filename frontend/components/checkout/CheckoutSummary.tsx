import { LockKeyhole } from "lucide-react";
import type { CheckoutData } from "@/services/checkoutService";
import type { CheckoutStep } from "./CheckoutSteps";

type CheckoutSummaryProps = {
  checkout: CheckoutData;
  step: CheckoutStep;
};

export default function CheckoutSummary({
  checkout,
  step,
}: CheckoutSummaryProps) {

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Order Summary
      </h2>

      <div className="space-y-4">
        {checkout.items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">
                {item.productName}
              </p>

              <p className="text-xs text-slate-500">
                Quantity: {item.quantity}
              </p>
            </div>

            <span className="text-sm font-semibold">
              ${item.lineTotal.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-6 border-t border-slate-200" />

      {/* Discount */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          className="h-10 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
        />

        <button
          type="button"
          className="rounded-md border border-slate-300 px-4 text-sm font-medium hover:bg-slate-50"
        >
          Apply
        </button>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span>${checkout.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Shipping</span>
          <span className="text-xs text-slate-500">Calculated next step</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Taxes</span>
          <span>${checkout.tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${checkout.total.toFixed(2)}</span>
      </div>

      <button
        type="button"
        disabled={step !== "payment"}
        className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md font-semibold text-white transition ${
          step === "payment"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "cursor-not-allowed bg-slate-300"
        }`}
      >
        <LockKeyhole size={16} />
        Place Order
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        256-bit encryption for secure payment
      </p>
    </aside>
  );
}
