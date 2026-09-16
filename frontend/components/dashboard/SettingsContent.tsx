"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import SecuritySettings from "@/components/dashboard/SecuritySettings";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useSettingsModal } from "@/composables/useSettingsModal";

import { useSettingsContent } from "@/composables/useSettingsContent";

export default function SettingsContent() {
  const {
    user,
    loading,
    updatingProfile,
    updatingImage,
    changingPassword,
    deletingAccount,
    error,
    handleUpdateProfile,
    handleUpdateProfileImage,
    handleChangePassword,
    handleDeleteAccount,
  } = useSettingsContent();

  const {
    modalType,
    handlePasswordChange,
    handleProfileUpdate,
    handleOpenDelete,
    handleCloseModal,
    handleConfirmModal,
  } = useSettingsModal({
    onChangePassword: handleChangePassword,
    onUpdateProfile: handleUpdateProfile,
    onDeleteAccount: handleDeleteAccount,
  });

  if (loading) {
    return (
      <PageContainer>
        <div className="py-8 text-sm text-slate-500">
          Loading account settings...
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
          <DashboardSidebar />

          <div className="min-w-0">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Account Settings
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your profile and account security.
              </p>
            </div>

            <div className="mt-4 border-t border-slate-200" />

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Settings */}
            <div className="mt-6 space-y-6">
              {user && (
                <ProfileSettings
                  user={user}
                  updatingProfile={updatingProfile}
                  updatingImage={updatingImage}
                  onUpdateProfile={handleProfileUpdate}
                  onUpdateProfileImage={handleUpdateProfileImage}
                />
              )}

              <SecuritySettings
                changingPassword={changingPassword}
                deletingAccount={deletingAccount}
                error={error}
                onChangePassword={handlePasswordChange}
                onDeleteAccount={handleOpenDelete}
              />
            </div>
          </div>
        </div>
      </PageContainer>

      <ConfirmModal
        open={modalType !== null}
        title={
          modalType === "delete"
            ? "Delete Account"
            : modalType === "password-success"
              ? "Password Changed"
              : "Profile Updated"
        }
        message={
          modalType === "delete"
            ? "Are you sure you want to permanently delete your account? This action cannot be undone."
            : modalType === "password-success"
              ? "Your password has been changed successfully."
              : "Your profile information has been updated successfully."
        }
        confirmText={
          modalType === "delete"
            ? deletingAccount
              ? "Deleting..."
              : "Delete Account"
            : "Close"
        }
        cancelText="Cancel"
        singleButton={modalType !== "delete"}
        variant={modalType === "delete" ? "danger" : "success"}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </>
  );
}
