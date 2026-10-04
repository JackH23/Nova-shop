"use client";

import Link from "next/link";

import { ArrowLeft, ImageIcon, RotateCcw } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import { useReturnDetail } from "@/composables/useReturnDetail";

import ReturnStatusBadge from "./ReturnStatusBadge";

const PRODUCT_IMAGE_URL =
  process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL || "";

function resolveAdminImageUrl(imageUrl: string) {
  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  const baseUrl = PRODUCT_IMAGE_URL.replace(/\/$/, "");
  const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

  return `${baseUrl}${path}`;
}

type ReturnDetailProps = {
  returnId: number;
};

export default function ReturnDetail({ returnId }: ReturnDetailProps) {
  const { returnRequest, loading, error } = useReturnDetail(returnId);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
        <div className="min-w-0 space-y-6">
          {/* Back */}
          <Link
            href="/dashboard/returns"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Returns
          </Link>

          {/* Loading */}
          {loading && (
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">Loading return...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Not Found */}
          {!loading && !error && !returnRequest && (
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">Return not found.</p>
            </div>
          )}

          {/* Return Detail */}
          {!loading && !error && returnRequest && (
            <>
              {/* Header */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <RotateCcw size={22} className="text-indigo-600" />

                      <h1 className="text-2xl font-bold text-slate-900">
                        Return Details
                      </h1>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      Return #{returnRequest.id}
                    </p>
                  </div>

                  <ReturnStatusBadge status={returnRequest.status} />
                </div>
              </div>

              {/* Return Information */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Return Information
                </h2>

                <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
                  <InfoRow label="Return ID" value={`#${returnRequest.id}`} />

                  <InfoRow
                    label="Order ID"
                    value={`#${returnRequest.order_id}`}
                  />

                  <InfoRow
                    label="Refund Amount"
                    value={`$${Number(returnRequest.refund_amount).toFixed(2)}`}
                  />

                  <InfoRow label="Return Reason" value={returnRequest.reason} />

                  <InfoRow
                    label="Customer Note"
                    value={returnRequest.note || "-"}
                  />

                  <InfoRow
                    label="Requested Date"
                    value={new Date(
                      returnRequest.created_at,
                    ).toLocaleDateString()}
                  />
                </div>
              </div>

              {/* Returned Items */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Returned Items
                  </h2>

                  <span className="text-sm text-slate-500">
                    {returnRequest.items.length} item
                    {returnRequest.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
                  {returnRequest.items.map((item) => {
                    const product = item.order_item.product;

                    const productImage =
                      product?.image ?? product?.images?.[0]?.image_url ?? null;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center"
                      >
                        {/* Product */}
                        <div className="flex min-w-0 items-center gap-4">
                          {/* Image */}
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                            {productImage ? (
                              <img
                                src={productImage}
                                alt={item.order_item.product_name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon size={24} className="text-slate-400" />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-slate-900">
                              {item.order_item.product_name}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              Product ID: #{item.order_item.product_id}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Unit Price: $
                              {Number(item.order_item.unit_price).toFixed(2)}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Return Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Refund */}
                        <div className="shrink-0 sm:text-right">
                          <p className="text-xs text-slate-500">
                            Refund Amount
                          </p>

                          <p className="mt-1 text-lg font-semibold text-slate-900">
                            ${Number(item.refund_amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rejection Details */}
              {returnRequest.status === "REJECTED" && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                  <h2 className="text-lg font-semibold text-red-700">
                    Return Rejected
                  </h2>

                  <p className="mt-1 text-sm text-red-500">
                    Your return request was rejected.
                  </p>

                  {/* Reason */}
                  <div className="mt-5 border-t border-red-200 pt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                      Rejection Reason
                    </p>

                    <p className="mt-2 text-sm text-red-700">
                      {returnRequest.rejection_reason ||
                        "No rejection reason provided."}
                    </p>
                  </div>

                  {/* Admin Evidence */}
                  {returnRequest.admin_images &&
                    returnRequest.admin_images.length > 0 && (
                      <div className="mt-5 border-t border-red-200 pt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                          Admin Evidence
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                          {returnRequest.admin_images.map((image) => {
                            const imageUrl = resolveAdminImageUrl(
                              image.image_url,
                            );

                            return (
                            <a
                              key={image.id}
                              href={imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="overflow-hidden rounded-lg border border-red-200 bg-white"
                            >
                              <img
                                src={imageUrl}
                                alt="Admin evidence"
                                className="aspect-square h-full w-full object-cover transition hover:scale-105"
                              />
                            </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="max-w-[70%] text-right text-sm font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}
