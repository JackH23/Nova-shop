"use client";

import Link from "next/link";
import { X } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import GoogleButton from "@/components/auth/GoogleButton";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenForgotPassword: () => void;
  onLoginSuccess: () => void;
};

export default function LoginModal({
  open,
  onClose,
  onOpenRegister,
  onOpenForgotPassword,
  onLoginSuccess,
}: LoginModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Sign In
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back to SaaSPlatform
          </p>
        </div>

        {/* Login form */}
        <LoginForm
          onSuccess={onLoginSuccess}
          onForgotPassword={onOpenForgotPassword}
        />

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="whitespace-nowrap text-xs text-slate-500">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google */}
        <GoogleButton
          text="Google"
          onSuccess={onLoginSuccess}
        />

        {/* Register */}
        <div className="mt-7 text-center">
          <p className="text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onOpenRegister}
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
