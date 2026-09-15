"use client";

import { useState } from "react";
import type {
  CreateAddressData,
  UpdateAddressData,
  UserAddress,
} from "@/lib/address";

type UseAddressFormProps = {
  onCreate: (data: CreateAddressData) => Promise<unknown>;
  onUpdate: (addressId: number, data: UpdateAddressData) => Promise<unknown>;
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

export function useAddressForm({ onCreate, onUpdate }: UseAddressFormProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null,
  );

  const [form, setForm] = useState<CreateAddressData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await onUpdate(editingAddress.id, form);
      } else {
        await onCreate(form);
      }

      setForm(initialForm);
      setEditingAddress(null);
      setShowAddForm(false);
    } catch (error) {
      console.error(
        editingAddress ? "Update address failed:" : "Create address failed:",
        error,
      );
    }
  };

  const handleOpenForm = () => {
    setEditingAddress(null);
    setForm(initialForm);
    setShowAddForm(true);
  };

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);

    setForm({
      first_name: address.first_name,
      last_name: address.last_name,
      email: address.email,
      phone: address.phone,
      address: address.address,
      address_line2: address.address_line2 ?? "",
      city: address.city,
      state_province: address.state_province ?? "",
      postal_code: address.postal_code ?? "",
      country: address.country,
      is_default: address.is_default,
    });

    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setForm(initialForm);
  };

  return {
    form,
    showAddForm,
    editingAddress,

    handleChange,
    handleSubmit,
    handleOpenForm,
    handleEditAddress,
    handleCloseForm,
  };
}
