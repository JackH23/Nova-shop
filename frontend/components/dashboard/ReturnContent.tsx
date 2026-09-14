"use client";

import { useOrderDetail } from "@/composables/useOrderDetail";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useReturnContent } from "@/composables/useReturnContent";

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
    showConfirmModal,
    showSuccessModal,
    submitting,
    submitError,
    setReason,
    setNote,
    setShowConfirmModal,
    setShowSuccessModal,
    handleSelectItem,
    handleReturn,
    handleConfirmReturn,
    handleBackToOrder,
  } = useReturnContent(orderId);

  if (loading) {
    return <div className="p-8">Loading order...</div>;
  }

  if (error) {
    return <div className="p-8">{error}</div>;
  }

  if (!order) {
    return <div className="p-8">Order not found.</div>;
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Return Items</h1>

        <p className="mt-2 text-sm text-slate-500">
          Return items from order #{order.order_no}
        </p>

        <div className="mt-8 space-y-3">
          {order.items.map((item) => {
            const selected = selectedItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-lg border bg-white p-4 transition ${
                  selected
                    ? "border-indigo-500 ring-1 ring-indigo-500"
                    : "border-slate-200"
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

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.product_name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Purchased: {item.quantity} · $
                        {Number(item.unit_price).toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
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
            className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Continue Return ({selectedItems.length})
          </button>
        </div>

        {showReturnForm && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Return Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us why you are returning the selected items.
            </p>

            {/* Reason */}
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">
                Reason for return
              </label>

              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
              >
                <option value="">Select a reason</option>
                <option value="Wrong size">Wrong size</option>
                <option value="Damaged item">Damaged item</option>
                <option value="Wrong item received">Wrong item received</option>
                <option value="Product not as described">
                  Product not as described
                </option>
                <option value="Changed my mind">Changed my mind</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Note */}
            <div className="mt-5">
              <label className="text-sm font-medium text-slate-700">
                Additional note
              </label>

              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tell us more about your return..."
                className="mt-2 w-full resize-none rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={!reason || submitting}
                className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {submitting ? "Submitting..." : "Submit Return Request"}
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={showConfirmModal}
        title="Confirm Return Request"
        message={`Are you sure you want to return ${selectedItems.length} item(s)?`}
        confirmText="Submit Return"
        cancelText="Cancel"
        onConfirm={handleConfirmReturn}
        onCancel={() => setShowConfirmModal(false)}
      />

      <ConfirmModal
        open={showSuccessModal}
        title="Return Request Submitted"
        message="Your return request has been submitted successfully."
        confirmText="Back to Order"
        cancelText="Close"
        onConfirm={handleBackToOrder}
        onCancel={() => setShowSuccessModal(false)}
      />
    </>
  );
}
