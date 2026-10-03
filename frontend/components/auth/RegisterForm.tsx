"use client";

import PasswordInput from "./PasswordInput";
import AuthInput from "./AuthInput";
import TermsCheckbox from "./TermsCheckbox";
import SubmitButton from "./SubmitButton";
import { useRegister } from "@/composables/useRegister";

type RegisterFormProps = {
  onSuccess?: (email: string) => void;
};

export default function RegisterForm({
  onSuccess,
}: RegisterFormProps) {
  const {
    state,
    dispatch,
    handleSubmit,
  } = useRegister(onSuccess);

  const {
    fullName,
    email,
    password,
    confirmPassword,
    acceptTerms,
    loading,
    error,
  } = state;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Full name */}
      <AuthInput
        id="fullName"
        name="fullName"
        label="Full name"
        type="text"
        placeholder="Jane Doe"
        value={fullName}
        onChange={(event) =>
          dispatch({
            type: "SET_FIELD",
            field: "fullName",
            value: event.target.value,
          })
        }
      />

      {/* Email */}
      <AuthInput
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="jane@example.com"
        value={email}
        onChange={(event) =>
          dispatch({
            type: "SET_FIELD",
            field: "email",
            value: event.target.value,
          })
        }
      />

      {/* Password */}
      <PasswordInput
        id="password"
        name="password"
        label="Password"
        showStrength
        value={password}
        onChange={(event) =>
          dispatch({
            type: "SET_FIELD",
            field: "password",
            value: event.target.value,
          })
        }
      />

      {/* Confirm password */}
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        value={confirmPassword}
        onChange={(event) =>
          dispatch({
            type: "SET_FIELD",
            field: "confirmPassword",
            value: event.target.value,
          })
        }
      />

      {/* Terms */}
      <TermsCheckbox
        checked={acceptTerms}
        onChange={(event) =>
          dispatch({
            type: "SET_ACCEPT_TERMS",
            value: event.target.checked,
          })
        }
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <SubmitButton>
        {loading ? "Creating account..." : "Create Account"}
      </SubmitButton>
    </form>
  );
}