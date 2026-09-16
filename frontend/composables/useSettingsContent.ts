"use client";

import { useCallback, useEffect, useReducer } from "react";
import { settingsService } from "@/services/settingsService";
import {
  settingsReducer,
  initialSettingsState,
} from "@/reducers/settingsReducer";

import type {
  UpdateProfileData,
  ChangePasswordData,
} from "@/lib/settings";

export function useSettingsContent() {
  const [state, dispatch] = useReducer(
    settingsReducer,
    initialSettingsState,
  );

  // ================================
  // Get account settings
  // ================================

  const getSettings = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await settingsService.getSettings();

      dispatch({
        type: "SET_USER",
        value: response.user,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to fetch account settings",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, []);

  // ================================
  // Update profile
  // ================================

  const handleUpdateProfile = async (
    data: UpdateProfileData,
  ) => {
    try {
      dispatch({
        type: "SET_UPDATING_PROFILE",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response =
        await settingsService.updateProfile(data);

      dispatch({
        type: "UPDATE_PROFILE",
        value: {
          fullName: response.user.fullName,
          email: response.user.email,
        },
      });

      return true;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to update profile",
      });

      return false;
    } finally {
      dispatch({
        type: "SET_UPDATING_PROFILE",
        value: false,
      });
    }
  };

  // ================================
  // Update profile image
  // ================================

  const handleUpdateProfileImage = async (
    file: File,
  ) => {
    try {
      dispatch({
        type: "SET_UPDATING_IMAGE",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response =
        await settingsService.updateProfileImage(file);

      dispatch({
        type: "UPDATE_PROFILE_IMAGE",
        value: response.user.profileImage,
      });

      return response.user;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to update profile image",
      });

      throw error;
    } finally {
      dispatch({
        type: "SET_UPDATING_IMAGE",
        value: false,
      });
    }
  };

  // ================================
  // Change password
  // ================================

  const handleChangePassword = async (
    data: ChangePasswordData,
  ) => {
    try {
      dispatch({
        type: "SET_CHANGING_PASSWORD",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      await settingsService.changePassword(data);

      return true;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to change password",
      });

      return false;
    } finally {
      dispatch({
        type: "SET_CHANGING_PASSWORD",
        value: false,
      });
    }
  };

  // ================================
  // Delete account
  // ================================

  const handleDeleteAccount = async () => {
    try {
      dispatch({
        type: "SET_DELETING_ACCOUNT",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response =
        await settingsService.deleteAccount();

      dispatch({
        type: "RESET",
      });

      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to delete account",
      });

      throw error;
    } finally {
      dispatch({
        type: "SET_DELETING_ACCOUNT",
        value: false,
      });
    }
  };

  // ================================
  // Initial fetch
  // ================================

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  return {
    user: state.user,

    loading: state.loading,
    updatingProfile: state.updatingProfile,
    updatingImage: state.updatingImage,
    changingPassword: state.changingPassword,
    deletingAccount: state.deletingAccount,

    error: state.error,

    getSettings,
    handleUpdateProfile,
    handleUpdateProfileImage,
    handleChangePassword,
    handleDeleteAccount,
  };
}