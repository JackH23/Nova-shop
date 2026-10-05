"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useNavbar } from "@/composables/useNavbar";
import { useProductList } from "@/composables/useProductList";
import { useCart } from "@/composables/useCart";
import { useMe } from "@/composables/useMe";
import { useLogout } from "@/composables/useLogout";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";
import { getFileUrl } from "@/lib/fileUrl";

export function useNavbarContent() {
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

  const { cartCount } = useCart();

  const {
    isVisible,
    isProfileOpen,
    toggleProfile,
    closeProfile,
  } = useNavbar();

  const {
    logout,
    showConfirm,
    openConfirm,
    closeConfirm,
  } = useLogout(refreshUser);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const closeMobileNavigation = () => {
    setSearch("");
    setMobileMenuOpen(false);
  };

  return {
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

    openLogin: auth.openLogin,
  };
}