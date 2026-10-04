"use client";

import AuthInput from "@/components/auth/AuthInput";
import SubmitButton from "@/components/auth/SubmitButton";
import FormError from "@/components/auth/FormError";
import { useForgotPassword } from "@/composables/useForgotPassword";

type ForgotPasswordFormProps = {
  onSuccess?: (email: string) => void;
};

export default function ForgotPasswordForm({
  onSuccess,
}: ForgotPasswordFormProps) {
  const {
    state,
    dispatch,
    handleSubmit,
  } = useForgotPassword(onSuccess);

  return (
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

      <FormError message={state.error} />

      <SubmitButton disabled={state.loading}>
        {state.loading ? "Sending..." : "Send Reset Code"}
      </SubmitButton>
    </form>
  );
}