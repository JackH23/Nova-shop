import type { DashboardShippingAddress } from "@/lib/dashboard";

type DashboardDefaultAddressProps = {
  address: DashboardShippingAddress | null;
};

export default function DashboardDefaultAddress({
  address,
}: DashboardDefaultAddressProps) {
  if (!address) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Shipping Address
        </h2>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No shipping address found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          Shipping Address
        </h2>
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-4 dark:bg-slate-800">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {address.first_name} {address.last_name}
        </p>

        <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <p>{address.address}</p>

          <p>
            {address.city}
            {address.state_province && `, ${address.state_province}`}{" "}
            {address.postal_code}
          </p>
        </div>

        <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
          {address.email}
        </div>
      </div>
    </div>
  );
}