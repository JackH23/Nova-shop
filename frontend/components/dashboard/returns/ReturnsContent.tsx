"use client";

import Link from "next/link";
import { useReturns } from "@/composables/useReturns";
import { usePaginationScroll } from "@/composables/usePaginationScroll";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PageHeader from "@/components/common/PageHeader";
import Pagination from "@/components/common/Pagination";
import AsyncState from "@/components/common/AsyncState";

import ReturnStatusBadge from "./ReturnStatusBadge";

export default function ReturnsContent() {
  const {
    returns,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error,
  } = useReturns();

  const {
    targetRef: returnsListRef,
    handlePageChange,
  } = usePaginationScroll(setCurrentPage);

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

          {/* Return List */}
          <AsyncState
            loading={loading}
            loadingMessage="Loading returns..."
            error={error}
            isEmpty={returns.length === 0}
            emptyTitle="No returns yet"
            emptyDescription="Your return requests will appear here."
            emptyActionText="View Orders"
            emptyActionHref="/dashboard/orders"
          >
            <>
              <div
                ref={returnsListRef}
                className="mt-8 scroll-mt-28 space-y-4"
              >
                {returns.map((returnRequest) => (
                  <div
                    key={returnRequest.id}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                      {/* Return */}
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Return
                        </p>

                        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                          #{returnRequest.id}
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
                          #{returnRequest.order_id}
                        </p>
                      </div>

                      {/* Items */}
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Items
                        </p>

                        <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                          {returnRequest.items.length}
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
                          status={returnRequest.status}
                        />
                      </div>

                      {/* Action */}
                      <Link
                        href={`/dashboard/returns/${returnRequest.id}`}
                        className="rounded-md border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                      >
                        View Return
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          </AsyncState>
        </div>
      </div>
    </PageContainer>
  );
}