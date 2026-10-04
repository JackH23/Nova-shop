"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";
import type { UserAddress } from "@/lib/address";

type AddressCardProps = {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onRemove: (addressId: number) => void;
  onSetDefault: (addressId: number) => Promise<unknown>;
};

export default function AddressCard({
  address,
  onEdit,
  onRemove,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div className="relative rounded-lg border border-slate-200 bg-white p-5 transition-colors dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin
            size={16}
            className="text-[#3324d8] dark:text-indigo-400"
          />

          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
            {address.first_name} {address.last_name}
          </h2>
        </div>

        {address.is_default && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
            Default
          </span>
        )}
      </div>

      {/* Address information */}
      <div className="mt-4 space-y-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        <p>{address.address}</p>

        {address.address_line2 && <p>{address.address_line2}</p>}

        <p>
          {address.city}, {address.state_province} {address.postal_code}
        </p>

        <p>{address.country}</p>
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-1 text-xs">
        <p>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Phone:
          </span>{" "}
          <span className="text-slate-500 dark:text-slate-400">
            {address.phone}
          </span>
        </p>

        <p>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Email:
          </span>{" "}
          <span className="text-slate-500 dark:text-slate-400">
            {address.email}
          </span>
        </p>
      </div>

      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-[#3324d8] dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onRemove(address.id)}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>

        {!address.is_default && (
          <button
            type="button"
            onClick={() => onSetDefault(address.id)}
            className="cursor-pointer text-xs font-semibold text-[#3324d8] hover:underline dark:text-indigo-400"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
}