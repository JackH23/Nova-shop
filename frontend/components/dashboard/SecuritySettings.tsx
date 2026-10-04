"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { LockKeyhole, Trash2 } from "lucide-react";
import type { ChangePasswordData } from "@/lib/settings";
import ChangePasswordForm from "@/components/dashboard/settings/ChangePasswordForm";

type SecuritySettingsProps = {
  changingPassword: boolean;
  deletingAccount: boolean;
  error: string;

  onChangePassword: (
    data: ChangePasswordData,
  ) => Promise<boolean>;

  onDeleteAccount: () => void;
};

export default function SecuritySettings({
  changingPassword,
  deletingAccount,
  error,
  onChangePassword,
  onDeleteAccount,
}: SecuritySettingsProps) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await onChangePassword(passwordData);

    if (!success) {
      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Password */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-slate-950 dark:text-white">
          Security
        </h2>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
              <LockKeyhole
                size={16}
                className="text-slate-600 dark:text-slate-300"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Password
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Change your account password.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordForm(true)}
            className="cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-lg border border-red-200 bg-white p-6 transition-colors dark:border-red-900/60 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
          Danger Zone
        </h2>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trash2
              size={18}
              className="text-red-500 dark:text-red-400"
            />

            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Delete Account
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Permanently delete your account and associated data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onDeleteAccount}
            disabled={deletingAccount}
            className="cursor-pointer rounded-md border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            {deletingAccount ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>

      {showPasswordForm && (
        <ChangePasswordForm
          form={passwordData}
          loading={changingPassword}
          error={error}
          onChange={handlePasswordChange}
          onSubmit={handlePasswordSubmit}
          onClose={() => setShowPasswordForm(false)}
        />
      )}
    </div>
  );
}