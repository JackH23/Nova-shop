"use client";

import type { ChangeEvent, FormEvent } from "react";
import type { ChangePasswordData } from "@/lib/settings";
import PasswordInput from "@/components/auth/PasswordInput";
import { useChangePasswordValidation } from "@/composables/useChangePasswordValidation";

type ChangePasswordFormProps = {
  form: ChangePasswordData;
  error: string;
  loading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function ChangePasswordForm({
  form,
  loading,
  error,
  onChange,
  onSubmit,
  onClose,
}: ChangePasswordFormProps) {
  const { errors, validatePassword, clearError } =
    useChangePasswordValidation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validatePassword(form);

    if (!isValid) return;

    onSubmit(event);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 dark:bg-black/60">
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Change Password
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close change password"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4"
        >
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              Current Password
            </label>

            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              value={form.currentPassword}
              error={errors.currentPassword}
              onChange={(e) => {
                onChange(e);
                clearError("currentPassword");
              }}
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              New Password
            </label>

            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              error={errors.newPassword}
              onChange={(e) => {
                onChange(e);
                clearError("newPassword");
              }}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              Confirm Password
            </label>

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={(e) => {
                onChange(e);
                clearError("confirmPassword");
              }}
            />
          </div>

          {/* API Error */}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}