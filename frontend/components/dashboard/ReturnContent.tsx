"use client";

import { useOrderDetail } from "@/composables/useOrderDetail";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useReturnContent } from "@/composables/useReturnContent";
import ProductImage from "@/components/products/ProductImage";

type ReturnContentProps = {
  orderId: number;
};

export default function ReturnContent({ orderId }: ReturnContentProps) {
  const { order, loading, error } = useOrderDetail(orderId);

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

  if (loading) {
    return (
      <div className="p-8 text-slate-600 dark:text-slate-400">
        Loading order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-slate-600 dark:text-slate-400">
        Order not found.
      </div>
    );
  }

  return (
    <>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Return Items
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Return items from order #{order.order_no}
        </p>

        <div className="mt-8 space-y-3">
          {order.items.map((item) => {
            const selected = selectedItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-lg border p-4 transition-colors ${
                  selected
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
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Return Details
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Tell us why you are returning the selected items.
            </p>

            {/* Reason */}
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Reason for return
              </label>

              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
              >
                <option value="">Select a reason</option>
                <option value="Wrong size">Wrong size</option>
                <option value="Damaged item">Damaged item</option>
                <option value="Wrong item received">
                  Wrong item received
                </option>
                <option value="Product not as described">
                  Product not as described
                </option>
                <option value="Changed my mind">
                  Changed my mind
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Note */}
            <div className="mt-5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Additional note
              </label>

              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tell us more about your return..."
                className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleOpenConfirm}
                disabled={!reason || submitting}
                className="cursor-pointer rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Return Request"}
              </button>
            </div>
          </div>
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
  );
}