"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type { SettingsUser, UpdateProfileData } from "@/lib/settings";

import { getFileUrl } from "@/lib/fileUrl";

type UseProfileSettingsProps = {
  user: SettingsUser;

  onUpdateProfile: (data: UpdateProfileData) => Promise<unknown>;

  onUpdateProfileImage: (file: File) => Promise<unknown>;
};

export function useProfileSettings({
  user,
  onUpdateProfile,
  onUpdateProfileImage,
}: UseProfileSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const profileImageUrl = getFileUrl(user.profileImage);
  const displayImageUrl = previewImageUrl || profileImageUrl;

  useEffect(() => {
    setFullName(user.fullName);
    setEmail(user.email);
  }, [user.fullName, user.email]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onUpdateProfile({
      fullName,
      email,
    });

    if (selectedImage) {
      await onUpdateProfileImage(selectedImage);

      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }

      setSelectedImage(null);
      setPreviewImageUrl(null);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }

    setSelectedImage(file);
    setPreviewImageUrl(URL.createObjectURL(file));

    event.target.value = "";
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,

    fullName,
    email,
    displayImageUrl,

    setFullName,
    setEmail,

    handleSubmit,
    handleImageChange,
    handleOpenFilePicker,
  };
}
