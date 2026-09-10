"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  image: string;
  images: ProductImage[];
  name: string;
};

export default function ProductGallery({
  image,
  images,
  name,
}: ProductGalleryProps) {
  const galleryImages = [
    image,
    ...images.map((item) => item.image_url),
  ];

  const [selectedImage, setSelectedImage] = useState(image);

  return (
    <div>
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
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
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}