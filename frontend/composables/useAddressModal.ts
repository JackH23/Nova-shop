"use client";

import { useState } from "react";

type ModalType = "remove" | "create-success" | "update-success" | null;

type UseAddressModalProps<TCreateArgs extends unknown[], TUpdateArgs extends unknown[]> = {
  onCreate: (...args: TCreateArgs) => Promise<unknown>;
  onUpdate: (...args: TUpdateArgs) => Promise<unknown>;

  onOpenRemove: (id: number) => void;
  onCloseRemove: () => void;
  onConfirmRemove: () => Promise<void>;
};

export function useAddressModal<
  TCreateArgs extends unknown[],
  TUpdateArgs extends unknown[],
>({
  onCreate,
  onUpdate,
  onOpenRemove,
  onCloseRemove,
  onConfirmRemove,
}: UseAddressModalProps<TCreateArgs, TUpdateArgs>) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleCreate = async (...args: TCreateArgs) => {
    const result = await onCreate(...args);

    setModalType("create-success");

    return result;
  };

  const handleUpdate = async (...args: TUpdateArgs) => {
    const result = await onUpdate(...args);

    setModalType("update-success");

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
    handleCreate,
    handleUpdate,
    handleOpenRemove,
    handleCloseModal,
    handleConfirmModal,
  };
}