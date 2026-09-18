"use client";

import { useEffect, useState } from "react";
import ProductImageView from "@/components/products/ProductImage";
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
  const galleryImages =
    images.length > 0
      ? images.map((item) => item.image_url)
      : image
        ? [image]
        : [];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [images, image]);

  return (
    <div>
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        <ProductImageView
          image={selectedImage}
          name={name}
          className="object-cover"
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
            <ProductImageView
              image={galleryImage}
              name={`${name} thumbnail ${index + 1}`}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
