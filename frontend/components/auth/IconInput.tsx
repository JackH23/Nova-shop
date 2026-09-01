import type { ReactNode } from "react";

type IconInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: ReactNode;
};

export default function IconInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon,
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

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="h-11 w-full rounded-md border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}