"use client";

import Link from "next/link";
import { LogOut, Package } from "lucide-react";
import { useEffect, useRef } from "react";

type ProfileModalProps = {
  fullName: string;
  email: string;
  profileImage: string | null;
  onClose: () => void;
  onLogout: () => void;
};

export default function ProfileModal({
  fullName,
  email,
  profileImage,
  onClose,
  onLogout,
}: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute right-0 top-11 z-50 w-64 rounded-lg border border-slate-200 bg-white p-4 shadow-lg"
    >
      {/* User */}
      <div className="flex items-center gap-3">
        {profileImage ? (
          <img
            src={profileImage}
            alt={fullName}
            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3324d8] font-semibold text-white">
            {fullName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-slate-900">{fullName}</p>

          <p className="text-xs text-slate-500">{email}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <Link
          href="/dashboard/orders"
          onClick={onClose}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
        >
          <Package size={16} />
          My Orders
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
