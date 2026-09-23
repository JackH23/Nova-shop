"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  RotateCcw,
  Heart,
  MapPin,
  CreditCard,
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
    label: "Payment",
    href: "/dashboard/payment",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-lg border border-slate-200 bg-white p-4 lg:w-[220px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-indigo-600">
          NovaAccount
        </h2>

        <p className="text-xs text-slate-500">
          Manage your profile
        </p>
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-indigo-100 font-medium text-indigo-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={16} />

              <span>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}