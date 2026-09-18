"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  image: string | null;
  images: ProductImage[];
  name: string;
};

export default function ProductGallery({
  image,
  images,
  name,
}: ProductGalleryProps) {
  const PRODUCT_IMAGE_URL =
    process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL || "http://localhost:5001";

  const getProductImageUrl = (image: string | null | undefined) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `${PRODUCT_IMAGE_URL}${image}`;
  };

  const galleryImages = (
    images.length > 0 ? images.map((item) => item.image_url) : [image]
  )
    .map(getProductImageUrl)
    .filter((item): item is string => Boolean(item));

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [images, image]);

  return (
    <div>
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={name}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No Image
          </div>
        )}
      </div>

      {/* Product thumbnails */}
      <div className="mt-3 flex gap-3">
        {galleryImages.map((galleryImage, index) => (
          <button
            key={`${galleryImage}-${index}`}
            type="button"
            onClick={() => setSelectedImage(galleryImage)}
            className={`relative h-16 w-16 overflow-hidden rounded-md border-2 transition ${
              selectedImage === galleryImage
                ? "border-indigo-600"
                : "border-transparent hover:border-slate-300"
            }`}
          >
            <Image
              src={galleryImage}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
