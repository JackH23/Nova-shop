"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, type CartItem as CartItemType } from "@/composables/useCart";
import PageContainer from "@/components/common/PageContainer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const { updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      setCart(storedCart);
    };

    loadCart();

    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
    };
  }, []);

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-slate-950">Your Cart</h1>

      <p className="mt-2 text-sm text-slate-500">
        Review your items and proceed to checkout.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={`${item.product.id}-${item.color}`}
                item={item}
                onIncrease={() =>
                  updateQuantity(item.product.id, item.color, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.product.id, item.color, item.quantity - 1)
                }
                onRemove={() => removeFromCart(item.product.id, item.color)}
              />
            ))}
          </div>

          <Link
            href="/products"
            className="mt-8 inline-block text-sm font-medium text-indigo-600"
          >
            ← Continue Shopping
          </Link>
        </div>

        <CartSummary cart={cart} />
      </div>
    </PageContainer>
  );
}
