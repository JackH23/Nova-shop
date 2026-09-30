import Link from "next/link";
import { Suspense } from "react";
import VerifyResetCodeForm from "@/components/auth/VerifyResetCodeForm";

export default function VerifyResetCodePage() {
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
          <CodeIcon />
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Verify reset code
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Enter the verification code we sent to your email.
          </p>
        </div>

        <Suspense fallback={<VerifyResetCodeFallback />}>
          <VerifyResetCodeForm />
        </Suspense>

        <div className="mt-5 text-center">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-slate-600 hover:text-indigo-600"
          >
            ← Back
          </Link>
        </div>
      </div>
    </main>
  );
}

function VerifyResetCodeFallback() {
  return (
    <p className="py-4 text-center text-sm text-slate-500">
      Loading verification form...
    </p>
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
      <path d="m8 9-3 3 3 3" />
      <path d="m16 9 3 3-3 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}
