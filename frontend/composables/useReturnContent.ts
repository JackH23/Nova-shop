"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReturn } from "@/composables/useReturn";

type ModalType = "confirm" | "success" | null;

export function useReturnContent(orderId: number) {
  const router = useRouter();

  const { createReturn, loading: submitting, error: submitError } = useReturn();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  };

  const handleReturn = () => {
    if (selectedItems.length === 0) return;

    setShowReturnForm(true);
  };

  const handleOpenConfirm = () => {
    setModalType("confirm");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleConfirmReturn = async () => {
    if (!reason || selectedItems.length === 0) return;

    try {
      const response = await createReturn({
        order_id: orderId,
        reason,
        note,
        items: selectedItems.map((itemId) => ({
          order_item_id: itemId,
          quantity: 1,
        })),
      });

      console.log("Created return:", response.return);
      console.log("Returned items:", response.return.items);

      setModalType("success");
    } catch (error) {
      console.error("Failed to create return:", error);
    }
  };

  const handleBackToOrder = () => {
    router.push(`/dashboard/orders/${orderId}`);
  };

  return {
    selectedItems,
    showReturnForm,
    reason,
    note,
    modalType,
    submitting,
    submitError,

    setReason,
    setNote,

    handleSelectItem,
    handleReturn,
    handleOpenConfirm,
    handleCloseModal,
    handleConfirmReturn,
    handleBackToOrder,
  };
}
