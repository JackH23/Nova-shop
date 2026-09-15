"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PaymentCard from "@/components/dashboard/payment/PaymentCard";
import { usePaymentMethods } from "@/composables/usePaymentMethods";
import PaymentMethodForm from "@/components/dashboard/payment/PaymentMethodForm";
import { usePaymentMethodForm } from "@/composables/usePaymentMethodForm";

export default function PaymentContent() {
  const {
    paymentMethods,
    loading,
    error,
    createPaymentMethod,
  } = usePaymentMethods();

  const {
    form,
    showAddForm,
    handleChange,
    handleSubmit,
    handleOpenForm,
    handleCloseForm,
  } = usePaymentMethodForm({
    onCreate: createPaymentMethod,
  });

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Payment Methods
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your saved payment methods.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenForm}
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
            >
              + Add Payment Method
            </button>
          </div>

          <div className="mt-4 border-t border-slate-200" />

          {/* Loading */}
          {loading && (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading payment methods...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-10 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && paymentMethods.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              No payment methods found.
            </div>
          )}

          {/* Payment methods */}
          {!loading && !error && paymentMethods.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {paymentMethods.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          )}

          {/* Add Payment Method */}
          {showAddForm && (
            <PaymentMethodForm
              form={form}
              loading={loading}
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
