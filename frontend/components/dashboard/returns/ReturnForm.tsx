"use client";

type ReturnFormProps = {
  reason: string;
  note: string;
  submitting: boolean;

  onReasonChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ReturnForm({
  reason,
  note,
  submitting,
  onReasonChange,
  onNoteChange,
  onSubmit,
}: ReturnFormProps) {
  return (
    <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Return Details
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Tell us why you are returning the selected items.
      </p>

      {/* Reason */}
      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Reason for return
        </label>

        <select
          value={reason}
          onChange={(event) =>
            onReasonChange(event.target.value)
          }
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
        >
          <option value="">
            Select a reason
          </option>

          <option value="Wrong size">
            Wrong size
          </option>

          <option value="Damaged item">
            Damaged item
          </option>

          <option value="Wrong item received">
            Wrong item received
          </option>

          <option value="Product not as described">
            Product not as described
          </option>

          <option value="Changed my mind">
            Changed my mind
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>

      {/* Note */}
      <div className="mt-5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Additional note
        </label>

        <textarea
          rows={4}
          value={note}
          onChange={(event) =>
            onNoteChange(event.target.value)
          }
          placeholder="Tell us more about your return..."
          className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!reason || submitting}
          className="cursor-pointer rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
        >
          {submitting
            ? "Submitting..."
            : "Submit Return Request"}
        </button>
      </div>
    </div>
  );
}