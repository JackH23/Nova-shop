"use client";

import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

import type { SettingsUser, UpdateProfileData } from "@/lib/settings";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const BACKEND_URL = API_URL?.replace(/\/api\/?$/, "") ?? "";

  const profileImageUrl = user.profileImage
    ? `${BACKEND_URL}${user.profileImage}`
    : null;

  // Update inputs if API user changes
  useEffect(() => {
    setFullName(user.fullName);
    setEmail(user.email);
  }, [user.fullName, user.email]);

  // Update profile
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onUpdateProfile({
      fullName,
      email,
    });
  };

  // Select profile image
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await onUpdateProfileImage(file);

    // Allow selecting same file again
    event.target.value = "";
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-950">
          Profile Information
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Update your personal information.
        </p>
      </div>

      {/* Profile image */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={user.fullName}
              className="h-20 w-20 rounded-full border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3324d8] text-2xl font-semibold text-white">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <button
            type="button"
            disabled={updatingImage}
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#3324d8] text-white transition hover:bg-[#271bb7] disabled:cursor-not-allowed disabled:opacity-50"
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
          <p className="text-sm font-medium text-slate-900">Profile Photo</p>

          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG or WEBP. Maximum 5MB.
          </p>

          {updatingImage && (
            <p className="mt-1 text-xs text-[#3324d8]">Uploading...</p>
          )}
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="text-xs font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#3324d8]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#3324d8]"
            />
          </div>
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
