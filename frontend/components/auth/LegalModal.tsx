"use client";

type LegalModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function LegalModal({
  open,
  title,
  children,
  onClose,
}: LegalModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 dark:bg-black/60">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}