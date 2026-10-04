import { useRef } from "react";

type UsePaginationScrollOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

export function usePaginationScroll<T extends HTMLElement = HTMLDivElement>(
  onPageChange: (page: number) => void,
  options: UsePaginationScrollOptions = {},
) {
  const targetRef = useRef<T>(null);

  const {
    behavior = "smooth",
    block = "start",
  } = options;

  const handlePageChange = (page: number) => {
    onPageChange(page);

    requestAnimationFrame(() => {
      targetRef.current?.scrollIntoView({
        behavior,
        block,
      });
    });
  };

  return {
    targetRef,
    handlePageChange,
  };
}