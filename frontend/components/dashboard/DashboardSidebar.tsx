"use client";

import { useDashboardNavigation } from "@/composables/useDashboardNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/composables/useNavbar";

import {
  LayoutDashboard,
  Package,
  RotateCcw,
  Heart,
  MapPin,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: Package,
  },
  {
    label: "Returns",
    href: "/dashboard/returns",
    icon: RotateCcw,
  },
  {
    label: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    label: "Addresses",
    href: "/dashboard/addresses",
    icon: MapPin,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isVisible } = useNavbar();

  const {
    mobileScrollRef,
    mobileNavRef,
    isItemActive,
    scrollToItem,
  } = useDashboardNavigation(pathname);

  return (
    <>
      {/* ========================================
          Mobile / Tablet navigation
      ======================================== */}
      <aside
        className={`fixed left-1/2 z-40 w-full max-w-[1440px] -translate-x-1/2 bg-white transition-[top] duration-300 ease-in-out lg:hidden dark:bg-slate-950 ${isVisible ? "top-[90px]" : "top-0"
          }`}
      >
        <div
          ref={mobileScrollRef}
          className="overflow-x-auto border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
        >
          <nav
            ref={mobileNavRef}
            className="flex min-w-max items-center gap-1 px-1"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  prefetch={false}
                  onClick={(event) => {
                    scrollToItem(
                      event.currentTarget,
                      "smooth",
                    );
                  }}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors duration-300 ${isActive
                      ? "border-indigo-600 font-medium text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                    }`}
                >
                  <Icon size={16} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Reserve space for fixed mobile navigation */}
      <div className="h-2 lg:hidden" />

      {/* ========================================
          Desktop sidebar
      ======================================== */}
      <aside className="hidden w-[220px] rounded-lg border border-slate-200 bg-white p-4 transition-colors dark:border-slate-700 dark:bg-slate-900 lg:block">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            NovaAccount
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your profile
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${isActive
                  ? "bg-indigo-100 font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
              >
                <Icon size={16} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}