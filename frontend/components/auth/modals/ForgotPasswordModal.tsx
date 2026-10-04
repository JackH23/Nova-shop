"use client";

import { X } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

type ForgotPasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onSuccess: (email: string) => void;
};

export default function ForgotPasswordModal({
  open,
  onClose,
  onOpenLogin,
  onSuccess,
}: ForgotPasswordModalProps) {
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
          aria-label="Close forgot password"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <KeyIcon />
        </div>

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Forgot password?
          </h1>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm onSuccess={onSuccess} />

        {/* Back to login */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onOpenLogin}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <span>←</span>
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function KeyIcon() {
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
      <circle cx="7.5" cy="15.5" r="3.5" />
      <path d="m10 13 8-8" />
      <path d="m15 8 2 2" />
      <path d="m17 6 2 2" />
    </svg>
  );
}