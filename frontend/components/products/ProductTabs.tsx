"use client";

import { useState } from "react";

type TabType = "specifications" | "reviews" | "shipping";

const specifications = [
  {
    label: "Battery Life",
    value: "Up to 40 hours",
  },
  {
    label: "Noise Cancellation",
    value: "Adaptive ANC",
  },
  {
    label: "Connectivity",
    value: "Bluetooth 5.3",
  },
  {
    label: "Microphone",
    value: "Dual beamforming",
  },
  {
    label: "Weight",
    value: "250g",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] =
    useState<TabType>("specifications");

  return (
    <div className="mt-14">
      {/* Tab buttons */}
      <div className="flex gap-8 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("specifications")}
          className={`pb-3 text-sm transition ${
            activeTab === "specifications"
              ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Specifications
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 text-sm transition ${
            activeTab === "reviews"
              ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Reviews
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`pb-3 text-sm transition ${
            activeTab === "shipping"
              ? "border-b-2 border-indigo-600 font-medium text-indigo-600"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Shipping
        </button>
      </div>

      {/* Specifications */}
      {activeTab === "specifications" && (
        <div className="grid gap-x-12 gap-y-6 py-7 sm:grid-cols-2">
          {specifications.map((specification) => (
            <div
              key={specification.label}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-slate-500">
                {specification.label}
              </span>

              <span className="font-medium text-slate-900">
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="py-7">
          <p className="text-sm text-slate-600">
            Product reviews will appear here.
          </p>
        </div>
      )}

      {/* Shipping */}
      {activeTab === "shipping" && (
        <div className="py-7">
          <p className="text-sm text-slate-600">
            Free standard shipping on orders over $100.
          </p>
        </div>
      )}
    </div>
  );
}