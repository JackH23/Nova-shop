"use client";

import { X } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleButton from "@/components/auth/GoogleButton";

type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenVerifyEmail: (email: string) => void;
};

export default function RegisterModal({
  open,
  onClose,
  onOpenLogin,
  onOpenVerifyEmail,
}: RegisterModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[430px] overflow-hidden rounded-xl border border-[#dfe3f0] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close register"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Main content */}
        <div className="px-5 pb-5 pt-6 sm:px-7">
          {/* Logo */}
          <div className="mb-3 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.67 12.67 0 0 1 22 2c0 2.72-.78 7.5-6.05 11a22.35 22.35 0 0 1-3.95 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create an account
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Join SaaSPlatform to start building today.
            </p>
          </div>

          <GoogleButton />

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-[11px] font-medium uppercase text-slate-500">
              Or register with email
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <RegisterForm onSuccess={onOpenVerifyEmail} />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-indigo-50/40 px-5 py-4 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onOpenLogin}
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}