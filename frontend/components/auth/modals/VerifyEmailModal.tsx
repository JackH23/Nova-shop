"use client";

import { X } from "lucide-react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

type VerifyEmailModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
};

export default function VerifyEmailModal({
  open,
  email,
  onClose,
  onOpenRegister,
  onOpenLogin,
}: VerifyEmailModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-7 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close verify email"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <MailIcon />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Verify your email
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            We&apos;ve sent a verification code to your email.
            Enter the code below to verify your account.
          </p>
        </div>

        {/* Verify email form */}
        <VerifyEmailForm
          email={email}
          onSuccess={onOpenLogin}
        />

        {/* Back */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onOpenRegister}
            className="text-xs font-medium text-slate-600 transition hover:text-indigo-600"
          >
            ← Back to Register
          </button>
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
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
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />

      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}