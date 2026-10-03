"use client";

import Link from "next/link";
import { useOrders } from "@/composables/useOrders";
import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function OrdersContent() {
  const { orders, currentPage, setCurrentPage, totalPages, loading, error } =
    useOrders();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        {/* Same sidebar as order detail */}
        <DashboardSidebar />

        {/* Order history content */}
        <div className="min-w-0">
          <PageHeader
            title="My Orders"
            breadcrumb="Home / Dashboard / Orders"
            description="View and track your orders."
          />

          {loading && (
            <div className="mt-8">
              <LoadingState message="Loading orders..." />
            </div>
          )}

          {error && (
            <div className="mt-8">
              <ErrorState message={error} />
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="mt-8">
              <EmptyState
                title="No orders yet"
                description="You don't have any orders yet."
                actionText="Start Shopping"
                actionHref="/products"
              />
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="mt-8 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    {/* Left */}
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Order
                      </p>

                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        #{order.order_no}
                      </p>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Items
                      </p>

                      <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                        {order.items.length}
                      </p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Total
                      </p>

                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        ${Number(order.total_amount).toFixed(2)}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                        {order.status}
                      </span>
                    </div>

                    {/* Action */}
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                    >
                      View Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageContainer>
  );
}
