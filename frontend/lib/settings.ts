// ================================
// User
// ================================

export type SettingsUser = {
  id: number;
  fullName: string;
  email: string;
  profileImage: string | null;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
};

// ================================
// GET /api/settings
// ================================

export type GetSettingsResponse = {
  message: string;
  user: SettingsUser;
};

// ================================
// PUT /api/settings/profile
// ================================

export type UpdateProfileData = {
  fullName: string;
  email: string;
};

export type UpdateProfileResponse = {
  message: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    profileImage: string | null;
  };
};

// ================================
// PUT /api/settings/profile-image
// ================================

export type UpdateProfileImageResponse = {
  message: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    profileImage: string | null;
  };
};

// ================================
// PUT /api/settings/password
// ================================

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordResponse = {
  message: string;
};

// ================================
// DELETE /api/settings
// ================================

export type DeleteAccountResponse = {
  message: string;
};