import Link from "next/link";

export default function TermsCheckbox() {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-500">
      <input
        type="checkbox"
        name="terms"
        className="mt-[1px] h-4 w-4 rounded border-slate-300 accent-indigo-600"
      />

      <span>
        I agree to the{" "}
        <Link
          href="/terms"
          className="text-indigo-600 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-indigo-600 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}