import { apiRequest } from "@/lib/api";

import type {
  GetSettingsResponse,
  UpdateProfileData,
  UpdateProfileResponse,
  UpdateProfileImageResponse,
  ChangePasswordData,
  ChangePasswordResponse,
  DeleteAccountResponse,
} from "@/lib/settings";

export const settingsService = {
  // GET account settings
  getSettings: (): Promise<GetSettingsResponse> => {
    return apiRequest("/settings", {
      method: "GET",
    });
  },

  // UPDATE full name + email
  updateProfile: (
    data: UpdateProfileData,
  ): Promise<UpdateProfileResponse> => {
    return apiRequest("/settings/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // UPDATE profile image
  updateProfileImage: (
    file: File,
  ): Promise<UpdateProfileImageResponse> => {
    const formData = new FormData();

    formData.append("profileImage", file);

    return apiRequest("/settings/profile-image", {
      method: "PUT",
      body: formData,
    });
  },

  // CHANGE password
  changePassword: (
    data: ChangePasswordData,
  ): Promise<ChangePasswordResponse> => {
    return apiRequest("/settings/password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE account
  deleteAccount: (): Promise<DeleteAccountResponse> => {
    return apiRequest("/settings", {
      method: "DELETE",
    });
  },
};