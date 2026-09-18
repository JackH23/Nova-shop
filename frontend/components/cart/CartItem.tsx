import ProductImage from "@/components/products/ProductImage";
import type { CartItem as CartItemType } from "@/lib/cart";

type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
        <ProductImage
          image={item.product.image}
          name={item.product.name}
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-semibold text-slate-950">{item.product.name}</h2>

        {item.variant && (
          <p className="mt-1 text-xs text-slate-500">
            Color: {item.variant.color_name}
          </p>
        )}

        <div className="mt-3 flex h-8 w-fit items-center rounded-full border border-slate-300">
          <button
            type="button"
            onClick={onDecrease}
            disabled={item.quantity <= 1}
            className="h-full px-3 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="min-w-8 text-center text-xs font-medium">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            className="h-full px-3 text-sm text-slate-700"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex self-stretch flex-col items-end justify-between">
        <p className="font-semibold text-slate-950">
          ${(Number(item.product.price) * item.quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium text-red-500 transition hover:text-red-600 cursor-pointer"
        >
          ♲ Remove
        </button>
      </div>
    </div>
  );
}
