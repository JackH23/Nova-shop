"use client";

import { useState } from "react";
import EyeIcon from "./EyeIcon";

type PasswordInputProps = {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  showStrength?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function PasswordInput({
  id,
  name,
  label,
  placeholder = "••••••••",
  showStrength = false,
  value,
  onChange,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const password = value ?? "";

  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`password-input h-11 w-full border bg-white px-3 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-500"
              : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <EyeIcon />
        </button>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Password strength */}
      {showStrength && (
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-[3px] rounded-full transition-colors ${
                strength >= level
                  ? "bg-indigo-500 dark:bg-indigo-400"
                  : "bg-indigo-100 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}