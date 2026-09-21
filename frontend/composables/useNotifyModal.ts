"use client";

import { useCallback, useState } from "react";

export type NotifyVariant = "success" | "danger";

export type NotifyModalState = {
  open: boolean;
  title: string;
  message: string;
  variant: NotifyVariant;
};

const initialState: NotifyModalState = {
  open: false,
  title: "",
  message: "",
  variant: "success",
};

export function useNotifyModal() {
  const [notification, setNotification] =
    useState<NotifyModalState>(initialState);

  // Open notification
  const notify = useCallback(
    (
      variant: NotifyVariant,
      title: string,
      message: string,
    ) => {
      setNotification({
        open: true,
        title,
        message,
        variant,
      });
    },
    [],
  );

  // Success notification
  const notifySuccess = useCallback(
    (title: string, message: string) => {
      notify("success", title, message);
    },
    [notify],
  );

  // Error notification
  const notifyError = useCallback(
    (title: string, message: string) => {
      notify("danger", title, message);
    },
    [notify],
  );

  // Close notification
  const closeNotification = useCallback(() => {
    setNotification((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  return {
    notification,
    notify,
    notifySuccess,
    notifyError,
    closeNotification,
  };
}