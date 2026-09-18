"use client";

import Image from "next/image";

type ProductImageProps = {
  image: string | null | undefined;
  name: string;
  className?: string;
  unoptimized?: boolean;
};

export default function ProductImage({
  image,
  name,
  className = "object-cover",
  unoptimized = true,
}: ProductImageProps) {
  const PRODUCT_IMAGE_URL =
    process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL ||
    "http://localhost:5001";

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${PRODUCT_IMAGE_URL}${image}`
    : null;

  if (!imageUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
        No Image
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={name}
      fill
      unoptimized={unoptimized}
      className={className}
    />
  );
}