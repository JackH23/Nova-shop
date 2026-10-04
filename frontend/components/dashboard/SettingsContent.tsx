"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import SecuritySettings from "@/components/dashboard/SecuritySettings";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useSettingsModal } from "@/composables/useSettingsModal";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
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
    handleProfileImageUpload,
    handleOpenDelete,
    handleCloseModal,
    handleConfirmModal,
  } = useSettingsModal({
    onChangePassword: handleChangePassword,
    onUpdateProfile: handleUpdateProfile,
    onUpdateProfileImage: handleUpdateProfileImage,
    onDeleteAccount: handleDeleteAccount,
  });

  if (loading) {
    return (
      <PageContainer>
        <div className="py-8">
          <LoadingState message="Loading account settings..." />
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
            <PageHeader
              title="Account Settings"
              breadcrumb="Home / Dashboard / Settings"
              description="Manage your profile and account security."
            />

            {/* Error */}
            {error && (
              <div className="mt-4">
                <ErrorState message={error} />
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
                  onUpdateProfileImage={handleProfileImageUpload}
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
              : "Profile Image Updated"
        }
        message={
          modalType === "delete"
            ? "Are you sure you want to permanently delete your account? This action cannot be undone."
            : modalType === "password-success"
              ? "Your password has been changed successfully."
              : "Your profile image has been updated successfully."
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
