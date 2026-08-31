"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/composables/useVerifyEmail";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const {
    state,
    dispatch,
    handleSubmit,
    handleResendCode,
  } = useVerifyEmail(email);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f8f9ff] px-4">
      {/* Brand */}
      <div className="mt-8 flex items-center gap-2 text-indigo-600">
        <div className="h-5 w-5 rotate-45 rounded-sm bg-indigo-600" />

        <span className="text-xl font-bold">
          SaaSPlatform
        </span>
      </div>

      {/* Card */}
      <div className="mt-7 w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-7 shadow-sm">
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

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="code"
              className="mb-1 block text-xs font-semibold text-slate-800"
            >
              Verification code
            </label>

            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter verification code"
              value={state.code}
              onChange={(event) =>
                dispatch({
                  type: "SET_CODE",
                  value: event.target.value,
                })
              }
              className="h-11 w-full border border-slate-300 bg-white px-3 text-center text-lg font-semibold tracking-[0.4em] text-slate-900 outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {state.error && (
              <p className="mt-1 text-xs text-red-500">
                {state.error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className="h-11 w-full bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state.loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className="font-medium text-indigo-600 hover:underline"
            >
              Resend Code
            </button>
          </p>
        </div>

        {/* Back */}
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