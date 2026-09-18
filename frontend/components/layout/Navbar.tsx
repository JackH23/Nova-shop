"use client";

import Link from "next/link";
import { useNavbar } from "@/composables/useNavbar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProductList } from "@/composables/useProductList";
import { useCart } from "@/composables/useCart";
import { Search, Heart, ShoppingCart, UserRound } from "lucide-react";
import { useMe } from "@/composables/useMe";
import ProfileModal from "./ProfileModal";
import { useLogout } from "@/composables/useLogout";
import ConfirmModal from "@/components/common/ConfirmModal";
import { getFileUrl } from "@/lib/fileUrl";

export default function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const {
    filteredProducts: searchResults,
    loading: searching,
  } = useProductList({
    search,
  });

  const { user } = useMe();
  const profileImageUrl = getFileUrl(user?.profileImage);
  const { cartCount } = useCart();
  const { isVisible, isProfileOpen, toggleProfile, closeProfile } = useNavbar();

  const { logout, showConfirm, openConfirm, closeConfirm } = useLogout();

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {/* Free shipping bar */}
        <div className="bg-[#3324d8] py-1.5 text-center text-[10px] font-semibold text-white">
          Free Shipping on Orders Over $100.{" "}
          <Link href="/products" className="underline">
            Shop Now
          </Link>
        </div>

        {/* Main navbar */}
        <div className="border-b border-slate-200">
          <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-9">
            {/* Logo */}
            <Link href="/home" className="text-[18px] font-bold text-[#3324d8]">
              NovaShop
            </Link>

            {/* Navigation */}
            {/* Navigation */}
            <nav className="ml-[135px] flex h-full items-center gap-7 text-[11px] text-slate-800">
              {/* Shop */}
              <Link
                href="/products"
                className={`flex h-full items-center border-b-2 transition ${
                  pathname.startsWith("/products")
                    ? "border-[#4b3cf0] text-[#3324d8]"
                    : "border-transparent text-slate-800 hover:text-[#3324d8]"
                }`}
              >
                Shop
              </Link>

              {/* Categories */}
              <Link
                href="/categories"
                className={`flex h-full items-center border-b-2 transition ${
                  pathname.startsWith("/categories")
                    ? "border-[#4b3cf0] text-[#3324d8]"
                    : "border-transparent text-slate-800 hover:text-[#3324d8]"
                }`}
              >
                Categories
              </Link>

              {/* Deals */}
              <Link
                href="/deals"
                className={`flex h-full items-center border-b-2 transition ${
                  pathname.startsWith("/deals")
                    ? "border-[#4b3cf0] text-[#3324d8]"
                    : "border-transparent text-slate-800 hover:text-[#3324d8]"
                }`}
              >
                Deals
              </Link>

              {/* New Arrivals */}
              <Link
                href="/new-arrivals"
                className={`flex h-full items-center border-b-2 transition ${
                  pathname.startsWith("/new-arrivals")
                    ? "border-[#4b3cf0] text-[#3324d8]"
                    : "border-transparent text-slate-800 hover:text-[#3324d8]"
                }`}
              >
                New Arrivals
              </Link>
            </nav>

            {/* Right section */}
            <div className="ml-auto flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <div className="flex h-[42px] w-[180px] items-center rounded-full bg-[#f4f5f7] px-5">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-500"
                  />

                  <Search
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0 text-slate-700"
                  />
                </div>

                {search.trim() && (
                  <div className="absolute right-0 top-[48px] z-50 w-[320px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    {searching ? (
                      <p className="p-4 text-xs text-slate-500">Searching...</p>
                    ) : searchResults.length > 0 ? (
                      searchResults.slice(0, 5).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => {
                            setSearch("");
                          }}
                          className="flex items-center gap-3 border-b border-slate-100 p-3 last:border-b-0 hover:bg-slate-50"
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
                            <p className="truncate text-sm font-medium text-slate-900">
                              {product.name}
                            </p>

                            <p className="text-xs font-semibold text-[#3324d8]">
                              ${Number(product.price).toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="p-4 text-xs text-slate-500">
                        No products found.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                href="/dashboard/wishlist"
                className="text-[#3324d8] transition hover:opacity-70"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.8} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
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
                    onClick={toggleProfile}
                    className="flex items-center gap-2"
                  >
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt={user.fullName}
                        className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3324d8] text-xs font-semibold text-white">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <span className="text-xs font-medium text-slate-800">
                      {user.fullName}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <ProfileModal
                      fullName={user.fullName}
                      email={user.email}
                      profileImage={profileImageUrl}
                      onClose={closeProfile}
                      onLogout={openConfirm}
                    />
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[#3324d8] transition hover:opacity-70"
                >
                  <UserRound size={18} strokeWidth={1.8} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <ConfirmModal
        open={showConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={closeConfirm}
        onConfirm={logout}
      />
    </>
  );
}
