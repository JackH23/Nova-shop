import { MapPin, Truck } from "lucide-react";

type Shipping = {
  full_name?: string;
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string | null;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

type Delivery = {
  delivery_method?: string;
  status?: string;
  tracking_number?: string | null;
  estimated_delivery_date?: string | null;
};

type OrderShippingProps = {
  shipping?: Shipping | null;
  delivery?: Delivery | null;
};

export default function OrderShipping({
  shipping,
  delivery,
}: OrderShippingProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Shipping Information
      </h2>

      {/* Shipping Address */}
      <div className="mt-5 flex items-start gap-3">
        <MapPin
          size={18}
          className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Shipping Address
          </p>

          {shipping ? (
            <div className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
              <p>{shipping.full_name}</p>

              <p>{shipping.address_line1}</p>

              {shipping.address_line2 && (
                <p>{shipping.address_line2}</p>
              )}

              <p>
                {shipping.city}
                {shipping.state && `, ${shipping.state}`}{" "}
                {shipping.postal_code}
              </p>

              {shipping.country && (
                <p>{shipping.country}</p>
              )}

              {shipping.email && (
                <p>{shipping.email}</p>
              )}

              {shipping.phone && (
                <p>{shipping.phone}</p>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No shipping address available.
            </p>
          )}
        </div>
      </div>

      <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

      {/* Delivery */}
      <div className="flex items-start gap-3">
        <Truck
          size={18}
          className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
        />

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Delivery
          </p>

          {delivery ? (
            <div className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
              <p>
                Method:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {delivery.delivery_method}
                </span>
              </p>

              <p>
                Status:{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {delivery.status}
                </span>
              </p>

              {delivery.tracking_number && (
                <p>
                  Tracking:{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {delivery.tracking_number}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No delivery information available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}