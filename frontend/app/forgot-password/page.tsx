"use client";

import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";
import SubmitButton from "@/components/auth/SubmitButton";
import { useForgotPassword } from "@/composables/useForgotPassword";

export default function ForgotPasswordPage() {

  const {
    state,
    dispatch,
    handleSubmit,
  } = useForgotPassword();

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f8f9ff]">
      {/* Brand */}
      <div className="mt-8 flex items-center gap-2 text-indigo-600">
        <div className="h-5 w-5 rotate-45 rounded-sm bg-indigo-600" />

        <span className="text-xl font-bold">
          SaaSPlatform
        </span>
      </div>

      {/* Forgot password card */}
      <div className="mt-7 w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-7 shadow-sm">
        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <KeyIcon />
        </div>

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-900">
            Forgot password?
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <AuthInput
            id="email"
            name="email"
            label="Email address"
            type="email"
            placeholder="name@company.com"
            value={state.email}
            onChange={(event) =>
              dispatch({
                type: "SET_EMAIL",
                value: event.target.value,
              })
            }
          />

          {state.error && (
            <p className="text-xs text-red-500">
              {state.error}
            </p>
          )}

          <SubmitButton disabled={state.loading}>
            {state.loading ? "Sending..." : "Send Reset Code"}
          </SubmitButton>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 transition hover:text-indigo-600"
          >
            <span>←</span>
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
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