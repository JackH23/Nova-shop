"use client";

import type {
  DeliveryMethod as DeliveryMethodType,
} from "@/services/checkoutService";

type DeliveryMethodProps = {
  deliveryMethod: DeliveryMethodType;
  onDeliveryMethodChange: (method: DeliveryMethodType) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function DeliveryMethod({
  deliveryMethod,
  onDeliveryMethodChange,
  onBack,
  onContinue,
}: DeliveryMethodProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
        Delivery Method
      </h2>

      <div className="space-y-3">
        {/* Standard Shipping */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition ${
            deliveryMethod === "STANDARD"
              ? "border-indigo-600 ring-1 ring-indigo-600 dark:border-indigo-400 dark:ring-indigo-400"
              : "border-slate-300 dark:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="delivery"
              value="STANDARD"
              checked={deliveryMethod === "STANDARD"}
              onChange={() =>
                onDeliveryMethodChange("STANDARD")
              }
              className="accent-indigo-600"
            />

            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Standard Shipping
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                5–7 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            $5.00
          </span>
        </label>

        {/* Express Shipping */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition ${
            deliveryMethod === "EXPRESS"
              ? "border-indigo-600 ring-1 ring-indigo-600 dark:border-indigo-400 dark:ring-indigo-400"
              : "border-slate-300 dark:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="delivery"
              value="EXPRESS"
              checked={deliveryMethod === "EXPRESS"}
              onChange={() =>
                onDeliveryMethodChange("EXPRESS")
              }
              className="accent-indigo-600"
            />

            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Express Shipping
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                2–3 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            $15.00
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          ← Back to Shipping
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="cursor-pointer rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to Payment →
        </button>
      </div>
    </section>
  );
}