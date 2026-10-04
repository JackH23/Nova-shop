"use client";

import { useState } from "react";
import type {
  ChangePasswordData,
  UpdateProfileData,
} from "@/lib/settings";

type ModalType =
  | "delete"
  | "password-success"
  | "profile-success"
  | null;

type UseSettingsModalProps = {
  onChangePassword: (
    data: ChangePasswordData,
  ) => Promise<boolean>;

  onUpdateProfile: (
    data: UpdateProfileData,
  ) => Promise<boolean>;

  onUpdateProfileImage: (
    file: File,
  ) => Promise<boolean>;

  onDeleteAccount: () => Promise<unknown>;
};

export function useSettingsModal({
  onChangePassword,
  onUpdateProfile,
  onDeleteAccount,
  onUpdateProfileImage
}: UseSettingsModalProps) {
  const [modalType, setModalType] =
    useState<ModalType>(null);

  const handlePasswordChange = async (
    data: ChangePasswordData,
  ) => {
    const success = await onChangePassword(data);

    if (success) {
      setModalType("password-success");
    }

    return success;
  };

  const handleProfileUpdate = async (
    data: UpdateProfileData,
  ) => {
    const success = await onUpdateProfile(data);

    if (success) {
      setModalType("profile-success");
    }

    return success;
  };

  const handleProfileImageUpload = async (file: File) => {
    const success = await onUpdateProfileImage(file);

    if (success) {
      setModalType("profile-success");
    }

    return success;
  };

  const handleOpenDelete = () => {
    setModalType("delete");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleConfirmModal = async () => {
    if (modalType === "delete") {
      await onDeleteAccount();
    }

    setModalType(null);
  };

  return {
    modalType,

    handlePasswordChange,
    handleProfileUpdate,
    handleProfileImageUpload,
    handleOpenDelete,
    handleCloseModal,
    handleConfirmModal,
  };
}