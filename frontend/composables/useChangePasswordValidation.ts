import { useState } from "react";
import type { ChangePasswordData } from "@/lib/settings";

export type ChangePasswordErrors = Partial<
  Record<keyof ChangePasswordData, string>
>;

export function useChangePasswordValidation() {
  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  const validatePassword = (data: ChangePasswordData) => {
    const newErrors: ChangePasswordErrors = {};

    if (!data.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!data.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (data.newPassword.length < 8) {
      newErrors.newPassword =
        "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain an uppercase letter";
    } else if (!/[a-z]/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain a lowercase letter";
    } else if (!/\d/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain a number";
    } else if (!/[!@#$%^&*]/.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain a special character";
    }

    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (data.confirmPassword !== data.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof ChangePasswordData) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validatePassword,
    clearError,
    clearErrors,
  };
}