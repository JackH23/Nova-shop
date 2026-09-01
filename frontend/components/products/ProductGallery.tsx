import Image from "next/image";

type ProductGalleryProps = {
  image: string;
  name: string;
};

export default function ProductGallery({
  image,
  name,
}: ProductGalleryProps) {
  return (
    <div>
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product thumbnail */}
      <div className="mt-3 flex gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-md border-2 border-indigo-600">
          <Image
            src={image}
            alt={`${name} thumbnail`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}