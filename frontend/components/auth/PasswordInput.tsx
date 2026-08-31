"use client";

import { useState } from "react";
import EyeIcon from "./EyeIcon";

type PasswordInputProps = {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
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
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-semibold text-slate-800"
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
          className="password-input h-11 w-full border border-slate-300 bg-white px-3 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <EyeIcon />
        </button>
      </div>

      {/* Password strength */}
      {showStrength && (
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          <div className="h-[3px] rounded-full bg-indigo-100" />
          <div className="h-[3px] rounded-full bg-indigo-100" />
          <div className="h-[3px] rounded-full bg-indigo-100" />
          <div className="h-[3px] rounded-full bg-indigo-100" />
        </div>
      )}
    </div>
  );
}