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
};

export default function AuthSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
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
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-indigo-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}