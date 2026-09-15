"use client";

import { useState } from "react";

type UseRemoveConfirmProps = {
  onRemove: (id: number) => Promise<unknown>;
};

export function useRemoveConfirm({
  onRemove,
}: UseRemoveConfirmProps) {
  const [removeId, setRemoveId] = useState<number | null>(null);

  const handleOpenRemoveConfirm = (id: number) => {
    setRemoveId(id);
  };

  const handleCloseRemoveConfirm = () => {
    setRemoveId(null);
  };

  const handleConfirmRemove = async () => {
    if (removeId === null) return;

    try {
      await onRemove(removeId);
      setRemoveId(null);
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  return {
    removeId,
    handleOpenRemoveConfirm,
    handleCloseRemoveConfirm,
    handleConfirmRemove,
  };
}