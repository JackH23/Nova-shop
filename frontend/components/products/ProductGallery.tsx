"use client";

import { useState } from "react";
import ProductImageView from "@/components/products/ProductImage";
import ProductGalleryNavigation from "@/components/products/ProductGalleryNavigation";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  image: string | null;
  images: ProductImage[];
  variantImage: string | null;
  name: string;
};

export default function ProductGallery({
  image,
  images,
  variantImage,
  name,
}: ProductGalleryProps) {
  const galleryImages = Array.from(
    new Set([
      ...(image ? [image] : []),
      ...images.map((item) => item.image_url),
    ]),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage =
    variantImage ?? galleryImages[currentIndex];

  return (
    <div>
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        <ProductImageView
          image={currentImage}
          name={name}
          className="object-cover"
        />

        {!variantImage && (
          <ProductGalleryNavigation
            totalImages={galleryImages.length}
            onChange={setCurrentIndex}
            resetKey={`${image}-${images.length}`}
          />
        )}
      </div>
    </div>
  );
}