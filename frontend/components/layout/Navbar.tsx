"use client";

import Link from "next/link";
import { useNavbarContent } from "@/composables/useNavbarContent";
import MobileNavigation from "./MobileNavigation";
import NavbarRightSection from "./NavbarRightSection";
import NavbarNavigation from "./NavbarNavigation";
import ConfirmModal from "@/components/common/ConfirmModal";
import Image from "next/image";

export default function Navbar() {
  const {
    pathname,
    search,
    setSearch,
    searching,
    searchResults,
    user,
    profileImageUrl,
    cartCount,
    isVisible,
    isProfileOpen,
    mobileMenuOpen,
    showConfirm,
    toggleProfile,
    closeProfile,
    toggleMobileMenu,
    closeMobileMenu,
    closeMobileNavigation,
    openConfirm,
    closeConfirm,
    logout,
    openLogin,
  } = useNavbarContent();

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <header
        className={`sticky top-0 z-50 w-full bg-white text-slate-900 transition-all duration-300 ease-in-out dark:bg-slate-950 dark:text-white ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {/* Free shipping bar */}
        <div className="bg-[#3324d8] py-1.5 text-center text-[10px] font-semibold text-white">
          Free Shipping on Orders Over $100.{" "}
          <Link href="/products" prefetch={false} className="underline">
            Shop Now
          </Link>
        </div>

        {/* Main navbar */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center px-4 sm:px-6 lg:h-[70px] lg:px-9">

            {/* Logo */}
            <Link
              href="/home"
              prefetch={false}
              className="flex shrink-0 items-center"
            >
              <Image
                src="/logo/novaShop.png"
                alt="NovaShop"
                width={160}
                height={50}
                priority
                className="h-9 w-auto object-contain lg:h-10"
              />
            </Link>

            {/* Navigation */}
            <NavbarNavigation pathname={pathname} />

            {/* Right section */}
            <NavbarRightSection
              search={search}
              searching={searching}
              searchResults={searchResults}
              user={user}
              profileImageUrl={profileImageUrl}
              cartCount={cartCount}
              isProfileOpen={isProfileOpen}
              mobileMenuOpen={mobileMenuOpen}
              onSearchChange={setSearch}
              onToggleProfile={toggleProfile}
              onCloseProfile={closeProfile}
              onOpenLogoutConfirm={openConfirm}
              onOpenLogin={openLogin}
              onToggleMobileMenu={toggleMobileMenu}
            />
          </div>

          {/* Mobile navigation overlay */}
          <MobileNavigation
            open={mobileMenuOpen}
            search={search}
            searching={searching}
            searchResults={searchResults}
            onSearchChange={setSearch}
            onClose={closeMobileNavigation}
          />
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
