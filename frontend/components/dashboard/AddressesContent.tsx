"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AddressCard from "@/components/dashboard/address/AddressCard";
import { useAddressContent } from "@/composables/useAddressContent";
import { useAddressForm } from "@/composables/useAddressForm";
import AddressForm from "@/components/dashboard/address/AddressForm";
import Pagination from "@/components/common/Pagination";
import { useRemoveConfirm } from "@/composables/useRemoveConfirm";
import { useAddressModal } from "@/composables/useAddressModal";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function AddressesContent() {
  const {
    addresses,
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
    handleOpenRemoveConfirm,
    handleCloseRemoveConfirm,
    handleConfirmRemove,
  } = useRemoveConfirm({
    onRemove: handleRemoveAddress,
  });

  const {
    modalType,
    handleCreate,
    handleUpdate,
    handleOpenRemove,
    handleCloseModal,
    handleConfirmModal,
  } = useAddressModal({
    onCreate: handleCreateAddress,
    onUpdate: handleUpdateAddress,
    onOpenRemove: handleOpenRemoveConfirm,
    onCloseRemove: handleCloseRemoveConfirm,
    onConfirmRemove: handleConfirmRemove,
  });

  const {
    form,
    errors,
    showAddForm,
    editingAddress,
    handleChange,
    handleSubmit,
    handleOpenForm,
    handleEditAddress,
    handleCloseForm,
  } = useAddressForm({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
  });

  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
          <DashboardSidebar />

          <div className="min-w-0">
            {/* Header */}
            <PageHeader
              title="Your Addresses"
              breadcrumb="Home / Dashboard / Addresses"
              description="Manage your shipping addresses."
            >
              <button
                type="button"
                onClick={handleOpenForm}
                className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
              >
                + Add New Address
              </button>
            </PageHeader>

            {/* Loading */}
            {loading && !showAddForm && (
              <div className="mt-8">
                <LoadingState message="Loading addresses..." />
              </div>
            )}

            {/* Error */}
            {!loading && error && !showAddForm && (
              <div className="mt-8">
                <ErrorState message={error} />
              </div>
            )}

            {/* Empty */}
            {!loading && !error && addresses.length === 0 && (
              <div className="mt-8">
                <EmptyState
                  title="No addresses yet"
                  description="Add an address to make checkout faster."
                />
              </div>
            )}

            {/* Address list */}
            {!loading && !error && addresses.length > 0 && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={handleEditAddress}
                    onRemove={handleOpenRemove}
                    onSetDefault={handleSetDefaultAddress}
                  />
                ))}
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
                errors={errors}
                loading={loading}
                error={error}
                isEditing={Boolean(editingAddress)}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClose={handleCloseForm}
              />
            )}
          </div>
        </div>
      </PageContainer>

      <ConfirmModal
        open={modalType !== null}
        title={
          modalType === "remove"
            ? "Remove Address"
            : modalType === "create-success"
              ? "Address Added"
              : "Address Updated"
        }
        message={
          modalType === "remove"
            ? "Are you sure you want to remove this address?"
            : modalType === "create-success"
              ? "Your address has been added successfully."
              : "Your address has been updated successfully."
        }
        cancelText="Cancel"
        confirmText={modalType === "remove" ? "Remove" : "Close"}
        singleButton={modalType !== "remove"}
        variant={modalType === "remove" ? "danger" : "success"}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </>
  );
}
