"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AddressCard from "@/components/dashboard/address/AddressCard";
import { useAddressContent } from "@/composables/useAddressContent";
import { useAddressForm } from "@/composables/useAddressForm";
import AddressForm from "@/components/dashboard/address/AddressForm";
import Pagination from "@/components/common/Pagination";

export default function AddressesContent() {
  const {
    addresses,
    total,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    handleCreateAddress,
    handleUpdateAddress,
    handleRemoveAddress,
    handleSetDefaultAddress,
  } = useAddressContent();

  const {
    form,
    showAddForm,
    handleChange,
    handleSubmit,
    handleOpenForm,
    handleCloseForm,
  } = useAddressForm({
    onCreate: handleCreateAddress,
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
                Your Addresses
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your shipping addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenForm}
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
                  onSetDefault={handleSetDefaultAddress}
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

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {showAddForm && (
            <AddressForm
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
