"use client";

import { useCallback, useEffect, useRef } from "react";

export function useDashboardNavigation(pathname: string) {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  // Check whether a dashboard navigation item is active
  const isItemActive = useCallback(
    (href: string) => {
      return href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(href);
    },
    [pathname],
  );

  // Scroll selected item into the center of the mobile navigation
  const scrollToItem = useCallback(
    (
      item: HTMLElement,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const container = mobileScrollRef.current;

      if (!container) return;

      const itemCenter =
        item.offsetLeft + item.offsetWidth / 2;

      const targetLeft =
        itemCenter - container.clientWidth / 2;

      const maxScrollLeft =
        container.scrollWidth - container.clientWidth;

      const nextLeft = Math.min(
        Math.max(targetLeft, 0),
        Math.max(maxScrollLeft, 0),
      );

      container.scrollTo({
        left: nextLeft,
        behavior,
      });
    },
    [],
  );

  // Keep the active item visible when the route changes
  useEffect(() => {
    const nav = mobileNavRef.current;

    if (!nav) return;

    const activeItem = nav.querySelector<HTMLElement>(
      '[data-active="true"]',
    );

    if (!activeItem) return;

    scrollToItem(activeItem, "smooth");
  }, [pathname, scrollToItem]);

  return {
    mobileScrollRef,
    mobileNavRef,
    isItemActive,
    scrollToItem,
  };
}