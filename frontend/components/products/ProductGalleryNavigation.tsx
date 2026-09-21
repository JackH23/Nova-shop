"use client";

import { useEffect, useState } from "react";

type ProductGalleryNavigationProps = {
  totalImages: number;
  onChange: (index: number) => void;
  resetKey?: string;
};

export default function ProductGalleryNavigation({
  totalImages,
  onChange,
  resetKey,
}: ProductGalleryNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    onChange(0);
  }, [resetKey]);

  const handlePrevious = () => {
    const newIndex =
      currentIndex === 0
        ? totalImages - 1
        : currentIndex - 1;

    setCurrentIndex(newIndex);
    onChange(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === totalImages - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(newIndex);
    onChange(newIndex);
  };

  if (totalImages <= 1) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:bg-white"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:bg-white"
        aria-label="Next image"
      >
        ›
      </button>

      <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
        {currentIndex + 1} / {totalImages}
      </div>
    </>
  );
}