type ResendCodeProps = {
  onResend: () => void;
  disabled?: boolean;
};

export default function ResendCode({
  onResend,
  disabled = false,
}: ResendCodeProps) {
  return (
    <div className="mt-5 text-center text-xs text-slate-500">
      Didn&apos;t receive the code?{" "}

      <button
        type="button"
        onClick={onResend}
        disabled={disabled}
        className="font-medium text-indigo-600 hover:underline disabled:opacity-60"
      >
        Resend Code
      </button>
    </div>
  );
}