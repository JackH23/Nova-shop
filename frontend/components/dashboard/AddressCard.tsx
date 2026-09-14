"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";

type Address = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

type AddressCardProps = {
  address: Address;
};

export default function AddressCard({
  address,
}: AddressCardProps) {
  return (
    <div className="relative rounded-lg border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin
            size={16}
            className="text-[#3324d8]"
          />

          <h2 className="text-sm font-semibold text-slate-950">
            {address.full_name}
          </h2>
        </div>

        {address.is_default && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600">
            Default
          </span>
        )}
      </div>

      {/* Address information */}
      <div className="mt-4 space-y-1 text-xs leading-5 text-slate-500">
        <p>{address.address_line1}</p>

        {address.address_line2 && (
          <p>{address.address_line2}</p>
        )}

        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>

        <p>{address.country}</p>
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-1 text-xs">
        <p>
          <span className="font-medium text-slate-700">
            Phone:
          </span>{" "}
          <span className="text-slate-500">
            {address.phone}
          </span>
        </p>

        <p>
          <span className="font-medium text-slate-700">
            Email:
          </span>{" "}
          <span className="text-slate-500">
            {address.email}
          </span>
        </p>
      </div>

      <div className="my-4 border-t border-slate-200" />

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-[#3324d8]"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-red-500"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>

        {!address.is_default && (
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-[#3324d8] hover:underline"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
}