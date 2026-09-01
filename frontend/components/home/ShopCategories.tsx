import Image from "next/image";
import Link from "next/link";

export default function ShopCategories() {
  return (
    <section className="px-4 py-10 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">
            Shop by Category
          </h2>

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
          <CategoryCard
            name="Electronics"
            image="/images/categories/electronics.jpg"
            href="/categories/electronics"
          />

          {/* Right */}
          <div className="grid gap-4 md:grid-rows-[1fr_1fr]">
            {/* Fashion */}
            <CategoryCard
              name="Fashion"
              image="/images/categories/fashion.jpg"
              href="/categories/clothing"
            />

            {/* Home + Beauty */}
            <div className="grid grid-cols-2 gap-4">
              <CategoryCard
                name="Home"
                image="/images/categories/home.jpg"
                href="/categories/home-garden"
              />

              <CategoryCard
                name="Beauty"
                image="/images/categories/beauty.jpg"
                href="/categories/beauty"
              />
            </div>
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

function CategoryCard({
  name,
  image,
  href,
}: CategoryCardProps) {
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