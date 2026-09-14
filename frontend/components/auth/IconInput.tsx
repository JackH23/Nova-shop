import type { ChangeEventHandler, ReactNode } from "react";

type IconInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: ReactNode;
  value?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function IconInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon,
  value,
  error,
  onChange,
}: IconInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}

        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`h-11 w-full rounded-md border pl-10 pr-3 text-sm outline-none transition ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          }`}
        />
      </div>
    </div>
  );
}