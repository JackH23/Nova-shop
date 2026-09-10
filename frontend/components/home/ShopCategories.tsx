"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/composables/useCategories";

export default function ShopCategories() {

  const { categories, loading, error } = useCategories();

  return (
    <section>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-950">Shop by Category</h2>

        <Link
          href="/categories"
          className="text-xs font-medium text-[#3324d8] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Categories */}
      <div className="grid gap-4 md:h-[570px] md:grid-cols-2">
        {/* Electronics - Left */}
        {categories[0] && (
          <CategoryCard
            name={categories[0].name}
            image="/images/categories/electronics.jpg"
            href={`/categories?category_id=${categories[0].id}`}
          />
        )}

        {/* Right */}
        <div className="grid gap-4 md:grid-rows-[1fr_1fr]">
          {/* Fashion */}
          {categories[1] && (
            <CategoryCard
              name={categories[1].name}
              image="/images/categories/fashion.jpg"
              href={`/categories?category_id=${categories[1].id}`}
            />
          )}

          {/* Home + Beauty */}
          <div className="grid grid-cols-2 gap-4">
            {categories[2] && (
              <CategoryCard
                name={categories[2].name}
                image="/images/categories/home.jpg"
                href={`/categories?category_id=${categories[2].id}`}
              />
            )}

            {categories[3] && (
              <CategoryCard
                name={categories[3].name}
                image="/images/categories/beauty.jpg"
                href={`/categories?category_id=${categories[3].id}`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type CategoryCardProps = {
  name: string;
  image: string;
  href: string;
};

function CategoryCard({ name, image, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative min-h-[220px] overflow-hidden rounded-lg"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

      {/* Name */}
      <span className="absolute bottom-4 left-4 z-10 text-sm font-semibold text-white">
        {name}
      </span>
    </Link>
  );
}
