"use client";

import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/composables/useVerifyEmail";
import ResendCode from "@/components/auth/ResendCode";
import SubmitButton from "@/components/auth/SubmitButton";
import FormError from "@/components/auth/FormError";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    state,
    dispatch,
    handleSubmit,
    handleResendCode,
  } = useVerifyEmail(email);

  return (
    <>
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

          <FormError message={state.error} />
        </div>

        <SubmitButton disabled={state.loading}>
          {state.loading ? "Verifying..." : "Verify Email"}
        </SubmitButton>
      </form>

      {/* Resend */}
      <ResendCode
        onResend={handleResendCode}
        disabled={state.loading}
      />
    </>
  );
}