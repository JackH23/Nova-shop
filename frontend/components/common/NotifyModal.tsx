"use client";

import ConfirmModal from "./ConfirmModal";
import type { NotifyModalState } from "@/composables/useNotifyModal";

type NotifyModalProps = {
  notification: NotifyModalState;
  onClose: () => void;
};

export default function NotifyModal({
  notification,
  onClose,
}: NotifyModalProps) {
  return (
    <ConfirmModal
      open={notification.open}
      title={notification.title}
      message={notification.message}
      variant={notification.variant}
      confirmText="Close"
      singleButton
      onConfirm={onClose}
      onCancel={onClose}
    />
  );
}