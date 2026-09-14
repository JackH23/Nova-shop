"use client";

import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AddressCard from "@/components/dashboard/AddressCard";

const addresses = [
  {
    id: 1,
    full_name: "Jack Sihalard",
    phone: "+856 20 5555 1234",
    email: "jack@example.com",
    address_line1: "123 Main Street",
    address_line2: "",
    city: "Vientiane",
    state: "Vientiane Capital",
    postal_code: "01000",
    country: "Laos",
    is_default: true,
  },
  {
    id: 2,
    full_name: "Jack Sihalard",
    phone: "+856 20 5555 5678",
    email: "jack@example.com",
    address_line1: "25 Business Road",
    address_line2: "Office 4",
    city: "Vientiane",
    state: "Vientiane Capital",
    postal_code: "01000",
    country: "Laos",
    is_default: false,
  },
];

export default function AddressesContent() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Your Addresses
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your shipping addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
            >
              + Add New Address
            </button>
          </div>

          <div className="mt-4 border-t border-slate-200" />

          {/* Address list */}
          {addresses.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No addresses yet
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Add an address to make checkout faster.
              </p>
            </div>
          )}

          {/* Temporary modal placeholder */}
          {showAddForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-950">
                    Add New Address
                  </h2>

                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="cursor-pointer text-sm text-slate-500 hover:text-slate-900"
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  We will add the address form here next.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}