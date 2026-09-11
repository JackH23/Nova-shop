"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import IconInput from "@/components/auth/IconInput";

import type {
  PaymentMethod as PaymentMethodType,
} from "@/services/checkoutService";

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
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-900">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label
            className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${
              paymentMethod === "CREDIT_CARD"
                ? "border-indigo-600 ring-1 ring-indigo-600"
                : "border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "CREDIT_CARD"}
                onChange={() => onPaymentMethodChange("CREDIT_CARD")}
              />

              <span className="text-sm font-medium">Credit Card</span>
            </div>

            <CreditCard size={18} />
          </label>

          <label
            className={`flex cursor-pointer items-center rounded-md border p-4 ${
              paymentMethod === "PAYPAL"
                ? "border-indigo-600 ring-1 ring-indigo-600"
                : "border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "PAYPAL"}
              onChange={() => onPaymentMethodChange("PAYPAL")}
            />

            <span className="ml-3 text-sm font-medium">PayPal</span>
          </label>
        </div>

        {paymentMethod === "CREDIT_CARD" && (
          <div className="mt-6 space-y-4">
            <IconInput
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              icon={<CreditCard size={16} />}
            />

            <div className="grid grid-cols-2 gap-4">
              <AuthInput
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
              />

              <AuthInput
                id="cvc"
                name="cvc"
                label="CVC"
                type="text"
                placeholder="123"
              />
            </div>
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
      >
        ← Back to Delivery
      </button>
    </div>
  );
}
