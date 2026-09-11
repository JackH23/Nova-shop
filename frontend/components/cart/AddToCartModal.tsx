"use client";

import { useRouter } from "next/navigation";
import { X, Check } from "lucide-react";
import { useEffect, useState } from "react";

type ToastProduct = {
  id: number;
  name: string;
  image: string;
};

type AddToCartModalProps = {
  product: ToastProduct | null;
  index: number;
  onClose: () => void;
  type?: "added" | "removed";
};

export default function AddToCartModal({
  product,
  index,
  onClose,
  type = "added",
}: AddToCartModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const router = useRouter();

  const handleOpenProduct = () => {
    router.push(`/products/${product?.id}`);
  };

  useEffect(() => {
    if (!product) return;

    setIsClosing(false);

    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      onClose();
    }, 1750);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      onClick={handleOpenProduct}
      style={{
        top: `${24 + index * 65}px`,
      }}
      className={`fixed left-1/2 z-50 w-[320px] cursor-pointer transition-[top] duration-300 ${
        isClosing ? "toast-slide-up" : "toast-slide-down"
      }`}
    >
      <div className="overflow-hidden rounded-md bg-white shadow-lg">
        <div className="relative flex items-center gap-3 px-4 py-4">
          {/* Success icon */}
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              type === "removed" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <Check size={14} strokeWidth={3} className="text-white" />
          </div>

          {/* Message */}
          <p className="truncate pr-5 text-sm text-slate-500">
            {product.name}{" "}
            {type === "removed" ? "removed from cart" : "added to cart"}
          </p>

          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 text-slate-400 transition hover:text-slate-700"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Green bottom progress line */}
        <div
          className={`toast-progress h-1 ${
            type === "removed" ? "bg-red-500" : "bg-green-500"
          }`}
        />
      </div>
    </div>
  );
}
