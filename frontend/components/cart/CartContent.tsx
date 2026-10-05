"use client";

import Link from "next/link";
import PageContainer from "@/components/common/PageContainer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { useCartContent } from "@/composables/useCartContent";
import Pagination from "@/components/common/Pagination";
import ConfirmModal from "@/components/common/ConfirmModal";
import AsyncState from "@/components/common/AsyncState";
import { usePaginationScroll } from "@/composables/usePaginationScroll";

export default function CartContent() {
  const {
    cart,
    loading,
    error,

    currentPage,
    setCurrentPage,
    totalPages,

    updateError,
    closeUpdateError,

    addedProducts,
    handleIncrease,
    handleDecrease,
    handleRemove,
    removeToast,
  } = useCartContent();

  const {
    targetRef: cartListRef,
    handlePageChange,
  } = usePaginationScroll(setCurrentPage);

  return (
    <>
      <PageContainer>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          Your Cart
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Review your items and proceed to checkout.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <AsyncState
              loading={loading}
              loadingMessage="Loading cart..."
              error={error}
              isEmpty={cart.length === 0}
              emptyTitle="Your cart is empty"
              emptyDescription="Looks like you haven't added anything to your cart yet."
              emptyActionText="Continue Shopping"
              emptyActionHref="/products"
            >
              <>
                <div
                  ref={cartListRef}
                  className="scroll-mt-28 space-y-4"
                >
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={() => handleIncrease(item)}
                      onDecrease={() => handleDecrease(item)}
                      onRemove={() => handleRemove(item)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}

                <Link
                  href="/products"
                  className="mt-8 inline-block text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  ← Continue Shopping
                </Link>
              </>
            </AsyncState>
          </div>

          {!loading && !error && cart.length > 0 && <CartSummary cart={cart} />}
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

      <ConfirmModal
        open={!!updateError}
        title="Unable to Update Quantity"
        message={updateError}
        confirmText="OK"
        cancelText="Close"
        onConfirm={closeUpdateError}
        onCancel={closeUpdateError}
      />
    </>
  );
}
