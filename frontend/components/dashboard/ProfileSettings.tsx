"use client";

import { Camera } from "lucide-react";

import type { SettingsUser, UpdateProfileData } from "@/lib/settings";
import { useProfileSettings } from "@/composables/useProfileSettings";
import AuthInput from "@/components/auth/AuthInput";

type ProfileSettingsProps = {
  user: SettingsUser;
  updatingProfile: boolean;
  updatingImage: boolean;

  onUpdateProfile: (data: UpdateProfileData) => Promise<unknown>;

  onUpdateProfileImage: (file: File) => Promise<unknown>;
};

export default function ProfileSettings({
  user,
  updatingProfile,
  updatingImage,
  onUpdateProfile,
  onUpdateProfileImage,
}: ProfileSettingsProps) {
  const {
    fileInputRef,
    fullName,
    email,
    displayImageUrl,
    setFullName,
    setEmail,
    handleSubmit,
    handleImageChange,
    handleOpenFilePicker,
  } = useProfileSettings({
    user,
    onUpdateProfile,
    onUpdateProfileImage,
  });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-950 dark:text-white">
          Profile Information
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Update your personal information.
        </p>
      </div>

      {/* Profile image */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          {displayImageUrl ? (
            <img
              src={displayImageUrl}
              alt={user.fullName}
              className="h-20 w-20 rounded-full border border-slate-200 object-cover dark:border-slate-700"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3324d8] text-2xl font-semibold text-white">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <button
            type="button"
            disabled={updatingImage}
            onClick={handleOpenFilePicker}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#3324d8] text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-900"
          >
            <Camera size={15} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Profile Photo
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            JPG, PNG or WEBP. Maximum 5MB.
          </p>

          {updatingImage && (
            <p className="mt-1 text-xs text-[#3324d8] dark:text-indigo-400">
              Uploading...
            </p>
          )}
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <AuthInput
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />

          <AuthInput
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {/* Save */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={updatingProfile}
            className="cursor-pointer rounded-md bg-[#3324d8] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}