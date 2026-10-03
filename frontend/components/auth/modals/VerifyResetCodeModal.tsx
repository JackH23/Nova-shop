"use client";

import { X } from "lucide-react";
import VerifyResetCodeForm from "@/components/auth/VerifyResetCodeForm";

type VerifyResetCodeModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
};

export default function VerifyResetCodeModal({
  open,
  email,
  onClose,
  onBack,
  onSuccess,
}: VerifyResetCodeModalProps) {
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
          aria-label="Close verify reset code"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <CodeIcon />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Verify reset code
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Enter the verification code we sent to your email.
          </p>
        </div>

        {/* Form */}
        <VerifyResetCodeForm
          email={email}
          onSuccess={onSuccess}
        />

        {/* Back */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-xs font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

function CodeIcon() {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}