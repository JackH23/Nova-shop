"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PaymentCard from "@/components/dashboard/PaymentCard";

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last_four: "4242",
    cardholder_name: "Jack Sihalard",
    expiry_month: "08",
    expiry_year: "29",
    is_default: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last_four: "8854",
    cardholder_name: "Jack Sihalard",
    expiry_month: "12",
    expiry_year: "28",
    is_default: false,
  },
];

export default function PaymentContent() {
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
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
            >
              + Add Payment Method
            </button>
          </div>

          <div className="mt-4 border-t border-slate-200" />

          {/* Payment methods */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {paymentMethods.map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}