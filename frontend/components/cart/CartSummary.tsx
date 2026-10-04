import Link from "next/link";
import type { CartItem } from "@/lib/cart";

type CartSummaryProps = {
  cart: CartItem[];
};

export default function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0,
  );

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="h-fit rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
        Order Summary
      </h2>

      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      {/* Summary */}
      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Subtotal ({itemCount} items)
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Shipping
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            Calculated at next step
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Estimated Tax
          </span>

          <span className="text-slate-900 dark:text-slate-100">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span className="text-slate-950 dark:text-white">
          Total
        </span>

        <span className="text-slate-950 dark:text-white">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout */}
      <Link
        href="/checkout"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Proceed to Checkout →
      </Link>
    </div>
  );
}