import Link from "next/link";
import type { CartItem } from "@/composables/useCart";

type CartSummaryProps = {
  cart: CartItem[];
};

export default function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="h-fit rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-950">Order Summary</h2>

      <div className="my-4 border-t border-slate-200" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal ({itemCount} items)</span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Shipping</span>

          <span>Calculated at next step</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Estimated Tax</span>

          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Proceed to Checkout →
      </Link>
    </div>
  );
}
