import type { ChangeEvent } from "react";

type AuthSelectProps = {
  id: string;
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

export default function AuthSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
}: AuthSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`h-11 w-full rounded-md border bg-white px-3 text-sm outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-indigo-500"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
