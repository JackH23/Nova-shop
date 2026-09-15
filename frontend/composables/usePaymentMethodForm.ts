"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  usePaymentValidation,
  type PaymentData,
} from "@/composables/usePaymentValidation";

import type {
  PaymentMethod,
  CreatePaymentMethodData,
  UpdatePaymentMethodData,
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

  onUpdate: (
    paymentMethodId: number,
    data: UpdatePaymentMethodData,
  ) => Promise<unknown>;
};

export type PaymentMethodFormErrors = {
  cardholder_name?: string;
  expiry_month?: string;
  expiry_year?: string;
};

export function usePaymentMethodForm({
  onCreate,
  onUpdate,
}: UsePaymentMethodFormProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const [editingPaymentMethod, setEditingPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [form, setForm] = useState<PaymentMethodFormData>(initialForm);

  const [formErrors, setFormErrors] = useState<PaymentMethodFormErrors>({});

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const {
    errors: paymentErrors,
    validatePayment,
    clearErrors: clearPaymentErrors,
    handleChange: handlePaymentValidationChange,
  } = usePaymentValidation(paymentData, setPaymentData, {
    requireExpiry: false,
    requireCvc: false,
  });

  const handleOpenForm = () => {
    setForm(initialForm);
    setFormErrors({});
    clearPaymentErrors();

    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });

    setEditingPaymentMethod(null);
    setShowAddForm(true);
  };

  const handleEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setEditingPaymentMethod(paymentMethod);

    setFormErrors({});
    clearPaymentErrors();

    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });

    setForm({
      type: paymentMethod.type,
      card_number: "",
      cardholder_name: paymentMethod.cardholder_name,
      expiry_month: paymentMethod.expiry_month,
      expiry_year: paymentMethod.expiry_year,
      is_default: paymentMethod.is_default,
    });

    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);

    setForm(initialForm);
    setFormErrors({});
    clearPaymentErrors();

    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });

    setEditingPaymentMethod(null);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    let formattedValue = value;

    if (name === "expiry_year") {
      formattedValue = value.replace(/\D/g, "").slice(0, 2);
    }

    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleCardNumberChange = (value: string) => {
    handlePaymentValidationChange("cardNumber", value);

    const digits = value.replace(/\D/g, "").slice(0, 16);

    const formattedValue = digits.replace(/(.{4})/g, "$1 ").trim();

    setForm((prev) => ({
      ...prev,
      card_number: formattedValue,
    }));
  };

  const validateForm = () => {
    const newErrors: PaymentMethodFormErrors = {};

    if (!form.cardholder_name.trim()) {
      newErrors.cardholder_name = "Cardholder name is required";
    }

    if (!form.expiry_month) {
      newErrors.expiry_month = "Expiry month is required";
    }

    if (!form.expiry_year.trim()) {
      newErrors.expiry_year = "Expiry year is required";
    } else if (!/^\d{2}$/.test(form.expiry_year)) {
      newErrors.expiry_year = "Expiry year must be 2 digits";
    }

    setFormErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = validateForm();

    let isCardValid = true;

    if (!editingPaymentMethod) {
      isCardValid = validatePayment({
        cardNumber: form.card_number,
        expiryDate: "",
        cvc: "",
      });
    }

    if (!isFormValid || !isCardValid) return;

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

      if (editingPaymentMethod) {
        const updateData: UpdatePaymentMethodData = {
          type: form.type,
          cardholder_name: form.cardholder_name,
          expiry_month: form.expiry_month,
          expiry_year: form.expiry_year,
        };

        if (cardNumber) {
          updateData.last_four = cardNumber.slice(-4);
        }

        await onUpdate(editingPaymentMethod.id, updateData);
      } else {
        await onCreate(data);
      }

      setForm(initialForm);
      setFormErrors({});
      clearPaymentErrors();

      setPaymentData({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      });

      setShowAddForm(false);
      setEditingPaymentMethod(null);
    } catch (error) {
      console.error("Submit payment method failed:", error);
    }
  };

  return {
    form,
    formErrors,
    paymentErrors,

    showAddForm,
    editingPaymentMethod,

    handleChange,
    handleCardNumberChange,
    handleSubmit,
    handleOpenForm,
    handleEditPaymentMethod,
    handleCloseForm,
  };
}
