"use client";

import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";
import FormError from "@/components/auth/FormError";
import { useResetPassword } from "@/composables/useResetPassword";

type ResetPasswordFormProps = {
  email: string;
  code: string;
  onSuccess?: () => void;
};

export default function ResetPasswordForm({
  email,
  code,
  onSuccess,
}: ResetPasswordFormProps) {
  const {
    state,
    dispatch,
    handleSubmit,
  } = useResetPassword(email, code, onSuccess);

  return (
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

      <FormError message={state.error} />

      {/* Submit */}
      <SubmitButton disabled={state.loading}>
        {state.loading ? "Resetting..." : "Reset Password"}
      </SubmitButton>
    </form>
  );
}