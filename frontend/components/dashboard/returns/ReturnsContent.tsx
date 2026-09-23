"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { useReturns } from "@/composables/useReturns";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

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
          <div>
            <div className="flex items-center gap-2">
              <RotateCcw
                size={22}
                className="text-indigo-600"
              />

              <h1 className="text-2xl font-bold text-slate-900">
                My Returns
              </h1>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              View and track your return requests.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">
                Loading returns...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            returns.length === 0 && (
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-10 text-center">
                <RotateCcw
                  size={32}
                  className="mx-auto mb-3 text-slate-400"
                />

                <h2 className="font-semibold text-slate-900">
                  No returns yet
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your return requests will appear here.
                </p>
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
                          <p className="text-sm text-slate-500">
                            Return
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            #
                            {
                              returnRequest.id
                            }
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            {new Date(
                              returnRequest.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Order */}
                        <div>
                          <p className="text-sm text-slate-500">
                            Order
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            #
                            {
                              returnRequest.order_id
                            }
                          </p>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-sm text-slate-500">
                            Items
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            {
                              returnRequest
                                .items
                                .length
                            }
                          </p>
                        </div>

                        {/* Refund */}
                        <div>
                          <p className="text-sm text-slate-500">
                            Refund
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
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