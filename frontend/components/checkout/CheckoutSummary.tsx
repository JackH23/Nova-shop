import { LockKeyhole } from "lucide-react";
import type {
  CheckoutData,
  DeliveryMethod,
  PaymentMethod,
} from "@/services/checkoutService";
import type { CheckoutStep } from "./CheckoutSteps";
import StripePaymentConfirm from "./StripePaymentConfirm";

type CheckoutSummaryProps = {
  checkout: CheckoutData;
  step: CheckoutStep;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  placingOrder: boolean;
  onPaymentSuccess: (paymentIntentId: string) => Promise<void>;
};

export default function CheckoutSummary({
  checkout,
  step,
  deliveryMethod,
  paymentMethod,
  placingOrder,
  onPaymentSuccess,
}: CheckoutSummaryProps) {
  const shippingFee = deliveryMethod === "EXPRESS" ? 15 : 5;

  const total = checkout.subtotal + checkout.tax + shippingFee;

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-24">
      <h2 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
        Order Summary
      </h2>

      <div className="space-y-4">
        {checkout.items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {item.productName}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quantity: {item.quantity}
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              ${item.lineTotal.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-6 border-t border-slate-200 dark:border-slate-700" />

      {/* Discount */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          className="h-10 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <button
          type="button"
          className="rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Apply
        </button>
      </div>

      <div className="my-6 border-t border-slate-200 dark:border-slate-700" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Subtotal
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            ${checkout.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Shipping
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            ${shippingFee.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Taxes
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            ${checkout.tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      <div className="flex justify-between text-lg font-bold text-slate-950 dark:text-white">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {step === "payment" && !placingOrder ? (
        <div className="mt-5">
          {paymentMethod === "CREDIT_CARD" && (
            <StripePaymentConfirm onSuccess={onPaymentSuccess} />
          )}

          {paymentMethod === "PAYPAL" && (
            <button
              type="button"
              disabled
              className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-md bg-[#ffc439] font-semibold text-slate-900 opacity-70"
            >
              PayPal payment is not connected yet
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-slate-300 font-semibold text-white"
        >
          <LockKeyhole size={16} />

          {placingOrder ? "Creating Order..." : "Place Order"}
        </button>
      )}

      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        256-bit encryption for secure payment
      </p>
    </aside>
  );
}
