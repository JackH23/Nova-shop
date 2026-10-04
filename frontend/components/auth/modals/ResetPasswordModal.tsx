"use client";

import { X } from "lucide-react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type ResetPasswordModalProps = {
  open: boolean;
  email: string;
  code: string;
  onClose: () => void;
  onOpenLogin: () => void;
};

export default function ResetPasswordModal({
  open,
  email,
  code,
  onClose,
  onOpenLogin,
}: ResetPasswordModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 dark:bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-7 shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reset password"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <LockIcon />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Reset password
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Enter your new password below.
          </p>
        </div>

        {/* Reset password form */}
        <ResetPasswordForm
          email={email}
          code={code}
          onSuccess={onOpenLogin}
        />

        {/* Back to login */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onOpenLogin}
            className="cursor-pointer text-xs font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        width="18"
        height="11"
        x="3"
        y="11"
        rx="2"
        ry="2"
      />

      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}