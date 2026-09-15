"use client";

import type { ChangeEvent, FormEvent } from "react";
import AuthInput from "@/components/auth/AuthInput";
import type { PaymentMethodFormData } from "@/lib/paymentMethod";

type PaymentMethodFormProps = {
  form: PaymentMethodFormData;
  loading: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function PaymentMethodForm({
  form,
  loading,
  error,
  onChange,
  onSubmit,
  onClose,
}: PaymentMethodFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">
            Add Payment Method
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* Card type */}
          <div>
            <label
              htmlFor="type"
              className="mb-1 block text-xs font-medium text-slate-700"
            >
              Card Type
            </label>

            <select
              id="type"
              name="type"
              value={form.type}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500"
            >
              <option value="Visa">Visa</option>

              <option value="Mastercard">Mastercard</option>

              <option value="Amex">American Express</option>

              <option value="Discover">Discover</option>
            </select>
          </div>

          {/* Card number */}
          <AuthInput
            id="card_number"
            name="card_number"
            label="Card Number"
            type="text"
            placeholder="4242 4242 4242 4242"
            value={form.card_number}
            onChange={onChange}
          />

          {/* Cardholder */}
          <AuthInput
            id="cardholder_name"
            name="cardholder_name"
            label="Cardholder Name"
            type="text"
            placeholder="Name on card"
            value={form.cardholder_name}
            onChange={onChange}
          />

          {/* Expiry */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="expiry_month"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Expiry Month
              </label>

              <select
                id="expiry_month"
                name="expiry_month"
                value={form.expiry_month}
                onChange={onChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500"
              >
                <option value="">Month</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <AuthInput
              id="expiry_year"
              name="expiry_year"
              label="Expiry Year"
              type="text"
              placeholder="29"
              value={form.expiry_year}
              onChange={onChange}
            />
          </div>

          {/* Default */}
          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              name="is_default"
              checked={form.is_default ?? false}
              onChange={onChange}
              className="h-4 w-4"
            />
            Set as default payment method
          </label>

          {/* Error */}
          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Payment Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
