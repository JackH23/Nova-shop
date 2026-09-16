"use client";

import type { ChangeEvent, FormEvent } from "react";
import type { ChangePasswordData } from "@/lib/settings";
import PasswordInput from "@/components/auth/PasswordInput";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">Change Password</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-sm text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-xs font-semibold text-slate-800"
            >
              Current Password
            </label>

            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              value={form.currentPassword}
              onChange={onChange}
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-xs font-semibold text-slate-800"
            >
              New Password
            </label>

            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-semibold text-slate-800"
            >
              Confirm Password
            </label>

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-md bg-[#3324d8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
