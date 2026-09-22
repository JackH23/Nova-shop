"use client";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { useLogin } from "@/composables/useLogin";
import FormError from "@/components/auth/FormError";

type LoginFormProps = {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
};

export default function LoginForm({
  onSuccess,
  onForgotPassword,
}: LoginFormProps) {

  const {
    state,
    dispatch,
    handleSubmit,
  } = useLogin(onSuccess);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >

      {/* Error message */}
      <FormError message={state.error} />

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

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-indigo-600 hover:underline"
          >
            Forgot password?
          </button>
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
          checked={state.rememberMe}
          onChange={(event) =>
            dispatch({
              type: "SET_REMEMBER_ME",
              value: event.target.checked,
            })
          }
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
