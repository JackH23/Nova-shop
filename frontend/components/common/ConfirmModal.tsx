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
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative z-10 w-[360px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {variant === "success" ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <Check size={26} className="text-green-500" />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={26} className="text-red-500" />
            </div>
          )}

          {title && (
            <h2 className="mt-4 text-base font-semibold text-slate-900">
              {title}
            </h2>
          )}

          <p className="mt-2 text-sm text-slate-500">{message}</p>

          <div className="mt-6 flex w-full gap-3">
            {!singleButton && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white transition ${
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
