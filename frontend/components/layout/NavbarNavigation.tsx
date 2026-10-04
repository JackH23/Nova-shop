"use client";

import Link from "next/link";

type NavbarNavigationProps = {
  pathname: string;
};

const navigationItems = [
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Deals",
    href: "/deals",
  },
  {
    label: "New Arrivals",
    href: "/new-arrivals",
  },
];

export default function NavbarNavigation({
  pathname,
}: NavbarNavigationProps) {
  return (
    <nav className="ml-[135px] hidden h-full items-center gap-7 text-[11px] lg:flex">
      {navigationItems.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className={`flex h-full items-center border-b-2 transition ${
              isActive
                ? "border-[#4b3cf0] text-[#3324d8]"
                : "border-transparent text-slate-800 hover:text-[#3324d8] dark:text-slate-200 dark:hover:text-indigo-400"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}