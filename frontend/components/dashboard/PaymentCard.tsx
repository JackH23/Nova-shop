"use client";

import {
  CreditCard,
  Pencil,
  Trash2,
} from "lucide-react";

type PaymentMethod = {
  id: number;
  type: string;
  last_four: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
};

type PaymentCardProps = {
  payment: PaymentMethod;
};

export default function PaymentCard({
  payment,
}: PaymentCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard
            size={17}
            className="text-[#3324d8]"
          />

          <span className="text-sm font-semibold text-slate-950">
            {payment.type}
          </span>
        </div>

        {payment.is_default && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600">
            Default
          </span>
        )}
      </div>

      {/* Card number */}
      <p className="mt-5 text-base font-semibold tracking-wider text-slate-900">
        •••• •••• •••• {payment.last_four}
      </p>

      {/* Details */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase text-slate-400">
            Cardholder
          </p>

          <p className="mt-1 text-xs font-medium text-slate-700">
            {payment.cardholder_name}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-slate-400">
            Expires
          </p>

          <p className="mt-1 text-xs font-medium text-slate-700">
            {payment.expiry_month}/{payment.expiry_year}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200" />

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600 hover:text-[#3324d8]"
          >
            <Pencil size={13} />
            Edit
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600 hover:text-red-500"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>

        {!payment.is_default && (
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