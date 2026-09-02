"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/composables/useCart";
import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
} from "lucide-react";

export default function Navbar() {

  const pathname = usePathname();
  const { cartCount } = useCart();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top
      if (currentScrollY < 50) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Scroll down → hide
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      // Scroll up → show
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
          <Link
            href="/dashboard"
            className="text-[18px] font-bold text-[#3324d8]"
          >
            NovaShop
          </Link>

          {/* Navigation */}
          <nav className="ml-[135px] flex h-full items-center gap-7 text-[11px] text-slate-800">
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

            <Link
              href="/categories"
              className="transition hover:text-[#3324d8]"
            >
              Categories
            </Link>

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

            <Link
              href="/new-arrival"
              className="transition hover:text-[#3324d8]"
            >
              New Arrival
            </Link>
          </nav>

          {/* Right section */}
          <div className="ml-auto flex items-center gap-4">
            {/* Search */}
            <div className="flex h-[42px] w-[180px] items-center rounded-full bg-[#f4f5f7] px-5">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-500"
              />

              <Search
                size={17}
                strokeWidth={1.8}
                className="text-slate-700"
              />
            </div>

            {/* Wishlist */}
            <button
              type="button"
              className="text-[#3324d8] transition hover:opacity-70"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.8} />
            </button>

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
            <button
              type="button"
              className="text-[#3324d8] transition hover:opacity-70"
              aria-label="Account"
            >
              <UserRound size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}