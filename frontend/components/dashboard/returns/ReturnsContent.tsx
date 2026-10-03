"use client";

import Link from "next/link";
import { useReturns } from "@/composables/useReturns";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

import ReturnStatusBadge from "./ReturnStatusBadge";

export default function ReturnsContent() {
  const {
    returns,
    loading,
    error,
  } = useReturns();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Returns Content */}
        <div className="min-w-0">
          {/* Header */}
          <PageHeader
            title="My Returns"
            breadcrumb="Home / Dashboard / Returns"
            description="View and track your return requests."
          />

          {/* Loading */}
          {loading && (
            <div className="mt-8">
              <LoadingState message="Loading returns..." />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8">
              <ErrorState message={error} />
            </div>
          )}

          {/* Empty */}
          {!loading && !error && returns.length === 0 && (
            <div className="mt-8">
              <EmptyState
                title="No returns yet"
                description="Your return requests will appear here."
                actionText="View Orders"
                actionHref="/dashboard/orders"
              />
            </div>
          )}

          {/* Return List */}
          {!loading &&
            !error &&
            returns.length > 0 && (
              <div className="mt-8 space-y-4">
                {returns.map(
                  (returnRequest) => (
                    <div
                      key={returnRequest.id}
                      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        {/* Return */}
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Return
                          </p>

                          <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                            #
                            {
                              returnRequest.id
                            }
                          </p>

                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {new Date(
                              returnRequest.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Order */}
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Order
                          </p>

                          <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                            #
                            {
                              returnRequest.order_id
                            }
                          </p>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Items
                          </p>

                          <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                            {
                              returnRequest
                                .items
                                .length
                            }
                          </p>
                        </div>

                        {/* Refund */}
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Refund
                          </p>

                          <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                            $
                            {Number(
                              returnRequest.refund_amount,
                            ).toFixed(2)}
                          </p>
                        </div>

                        {/* Status */}
                        <div>
                          <ReturnStatusBadge
                            status={
                              returnRequest.status
                            }
                          />
                        </div>

                        {/* Action */}
                        <Link
                          href={`/dashboard/returns/${returnRequest.id}`}
                          className="rounded-md border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                        >
                          View Return
                        </Link>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
        </div>
      </div>
    </PageContainer>
  );
}