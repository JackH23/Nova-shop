"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import ProfileModal from "./ProfileModal";

type SearchProduct = {
  id: number;
  name: string;
  price: string | number;
  image?: string | null;
};

type NavbarUser = {
  fullName: string;
  email: string;
};

type NavbarRightSectionProps = {
  search: string;
  searching: boolean;
  searchResults: SearchProduct[];

  user: NavbarUser | null | undefined;
  profileImageUrl: string | null;

  cartCount: number;

  isProfileOpen: boolean;
  mobileMenuOpen: boolean;

  onSearchChange: (value: string) => void;
  onToggleProfile: () => void;
  onCloseProfile: () => void;
  onOpenLogoutConfirm: () => void;
  onOpenLogin: () => void;
  onToggleMobileMenu: () => void;
};

export default function NavbarRightSection({
  search,
  searching,
  searchResults,
  user,
  profileImageUrl,
  cartCount,
  isProfileOpen,
  mobileMenuOpen,
  onSearchChange,
  onToggleProfile,
  onCloseProfile,
  onOpenLogoutConfirm,
  onOpenLogin,
  onToggleMobileMenu,
}: NavbarRightSectionProps) {
  return (
    <div className="ml-auto flex items-center gap-3 sm:gap-4">
      {/* Desktop search */}
      <div className="relative hidden lg:block">
        <div className="flex h-[42px] w-[180px] items-center rounded-full bg-[#f4f5f7] px-5 transition-colors dark:bg-slate-800">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          <Search
            size={17}
            strokeWidth={1.8}
            className="shrink-0 text-slate-700 dark:text-slate-300"
          />
        </div>

        {/* Desktop search results */}
        {search.trim() && (
          <div className="absolute right-0 top-[48px] z-50 w-[320px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {searching ? (
              <p className="p-4 text-xs text-slate-500 dark:text-slate-400">
                Searching...
              </p>
            ) : searchResults.length > 0 ? (
              searchResults.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  prefetch={false}
                  onClick={() => onSearchChange("")}
                  className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                  <img
                    src={
                      product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${product.image}`
                        : "/placeholder.png"
                    }
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>

                    <p className="text-xs font-semibold text-[#3324d8]">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-4 text-xs text-slate-500 dark:text-slate-400">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Wishlist */}
      <Link
        href="/dashboard/wishlist"
        prefetch={false}
        className="text-[#3324d8] transition hover:opacity-70"
        aria-label="Wishlist"
      >
        <Heart size={19} strokeWidth={1.8} />
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        prefetch={false}
        className="relative text-[#3324d8] transition hover:opacity-70"
        aria-label="Cart"
      >
        <ShoppingCart size={20} strokeWidth={1.8} />

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </Link>

      {/* User */}
      {user ? (
        <div className="relative">
          <button
            type="button"
            onClick={onToggleProfile}
            className="flex items-center gap-2"
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={user.fullName}
                className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-slate-700"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3324d8] text-xs font-semibold text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="hidden text-xs font-medium text-slate-800 dark:text-slate-200 lg:inline">
              {user.fullName}
            </span>
          </button>

          {isProfileOpen && (
            <ProfileModal
              fullName={user.fullName}
              email={user.email}
              profileImage={profileImageUrl}
              onClose={onCloseProfile}
              onLogout={onOpenLogoutConfirm}
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpenLogin}
          className="flex items-center gap-1.5 text-[#3324d8] transition hover:opacity-70"
        >
          <UserRound size={18} strokeWidth={1.8} />

          <span className="hidden text-xs font-medium sm:inline">
            Login
          </span>
        </button>
      )}

      {/* Mobile menu */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        className="flex items-center justify-center text-slate-800 lg:hidden dark:text-slate-200"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}
      </button>
    </div>
  );
}