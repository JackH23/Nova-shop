"use client";

import { CreditCard } from "lucide-react";
import type { PaymentMethod as PaymentMethodType } from "@/services/checkoutService";
import { PaymentElement } from "@stripe/react-stripe-js";

type PaymentMethodProps = {
  paymentMethod: PaymentMethodType;
  onPaymentMethodChange: (method: PaymentMethodType) => void;
  onBack: () => void;
};

export default function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange,
  onBack,
}: PaymentMethodProps) {
  return (
    <div>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label
            className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition ${
              paymentMethod === "CREDIT_CARD"
                ? "border-indigo-600 ring-1 ring-indigo-600 dark:border-indigo-500 dark:ring-indigo-500"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "CREDIT_CARD"}
                onChange={() => onPaymentMethodChange("CREDIT_CARD")}
                className="accent-indigo-600"
              />

              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Credit Card
              </span>
            </div>

            <CreditCard
              size={18}
              className="text-slate-500 dark:text-slate-400"
            />
          </label>

          <label
            className={`flex cursor-pointer items-center rounded-md border p-4 transition ${
              paymentMethod === "PAYPAL"
                ? "border-indigo-600 ring-1 ring-indigo-600 dark:border-indigo-500 dark:ring-indigo-500"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "PAYPAL"}
              onChange={() => onPaymentMethodChange("PAYPAL")}
              className="accent-indigo-600"
            />

            <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-100">
              PayPal
            </span>
          </label>
        </div>

        {paymentMethod === "CREDIT_CARD" && (
          <div className="mt-6">
            <div className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <PaymentElement />
            </div>
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 cursor-pointer text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        ← Back to Delivery
      </button>
    </div>
  );
}
