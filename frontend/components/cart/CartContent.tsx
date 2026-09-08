"use client";

import Link from "next/link";
import PageContainer from "@/components/common/PageContainer";
import EmptyState from "@/components/common/EmptyState";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartContent } from "@/composables/useCartContent";

export default function CartContent() {
  const {
    cart,
    addedProducts,
    handleIncrease,
    handleDecrease,
    handleRemove,
    removeToast,
  } = useCartContent();

  return (
    <>
      <PageContainer>
        <h1 className="text-3xl font-bold text-slate-950">Your Cart</h1>

        <p className="mt-2 text-sm text-slate-500">
          Review your items and proceed to checkout.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            {cart.length === 0 ? (
              <EmptyState
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet."
                actionText="Continue Shopping"
                actionHref="/products"
              />
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.color}`}
                      item={item}
                      onIncrease={() => handleIncrease(item)}
                      onDecrease={() => handleDecrease(item)}
                      onRemove={() => handleRemove(item)}
                    />
                  ))}
                </div>

                <Link
                  href="/products"
                  className="mt-8 inline-block text-sm font-medium text-indigo-600"
                >
                  ← Continue Shopping
                </Link>
              </>
            )}
          </div>

          <CartSummary cart={cart} />
        </div>
      </PageContainer>

      {addedProducts.map((toast, index) => (
        <AddToCartModal
          key={toast.id}
          product={toast.product}
          index={index}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
}
