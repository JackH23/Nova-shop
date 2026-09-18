type AuthInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function AuthInput({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  maxLength,
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold text-slate-800"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        className={`h-11 w-full border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
