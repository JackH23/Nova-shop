"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";
import { useResetPassword } from "@/composables/useResetPassword";

export default function ResetPasswordPage() {

  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const {
    state,
    dispatch,
    handleSubmit,
  } = useResetPassword(email, code);

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
          <LockIcon />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Reset password
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Enter your new password below.
          </p>
        </div>

        {/* Reset password form */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* New password */}
          <PasswordInput
            id="password"
            name="password"
            label="New password"
            showStrength
            value={state.password}
            onChange={(event) =>
              dispatch({
                type: "SET_PASSWORD",
                value: event.target.value,
              })
            }
          />

          {/* Confirm password */}
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm new password"
            value={state.confirmPassword}
            onChange={(event) =>
              dispatch({
                type: "SET_CONFIRM_PASSWORD",
                value: event.target.value,
              })
            }
          />

          {state.error && (
            <p className="text-xs text-red-500">
              {state.error}
            </p>
          )}

          {/* Submit */}
          <SubmitButton disabled={state.loading}>
            {state.loading ? "Resetting..." : "Reset Password"}
          </SubmitButton>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-xs font-medium text-slate-600 transition hover:text-indigo-600"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </main>
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