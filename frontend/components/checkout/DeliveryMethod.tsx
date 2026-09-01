"use client";

import { useState } from "react";

type DeliveryMethodProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function DeliveryMethod({
  onBack,
  onContinue,
}: DeliveryMethodProps) {
  const [deliveryMethod, setDeliveryMethod] =
    useState<"standard" | "express">("standard");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        Delivery Method
      </h2>

      <div className="space-y-3">
        {/* Standard Shipping */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition ${
            deliveryMethod === "standard"
              ? "border-indigo-600 ring-1 ring-indigo-600"
              : "border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={deliveryMethod === "standard"}
              onChange={() =>
                setDeliveryMethod("standard")
              }
            />

            <div>
              <p className="text-sm font-medium text-slate-900">
                Standard Shipping
              </p>

              <p className="text-xs text-slate-500">
                5–7 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-slate-900">
            $5.00
          </span>
        </label>

        {/* Express Shipping */}
        <label
          className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition ${
            deliveryMethod === "express"
              ? "border-indigo-600 ring-1 ring-indigo-600"
              : "border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={deliveryMethod === "express"}
              onChange={() =>
                setDeliveryMethod("express")
              }
            />

            <div>
              <p className="text-sm font-medium text-slate-900">
                Express Shipping
              </p>

              <p className="text-xs text-slate-500">
                2–3 business days
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-slate-900">
            $15.00
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Shipping
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to Payment →
        </button>
      </div>
    </section>
  );
}