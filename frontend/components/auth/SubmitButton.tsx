type SubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

export default function SubmitButton({
  children,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="h-11 w-full bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}