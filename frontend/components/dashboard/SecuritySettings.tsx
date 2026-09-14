"use client";

import { LockKeyhole, Trash2 } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      {/* Password */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-950">
          Security
        </h2>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100">
              <LockKeyhole
                size={16}
                className="text-slate-600"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-900">
                Password
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Change your account password.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h2 className="text-base font-semibold text-red-600">
          Danger Zone
        </h2>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trash2
              size={18}
              className="text-red-500"
            />

            <div>
              <p className="text-sm font-medium text-slate-900">
                Delete Account
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Permanently delete your account and associated data.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="cursor-pointer rounded-md border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}