"use client";

import { AlertTriangle, Check } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  variant?: "danger" | "success";
  message: string;
  confirmText?: string;
  cancelText?: string;
  singleButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  singleButton = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-[360px] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col items-center text-center">
          {variant === "success" ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/15">
              <Check
                size={26}
                className="text-green-500 dark:text-green-400"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/15">
              <AlertTriangle
                size={26}
                className="text-red-500 dark:text-red-400"
              />
            </div>
          )}

          {title && (
            <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {message}
          </p>

          <div className="mt-6 flex w-full gap-3">
            {!singleButton && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition ${
                variant === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}