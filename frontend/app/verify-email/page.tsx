"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailPageFallback />}>
      <VerifyEmailPageContent />
    </Suspense>
  );
}

function VerifyEmailPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f8f9ff] px-4">
      <div className="mt-8 flex items-center gap-2 text-indigo-600">
        <div className="h-5 w-5 rotate-45 rounded-sm bg-indigo-600" />

        <span className="text-xl font-bold">
          SaaSPlatform
        </span>
      </div>

      <div className="mt-7 w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-7 shadow-sm">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <MailIcon />
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Verify your email
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            We&apos;ve sent a verification code to your email.
            Enter the code below to verify your account.
          </p>
        </div>

        <VerifyEmailForm email={email} />

        <div className="mt-5 text-center">
          <Link
            href="/register"
            className="text-xs font-medium text-slate-600 transition hover:text-indigo-600"
          >
            ← Back to Register
          </Link>
        </div>
      </div>
    </main>
  );
}

function VerifyEmailPageFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4">
      <p className="text-sm text-slate-500">Loading verification...</p>
    </main>
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
