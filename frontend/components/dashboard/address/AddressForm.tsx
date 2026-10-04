"use client";

import type { ChangeEvent, FormEvent } from "react";
import AuthInput from "@/components/auth/AuthInput";
import type { CreateAddressData } from "@/lib/address";
import type { ShippingErrors } from "@/composables/useShippingValidation";

type AddressFormProps = {
  form: CreateAddressData;
  errors: ShippingErrors;
  loading: boolean;
  error: string;
  isEditing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function AddressForm({
  form,
  errors,
  loading,
  error,
  isEditing,
  onChange,
  onSubmit,
  onClose,
}: AddressFormProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-3 sm:p-4">
      {/* Modal */}
      <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-900 sm:max-h-[calc(100dvh-32px)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700 sm:px-6">
          <h2 className="text-base font-bold text-slate-950 dark:text-white sm:text-lg">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close address form"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Scrollable form fields */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:space-y-4 sm:px-6">
            {/* Name */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <AuthInput
                id="first_name"
                name="first_name"
                label="First Name"
                type="text"
                placeholder="First Name"
                value={form.first_name}
                error={errors.firstName}
                onChange={onChange}
              />

              <AuthInput
                id="last_name"
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={form.last_name}
                error={errors.lastName}
                onChange={onChange}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <AuthInput
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                error={errors.email}
                onChange={onChange}
              />

              <AuthInput
                id="phone"
                name="phone"
                label="Phone"
                type="text"
                placeholder="+856 20 5555 1234"
                value={form.phone}
                error={errors.phone}
                maxLength={15}
                onChange={onChange}
              />
            </div>

            {/* Address */}
            <AuthInput
              id="address"
              name="address"
              label="Address"
              type="text"
              placeholder="Street address"
              value={form.address}
              error={errors.address}
              onChange={onChange}
            />

            <AuthInput
              id="address_line2"
              name="address_line2"
              label="Address Line 2"
              type="text"
              placeholder="Apartment, suite, office (optional)"
              value={form.address_line2}
              onChange={onChange}
            />

            {/* City / Province */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <AuthInput
                id="city"
                name="city"
                label="City"
                type="text"
                placeholder="City"
                value={form.city}
                error={errors.city}
                onChange={onChange}
              />

              <AuthInput
                id="state_province"
                name="state_province"
                label="State / Province"
                type="text"
                placeholder="State / Province"
                value={form.state_province}
                error={errors.stateProvince}
                onChange={onChange}
              />
            </div>

            {/* Postal / Country */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <AuthInput
                id="postal_code"
                name="postal_code"
                label="Postal Code"
                type="text"
                placeholder="Postal Code"
                value={form.postal_code}
                error={errors.postalCode}
                onChange={onChange}
              />

              <AuthInput
                id="country"
                name="country"
                label="Country"
                type="text"
                placeholder="Country"
                value={form.country}
                onChange={onChange}
              />
            </div>

            {/* Default */}
            <label className="flex cursor-pointer items-center gap-2 py-1 text-xs text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                name="is_default"
                checked={form.is_default}
                onChange={onChange}
                className="h-4 w-4"
              />

              <span>Set as default address</span>
            </label>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-md border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto sm:py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-md bg-[#3324d8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                  ? "Update Address"
                  : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}