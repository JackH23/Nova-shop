"use client";

import Link from "next/link";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useLogin } from "@/composables/useLogin";

export default function LoginForm() {

  const {
    state,
    dispatch,
    handleSubmit,
  } = useLogin();

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      {/* Error message - static for layout testing */}
      {state.error && (
        <div className="flex items-center gap-3 rounded-md border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-700">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            !
          </div>

          <span>{state.error}</span>
        </div>
      )}

      {/* Email */}
      <AuthInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        value={state.email}
        onChange={(event) =>
          dispatch({
            type: "SET_FIELD",
            field: "email",
            value: event.target.value,
          })
        }
      />

      {/* Password */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-slate-800"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-xs text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <PasswordInput
          id="password"
          name="password"
          value={state.password}
          onChange={(event) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              value: event.target.value,
            })
          }
        />
      </div>

      {/* Remember me */}
      <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
        <input
          type="checkbox"
          name="remember"
          className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
        />

        <span>Remember me for 30 days</span>
      </label>

      {/* Submit */}
      <SubmitButton>
        {state.loading ? "Signing In..." : "Sign In"}
      </SubmitButton>
    </form>
  );
}
