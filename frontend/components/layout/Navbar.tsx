"use client";

import Link from "next/link";
import { useNavbar } from "@/composables/useNavbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductList } from "@/composables/useProductList";
import { useCart } from "@/composables/useCart";
import { useMe } from "@/composables/useMe";
import { useLogout } from "@/composables/useLogout";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import { getFileUrl } from "@/lib/fileUrl";
import MobileNavigation from "./MobileNavigation";
import NavbarRightSection from "./NavbarRightSection";
import NavbarNavigation from "./NavbarNavigation";

export default function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const auth = useAuth();

  const { filteredProducts: searchResults, loading: searching } =
    useProductList({
      search,
    });

  const { user, refreshUser } = useMe();
  const profileImageUrl = getFileUrl(user?.profileImage);

  useEffect(() => {
    const handleProfileUpdated = () => {
      refreshUser();
    };

    window.addEventListener(
      "profile-updated",
      handleProfileUpdated,
    );

    return () => {
      window.removeEventListener(
        "profile-updated",
        handleProfileUpdated,
      );
    };
  }, [refreshUser]);

  const { cartCount } = useCart();
  const { isVisible, isProfileOpen, toggleProfile, closeProfile } = useNavbar();

  const {
    logout,
    showConfirm,
    openConfirm,
    closeConfirm,
  } = useLogout(refreshUser);

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
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
            <Link href="/home" prefetch={false} className="text-[18px] font-bold text-[#3324d8]">
              NovaShop
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
              onOpenLogin={auth.openLogin}
              onToggleMobileMenu={() =>
                setMobileMenuOpen((prev) => !prev)
              }
            />
          </div>

          {/* Mobile navigation overlay */}
          <MobileNavigation
            open={mobileMenuOpen}
            search={search}
            searching={searching}
            searchResults={searchResults}
            onSearchChange={setSearch}
            onClose={() => {
              setSearch("");
              setMobileMenuOpen(false);
            }}
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
