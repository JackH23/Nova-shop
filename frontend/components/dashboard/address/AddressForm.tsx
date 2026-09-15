"use client";

import type { ChangeEvent, FormEvent } from "react";
import AuthInput from "@/components/auth/AuthInput";
import type { CreateAddressData } from "@/lib/address";

type AddressFormProps = {
  form: CreateAddressData;
  loading: boolean;
  error: string;
  isEditing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function AddressForm({
  form,
  loading,
  error,
  isEditing,
  onChange,
  onSubmit,
  onClose,
}: AddressFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">
            {isEditing ? "Edit Address" : "Add New Address"}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthInput
              id="first_name"
              name="first_name"
              label="First Name"
              type="text"
              placeholder="First Name"
              value={form.first_name}
              onChange={onChange}
            />

            <AuthInput
              id="last_name"
              name="last_name"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={onChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange}
            />

            <AuthInput
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              placeholder="+856 20 5555 1234"
              value={form.phone}
              onChange={onChange}
            />
          </div>

          <AuthInput
            id="address"
            name="address"
            label="Address"
            type="text"
            placeholder="Street address"
            value={form.address}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthInput
              id="city"
              name="city"
              label="City"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={onChange}
            />

            <AuthInput
              id="state_province"
              name="state_province"
              label="State / Province"
              type="text"
              placeholder="State / Province"
              value={form.state_province}
              onChange={onChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AuthInput
              id="postal_code"
              name="postal_code"
              label="Postal Code"
              type="text"
              placeholder="Postal Code"
              value={form.postal_code}
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

          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              name="is_default"
              checked={form.is_default}
              onChange={onChange}
              className="h-4 w-4"
            />
            Set as default address
          </label>

          {error && <p className="text-xs text-red-500">{error}</p>}

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
