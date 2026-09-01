"use client";

import { useState } from "react";
import LegalModal from "./LegalModal";
import TermsContent from "@/components/legal/TermsContent";
import PrivacyContent from "@/components/legal/PrivacyContent";

type TermsCheckboxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TermsCheckbox({
  checked,
  onChange,
}: TermsCheckboxProps) {
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  return (
    <>
      <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-500">
        <input
          type="checkbox"
          name="terms"
          checked={checked}
          onChange={onChange}
          className="mt-[1px] h-4 w-4 rounded border-slate-300 accent-indigo-600"
        />

        <span>
          I agree to the{" "}
          <button
            type="button"
            onClick={() => setLegalModal("terms")}
            className="text-indigo-600 hover:underline"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => setLegalModal("privacy")}
            className="text-indigo-600 hover:underline"
          >
            Privacy Policy
          </button>
          .
        </span>
      </label>

      <LegalModal
        open={legalModal === "terms"}
        title="Terms of Service"
        onClose={() => setLegalModal(null)}
      >
        <TermsContent />
      </LegalModal>

      <LegalModal
        open={legalModal === "privacy"}
        title="Privacy Policy"
        onClose={() => setLegalModal(null)}
      >
        <PrivacyContent />
      </LegalModal>
    </>
  );
}
