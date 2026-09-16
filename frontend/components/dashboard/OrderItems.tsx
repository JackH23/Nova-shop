type OrderItem = {
  id: number;
  product_id: number;
  variant_id: number | null;
  product_name: string;
  unit_price: string | number;
  quantity: number;
  line_total: string | number;

  product: {
    id: number;
    image: string | null;
  } | null;
};

type OrderItemsProps = {
  items: OrderItem[];
};

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Order Items</h2>

        <span className="text-sm text-slate-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="mt-5 divide-y divide-slate-200">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
          >
            {/* Product */}
            <div className="flex min-w-0 items-center gap-4">
              {item.product?.image && (
                <img
                  src={item.product.image}
                  alt={item.product_name}
                  className="h-16 w-16 shrink-0 rounded-md border border-slate-200 object-cover"
                />
              )}

              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  {item.product_name}
                </p>

                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span>Qty: {item.quantity}</span>

                  <span>${Number(item.unit_price).toFixed(2)} each</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <p className="shrink-0 font-semibold text-slate-900">
              ${Number(item.line_total).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
