"use client";

import { useState } from "react";

type ModalType = "remove" | "success" | null;

type UsePaymentModalProps<TCreateArgs extends unknown[], TUpdateArgs extends unknown[]> = {
  onCreate: (...args: TCreateArgs) => Promise<unknown>;
  onUpdate: (...args: TUpdateArgs) => Promise<unknown>;
  onOpenRemove: (id: number) => void;
  onCloseRemove: () => void;
  onConfirmRemove: () => Promise<void>;
};

export function usePaymentModal<
  TCreateArgs extends unknown[],
  TUpdateArgs extends unknown[],
>({
  onCreate,
  onUpdate,
  onOpenRemove,
  onCloseRemove,
  onConfirmRemove,
}: UsePaymentModalProps<TCreateArgs, TUpdateArgs>) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = async (...args: TCreateArgs) => {
    const result = await onCreate(...args);

    setSuccessMessage("Payment method added successfully.");
    setModalType("success");

    return result;
  };

  const handleUpdate = async (...args: TUpdateArgs) => {
    const result = await onUpdate(...args);

    setSuccessMessage("Payment method updated successfully.");
    setModalType("success");

    return result;
  };

  const handleOpenRemove = (id: number) => {
    onOpenRemove(id);
    setModalType("remove");
  };

  const handleCloseModal = () => {
    if (modalType === "remove") {
      onCloseRemove();
    }

    setModalType(null);
  };

  const handleConfirmModal = async () => {
    if (modalType === "remove") {
      await onConfirmRemove();
    }

    setModalType(null);
  };

  return {
    modalType,
    successMessage,

    handleCreate,
    handleUpdate,
    handleOpenRemove,
    handleCloseModal,
    handleConfirmModal,
  };
}