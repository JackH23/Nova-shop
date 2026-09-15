"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import type {
  CreatePaymentMethodData,
  PaymentMethodFormData,
} from "@/lib/paymentMethod";

const initialForm: PaymentMethodFormData = {
  type: "Visa",
  card_number: "",
  cardholder_name: "",
  expiry_month: "",
  expiry_year: "",
  is_default: false,
};

type UsePaymentMethodFormProps = {
  onCreate: (data: CreatePaymentMethodData) => Promise<unknown>;
};

export function usePaymentMethodForm({ onCreate }: UsePaymentMethodFormProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState<PaymentMethodFormData>(initialForm);

  const handleOpenForm = () => {
    setForm(initialForm);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setForm(initialForm);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const cardNumber = form.card_number.replace(/\s/g, "");

      const data: CreatePaymentMethodData = {
        type: form.type,
        last_four: cardNumber.slice(-4),
        cardholder_name: form.cardholder_name,
        expiry_month: form.expiry_month,
        expiry_year: form.expiry_year,
        is_default: form.is_default,
      };

      await onCreate(data);

      setForm(initialForm);
      setShowAddForm(false);
    } catch (error) {
      console.error("Submit payment method failed:", error);
    }
  };

  return {
    form,
    showAddForm,

    handleChange,
    handleSubmit,
    handleOpenForm,
    handleCloseForm,
  };
}
