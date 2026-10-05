"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import ProductImage from "@/components/products/ProductImage";
import Pagination from "@/components/common/Pagination";
import AsyncState from "@/components/common/AsyncState";
import ReturnForm from "@/components/dashboard/returns/ReturnForm";

import { useReturnContent } from "@/composables/useReturnContent";
import { useReturnItems } from "@/composables/useReturnItems";

type ReturnContentProps = {
  orderId: number;
};

export default function ReturnContent({
  orderId,
}: ReturnContentProps) {
  const {
    order,
    paginatedItems,
    currentPage,
    totalPages,
    loading,
    error,
    itemListRef,
    handlePageChange,
  } = useReturnItems(orderId);

  const {
    selectedItems,
    showReturnForm,
    reason,
    note,
    modalType,
    submitting,
    setReason,
    setNote,
    handleSelectItem,
    handleReturn,
    handleOpenConfirm,
    handleCloseModal,
    handleConfirmReturn,
    handleBackToOrder,
  } = useReturnContent(orderId);

  if (order?.has_return_request) {
    return (
      <div className="py-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Order Already Returned
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A return request has already been submitted for this order.
            You cannot submit another return request.
          </p>

          <button
            type="button"
            onClick={handleBackToOrder}
            className="mt-6 cursor-pointer rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Back to Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <AsyncState
      loading={loading}
      loadingMessage="Loading return items..."
      error={error}
      isEmpty={!order}
      emptyTitle="Order not found"
      emptyDescription="We couldn't find the order you're trying to return."
    >
      <>
        <div className="py-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Return Items
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Return items from order #{order?.order_no}
          </p>

          <div
            ref={itemListRef}
            className="mt-8 scroll-mt-28 space-y-3"
          >
            {paginatedItems.map((item) => {
              const selected = selectedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-4 transition-colors ${selected
                    ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 dark:border-indigo-400 dark:bg-indigo-500/10 dark:ring-indigo-400"
                    : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleSelectItem(item.id)}
                        className="h-4 w-4 cursor-pointer accent-indigo-600"
                      />

                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                        <ProductImage
                          image={item.product?.image}
                          name={item.product_name}
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {item.product_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Purchased: {item.quantity} · $
                          {Number(item.unit_price).toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      ${Number(item.line_total).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={
                handlePageChange
              }
            />
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleReturn}
              disabled={selectedItems.length === 0}
              className="cursor-pointer rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              Continue Return ({selectedItems.length})
            </button>
          </div>

          {showReturnForm && (
            <ReturnForm
              reason={reason}
              note={note}
              submitting={submitting}
              onReasonChange={setReason}
              onNoteChange={setNote}
              onSubmit={handleOpenConfirm}
            />
          )}
        </div>

        <ConfirmModal
          open={modalType !== null}
          title={
            modalType === "confirm"
              ? "Confirm Return Request"
              : "Return Request Submitted"
          }
          message={
            modalType === "confirm"
              ? `Are you sure you want to return ${selectedItems.length} item(s)?`
              : "Your return request has been submitted successfully."
          }
          confirmText={
            modalType === "confirm"
              ? submitting
                ? "Submitting..."
                : "Submit Return"
              : "Back to Order"
          }
          cancelText={modalType === "confirm" ? "Cancel" : "Close"}
          singleButton={modalType === "success"}
          variant={modalType === "confirm" ? "danger" : "success"}
          onConfirm={
            modalType === "confirm"
              ? handleConfirmReturn
              : handleBackToOrder
          }
          onCancel={handleCloseModal}
        />
      </>
    </AsyncState>
  );
}