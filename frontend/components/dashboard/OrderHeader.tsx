"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type OrderHeaderProps = {
  orderNo: string;
  status: string;
};

export default function OrderHeader({
  orderNo,
  status,
}: OrderHeaderProps) {
  const getStatusStyle = () => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

      case "PROCESSING":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";

      case "SHIPPED":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300";

      case "DELIVERED":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";

      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div>
      {/* Back */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Track Order
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Order #{orderNo}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle()}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}