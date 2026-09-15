"use client";

import { useState } from "react";
import type { CreateAddressData } from "@/lib/address";

type UseAddressFormProps = {
  onCreate: (data: CreateAddressData) => Promise<unknown>;
};

const initialForm: CreateAddressData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  address_line2: "",
  city: "",
  state_province: "",
  postal_code: "",
  country: "Laos",
  is_default: false,
};

export function useAddressForm({
  onCreate,
}: UseAddressFormProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] =
    useState<CreateAddressData>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await onCreate(form);

      setForm(initialForm);
      setShowAddForm(false);
    } catch (error) {
      console.error("Create address failed:", error);
    }
  };

  const handleOpenForm = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
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